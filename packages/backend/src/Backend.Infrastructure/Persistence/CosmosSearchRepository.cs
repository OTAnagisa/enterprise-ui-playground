using Backend.Domain.Entities;
using Backend.Domain.Repositories;
using Microsoft.Azure.Cosmos;
using Microsoft.Azure.Cosmos.Linq;

namespace Backend.Infrastructure.Persistence;

public class CosmosSearchRepository : ISearchRepository
{
    private readonly Container _container;

    public CosmosSearchRepository(Container container)
    {
        _container = container;
    }

    public async Task<IEnumerable<SearchItem>> SearchAsync(
        string query,
        int page,
        int pageSize,
        CancellationToken cancellationToken = default)
    {
        var skip = (page - 1) * pageSize;

        var queryable = _container.GetItemLinqQueryable<SearchItem>()
            .Where(item =>
                item.Title.Contains(query) ||
                item.Content.Contains(query))
            .Skip(skip)
            .Take(pageSize);

        var iterator = queryable.ToFeedIterator();
        var results = new List<SearchItem>();

        while (iterator.HasMoreResults)
        {
            var response = await iterator.ReadNextAsync(cancellationToken);
            results.AddRange(response);
        }

        return results;
    }

    public async Task<int> CountAsync(string query, CancellationToken cancellationToken = default)
    {
        var queryable = _container.GetItemLinqQueryable<SearchItem>()
            .Where(item =>
                item.Title.Contains(query) ||
                item.Content.Contains(query))
            .Count();

        var iterator = queryable.ToFeedIterator();
        var count = 0;

        while (iterator.HasMoreResults)
        {
            var response = await iterator.ReadNextAsync(cancellationToken);
            count += response.FirstOrDefault();
        }

        return count;
    }

    public async Task<SearchItem?> GetByIdAsync(string id, CancellationToken cancellationToken = default)
    {
        try
        {
            var response = await _container.ReadItemAsync<SearchItem>(
                id,
                new PartitionKey(id),
                cancellationToken: cancellationToken);

            return response.Resource;
        }
        catch (CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
        {
            return null;
        }
    }

    public async Task<SearchItem> CreateAsync(SearchItem item, CancellationToken cancellationToken = default)
    {
        item.CreatedAt = DateTime.UtcNow;
        item.UpdatedAt = DateTime.UtcNow;

        var response = await _container.CreateItemAsync(
            item,
            new PartitionKey(item.Id),
            cancellationToken: cancellationToken);

        return response.Resource;
    }

    public async Task<SearchItem> UpdateAsync(SearchItem item, CancellationToken cancellationToken = default)
    {
        item.UpdatedAt = DateTime.UtcNow;

        var response = await _container.ReplaceItemAsync(
            item,
            item.Id,
            new PartitionKey(item.Id),
            cancellationToken: cancellationToken);

        return response.Resource;
    }

    public async Task DeleteAsync(string id, CancellationToken cancellationToken = default)
    {
        await _container.DeleteItemAsync<SearchItem>(
            id,
            new PartitionKey(id),
            cancellationToken: cancellationToken);
    }
}
