using Backend.Application.DTOs;
using Backend.Application.Mappers;
using Backend.Application.Services;
using Backend.Domain.Entities;
using Backend.Domain.Repositories;
using Moq;
using Xunit;

namespace Backend.Application.UnitTests.Services;

public class SearchServiceTests
{
    private readonly Mock<ISearchRepository> _mockRepository;
    private readonly SearchItemMapper _mapper;
    private readonly SearchService _service;

    public SearchServiceTests()
    {
        _mockRepository = new Mock<ISearchRepository>();
        _mapper = new SearchItemMapper();
        _service = new SearchService(_mockRepository.Object, _mapper);
    }

    [Fact]
    public async Task SearchAsync_WithValidQuery_ReturnsSearchResult()
    {
        // Arrange
        var query = "test";
        var page = 1;
        var items = new List<SearchItem>
        {
            new()
            {
                Id = "1",
                Title = "Test Item",
                Content = "Test content",
                Link = "https://example.com"
            }
        };

        _mockRepository
            .Setup(r => r.SearchAsync(query, page, 10, It.IsAny<CancellationToken>()))
            .ReturnsAsync(items);

        _mockRepository
            .Setup(r => r.CountAsync(query, It.IsAny<CancellationToken>()))
            .ReturnsAsync(1);

        // Act
        var result = await _service.SearchAsync(query, page);

        // Assert
        Assert.NotNull(result);
        Assert.Single(result.Items);
        Assert.Equal(1, result.TotalCount);
        Assert.Equal(page, result.CurrentPage);
        Assert.Equal("Test Item", result.Items.First().Title);

        _mockRepository.Verify(
            r => r.SearchAsync(query, page, 10, It.IsAny<CancellationToken>()),
            Times.Once);
        _mockRepository.Verify(
            r => r.CountAsync(query, It.IsAny<CancellationToken>()),
            Times.Once);
    }

    [Fact]
    public async Task SearchAsync_WithEmptyQuery_ThrowsArgumentException()
    {
        // Act & Assert
        await Assert.ThrowsAsync<ArgumentException>(
            () => _service.SearchAsync("", 1));

        await Assert.ThrowsAsync<ArgumentException>(
            () => _service.SearchAsync("   ", 1));

        _mockRepository.Verify(
            r => r.SearchAsync(It.IsAny<string>(), It.IsAny<int>(), It.IsAny<int>(), It.IsAny<CancellationToken>()),
            Times.Never);
    }

    [Fact]
    public async Task SearchAsync_WithInvalidPage_ThrowsArgumentException()
    {
        // Act & Assert
        await Assert.ThrowsAsync<ArgumentException>(
            () => _service.SearchAsync("test", 0));

        await Assert.ThrowsAsync<ArgumentException>(
            () => _service.SearchAsync("test", -1));
    }

    [Fact]
    public async Task SearchAsync_WithNoResults_ReturnsEmptyList()
    {
        // Arrange
        var query = "nonexistent";
        var page = 1;

        _mockRepository
            .Setup(r => r.SearchAsync(query, page, 10, It.IsAny<CancellationToken>()))
            .ReturnsAsync(new List<SearchItem>());

        _mockRepository
            .Setup(r => r.CountAsync(query, It.IsAny<CancellationToken>()))
            .ReturnsAsync(0);

        // Act
        var result = await _service.SearchAsync(query, page);

        // Assert
        Assert.NotNull(result);
        Assert.Empty(result.Items);
        Assert.Equal(0, result.TotalCount);
    }

    [Fact]
    public async Task GetByIdAsync_WithExistingId_ReturnsItem()
    {
        // Arrange
        var id = "test-id";
        var item = new SearchItem
        {
            Id = id,
            Title = "Test",
            Content = "Content",
            Link = "https://example.com"
        };

        _mockRepository
            .Setup(r => r.GetByIdAsync(id, It.IsAny<CancellationToken>()))
            .ReturnsAsync(item);

        // Act
        var result = await _service.GetByIdAsync(id);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(id, result.Id);
        Assert.Equal("Test", result.Title);
    }

    [Fact]
    public async Task GetByIdAsync_WithNonExistentId_ReturnsNull()
    {
        // Arrange
        var id = "nonexistent";

        _mockRepository
            .Setup(r => r.GetByIdAsync(id, It.IsAny<CancellationToken>()))
            .ReturnsAsync((SearchItem?)null);

        // Act
        var result = await _service.GetByIdAsync(id);

        // Assert
        Assert.Null(result);
    }

    [Fact]
    public async Task CreateAsync_WithValidDto_ReturnsCreatedItem()
    {
        // Arrange
        var dto = new SearchItemDto(
            "test-id",
            "Test Title",
            "Test Content",
            "https://example.com"
        );

        _mockRepository
            .Setup(r => r.CreateAsync(It.IsAny<SearchItem>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync((SearchItem item, CancellationToken _) => item);

        // Act
        var result = await _service.CreateAsync(dto);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(dto.Title, result.Title);
        Assert.Equal(dto.Content, result.Content);

        _mockRepository.Verify(
            r => r.CreateAsync(It.IsAny<SearchItem>(), It.IsAny<CancellationToken>()),
            Times.Once);
    }
}
