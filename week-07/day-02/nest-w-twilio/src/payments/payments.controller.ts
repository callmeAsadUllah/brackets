import { Controller, Post, Body } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('intent')
  async createPaymentIntent(
    @Body() createPaymentIntentDto: { amount: number; currency: string },
  ) {
    const { amount, currency } = createPaymentIntentDto;
    const paymentIntent = await this.paymentsService.createPaymentIntent(
      amount,
      currency,
    );
    return {
      clientSecret: paymentIntent.client_secret,
    };
  }
}
