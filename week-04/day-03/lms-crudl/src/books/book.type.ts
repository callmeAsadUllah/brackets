import { Document } from 'mongoose';
import { Book } from './book.schema';

export type BookDocument = Book & Document;
