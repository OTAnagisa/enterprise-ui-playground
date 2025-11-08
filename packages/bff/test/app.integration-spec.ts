import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { BackendClient } from '../src/search/clients/backend.client';

describe('BFF Integration Tests', () => {
  let app: INestApplication;
  let backendClient: BackendClient;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(BackendClient)
      .useValue({
        search: jest.fn(),
      })
      .compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    app.setGlobalPrefix('api');

    backendClient = moduleFixture.get<BackendClient>(BackendClient);

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /api/health', () => {
    it('should return health status', () => {
      return request(app.getHttpServer())
        .get('/api/health')
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('status', 'ok');
          expect(res.body).toHaveProperty('timestamp');
        });
    });
  });

  describe('GET /api/search', () => {
    it('should return search results', () => {
      const mockResponse = {
        items: [
          {
            id: '1',
            title: 'Test Result',
            content: 'Test content',
            link: 'https://example.com',
          },
        ],
        totalCount: 1,
        currentPage: 1,
      };

      jest.spyOn(backendClient, 'search').mockResolvedValue(mockResponse);

      return request(app.getHttpServer())
        .get('/api/search?q=test')
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('results');
          expect(res.body).toHaveProperty('total', 1);
          expect(res.body).toHaveProperty('page', 1);
          expect(res.body.results).toHaveLength(1);
          expect(res.body.results[0]).toEqual({
            id: '1',
            title: 'Test Result',
            description: 'Test content',
            url: 'https://example.com',
          });
        });
    });

    it('should validate query parameter', () => {
      return request(app.getHttpServer()).get('/api/search').expect(400);
    });

    it('should validate page parameter type', () => {
      return request(app.getHttpServer()).get('/api/search?q=test&page=invalid').expect(400);
    });

    it('should accept valid page parameter', () => {
      jest.spyOn(backendClient, 'search').mockResolvedValue({
        items: [],
        totalCount: 0,
        currentPage: 2,
      });

      return request(app.getHttpServer())
        .get('/api/search?q=test&page=2')
        .expect(200)
        .expect((res) => {
          expect(res.body.page).toBe(2);
        });
    });
  });
});
