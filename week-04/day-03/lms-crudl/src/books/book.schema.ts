import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { GenreEnum } from 'src/genres/genre.enum';

@Schema({ timestamps: true })
export class Book {
  @Prop({ required: true })
  title: string;

  @Prop({ required: false })
  description?: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: false })
  publishedDate?: Date;

  // relationship
  @Prop({ type: String, enum: GenreEnum, default: null })
  genre: GenreEnum;
}

export const BookSchema = SchemaFactory.createForClass(Book);
