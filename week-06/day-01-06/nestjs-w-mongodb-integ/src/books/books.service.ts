import { Injectable } from '@nestjs/common';
import { Book, BookDocument } from './book.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateBookDTO,
  UpdateBookDTO,
  UpdateBookPartialDTO,
} from './dtos/book.dto';
import { IResponse } from 'src/common/interfaces/response.interface';
import { IBook } from 'src/common/interfaces/book.interface';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private booksModel: Model<BookDocument>,
  ) {}

  async books(): Promise<IResponse<IBook[]>> {
    const books = await this.booksModel.find().populate('author').exec();
    return { message: 'Book fetched successfully', data: books };
  }

  async createBook(createBookDTO: CreateBookDTO): Promise<IResponse<IBook>> {
    const book = new this.booksModel(createBookDTO);
    await book.save();
    return { message: 'Book created successfully', data: book };
  }

  async findOneBookByIdAndUpdate(
    bookId: string,
    updateBookDTO: UpdateBookDTO,
  ): Promise<IResponse<IBook>> {
    const updatedBook = await this.booksModel
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

  async findOneBookByIdAndUpdatePartial(
    bookId: string,
    updateBookPartialDTO: UpdateBookPartialDTO,
  ): Promise<IResponse<IBook>> {
    const updatedBook = await this.booksModel
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

  async findBookById(bookId: string): Promise<IResponse<IBook>> {
    const book = await this.booksModel
      .findById(bookId)
      .populate('author')
      .exec();
    return { message: 'Book fetched successfully', data: book };
  }

  async deleteBook(bookId: string): Promise<IResponse<void>> {
    await this.booksModel.findByIdAndDelete(bookId).exec();
    return { message: 'Book deleted successfully', data: null };
  }
}
