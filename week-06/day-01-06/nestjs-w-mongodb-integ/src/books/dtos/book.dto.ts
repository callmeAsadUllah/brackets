import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsDate,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';
import { Genres } from 'src/common/enums/genre.enum';

export class CreateBookDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  publishedDate?: Date;

  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsEnum(Genres, { each: true })
  genres: Genres[];

  @IsNotEmpty()
  @IsMongoId()
  author: Types.ObjectId;
}

export class UpdateBookDTO {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  publishedDate?: Date;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsEnum(Genres, { each: true })
  genres?: Genres[];

  @IsOptional()
  @IsMongoId()
  author?: Types.ObjectId;
}

export class UpdateBookPartialDTO {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  publishedDate?: Date;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsEnum(Genres, { each: true })
  genres?: Genres[];

  @IsOptional()
  @IsMongoId()
  author: Types.ObjectId;
}
