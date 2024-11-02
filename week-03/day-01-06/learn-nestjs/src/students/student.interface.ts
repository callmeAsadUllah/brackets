export interface IStudent {
  studentId: string;
  username: string;
  firstName?: string;
  lastName?: string;
  email: string;
  createdAt: Date;
  updatedAt?: Date;
}
