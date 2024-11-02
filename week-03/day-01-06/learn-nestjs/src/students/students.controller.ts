import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  Patch,
} from '@nestjs/common';

import { StudentsService } from './students.service';

import { Student } from './student.entity';
import { CreateStudentDto } from './create-student.dto';
import { UpdateStudentDto } from './update-student.dto';
import { UpdateStudentPartialDto } from './update-student-partial.dto';
import { Response } from 'express';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}
  @Get()
  async findListStudent(): Promise<Student[]> {
    const students = await this.studentsService.findListStudent();
    return students;
  }

  @Post()
  async createStudent(
    @Body() createStudentDto: CreateStudentDto,
  ): Promise<Student> {
    const student = await this.studentsService.createStudent(createStudentDto);
    return student;
  }

  @Put(':studentId')
  async updateStudent(
    @Param('studentId') studentId: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ): Promise<Student> {
    const student = await this.studentsService.updateStudent(
      studentId,
      updateStudentDto,
    );
    return student;
  }

  @Patch(':studentId')
  async updateStudentPartial(
    @Param('studentId') studentId: string,
    @Body() updateStudentPartialDto: UpdateStudentPartialDto,
  ): Promise<Student> {
    const student = await this.studentsService.updateStudentPartial(
      studentId,
      updateStudentPartialDto,
    );
    return student;
  }

  @Get(':studentId')
  async findOneStudent(
    @Param('studentId') studentId: string,
  ): Promise<Student> {
    const student = await this.studentsService.findOneStudent(studentId);
    return student;
  }

  @Delete(':studentId')
  async deleteStudent(@Param('studentId') studentId: string): Promise<void> {
    return await this.studentsService.deleteStudent(studentId);
  }
}
