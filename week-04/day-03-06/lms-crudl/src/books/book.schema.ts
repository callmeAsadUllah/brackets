import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
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

  @Prop({ required: true, default: 0 })
  numberOfAvailableCopies: number;
  // relationship
  @Prop({ type: String, enum: GenreEnum, required: true })
  genre: GenreEnum;
  // relationship
  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
  borrowedBy: Types.Array<Types.ObjectId>;
}

export const BookSchema = SchemaFactory.createForClass(Book);
