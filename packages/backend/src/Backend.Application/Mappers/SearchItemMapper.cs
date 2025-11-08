using Backend.Application.DTOs;
using Backend.Domain.Entities;
using Riok.Mapperly.Abstractions;

namespace Backend.Application.Mappers;

[Mapper]
public partial class SearchItemMapper
{
    public partial SearchItemDto ToDto(SearchItem entity);
    public partial SearchItem ToEntity(SearchItemDto dto);
    public partial IEnumerable<SearchItemDto> ToDtoList(IEnumerable<SearchItem> entities);
}
