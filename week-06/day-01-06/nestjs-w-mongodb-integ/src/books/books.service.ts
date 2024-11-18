import { Injectable } from '@nestjs/common';
import { Book, BookDocument } from './book.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateBookDTO,
  UpdateBookDTO,
  UpdateBookPartialDTO,
} from './dtos/book.dto';
import { IBook, IResponse } from 'src/common/interfaces/response.interface';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async books(): Promise<IResponse<IBook[]>> {
    const books = await this.bookModel.find().exec();
    return { message: 'Book fetched successfully', data: books };
  }

  async createBook(createBookDTO: CreateBookDTO): Promise<IResponse<IBook>> {
    const book = new this.bookModel(createBookDTO);
    await book.save();
    return { message: 'Book created successfully', data: book };
  }

  async findBookById(bookId: string): Promise<IResponse<IBook>> {
    const book = await this.bookModel.findById(bookId).exec();
    return { message: 'Book fetched successfully', data: book };
  }

  async updateBook(
    bookId: string,
    updateBookDTO: UpdateBookDTO,
  ): Promise<IResponse<IBook>> {
    const updatedBook = await this.bookModel
      .findByIdAndUpdate(bookId, updateBookDTO, {
        new: true,
        runValidators: true,
      })
      .exec();

    return {
      message: 'Book updated successfully',
      data: updatedBook.toObject(),
    };
  }

  async updateBookPartial(
    bookId: string,
    updateBookPartialDTO: UpdateBookPartialDTO,
  ): Promise<IResponse<IBook>> {
    const updatedBook = await this.bookModel
      .findByIdAndUpdate(bookId, updateBookPartialDTO, {
        new: true,
        runValidators: true,
      })
      .exec();

    return {
      message: 'Book partially updated successfully',
      data: updatedBook.toObject(),
    };
  }

  async deleteBook(bookId: string): Promise<IResponse<void>> {
    await this.bookModel.findByIdAndDelete(bookId).exec();
    return { message: 'Book deleted successfully', data: null };
  }
}
