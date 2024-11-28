import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as twilio from 'twilio';

@Injectable()
export class MessagesService {
  constructor(private readonly configService: ConfigService) {}

  private async getTwilioClient(): Promise<twilio.Twilio> {
    const client = await this.getAccountSid();
    const authToken = await this.getAuthToken();
    return twilio(client, authToken);
  }

  private async getAccountSid(): Promise<string> {
    const accountSid = this.configService.get<string>('TWILIO_ACCOUNT_SID');
    return accountSid;
  }

  private async getAuthToken(): Promise<string> {
    const authToken = this.configService.get<string>('TWILIO_AUTH_TOKEN');
    return authToken;
  }

  private async getTwilioPhoneNumber(): Promise<string> {
    const twilioPhoneNumber = this.configService.get<string>('TWILIO_NUMBER');
    return twilioPhoneNumber;
  }

  private async getMyPhoneNumber(): Promise<string> {
    const myPhoneNumber = this.configService.get<string>('TWILIO_USER_NUMBER');
    return myPhoneNumber;
  }

  async testMessage(body: string): Promise<void> {
    const client = await this.getTwilioClient();

    const twilioPhoneNumber = await this.getTwilioPhoneNumber();

    const myPhoneNumber = await this.getMyPhoneNumber();

    const message = await client.messages.create({
      body: body,
      from: twilioPhoneNumber,
      to: myPhoneNumber,
    });
    console.log(message);
  }

  async testCall(): Promise<void> {
    const client = await this.getTwilioClient();

    const twilioPhoneNumber = await this.getTwilioPhoneNumber();

    const myPhoneNumber = await this.getMyPhoneNumber();

    const call = await client.calls.create({
      from: twilioPhoneNumber,
      to: myPhoneNumber,
      url: 'http://demo.twilio.com/docs/voice.xml',
    });
    console.log(call.sid);
  }
}
