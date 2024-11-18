import { Types } from 'mongoose';
import { IGenre } from 'src/genres/genre.interface';
export interface IBook {
  title: string;
  description?: string;
  author: string;
  publishedDate?: Date;
  numberOfAvailableCopies: number;
  genre: IGenre;
  borrowedBy: Types.ObjectId[];
}
