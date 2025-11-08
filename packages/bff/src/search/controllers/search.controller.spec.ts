import { Test, TestingModule } from '@nestjs/testing';
import { SearchController } from './search.controller';
import { SearchService } from '../services/search.service';
import { SearchResponseDto } from '../dto/search-result.dto';

describe('SearchController', () => {
  let controller: SearchController;
  let searchService: jest.Mocked<SearchService>;

  beforeEach(async () => {
    const mockSearchService = {
      search: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [SearchController],
      providers: [
        {
          provide: SearchService,
          useValue: mockSearchService,
        },
      ],
    }).compile();

    controller = module.get<SearchController>(SearchController);
    searchService = module.get(SearchService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call search service with query parameters', async () => {
    const mockResponse: SearchResponseDto = {
      results: [
        {
          id: '1',
          title: 'Test',
          description: 'Description',
          url: 'https://example.com',
        },
      ],
      total: 1,
      page: 1,
    };

    searchService.search.mockResolvedValue(mockResponse);

    const result = await controller.search({ q: 'test query', page: 1 });

    expect(searchService.search).toHaveBeenCalledWith('test query', 1);
    expect(result).toEqual(mockResponse);
  });

  it('should use default page 1 when page is not provided', async () => {
    const mockResponse: SearchResponseDto = {
      results: [],
      total: 0,
      page: 1,
    };

    searchService.search.mockResolvedValue(mockResponse);

    await controller.search({ q: 'test' });

    expect(searchService.search).toHaveBeenCalledWith('test', 1);
  });

  it('should handle errors from search service', async () => {
    searchService.search.mockRejectedValue(new Error('Service error'));

    await expect(controller.search({ q: 'test', page: 1 })).rejects.toThrow('Service error');
  });
});
