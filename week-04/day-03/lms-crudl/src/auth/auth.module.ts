import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('ACCESS_TOKEN'),
        signOptions: {
          expiresIn: configService.get<string>('ACCESS_TOKEN_EXPIRY'),
        },
      }),
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('REFRESH_TOKEN'),
        signOptions: {
          expiresIn: configService.get<string>('REFRESH_TOKEN_EXPIRY'),
        },
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          return UserSchema;
        },
      },
    ]),
    forwardRef(() => UsersModule),
  ],
})
export class AuthModule {}
