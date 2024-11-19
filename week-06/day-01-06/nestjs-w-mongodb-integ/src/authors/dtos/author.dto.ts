import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAuthorDTO {
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsDate()
  dob: Date;

  @IsOptional()
  @IsString()
  bio?: string;
}
