import { Body, Controller, Post } from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post('message')
  async testMessage(@Body('body') body: string): Promise<void> {
    await this.messagesService.testMessage(body);
  }

  @Post('call')
  async testCall(): Promise<void> {
    await this.messagesService.testCall();
  }
}
