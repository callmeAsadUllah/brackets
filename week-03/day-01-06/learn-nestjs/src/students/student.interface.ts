export interface IStudent {
  studentId: string;
  username: string;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  createdAt: Date;
  updatedAt?: Date;
}
