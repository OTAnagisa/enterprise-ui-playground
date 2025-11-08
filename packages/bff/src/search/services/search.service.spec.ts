import { Test, TestingModule } from '@nestjs/testing';
import { SearchService } from './search.service';
import { BackendClient, BackendSearchResponse } from '../clients/backend.client';

describe('SearchService', () => {
  let service: SearchService;
  let backendClient: jest.Mocked<BackendClient>;

  beforeEach(async () => {
    const mockBackendClient = {
      search: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SearchService,
        {
          provide: BackendClient,
          useValue: mockBackendClient,
        },
      ],
    }).compile();

    service = module.get<SearchService>(SearchService);
    backendClient = module.get(BackendClient);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should transform backend response to BFF format', async () => {
    const backendResponse: BackendSearchResponse = {
      items: [
        {
          id: '1',
          title: 'Test Title',
          content: 'Test Content',
          link: 'https://example.com',
        },
      ],
      totalCount: 1,
      currentPage: 1,
    };

    backendClient.search.mockResolvedValue(backendResponse);

    const result = await service.search('test query', 1);

    expect(backendClient.search).toHaveBeenCalledWith('test query', 1);
    expect(result).toEqual({
      results: [
        {
          id: '1',
          title: 'Test Title',
          description: 'Test Content',
          url: 'https://example.com',
        },
      ],
      total: 1,
      page: 1,
    });
  });

  it('should handle multiple search results', async () => {
    const backendResponse: BackendSearchResponse = {
      items: [
        { id: '1', title: 'Title 1', content: 'Content 1', link: 'https://example1.com' },
        { id: '2', title: 'Title 2', content: 'Content 2', link: 'https://example2.com' },
      ],
      totalCount: 2,
      currentPage: 1,
    };

    backendClient.search.mockResolvedValue(backendResponse);

    const result = await service.search('test', 1);

    expect(result.results).toHaveLength(2);
    expect(result.total).toBe(2);
  });

  it('should propagate errors from backend client', async () => {
    backendClient.search.mockRejectedValue(new Error('Backend error'));

    await expect(service.search('test', 1)).rejects.toThrow('Backend error');
  });
});
