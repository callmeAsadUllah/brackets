import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AuthorDocument = Author & Document;

@Schema({ timestamps: true })
export class Author {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  dob: Date;

  @Prop({ required: false })
  bio?: string;
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
