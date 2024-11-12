import {
  Body,
  Controller,
  Post,
  UsePipes,
  Res,
  Req,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/users/user.schema';
import { RegisterUserDTO } from 'src/users/register-user.dto';
import { HashPasswordPipe } from 'src/hash-password/hash-password.pipe';
import { LogInUserDTO } from 'src/users/log-in-user.dto';
import { Response, Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { RefreshTokenPipe } from 'src/refresh-token/refresh-token.pipe';

interface LoggedUser {
  user: {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  accessToken: string;
  refreshToken: string;
}

interface RefreshedToken {
  accessToken: string;
  refreshToken: string;
}

@Controller('auth')
export class AuthController {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {}
  @Post('register')
  @UsePipes(HashPasswordPipe)
  async registerUser(@Body() registerUserDTO: RegisterUserDTO): Promise<User> {
    return this.authService.registerUser(registerUserDTO);
  }

  @Post('log-in')
  async logInUser(
    @Body() logInUserDTO: LogInUserDTO,
    @Res({ passthrough: true }) response: Response,
  ): Promise<LoggedUser> {
    const loggedUser = await this.authService.logInUser(logInUserDTO);

    const options = {
      httpOnly: true,
      secure: true,
    };

    response.cookie(
      'accessToken',
      (loggedUser as LoggedUser).accessToken,
      options,
    );
    response.cookie(
      'refreshToken',
      (loggedUser as LoggedUser).refreshToken,
      options,
    );

    return {
      user: (loggedUser as LoggedUser).user,
      accessToken: (loggedUser as LoggedUser).accessToken,
      refreshToken: (loggedUser as LoggedUser).refreshToken,
    };
  }

  @Get('refresh-token')
  @UsePipes(RefreshTokenPipe)
  public async refreshToken(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<RefreshedToken> {
    const refreshToken = request.cookies['refreshToken'];

    const refreshedToken = await this.authService.refreshToken(refreshToken);

    const Options = {
      httpOnly: true,
      secure: true,
    };
    response.cookie(
      'accessToken',
      (refreshedToken as RefreshedToken).accessToken,
      Options,
    );
    response.cookie(
      'refreshToken',
      (refreshedToken as RefreshedToken).refreshToken,
      Options,
    );

    return {
      accessToken: (refreshedToken as RefreshedToken).accessToken,
      refreshToken: (refreshedToken as RefreshedToken).refreshToken,
    };
  }
  @Post('log-out')
  async logout(
    @Body() userId: string,
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ message: string }> {
    await this.authService.logOutUser(userId);

    const cookieOptions = {
      httpOnly: true,
      secure: true,
    };
    response.clearCookie('accessToken', cookieOptions);
    response.clearCookie('refreshToken', cookieOptions);

    return { message: 'Logged out successfully' };
  }
}
