import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async hello(): Promise<object> {
    return {
      message: 'Hello World!',
    };
  }
}
