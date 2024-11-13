import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { IResponse } from './interfaces/response.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  async hello(): Promise<IResponse> {
    return this.appService.hello();
  }
}
