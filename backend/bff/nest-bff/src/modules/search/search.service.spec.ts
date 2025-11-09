import { Test, TestingModule } from '@nestjs/testing';
import { SearchService } from './search.service';

describe('SearchService', () => {
  let service: SearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SearchService],
    }).compile();

    service = module.get<SearchService>(SearchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('search', () => {
    it('should return search results with matching query', async () => {
      const query = 'nest';
      const result = await service.search(query);

      expect(result).toBeDefined();
      expect(result.query).toBe(query);
      expect(result.total).toBeGreaterThan(0);
      expect(result.results).toBeInstanceOf(Array);
      expect(result.timestamp).toBeDefined();
    });

    it('should filter results based on query', async () => {
      const query = 'TypeScript';
      const result = await service.search(query);

      expect(result.results.length).toBeGreaterThan(0);
      expect(
        result.results.some(
          (item) =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.description.toLowerCase().includes(query.toLowerCase()),
        ),
      ).toBe(true);
    });

    it('should limit results when limit is provided', async () => {
      const query = 'test';
      const limit = 2;
      const result = await service.search(query, limit);

      expect(result.results.length).toBeLessThanOrEqual(limit);
    });

    it('should return results with correct structure', async () => {
      const query = 'api';
      const result = await service.search(query);

      result.results.forEach((item) => {
        expect(item).toHaveProperty('id');
        expect(item).toHaveProperty('title');
        expect(item).toHaveProperty('description');
        expect(item).toHaveProperty('url');
        expect(item).toHaveProperty('score');
        expect(typeof item.score).toBe('number');
      });
    });

    it('should return empty results gracefully for no matches', async () => {
      const query = 'nonexistent-query-xyz';
      const result = await service.search(query);

      expect(result).toBeDefined();
      expect(result.query).toBe(query);
      expect(result.results).toBeInstanceOf(Array);
    });
  });
});
