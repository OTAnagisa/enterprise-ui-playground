using Backend.Application.DTOs;

namespace Backend.Application.Services;

public interface ISearchService
{
    Task<SearchResultDto> SearchAsync(string query, int page, CancellationToken cancellationToken = default);
    Task<SearchItemDto?> GetByIdAsync(string id, CancellationToken cancellationToken = default);
    Task<SearchItemDto> CreateAsync(SearchItemDto item, CancellationToken cancellationToken = default);
}
