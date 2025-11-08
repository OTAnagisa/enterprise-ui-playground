import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';

export interface BackendSearchResult {
  id: string;
  title: string;
  content: string;
  link: string;
}

export interface BackendSearchResponse {
  items: BackendSearchResult[];
  totalCount: number;
  currentPage: number;
}

@Injectable()
export class BackendClient {
  private readonly logger = new Logger(BackendClient.name);
  private readonly httpClient: AxiosInstance;
  private readonly baseUrl: string;

  constructor(private configService: ConfigService) {
    this.baseUrl = this.configService.get<string>('BACKEND_URL', 'http://localhost:5000');
    this.httpClient = axios.create({
      baseURL: this.baseUrl,
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async search(query: string, page: number): Promise<BackendSearchResponse> {
    try {
      this.logger.log(`Searching backend for query: ${query}, page: ${page}`);

      const response = await this.httpClient.get<BackendSearchResponse>('/api/search', {
        params: { query, page },
      });

      return response.data;
    } catch (error) {
      this.logger.error(`Backend search failed: ${error.message}`);
      throw new Error(`Failed to search backend: ${error.message}`);
    }
  }
}
