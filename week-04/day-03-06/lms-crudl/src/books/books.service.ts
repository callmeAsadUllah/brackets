import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BookDocument } from './book.type';
import { CreateBookDTO } from './create-book.dto';
import { Book } from './book.schema';
import { UpdateBookDTO } from './update-book.dto';
import { UpdateBookPartialDTO } from './update-book-partial.dto';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async findListBooks(): Promise<BookDocument[]> {
    const books = await this.bookModel.find();
    return books;
  }

  async createBook(createBookDTO: CreateBookDTO): Promise<BookDocument> {
    const book = new this.bookModel({ ...createBookDTO });
    return await book.save();
  }

  async updateBookById(
    bookId: string,
    updateBookDTO: UpdateBookDTO,
  ): Promise<BookDocument> {
    const updatedBook = await this.bookModel
      .findByIdAndUpdate(bookId, updateBookDTO, {
        new: true,
        runValidators: true,
      })
      .exec();
    return updatedBook;
  }

  async updateBookByIdPartial(
    bookId: string,
    updateBookPartialDTO: UpdateBookPartialDTO,
  ): Promise<BookDocument> {
    const updatedBook = await this.bookModel
      .findByIdAndUpdate(bookId, updateBookPartialDTO, {
        new: true,
        runValidators: true,
      })
      .exec();
    return updatedBook;
  }

  async findOneBookById(bookId: string): Promise<BookDocument> {
    const book = await this.bookModel.findById(bookId).exec();
    return book;
  }

  async deleteBookById(bookId: string): Promise<void> {
    await this.bookModel.findByIdAndDelete(bookId).exec();
  }
}
