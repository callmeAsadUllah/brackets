import { IGenre } from 'src/genres/genre.interface';

export interface IBook {
  title: string;
  description?: string;
  author: string;
  publishedDate?: Date;

  // relationship
  genre: IGenre;
}
