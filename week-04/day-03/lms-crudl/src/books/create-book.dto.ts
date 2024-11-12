import {
  IsString,
  IsOptional,
  IsDate,
  IsEnum,
  IsNotEmpty,
} from 'class-validator';
import { GenreEnum } from 'src/genres/genre.enum';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsString()
  author: string;

  @IsOptional()
  @IsDate()
  publishedDate?: Date;

  @IsNotEmpty()
  @IsEnum(GenreEnum)
  genre: GenreEnum;
}
