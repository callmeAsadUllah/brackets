import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Book } from 'src/books/book.schema';
import { RoleEnum } from 'src/roles/role.enum';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: false })
  firstName?: string;

  @Prop({ required: false })
  lastName?: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  // refresh token
  @Prop({ required: false })
  refreshToken?: string;

  // relationship
  @Prop({ type: String, enum: RoleEnum, default: RoleEnum.USER })
  role: RoleEnum;

  // relationship
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Book' }] })
  books: Book[];
}

export const UserSchema = SchemaFactory.createForClass(User);
