import { IsString, IsOptional, IsDate, IsEnum } from 'class-validator';
import { GenreEnum } from 'src/genres/genre.enum';

export class UpdateBookPartialDTO {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsDate()
  publishedDate?: Date;

  @IsOptional()
  @IsEnum(GenreEnum)
  genre?: GenreEnum;
}
