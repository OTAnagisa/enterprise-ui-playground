using System.Net;
using System.Net.Http.Json;
using Backend.Application.DTOs;
using Backend.Application.Services;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using Xunit;

namespace Backend.WebApi.ApiTests.Controllers;

public class SearchControllerApiTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly WebApplicationFactory<Program> _factory;
    private readonly Mock<ISearchService> _mockSearchService;

    public SearchControllerApiTests(WebApplicationFactory<Program> factory)
    {
        _mockSearchService = new Mock<ISearchService>();

        _factory = factory.WithWebHostBuilder(builder =>
        {
            builder.ConfigureServices(services =>
            {
                // Remove the real ISearchService
                var descriptor = services.SingleOrDefault(
                    d => d.ServiceType == typeof(ISearchService));
                if (descriptor != null)
                {
                    services.Remove(descriptor);
                }

                // Add mock ISearchService
                services.AddScoped(_ => _mockSearchService.Object);
            });
        });
    }

    [Fact]
    public async Task Search_WithValidQuery_ReturnsOk()
    {
        // Arrange
        var client = _factory.CreateClient();
        var expectedResult = new SearchResultDto(
            new List<SearchItemDto>
            {
                new("1", "Test", "Content", "https://example.com")
            },
            1,
            1
        );

        _mockSearchService
            .Setup(s => s.SearchAsync("test", 1, It.IsAny<CancellationToken>()))
            .ReturnsAsync(expectedResult);

        // Act
        var response = await client.GetAsync("/api/search?query=test&page=1");

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var result = await response.Content.ReadFromJsonAsync<SearchResultDto>();
        Assert.NotNull(result);
        Assert.Single(result.Items);
    }

    [Fact]
    public async Task Search_WithoutQuery_ReturnsBadRequest()
    {
        // Arrange
        var client = _factory.CreateClient();

        // Act
        var response = await client.GetAsync("/api/search");

        // Assert
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task Search_WithInvalidPage_ReturnsBadRequest()
    {
        // Arrange
        var client = _factory.CreateClient();

        // Act
        var response = await client.GetAsync("/api/search?query=test&page=0");

        // Assert
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task GetById_WithExistingId_ReturnsOk()
    {
        // Arrange
        var client = _factory.CreateClient();
        var expectedItem = new SearchItemDto("test-id", "Test", "Content", "https://example.com");

        _mockSearchService
            .Setup(s => s.GetByIdAsync("test-id", It.IsAny<CancellationToken>()))
            .ReturnsAsync(expectedItem);

        // Act
        var response = await client.GetAsync("/api/search/test-id");

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var result = await response.Content.ReadFromJsonAsync<SearchItemDto>();
        Assert.NotNull(result);
        Assert.Equal("test-id", result.Id);
    }

    [Fact]
    public async Task GetById_WithNonExistentId_ReturnsNotFound()
    {
        // Arrange
        var client = _factory.CreateClient();

        _mockSearchService
            .Setup(s => s.GetByIdAsync("nonexistent", It.IsAny<CancellationToken>()))
            .ReturnsAsync((SearchItemDto?)null);

        // Act
        var response = await client.GetAsync("/api/search/nonexistent");

        // Assert
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }
}
