import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { StudentsController } from './students.controller';

import { StudentsService } from './students.service';

import { Student } from './student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  providers: [StudentsService],
  controllers: [StudentsController],
})
export class StudentsModule {}
