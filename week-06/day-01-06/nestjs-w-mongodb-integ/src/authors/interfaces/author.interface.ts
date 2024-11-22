import { Types } from 'mongoose';

export interface IAuthor {
  fullName: string;
  dob?: Date;
  bio?: string;
  books?: Types.ObjectId[];
}
