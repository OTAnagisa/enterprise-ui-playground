import { Injectable, Logger } from '@nestjs/common';
import { BackendClient } from '../clients/backend.client';
import { SearchResponseDto, SearchResultDto } from '../dto/search-result.dto';

@Injectable()
export class SearchService {
  private readonly logger = new Logger(SearchService.name);

  constructor(private readonly backendClient: BackendClient) {}

  async search(query: string, page: number): Promise<SearchResponseDto> {
    this.logger.log(`Processing search request: query="${query}", page=${page}`);

    try {
      const backendResponse = await this.backendClient.search(query, page);

      // Transform backend response to BFF response format
      const results: SearchResultDto[] = backendResponse.items.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.content,
        url: item.link,
      }));

      return {
        results,
        total: backendResponse.totalCount,
        page: backendResponse.currentPage,
      };
    } catch (error) {
      this.logger.error(`Search failed: ${error.message}`);
      throw error;
    }
  }
}
