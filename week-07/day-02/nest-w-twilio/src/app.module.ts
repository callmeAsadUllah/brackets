import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MessagesModule } from './messages/messages.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      cache: true,
    }),
    // StripeModule.forRootAsync(StripeModule, {
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     apiKey: configService.get<string>('STRIPE_SECRET_KEY'),
    //     apiVersion: '2024-11-20.acacia',
    //     webhookConfig: {
    //       // stripeSecrets: { ... },
    //       requestBodyProperty: 'rawBody',
    //     },
    //   }),
    //   inject: [ConfigService],
    // }),
    MessagesModule,
    PaymentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
