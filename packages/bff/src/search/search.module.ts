import { Module } from '@nestjs/common';
import { SearchController } from './controllers/search.controller';
import { SearchService } from './services/search.service';
import { BackendClient } from './clients/backend.client';

@Module({
  controllers: [SearchController],
  providers: [SearchService, BackendClient],
})
export class SearchModule {}
