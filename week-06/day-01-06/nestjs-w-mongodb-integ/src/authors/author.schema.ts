import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AuthorDocument = Author & Document;

@Schema({ timestamps: true })
export class Author {
  @Prop({ type: String, required: true, unique: true })
  fullName: string;

  @Prop({ type: Date, required: false })
  dob?: Date;

  @Prop({ type: String, required: false })
  bio?: string;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Book' }],
    required: false,
    index: true,
  })
  books?: Types.ObjectId[];
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
