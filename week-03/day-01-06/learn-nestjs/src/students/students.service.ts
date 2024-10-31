import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Student } from './student.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  async findListStudent(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  async findOneStudent(studentId: string): Promise<Student> {
    return this.studentRepository.findOne({ where: { studentId } });
  }

  async createStudent(student: Student): Promise<Student> {
    const newStudent = this.studentRepository.create(student);
    return this.studentRepository.save(newStudent);
  }

  async updateStudent(
    studentId: string,
    studentData: Student,
  ): Promise<Student> {
    await this.studentRepository.update(studentId, studentData);
    return this.studentRepository.findOne({ where: { studentId } });
  }

  async deleteStudent(studentId: string): Promise<void> {
    await this.studentRepository.delete(studentId);
  }
}
