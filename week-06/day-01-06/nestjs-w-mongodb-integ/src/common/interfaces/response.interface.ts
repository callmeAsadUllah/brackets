export interface IBook {
  title: string;
  description?: string;
  author: string;
  publishedDate: Date;
}

export interface IResponse<T> {
  message: string;
  data: T | T[];
}
