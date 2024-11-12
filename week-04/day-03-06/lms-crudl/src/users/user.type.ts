import { User } from './user.schema';
import { Document } from 'mongoose';

export type UserDocument = User & Document;
