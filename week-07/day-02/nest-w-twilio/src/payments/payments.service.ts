import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  private stripe: Stripe;

  constructor(private readonly configService: ConfigService) {
    const secretKey = this.configService.get<string>('STRIPE_SECRET_KEY');
    this.stripe = new Stripe(secretKey, {
      apiVersion: '2024-11-20.acacia',
    });
  }

  // private async getStripeSecretKeyForTestMode() {
  //   const stripeSecretKeyForTestMode =
  //     this.configService.get<string>('STRIPE_SECRET_KEY');
  //   console.log(stripeSecretKeyForTestMode);
  //   return stripeSecretKeyForTestMode;
  // }

  async createPaymentIntent(
    amount: number,
    currency: string,
  ): Promise<Stripe.PaymentIntent> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount,
        currency,
      });
      return paymentIntent;
    } catch {
      throw new Error('Failed to create payment intent');
    }
  }
}
