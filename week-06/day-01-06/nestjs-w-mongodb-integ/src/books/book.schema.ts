import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookDocument = Book & Document;

@Schema({ timestamps: true })
export class Book {
  @Prop({ required: true })
  title: string;

  @Prop({ required: false })
  description?: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  publishedDate: Date;
}

export const BookSchema = SchemaFactory.createForClass(Book);
