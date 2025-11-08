import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { BackendClient } from './backend.client';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('BackendClient', () => {
  let client: BackendClient;
  let configService: ConfigService;

  const mockAxiosInstance = {
    get: jest.fn(),
  };

  beforeEach(async () => {
    mockedAxios.create.mockReturnValue(mockAxiosInstance as any);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BackendClient,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string, defaultValue: string) => defaultValue),
          },
        },
      ],
    }).compile();

    client = module.get<BackendClient>(BackendClient);
    configService = module.get<ConfigService>(ConfigService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(client).toBeDefined();
  });

  it('should search backend successfully', async () => {
    const mockResponse = {
      data: {
        items: [
          {
            id: '1',
            title: 'Test',
            content: 'Content',
            link: 'https://example.com',
          },
        ],
        totalCount: 1,
        currentPage: 1,
      },
    };

    mockAxiosInstance.get.mockResolvedValue(mockResponse);

    const result = await client.search('test query', 1);

    expect(mockAxiosInstance.get).toHaveBeenCalledWith('/api/search', {
      params: { query: 'test query', page: 1 },
    });
    expect(result).toEqual(mockResponse.data);
  });

  it('should throw error when backend fails', async () => {
    mockAxiosInstance.get.mockRejectedValue(new Error('Network error'));

    await expect(client.search('test', 1)).rejects.toThrow('Failed to search backend');
  });

  it('should use configured backend URL', () => {
    expect(configService.get).toHaveBeenCalledWith('BACKEND_URL', 'http://localhost:5000');
  });
});
