import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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

  @IsNotEmpty()
  @IsDate()
  publishedDate: Date;
}

export class UpdateBookDTO {
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
}

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
}
