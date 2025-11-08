using Backend.Application.DTOs;
using Backend.Application.Mappers;
using Backend.Domain.Repositories;

namespace Backend.Application.Services;

public class SearchService : ISearchService
{
    private readonly ISearchRepository _repository;
    private readonly SearchItemMapper _mapper;
    private const int PageSize = 10;

    public SearchService(ISearchRepository repository, SearchItemMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    public async Task<SearchResultDto> SearchAsync(string query, int page, CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(query))
        {
            throw new ArgumentException("Query cannot be empty", nameof(query));
        }

        if (page < 1)
        {
            throw new ArgumentException("Page must be greater than 0", nameof(page));
        }

        var items = await _repository.SearchAsync(query, page, PageSize, cancellationToken);
        var totalCount = await _repository.CountAsync(query, cancellationToken);

        var itemDtos = _mapper.ToDtoList(items);

        return new SearchResultDto(itemDtos, totalCount, page);
    }

    public async Task<SearchItemDto?> GetByIdAsync(string id, CancellationToken cancellationToken = default)
    {
        var item = await _repository.GetByIdAsync(id, cancellationToken);
        return item != null ? _mapper.ToDto(item) : null;
    }

    public async Task<SearchItemDto> CreateAsync(SearchItemDto itemDto, CancellationToken cancellationToken = default)
    {
        var entity = _mapper.ToEntity(itemDto);
        var created = await _repository.CreateAsync(entity, cancellationToken);
        return _mapper.ToDto(created);
    }
}
