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
    search?: string,
    title?: string,
    description?: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<IResponse<IBook[]>> {
    try {
      const skip = (page - 1) * limit;

      const searchQuery = search ? { $text: { $search: search } } : {};

      const titleQuery = title
        ? { title: { $regex: title, $options: 'i' } }
        : {};

      const descriptionQuery = description
        ? { description: { $regex: description, $options: 'i' } }
        : {};

      const query = { ...titleQuery, ...descriptionQuery, ...searchQuery };

      const books = await this.booksModel
        .find(query)
        .sort()
        .populate('author')
        .skip(skip)
        .limit(limit)
        .exec();

      return {
        message: `Books fetched successfully`,
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
      const { author } = createBookDTO;

      const authorId = new Types.ObjectId(author);

      const createdBook = new this.booksModel({
        ...createBookDTO,
        author: authorId,
      });

      const bookId = createdBook._id;

      await this.authorsModel
        .findByIdAndUpdate(
          author,
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
      const { author, ...updatedBookData } = updateBookPartialDTO;
      const updatedBookPartial = await this.booksModel
        .findByIdAndUpdate(
          bookId,
          { ...updatedBookData, author: author },
          { new: true, runValidators: true, session },
        )
        .exec();

      if (author) {
        await this.authorsModel
          .findByIdAndUpdate(
            author,
            { $addToSet: { books: bookId } },
            { new: true, runValidators: true, session },
          )
          .exec();
      }

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
      const book = await this.booksModel.aggregate([
        { $match: { _id: new Types.ObjectId(bookId) } },
        {
          $lookup: {
            from: 'authors',
            localField: 'author',
            foreignField: '_id',
            as: 'author',
          },
        },
        { $unwind: '$author' },
      ]);
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
      if (!book) {
        throw new NotFoundException('Book not found');
      }

      const authorId = book.author;

      await this.authorsModel
        .findByIdAndUpdate(authorId, { $pull: { books: bookId } }, { session })
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
