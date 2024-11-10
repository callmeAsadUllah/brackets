import { Module } from '@nestjs/common';

import { StudentsController } from './students.controller';

import { StudentsService } from './students.service';
import { Student, StudentSchema } from './student.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  exports: [StudentsService],
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Student.name,
        useFactory: () => {
          return StudentSchema;
        },
      },
    ]),
  ],
  providers: [StudentsService],
  controllers: [StudentsController],
})
export class StudentsModule {}
