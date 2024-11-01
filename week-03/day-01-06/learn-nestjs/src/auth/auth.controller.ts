import { Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(): Promise<object> {
    return await this.authService.register();
  }

  @Post('log-in')
  async logIn(): Promise<object> {
    return await this.authService.logIn();
  }
}
