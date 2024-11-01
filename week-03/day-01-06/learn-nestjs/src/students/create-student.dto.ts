import { IsString, IsEmail, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateStudentDTO {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
