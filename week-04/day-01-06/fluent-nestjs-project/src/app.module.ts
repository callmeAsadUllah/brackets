import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Student } from './students/student.entity';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsModule } from './students/students.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { StudentsController } from './students/students.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.DATABASE_PATH,
      entities: [Student],
      synchronize: true,
    }),
    StudentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(StudentsController);
  }
}
