import { Types } from 'mongoose';

export interface IBook {
  title: string;
  description?: string;
  publishedDate: Date;
  author: Types.ObjectId;
}
