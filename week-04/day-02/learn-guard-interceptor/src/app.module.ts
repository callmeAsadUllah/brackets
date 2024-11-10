import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentsModule } from './students/students.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { StudentsService } from './students/students.service';
import { Student, StudentSchema } from './students/student.schema';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RolesGuard } from './roles/roles.guard';
import { LoggingInterceptor } from 'logging/logging.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeatureAsync([
      {
        name: Student.name,
        useFactory: () => {
          return StudentSchema;
        },
      },
    ]),

    StudentsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    StudentsService,
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    RolesGuard,
  ],
})
export class AppModule {}
