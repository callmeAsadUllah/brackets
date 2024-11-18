import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BookDocument } from './book.type';
import { CreateBookDTO } from './create-book.dto';
import { Book } from './book.schema';
import { UpdateBookDTO } from './update-book.dto';
import { UpdateBookPartialDTO } from './update-book-partial.dto';
import { User } from 'src/users/user.schema';
import { UserDocument } from 'src/users/user.type';
import { Types } from 'mongoose';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private bookModel: Model<BookDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async findListBooks(paginationParams: { page: number; limit: number }) {
    const { page, limit } = paginationParams;
    const [result] = await this.bookModel.aggregate([
      {
        $facet: {
          data: [{ $skip: (page - 1) * limit }, { $limit: limit }],
          total: [{ $count: 'total' }],
        },
      },
    ]);
    const total = result?.total[0]?.total || 0;
    return {
      data: result.data,
      total,
      page,
      limit,
    };
  }

  async findBookByTitle(title: string): Promise<BookDocument[]> {
    return this.bookModel
      .find({
        title: { $regex: title, $options: 'i' },
      })
      .exec();
  }

  async createBook(CreateBookDTO: CreateBookDTO): Promise<BookDocument> {
    const createdBook = new this.bookModel({
      ...CreateBookDTO,
    });
    return await createdBook.save();
  }
  async updateBook(
    updateBookDTO: UpdateBookDTO,
    bookId: string,
  ): Promise<BookDocument> {
    const updatedBook = await this.bookModel
      .findByIdAndUpdate(
        bookId,
        { $set: updateBookDTO },
        { new: true, runValidators: true },
      )
      .exec();
    if (!updatedBook) {
      throw new NotFoundException('Book not found');
    }

    return updatedBook;
  }

  async updateBookPartial(
    updateBookPartialDTO: UpdateBookPartialDTO,
    bookId: string,
  ): Promise<BookDocument> {
    const updatedBookPartial = await this.bookModel
      .findByIdAndUpdate(
        bookId,
        { $set: updateBookPartialDTO },
        { new: true, runValidators: true },
      )
      .exec();
    if (!updatedBookPartial) {
      throw new NotFoundException('Book not found');
    }

    return updatedBookPartial;
  }

  async findOneBookById(bookId: string): Promise<BookDocument> {
    const book = await this.bookModel.findById(bookId).exec();
    return book;
  }

  async deleteBookById(bookId: string): Promise<BookDocument> {
    const deletedBook = await this.bookModel.findByIdAndDelete(bookId).exec();
    if (!deletedBook) {
      throw new NotFoundException('Book not found');
    }
    return deletedBook;
  }

  async findBorrowedBooksByUserId(
    userId: string,
    bookId: string,
  ): Promise<string> {
    const userObjectId = new Types.ObjectId(userId);
    const bookObjectId = new Types.ObjectId(bookId);
    const session = await this.bookModel.startSession();
    session.startTransaction();

    const [user, book] = await Promise.all([
      this.userModel.findById(userObjectId).session(session),
      this.bookModel.findById(bookObjectId).session(session),
    ]);

    if (!user) {
      throw new NotFoundException('User not found with given user id');
    }

    if (!book) {
      throw new NotFoundException('Book not found with given book id');
    }

    if (user.books.includes(bookObjectId)) {
      throw new Error('User has already borrowed this book');
    }

    if (book.numberOfAvailableCopies <= 0) {
      throw new ConflictException('Book is not available yet');
    }

    book.numberOfAvailableCopies -= 1;
    user.books.push(bookObjectId);
    book.borrowedBy.push(userObjectId);

    await Promise.all([user.save({ session }), book.save({ session })]);

    await session.commitTransaction();
    session.endSession();
    return `User ${user.firstName} successfully borrowed the book with ID: ${bookId}`;
  }

  async findReturnedBooksByUserId(
    userId: string,
    bookId: string,
  ): Promise<string> {
    const userObjectId = new Types.ObjectId(userId);
    const bookObjectId = new Types.ObjectId(bookId);

    const session = await this.bookModel.startSession();
    session.startTransaction();

    const [user, book] = await Promise.all([
      this.userModel.findById(userObjectId).session(session),
      this.bookModel.findById(bookObjectId).session(session),
    ]);

    if (!user) {
      throw new NotFoundException('User not found with the given user ID');
    }
    if (!book) {
      throw new NotFoundException('Book not found with the given book ID');
    }

    const borrowedBookIndex = user.books.findIndex((id) =>
      id.equals(bookObjectId),
    );
    if (borrowedBookIndex === -1) {
      throw new ConflictException('User did not borrow this book');
    }

    user.books.splice(borrowedBookIndex, 1);
    const borrowedByIndex = book.borrowedBy.findIndex((id) =>
      id.equals(userObjectId),
    );
    if (borrowedByIndex !== -1) {
      book.borrowedBy.splice(borrowedByIndex, 1);
    }

    book.numberOfAvailableCopies += 1;

    await Promise.all([user.save({ session }), book.save({ session })]);

    await session.commitTransaction();
    session.endSession();

    return `User ${user.firstName} successfully returned the book with ID: ${bookId}`;
  }
}
