import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { Student, StudentDocument } from './student.schema';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<StudentDocument>,
  ) {}

  async create(createStudentDTO: Partial<Student>): Promise<Student> {
    const createdStudent = new this.studentModel(createStudentDTO);
    return createdStudent.save();
  }

  async findAll(): Promise<Student[]> {
    return this.studentModel.find().exec();
  }

  async findOne(id: string): Promise<Student> {
    return this.studentModel.findById(id).exec();
  }

  async update(
    id: string,
    updateStudentDTO: Partial<Student>,
  ): Promise<Student> {
    return this.studentModel
      .findByIdAndUpdate(id, updateStudentDTO, { new: true })
      .exec();
  }
}
