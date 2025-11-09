import { Controller, Get, Query, Logger } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchQueryDto, SearchResponseDto } from './search.dto';

@Controller('api')
export class SearchController {
  private readonly logger = new Logger(SearchController.name);

  constructor(private readonly searchService: SearchService) {}

  @Get('search')
  async search(@Query() query: SearchQueryDto): Promise<SearchResponseDto> {
    this.logger.log(`Search request received: ${query.q}`);
    
    const limit = query.limit ? parseInt(query.limit, 10) : undefined;
    return this.searchService.search(query.q, limit);
  }
}
