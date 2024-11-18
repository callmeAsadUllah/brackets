import {
  IsString,
  IsOptional,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsPositive,
  IsArray,
} from 'class-validator';
import { Types } from 'mongoose';
import { GenreEnum } from 'src/genres/genre.enum';

export class CreateBookDTO {
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
  @IsPositive()
  numberOfAvailableCopies: number;

  @IsNotEmpty()
  @IsEnum(GenreEnum)
  genre: GenreEnum;

  @IsOptional()
  @IsArray()
  borrowedBy?: Types.ObjectId[];
}
