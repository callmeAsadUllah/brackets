import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateAuthorDTO {
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dob?: Date;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsArray()
  @IsMongoId()
  books?: Types.ObjectId[];
}

export class UpdateAuthorDTO {
  @IsOptional()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsDate()
  dob?: Date;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsArray()
  @IsMongoId()
  books?: Types.ObjectId[];
}

export class UpdateAuthorPartialDTO {
  @IsOptional()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsDate()
  dob?: Date;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsArray()
  @IsMongoId()
  books?: Types.ObjectId[];
}
