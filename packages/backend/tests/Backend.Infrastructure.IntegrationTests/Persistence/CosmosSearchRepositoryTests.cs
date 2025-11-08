using Backend.Domain.Entities;
using Backend.Infrastructure.Persistence;
using Microsoft.Azure.Cosmos;
using Xunit;

namespace Backend.Infrastructure.IntegrationTests.Persistence;

/// <summary>
/// Integration tests for CosmosSearchRepository using CosmosDB Emulator
/// Note: These tests require CosmosDB Emulator or TestContainers to be running
/// For CI/CD, you can use the official CosmosDB TestContainer
/// </summary>
public class CosmosSearchRepositoryTests : IAsyncLifetime
{
    private const string ConnectionString = "AccountEndpoint=https://localhost:8081/;AccountKey=C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==";
    private const string DatabaseName = "TestSearchDatabase";
    private const string ContainerName = "TestSearchItems";

    private CosmosClient? _client;
    private Database? _database;
    private Container? _container;
    private CosmosSearchRepository? _repository;

    public async Task InitializeAsync()
    {
        try
        {
            _client = new CosmosClient(ConnectionString, new CosmosClientOptions
            {
                HttpClientFactory = () => new HttpClient(new HttpClientHandler
                {
                    ServerCertificateCustomValidationCallback = (_, _, _, _) => true
                }),
                ConnectionMode = ConnectionMode.Gateway,
                RequestTimeout = TimeSpan.FromSeconds(10)
            });

            _database = await _client.CreateDatabaseIfNotExistsAsync(DatabaseName);
            _container = await _database.CreateContainerIfNotExistsAsync(
                ContainerName,
                "/id"
            );

            _repository = new CosmosSearchRepository(_container);
        }
        catch (Exception ex)
        {
            // If CosmosDB Emulator is not available, skip tests
            throw new SkipException($"CosmosDB Emulator not available: {ex.Message}");
        }
    }

    public async Task DisposeAsync()
    {
        if (_database != null)
        {
            await _database.DeleteAsync();
        }

        _client?.Dispose();
    }

    [Fact]
    public async Task CreateAsync_CreatesItemSuccessfully()
    {
        // Arrange
        var item = new SearchItem
        {
            Id = Guid.NewGuid().ToString(),
            Title = "Test Item",
            Content = "Test Content",
            Link = "https://example.com"
        };

        // Act
        var result = await _repository!.CreateAsync(item);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(item.Id, result.Id);
        Assert.Equal(item.Title, result.Title);
        Assert.True(result.CreatedAt > DateTime.MinValue);
    }

    [Fact]
    public async Task GetByIdAsync_ReturnsExistingItem()
    {
        // Arrange
        var item = new SearchItem
        {
            Id = Guid.NewGuid().ToString(),
            Title = "Test Item",
            Content = "Test Content",
            Link = "https://example.com"
        };
        await _repository!.CreateAsync(item);

        // Act
        var result = await _repository.GetByIdAsync(item.Id);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(item.Id, result.Id);
        Assert.Equal(item.Title, result.Title);
    }

    [Fact]
    public async Task GetByIdAsync_ReturnsNullForNonExistentItem()
    {
        // Act
        var result = await _repository!.GetByIdAsync("nonexistent-id");

        // Assert
        Assert.Null(result);
    }

    [Fact]
    public async Task SearchAsync_FindsMatchingItems()
    {
        // Arrange
        var item1 = new SearchItem
        {
            Id = Guid.NewGuid().ToString(),
            Title = "Searchable Title",
            Content = "Content",
            Link = "https://example1.com"
        };
        var item2 = new SearchItem
        {
            Id = Guid.NewGuid().ToString(),
            Title = "Another Title",
            Content = "Searchable Content",
            Link = "https://example2.com"
        };
        await _repository!.CreateAsync(item1);
        await _repository.CreateAsync(item2);

        // Act
        var results = await _repository.SearchAsync("Searchable", 1, 10);

        // Assert
        Assert.NotEmpty(results);
        Assert.Contains(results, r => r.Id == item1.Id);
        Assert.Contains(results, r => r.Id == item2.Id);
    }
}

public class SkipException : Exception
{
    public SkipException(string message) : base(message) { }
}
