import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateBookDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsDate()
  publishedDate: Date;

  @IsNotEmpty()
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
  publishedDate?: Date;

  @IsOptional()
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
  publishedDate?: Date;

  @IsOptional()
  author?: Types.ObjectId;
}
