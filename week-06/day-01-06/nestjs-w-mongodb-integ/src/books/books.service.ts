import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Book, BookDocument } from './book.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateBookDTO, UpdateBookPartialDTO } from './dtos/book.dto';
import { IResponse } from 'src/common/interfaces/response.interface';
import { IBook } from './interfaces/book.interface';
import { Author, AuthorDocument } from 'src/authors/author.schema';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private booksModel: Model<BookDocument>,
    @InjectModel(Author.name) private authorsModel: Model<AuthorDocument>,
  ) {}

  async findManyBooks(
    page: number = 1,
    limit: number = 10,
  ): Promise<IResponse<IBook[]>> {
    const books = await this.booksModel
      .find()
      .populate('authors')
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    return { message: 'Book fetched successfully', data: books };
  }

  async searchBooks(
    search?: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<IResponse<IBook[]>> {
    try {
      const books = await this.booksModel
        .aggregate([
          {
            $match: {
              $or: [
                {
                  title: {
                    $regex: search,
                    $options: 'i',
                  },
                },
                {
                  description: {
                    $regex: search,
                    $options: 'i',
                  },
                },
              ],
            },
          },
          { $skip: (page - 1) * limit },
          { $limit: limit },
        ])
        .exec();

      return {
        message: `Books fetched successfully with search-query=${search}`,
        data: books,
      };
    } catch {
      throw new Error('Unable to fetch books');
    }
  }

  async createBook(createBookDTO: CreateBookDTO): Promise<IResponse<IBook>> {
    const session = await this.booksModel.startSession();
    session.startTransaction();

    try {
      const { authors } = createBookDTO;

      const authorIds = authors.map((authorId) => new Types.ObjectId(authorId));
      const createdBook = new this.booksModel({
        ...createBookDTO,
        authors: authorIds,
      });

      const bookId = createdBook._id;

      await this.authorsModel
        .findByIdAndUpdate(
          authorIds,
          { $addToSet: { books: bookId } },
          { new: true, session },
        )
        .exec();

      await createdBook.save({ session });

      await session.commitTransaction();

      return {
        message: 'Book created successfully',
        data: createdBook,
      };
    } catch (error) {
      await session.abortTransaction();
      console.error(error);
      throw new BadRequestException('Unable to create book');
    } finally {
      session.endSession();
    }
  }

  async findOneBookByIdAndUpdatePartial(
    bookId: string,
    updateBookPartialDTO: UpdateBookPartialDTO,
  ): Promise<IResponse<IBook>> {
    const session = await this.booksModel.startSession();
    session.startTransaction();
    try {
      const { authors, ...updatedBookData } = updateBookPartialDTO;
      const authorIds = authors.map((authorId) => new Types.ObjectId(authorId));

      const updatedBookPartial = await this.booksModel
        .findByIdAndUpdate(
          bookId,
          {
            ...updatedBookData,
            $addToSet: {
              authors: { $each: authorIds },
            },
          },
          {
            new: true,
            runValidators: true,
          },
        )
        .exec();

      await this.authorsModel
        .findByIdAndUpdate(
          authorIds,
          { $addToSet: { books: bookId } },
          { new: true, session },
        )
        .exec();

      await session.commitTransaction();

      return {
        message: 'Book updated successfully',
        data: updatedBookPartial,
      };
    } catch (error) {
      await session.abortTransaction();
      console.error(error);
      throw new BadRequestException('Unable to create book');
    } finally {
      session.endSession();
    }
  }

  async findBookById(bookId: string): Promise<IResponse<IBook>> {
    try {
      const book = await this.booksModel
        .findById(bookId)
        .populate('authors')
        .exec();
      if (!book) {
        throw new NotFoundException();
      }
      return { message: 'Book fetched successfully', data: book };
    } catch {
      throw new HttpException(
        'Error retrieving user data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteBook(bookId: string): Promise<IResponse<void>> {
    const session = await this.booksModel.startSession();
    session.startTransaction();

    try {
      const book = await this.booksModel
        .findById(bookId)
        .populate('authors')
        .exec();
      const { authors } = book;

      const authorIds = authors.map((authorId) => new Types.ObjectId(authorId));

      await this.authorsModel
        .updateMany(
          { _id: { $in: authorIds } },
          { $pull: { books: bookId } },
          { session },
        )
        .exec();

      await this.booksModel.findByIdAndDelete(bookId).session(session).exec();

      await session.commitTransaction();

      return { message: 'Book deleted successfully', data: null };
    } catch (error) {
      await session.abortTransaction();
      console.error(error);
      throw new BadRequestException('Unable to delete book');
    } finally {
      session.endSession();
    }
  }
}
