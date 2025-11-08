namespace Backend.Application.DTOs;

public record SearchItemDto(
    string Id,
    string Title,
    string Content,
    string Link
);
