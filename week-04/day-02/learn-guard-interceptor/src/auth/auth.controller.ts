import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  async authView(): Promise<object> {
    return this.authService.authView();
  }

  //   @Post('register')
  //   async register(@Body() registerAuthDto: RegisterAuthDto) {
  //     return this.authService.register(registerAuthDto);
  //   }
  //
  //   @Post('login')
  //   async login(@Body() loginAuthDto: LoginAuthDto) {
  //     return this.authService.login(loginAuthDto);
  //   }
}
