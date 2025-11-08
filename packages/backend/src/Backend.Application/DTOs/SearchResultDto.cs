namespace Backend.Application.DTOs;

public record SearchResultDto(
    IEnumerable<SearchItemDto> Items,
    int TotalCount,
    int CurrentPage
);
