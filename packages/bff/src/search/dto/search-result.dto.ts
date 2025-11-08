export class SearchResultDto {
  id: string;
  title: string;
  description: string;
  url: string;
}

export class SearchResponseDto {
  results: SearchResultDto[];
  total: number;
  page: number;
}
