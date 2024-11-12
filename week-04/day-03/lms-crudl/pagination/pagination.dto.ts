import { IsInt, IsOptional, Min, Max } from 'class-validator';
import { Transform } from 'class-transformer';

export class PaginationDTO {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => parseInt(value, 10))
  page: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  @Transform(({ value }) => parseInt(value, 10))
  limit: number = 10;
}
