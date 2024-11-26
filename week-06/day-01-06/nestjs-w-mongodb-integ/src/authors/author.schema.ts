import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AuthorDocument = Author & Document;

@Schema({ timestamps: true })
export class Author {
  @Prop({ type: String, required: true, unique: true })
  fullName: string;

  @Prop({ type: Date })
  dob?: Date;

  @Prop({ type: String })
  bio?: string;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Book' }],
    default: [],
  })
  books?: Types.ObjectId[];
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
