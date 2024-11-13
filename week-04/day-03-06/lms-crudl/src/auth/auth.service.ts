import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { RegisterUserDTO } from '../users/register-user.dto';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';
import { IUserResponse } from 'src/interfaces/response.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) {}

  async getAccessToken(): Promise<string> {
    const token = this.configService.get<string>('ACCESS_TOKEN');
    return token;
  }

  async getAccessTokenExpiry(): Promise<string> {
    const expiry = this.configService.get<string>('ACCESS_TOKEN_EXPIRY');
    return expiry;
  }

  async getRefreshToken(): Promise<string> {
    const token = this.configService.get<string>('REFRESH_TOKEN');
    return token;
  }

  async getRefreshTokenExpiry(): Promise<string> {
    const expiry = this.configService.get<string>('REFRESH_TOKEN_EXPIRY');
    return expiry;
  }

  // async registerUser(registerUserDTO: RegisterUserDTO): Promise<IUserResponse> {
  //   const user = await this.usersService.registerUser(registerUserDTO);
  //   return user;
  // }

  //   async logInUser(logInUserDTO: LogInUserDTO): Promise<object> {
  //     const user = await this.usersService.logInUser(logInUserDTO);
  //     return user;
  //   }
  //
  //   async refreshToken(refreshToken: string): Promise<object> {
  //     const user = await this.usersService.refreshToken(refreshToken);
  //     return user;
  //   }
  //
  //   async logOutUser(userId: string): Promise<object> {
  //     const user = await this.usersService.logOutUser(userId);
  //     return user;
  //   }
}
