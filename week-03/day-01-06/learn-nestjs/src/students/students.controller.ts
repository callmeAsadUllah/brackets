import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Patch,
} from '@nestjs/common';

import { StudentsService } from './students.service';

import { Student } from './student.entity';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentService: StudentsService) {}
  @Get()
  findAll(): Promise<Student[]> {
    return this.studentService.findListStudent();
  }

  @Get(':studentId')
  findOne(@Param('studentId') studentId: string): Promise<Student> {
    return this.studentService.findOneStudent(studentId);
  }

  @Post()
  createStudent(@Body() student: Student): Promise<Student> {
    return this.studentService.createStudent(student);
  }

  @Put(':studentId')
  updateStudent(
    @Param('studentId') studentId: string,
    @Body() student: Student,
  ): Promise<Student> {
    return this.studentService.updateStudent(studentId, student);
  }

  @Delete(':studentId')
  deleteStudent(@Param('studentId') studentId: string): Promise<void> {
    return this.studentService.deleteStudent(studentId);
  }
}
