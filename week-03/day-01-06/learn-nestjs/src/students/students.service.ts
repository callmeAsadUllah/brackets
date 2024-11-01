import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Student } from './student.entity';

import { CreateStudentDTO } from './create-student.dto';
import { UpdateStudentDTO } from './update-student.dto';
import { UpdateStudentPartialDTO } from './update-student-partial.dto';

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

  async createStudent(createStudentDTO: CreateStudentDTO): Promise<Student> {
    const student = this.studentsRepository.create(createStudentDTO);
    return await this.studentsRepository.save(student);
  }

  async updateStudent(
    studentId: string,
    updateStudentDTO: UpdateStudentDTO,
  ): Promise<Student> {
    const student = await this.studentsRepository.findOne({
      where: { studentId: studentId },
    });
    const updatedStudent = {
      ...student,
      ...updateStudentDTO,
    };
    return await this.studentsRepository.save(updatedStudent);
  }

  async updateStudentPartial(
    studentId: string,
    updateStudentPartialDTO: UpdateStudentPartialDTO,
  ): Promise<Student> {
    const student = await this.studentsRepository.findOne({
      where: { studentId: studentId },
    });
    const updatedStudentPartial = {
      ...student,
      ...updateStudentPartialDTO,
    };
    return await this.studentsRepository.save(updatedStudentPartial);
  }

  async findOneStudent(studentId: string): Promise<Student> {
    const student = await this.studentsRepository.findOne({
      where: { studentId: studentId },
    });
    return student;
  }

  async deleteStudent(studentId: string): Promise<void> {
    const student = await this.studentsRepository.findOne({
      where: { studentId: studentId },
    });

    if (!student) {
      throw new Error(`Student with ID ${studentId} not found`);
    }

    await this.studentsRepository.delete(student);
  }
}
