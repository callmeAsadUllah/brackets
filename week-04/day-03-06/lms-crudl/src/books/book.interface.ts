export interface IBook {
  title: string;
  description?: string;
  author: string;
  publishedDate?: Date;

  // relationship
  genre: string;
}
