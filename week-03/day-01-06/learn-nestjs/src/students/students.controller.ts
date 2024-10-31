import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  HttpStatus,
  HttpException,
} from '@nestjs/common';

import { StudentsService } from './students.service';

import { Student } from './student.entity';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}
  @Get()
  async findListStudent(): Promise<Student[]> {
    return this.studentsService.findListStudent();
  }

  @Get(':studentId')
  async findOneStudent(
    @Param('studentId') studentId: string,
  ): Promise<Student> {
    return this.studentsService.findOneStudent(studentId);
  }

  @Post()
  async createStudent(@Body() student: Student): Promise<Student> {
    try {
      return await this.studentsService.createStudent(student);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error creating student',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':studentId')
  asyncupdateStudent(
    @Param('studentId') studentId: string,
    @Body() student: Student,
  ): Promise<Student> {
    return this.studentsService.updateStudent(studentId, student);
  }

  @Delete(':studentId')
  async deleteStudent(@Param('studentId') studentId: string): Promise<void> {
    return this.studentsService.deleteStudent(studentId);
  }
}
