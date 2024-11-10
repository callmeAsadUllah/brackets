import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { IStudent } from './student.interface';

@Entity({ name: 'students' })
export class Student implements IStudent {
  @PrimaryGeneratedColumn('uuid', { name: 'student_id' })
  studentId: string;

  @Column({ name: 'username', unique: true })
  username: string;

  @Column({ name: 'first_name', nullable: true })
  firstName?: string;

  @Column({ name: 'last_name', nullable: true })
  lastName?: string;

  @Column({ name: 'email', unique: true })
  email: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt?: Date;
}
