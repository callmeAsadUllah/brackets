import { Types } from 'mongoose';
import { Genres } from 'src/common/genres/genre.enum';

export interface IBook {
  title: string;
  description?: string;
  publishedDate?: Date;
  genres: Genres[];
  authors: Types.ObjectId[];
}
