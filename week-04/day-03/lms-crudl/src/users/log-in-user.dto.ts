import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LogInUserDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
