import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Genres } from 'src/common/enums/genre.enum';

export type BookDocument = Book & Document;

@Schema({ timestamps: true })
export class Book {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String })
  description?: string;

  @Prop({ type: Date })
  publishedDate?: Date;

  @Prop({ type: [String], enum: Genres, required: true })
  genres: Genres[];

  @Prop({
    type: Types.ObjectId,
    ref: 'Author',
    required: true,
  })
  author: Types.ObjectId;
}

export const BookSchema = SchemaFactory.createForClass(Book);

BookSchema.index(
  {
    title: 'text',
    description: 'text',
  },
  {
    weights: {
      title: 2,
      description: 1,
    },
    name: 'BookSearchIndex',
  },
);
