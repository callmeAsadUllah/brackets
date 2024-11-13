import { Injectable } from '@nestjs/common';
import { IResponse } from './interfaces/response.interface';

@Injectable()
export class AppService {
  async hello(): Promise<IResponse> {
    return {
      message: 'Hello, World! Library Management System by Muhammad Asad Ullah',
    };
  }
}
