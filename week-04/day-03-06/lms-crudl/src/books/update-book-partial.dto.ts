import {
  IsString,
  IsOptional,
  IsDate,
  IsEnum,
  IsArray,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';
import { Types } from 'mongoose';
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
