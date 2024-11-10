import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateStudentDto } from './create-student.dto';
import { UpdateStudentDto } from './update-student.dto';
import { UpdateStudentPartialDto } from './update-student-partial.dto';
import { Student, StudentDocument } from './student.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student.name)
    private readonly studentModel: Model<StudentDocument>,
  ) {}

  async findListStudents(): Promise<Student[] | null> {
    const students = await this.studentModel.find().exec();
    return students;
  }

  async createStudent(createStudentDto: CreateStudentDto): Promise<Student> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createStudentDto.password,
      saltRounds,
    );
    const student = new this.studentModel({
      ...createStudentDto,
      password: hashedPassword,
    });
    return await student.save();
  }

  async updateStudent(
    studentId: string,
    updateStudentDto: UpdateStudentDto,
  ): Promise<Student> {
    const student = await this.studentModel
      .findByIdAndUpdate(studentId, updateStudentDto, {
        new: true,
        runValidators: true,
      })
      .exec();
    return student;
  }

  async updateStudentPartial(
    studentId: string,
    updateStudentPartialDto: UpdateStudentPartialDto,
  ): Promise<Student> {
    const student = await this.studentModel
      .findByIdAndUpdate(studentId, updateStudentPartialDto, {
        new: true,
        runValidators: true,
      })
      .exec();
    return student;
  }

  async findOneByStudentId(studentId: string): Promise<Student | null> {
    const student = await this.studentModel.findById(studentId).exec();
    return student;
  }

  async findOneByStudentEmail(email: string): Promise<Student | null> {
    const student = await this.studentModel
      .findOne({ where: { email: email } })
      .exec();
    return student;
  }

  async findOneByStudentUsername(username: string): Promise<Student | null> {
    const student = await this.studentModel
      .findOne({ where: { username: username } })
      .exec();
    return student;
  }

  async deleteStudent(studentId: string): Promise<void> {
    await this.studentModel.findByIdAndDelete(studentId).exec();
  }
}
