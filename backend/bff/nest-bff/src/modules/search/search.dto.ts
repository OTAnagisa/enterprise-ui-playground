import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class SearchQueryDto {
  @IsString()
  @IsNotEmpty()
  q: string;

  @IsOptional()
  @IsString()
  limit?: string;
}

export class SearchResultItem {
  id: string;
  title: string;
  description: string;
  url: string;
  score: number;
}

export class SearchResponseDto {
  query: string;
  total: number;
  results: SearchResultItem[];
  timestamp: string;
}
