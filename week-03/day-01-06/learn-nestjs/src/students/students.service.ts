import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Student } from './student.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentsRepository: Repository<Student>,
  ) {}

  async findListStudent(): Promise<Student[]> {
    const students = await this.studentsRepository.find();
    return students.length ? students : [];
  }

  async findOneStudent(studentId: string): Promise<Student> {
    try {
      const student = await this.studentsRepository.findOne({
        where: { studentId },
      });

      if (!student) {
        throw new NotFoundException(`Student with ID ${studentId} not found`);
      }

      return student;
    } catch (error) {
      throw new Error(
        'An error occurred while retrieving the student: ' + error.message,
      );
    }
  }

  async createStudent(student: Student): Promise<Student> {
    try {
      const newStudent = this.studentsRepository.create(student);
      return await this.studentsRepository.save(newStudent);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create student');
    }
  }
  async updateStudent(
    studentId: string,
    studentData: Student,
  ): Promise<Student> {
    const student = await this.studentsRepository.findOne({
      where: { studentId },
    });
    if (!student) {
      throw new NotFoundException(`Student with ID ${studentId} not found`);
    }
    await this.studentsRepository.update(studentId, studentData);
    return this.studentsRepository.findOne({ where: { studentId } });
  }

  async deleteStudent(studentId: string): Promise<void> {
    const student = await this.studentsRepository.findOne({
      where: { studentId },
    });

    if (!student) {
      throw new NotFoundException(`Student with ID ${studentId} not found`);
    }

    await this.studentsRepository.delete(studentId);
  }
}
