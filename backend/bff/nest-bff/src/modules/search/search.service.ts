import { Injectable, Logger } from '@nestjs/common';
import { SearchResponseDto, SearchResultItem } from './search.dto';

@Injectable()
export class SearchService {
  private readonly logger = new Logger(SearchService.name);

  // Mock data for search results
  private readonly mockResults: SearchResultItem[] = [
    {
      id: '1',
      title: 'NestJS Documentation',
      description: 'Official NestJS framework documentation',
      url: 'https://docs.nestjs.com',
      score: 0.95,
    },
    {
      id: '2',
      title: 'TypeScript Handbook',
      description: 'The official TypeScript documentation',
      url: 'https://www.typescriptlang.org/docs',
      score: 0.89,
    },
    {
      id: '3',
      title: 'REST API Best Practices',
      description: 'Guide to building robust REST APIs',
      url: 'https://restfulapi.net',
      score: 0.82,
    },
    {
      id: '4',
      title: 'Jest Testing Framework',
      description: 'Delightful JavaScript Testing',
      url: 'https://jestjs.io',
      score: 0.78,
    },
    {
      id: '5',
      title: 'Express.js Guide',
      description: 'Fast, unopinionated web framework for Node.js',
      url: 'https://expressjs.com',
      score: 0.71,
    },
  ];

  async search(query: string, limit?: number): Promise<SearchResponseDto> {
    this.logger.log(`Searching for: ${query}`);

    // Filter results based on query (simple mock filtering)
    const filteredResults = this.mockResults.filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()),
    );

    // Apply limit if provided
    const limitedResults = limit
      ? filteredResults.slice(0, limit)
      : filteredResults;

    // If no matches found, return all results (for demo purposes)
    const results =
      filteredResults.length > 0 ? limitedResults : this.mockResults.slice(0, limit || 5);

    return {
      query,
      total: results.length,
      results,
      timestamp: new Date().toISOString(),
    };
  }
}
