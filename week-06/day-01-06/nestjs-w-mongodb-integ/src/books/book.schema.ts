import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Genres } from 'src/common/genres/genre.enum';

export type BookDocument = Book & Document;

@Schema({ timestamps: true })
export class Book {
  @Prop({ type: String, required: true, unique: true, index: true })
  title: string;

  @Prop({ type: String, required: false })
  description?: string;

  @Prop({ type: Date, required: false })
  publishedDate?: Date;

  @Prop({ type: [String], enum: Genres, required: true })
  genres: Genres[];

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Author' }],
    required: true,
    index: true,
  })
  authors: Types.ObjectId[];
}

export const BookSchema = SchemaFactory.createForClass(Book);
