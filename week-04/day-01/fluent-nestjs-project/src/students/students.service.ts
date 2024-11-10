import {
  InternalServerErrorException,
  ConflictException,
  Injectable,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Student } from './student.entity';

import { CreateStudentDto } from './create-student.dto';
import { UpdateStudentDto } from './update-student.dto';
import { UpdateStudentPartialDto } from './update-student-partial.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentsRepository: Repository<Student>,
  ) {}

  async findListStudent(): Promise<Student[]> {
    const students = await this.studentsRepository.find();
    return students;
  }

  async createStudent(createStudentDto: CreateStudentDto): Promise<Student> {
    const studentEmail = await this.studentsRepository.findOne({
      where: {
        email: createStudentDto.email,
      },
    });

    const studentUsername = await this.studentsRepository.findOne({
      where: {
        username: createStudentDto.username,
      },
    });

    if (studentEmail) {
      throw new ConflictException('Student with this email already exists.');
    }

    if (studentUsername) {
      throw new ConflictException('Student with this username already exists.');
    }

    try {
      const student = this.studentsRepository.create(createStudentDto);
      return await this.studentsRepository.save(student);
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to create student. Please try again later.',
      );
    }
  }

  async updateStudent(
    studentId: string,
    updateStudentDto: UpdateStudentDto,
  ): Promise<Student> {
    const student = await this.studentsRepository.findOne({
      where: { studentId: studentId },
    });

    if (!student) {
      throw new InternalServerErrorException('Student not found');
    }

    const updatedStudent = {
      ...student,
      ...updateStudentDto,
    };
    return await this.studentsRepository.save(updatedStudent);
  }

  async updateStudentPartial(
    studentId: string,
    updateStudentPartialDto: UpdateStudentPartialDto,
  ): Promise<Student> {
    const student = await this.studentsRepository.findOne({
      where: { studentId: studentId },
    });

    if (!student) {
      throw new InternalServerErrorException('Student not found');
    }

    const updatedStudentPartial = {
      ...student,
      ...updateStudentPartialDto,
    };
    return await this.studentsRepository.save(updatedStudentPartial);
  }

  async findOneStudent(studentId: string): Promise<Student> {
    const student = await this.studentsRepository.findOne({
      where: { studentId: studentId },
    });
    if (!student) {
      throw new InternalServerErrorException('Student not found.');
    }
    return student;
  }

  async deleteStudent(studentId: string): Promise<void> {
    const student = await this.studentsRepository.findOne({
      where: { studentId: studentId },
    });
    if (!student) {
      throw new InternalServerErrorException('Student not found.');
    }
    await this.studentsRepository.delete(student);
  }
}
