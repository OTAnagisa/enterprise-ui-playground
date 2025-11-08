using Backend.Domain.Entities;

namespace Backend.Domain.Repositories;

public interface ISearchRepository
{
    Task<IEnumerable<SearchItem>> SearchAsync(string query, int page, int pageSize, CancellationToken cancellationToken = default);
    Task<int> CountAsync(string query, CancellationToken cancellationToken = default);
    Task<SearchItem?> GetByIdAsync(string id, CancellationToken cancellationToken = default);
    Task<SearchItem> CreateAsync(SearchItem item, CancellationToken cancellationToken = default);
    Task<SearchItem> UpdateAsync(SearchItem item, CancellationToken cancellationToken = default);
    Task DeleteAsync(string id, CancellationToken cancellationToken = default);
}
