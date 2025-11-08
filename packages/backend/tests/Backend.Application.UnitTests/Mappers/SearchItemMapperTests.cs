using Backend.Application.DTOs;
using Backend.Application.Mappers;
using Backend.Domain.Entities;
using Xunit;

namespace Backend.Application.UnitTests.Mappers;

public class SearchItemMapperTests
{
    private readonly SearchItemMapper _mapper;

    public SearchItemMapperTests()
    {
        _mapper = new SearchItemMapper();
    }

    [Fact]
    public void ToDto_MapsEntityToDto()
    {
        // Arrange
        var entity = new SearchItem
        {
            Id = "test-id",
            Title = "Test Title",
            Content = "Test Content",
            Link = "https://example.com",
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
            Tags = new[] { "tag1", "tag2" }
        };

        // Act
        var dto = _mapper.ToDto(entity);

        // Assert
        Assert.Equal(entity.Id, dto.Id);
        Assert.Equal(entity.Title, dto.Title);
        Assert.Equal(entity.Content, dto.Content);
        Assert.Equal(entity.Link, dto.Link);
    }

    [Fact]
    public void ToEntity_MapsDtoToEntity()
    {
        // Arrange
        var dto = new SearchItemDto(
            "test-id",
            "Test Title",
            "Test Content",
            "https://example.com"
        );

        // Act
        var entity = _mapper.ToEntity(dto);

        // Assert
        Assert.Equal(dto.Id, entity.Id);
        Assert.Equal(dto.Title, entity.Title);
        Assert.Equal(dto.Content, entity.Content);
        Assert.Equal(dto.Link, entity.Link);
    }

    [Fact]
    public void ToDtoList_MapsEntityListToDtoList()
    {
        // Arrange
        var entities = new List<SearchItem>
        {
            new()
            {
                Id = "1",
                Title = "Title 1",
                Content = "Content 1",
                Link = "https://example1.com"
            },
            new()
            {
                Id = "2",
                Title = "Title 2",
                Content = "Content 2",
                Link = "https://example2.com"
            }
        };

        // Act
        var dtos = _mapper.ToDtoList(entities).ToList();

        // Assert
        Assert.Equal(2, dtos.Count);
        Assert.Equal("Title 1", dtos[0].Title);
        Assert.Equal("Title 2", dtos[1].Title);
    }
}
