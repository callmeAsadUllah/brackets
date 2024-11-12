import { Injectable } from '@nestjs/common';
import { Book } from './book.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BookDocument } from './book.type';
import { CreateBookDto } from './create-book.dto';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}
  //   async replaceOne(
  //     bookId: string,
  //     createBookDto: CreateBookDto,
  //   ): Promise<User> {
  //     return this.bookModel.findByIdAndReplace(id, newUser, { new: true }).exec();
  //   }
  //
  //   async updateMany(
  //     filter: Partial<User>,
  //     updatedFields: Partial<User>,
  //   ): Promise<any> {
  //     return this.userModel.updateMany(filter, updatedFields).exec();
  //   }
  //
  //   async updateOne(
  //     filter: Partial<User>,
  //     updatedFields: Partial<User>,
  //   ): Promise<User> {
  //     return this.userModel
  //       .findOneAndUpdate(filter, updatedFields, { new: true })
  //       .exec();
  //   }
}
