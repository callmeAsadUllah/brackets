import {
  Res,
  Body,
  Get,
  Controller,
  Post,
  UsePipes,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDTO } from 'src/users/register-user.dto';
import { HashPasswordPipe } from 'src/pipes/hash-password/hash-password.pipe';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
// import { RefreshTokenPipe } from 'src/refresh-token/refresh-token.pipe';
import { LogInUserDTO } from 'src/users/log-in-user.dto';
import { User } from 'src/users/user.schema';
import { RefreshTokenPipe } from 'src/pipes/refresh-token/refresh-token.pipe';

// interface LoggedUser {
//   user: {
//     username: string;
//     firstName: string;
//     lastName: string;
//     email: string;
//   };
//   accessToken: string;
//   refreshToken: string;
// }
//
// interface RefreshedToken {
//   accessToken: string;
//   refreshToken: string;
// }

@Controller('auth')
export class AuthController {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {}
  @Post('register')
  @UsePipes(HashPasswordPipe)
  async registerUser(@Body() registerUserDTO: RegisterUserDTO): Promise<User> {
    const user = await this.authService.registerUser(registerUserDTO);
    return user;
  }

  //   @Post('log-in')
  //   async logInUser(
  //     @Body() logInUserDTO: LogInUserDTO,
  //     @Res({ passthrough: true }) response: Response,
  //   ): Promise<IUserLogInResponse> {
  //     const loggedUser = await this.authService.logInUser(logInUserDTO);
  //
  //     const options = {
  //       httpOnly: true,
  //       secure: true,
  //     };
  //
  //     response.cookie(
  //       'accessToken',
  //       (loggedUser as LoggedUser).accessToken,
  //       options,
  //     );
  //     response.cookie(
  //       'refreshToken',
  //       (loggedUser as LoggedUser).refreshToken,
  //       options,
  //     );
  //
  //     return {
  //       user: (loggedUser as LoggedUser).user,
  //       accessToken: (loggedUser as LoggedUser).accessToken,
  //       refreshToken: (loggedUser as LoggedUser).refreshToken,
  //     };
  // }

  @Post('log-in')
  async logInUser(
    @Body() logInUserDTO: LogInUserDTO,
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ user: User; accessToken: string; refreshToken: string }> {
    try {
      const loggedInUser = await this.authService.logInUser(logInUserDTO);

      const cookieOptions = {
        httpOnly: true,
      };

      response.cookie('accessToken', loggedInUser.accessToken, cookieOptions);
      response.cookie('refreshToken', loggedInUser.refreshToken, cookieOptions);

      return {
        user: loggedInUser.user,
        accessToken: loggedInUser.accessToken,
        refreshToken: loggedInUser.refreshToken,
      };
    } catch {
      response.status(HttpStatus.UNAUTHORIZED).json({
        message: 'Invalid credentials or login error',
      });
    }
  }

  @Get('refresh-token')
  @UsePipes(RefreshTokenPipe)
  public async refreshToken(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const refreshTokenFromCookie = request.cookies['refreshToken'];

    const refreshedToken = await this.authService.refreshToken(
      refreshTokenFromCookie,
    );

    const Options = {
      httpOnly: true,
      secure: true,
    };

    response.cookie('accessToken', refreshedToken.accessToken, Options);
    response.cookie('refreshToken', refreshedToken.refreshToken, Options);

    return {
      accessToken: refreshedToken.accessToken,
      refreshToken: refreshedToken.refreshToken,
    };
  }

  @Post('log-out')
  async logout(
    @Body() { userId }: { userId: string },
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ user: User }> {
    const responseFromAuthService = await this.authService.logOutUser(userId);

    const cookieOptions = {
      httpOnly: true,
      secure: true,
    };

    if (responseFromAuthService) {
      {
        response.clearCookie('accessToken', cookieOptions);
        response.clearCookie('refreshToken', cookieOptions);
      }
      return responseFromAuthService;
    }
  }
}
