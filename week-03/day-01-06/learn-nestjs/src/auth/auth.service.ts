import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor() {}
  async register(): Promise<object> {
    return { message: 'User registered successfully' };
  }

  async logIn(): Promise<object> {
    return { message: 'User logged in successfully' };
  }

  async logOut(): Promise<object> {
    return { message: 'User logged out successfully' };
  }
}
