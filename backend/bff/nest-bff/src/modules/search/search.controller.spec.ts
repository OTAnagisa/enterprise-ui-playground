import { Test, TestingModule } from '@nestjs/testing';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { SearchResponseDto } from './search.dto';

describe('SearchController', () => {
  let controller: SearchController;
  let service: SearchService;

  // Mock search service
  const mockSearchService = {
    search: jest.fn(),
  };

  beforeEach(async () => {
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
    service = module.get<SearchService>(SearchService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('search', () => {
    it('should call searchService.search with correct parameters', async () => {
      const query = { q: 'nestjs' };
      const mockResponse: SearchResponseDto = {
        query: 'nestjs',
        total: 2,
        results: [
          {
            id: '1',
            title: 'NestJS Documentation',
            description: 'Official NestJS framework documentation',
            url: 'https://docs.nestjs.com',
            score: 0.95,
          },
        ],
        timestamp: new Date().toISOString(),
      };

      mockSearchService.search.mockResolvedValue(mockResponse);

      const result = await controller.search(query);

      expect(service.search).toHaveBeenCalledWith('nestjs', undefined);
      expect(result).toEqual(mockResponse);
      expect(result.query).toBe('nestjs');
    });

    it('should handle limit parameter correctly', async () => {
      const query = { q: 'api', limit: '3' };
      const mockResponse: SearchResponseDto = {
        query: 'api',
        total: 3,
        results: [],
        timestamp: new Date().toISOString(),
      };

      mockSearchService.search.mockResolvedValue(mockResponse);

      await controller.search(query);

      expect(service.search).toHaveBeenCalledWith('api', 3);
    });

    it('should return search results', async () => {
      const query = { q: 'test' };
      const mockResponse: SearchResponseDto = {
        query: 'test',
        total: 1,
        results: [
          {
            id: '4',
            title: 'Jest Testing Framework',
            description: 'Delightful JavaScript Testing',
            url: 'https://jestjs.io',
            score: 0.78,
          },
        ],
        timestamp: new Date().toISOString(),
      };

      mockSearchService.search.mockResolvedValue(mockResponse);

      const result = await controller.search(query);

      expect(result).toBeDefined();
      expect(result.results).toHaveLength(1);
      expect(result.total).toBe(1);
    });
  });
});
