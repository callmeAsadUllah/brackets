import { Types } from 'mongoose';
import { Genres } from 'src/common/enums/genre.enum';

export interface IBook {
  title: string;
  description?: string;
  publishedDate?: Date;
  genres: Genres[];
  author: Types.ObjectId;
}
