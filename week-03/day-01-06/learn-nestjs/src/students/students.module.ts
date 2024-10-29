import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';

import { Student, StudentSchema } from './student.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
  ],
  providers: [StudentsService],
  controllers: [StudentsController],
})
export class StudentsModule {}
