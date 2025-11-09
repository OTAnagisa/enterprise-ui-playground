import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('BFF API (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    
    // Apply same configuration as main.ts
    app.useGlobalPipes(new ValidationPipe({
      transform: true,
      whitelist: true,
    }));

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/api/search (GET)', () => {
    it('should return search results with valid query', () => {
      return request(app.getHttpServer())
        .get('/api/search?q=nest')
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('query', 'nest');
          expect(res.body).toHaveProperty('total');
          expect(res.body).toHaveProperty('results');
          expect(res.body).toHaveProperty('timestamp');
          expect(Array.isArray(res.body.results)).toBe(true);
        });
    });

    it('should return 400 when query parameter is missing', () => {
      return request(app.getHttpServer())
        .get('/api/search')
        .expect(400);
    });

    it('should handle limit parameter', () => {
      return request(app.getHttpServer())
        .get('/api/search?q=test&limit=2')
        .expect(200)
        .expect((res) => {
          expect(res.body.results.length).toBeLessThanOrEqual(2);
        });
    });

    it('should return results with correct structure', () => {
      return request(app.getHttpServer())
        .get('/api/search?q=api')
        .expect(200)
        .expect((res) => {
          const { results } = res.body;
          if (results.length > 0) {
            results.forEach((item: any) => {
              expect(item).toHaveProperty('id');
              expect(item).toHaveProperty('title');
              expect(item).toHaveProperty('description');
              expect(item).toHaveProperty('url');
              expect(item).toHaveProperty('score');
            });
          }
        });
    });
  });
});
