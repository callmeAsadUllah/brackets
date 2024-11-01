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
import { CreateStudentDTO } from './create-student.dto';
import { UpdateStudentDTO } from './update-student.dto';
import { UpdateStudentPartialDTO } from './update-student-partial.dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}
  @Get()
  async findListStudent(): Promise<Student[]> {
    return await this.studentsService.findListStudent();
  }

  @Post()
  async createStudent(
    @Body() createStudentDTO: CreateStudentDTO,
  ): Promise<Student> {
    return await this.studentsService.createStudent(createStudentDTO);
  }

  @Put(':studentId')
  async updateStudent(
    @Param('studentId') studentId: string,
    @Body() updateStudentDTO: UpdateStudentDTO,
  ): Promise<Student> {
    return await this.studentsService.updateStudent(
      studentId,
      updateStudentDTO,
    );
  }

  @Patch(':studentId')
  async updateStudentPartial(
    @Param('studentId') studentId: string,
    @Body() updateStudentPartial: UpdateStudentPartialDTO,
  ): Promise<Student> {
    return await this.studentsService.updateStudentPartial(
      studentId,
      updateStudentPartial,
    );
  }

  @Get(':studentId')
  async findOneStudent(
    @Param('studentId') studentId: string,
  ): Promise<Student> {
    return await this.studentsService.findOneStudent(studentId);
  }

  @Delete(':studentId')
  async deleteStudent(@Param('studentId') studentId: string): Promise<void> {
    return await this.studentsService.deleteStudent(studentId);
  }
}
