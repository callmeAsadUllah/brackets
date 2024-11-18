import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { IResponse, IBook } from 'src/common/interfaces/response.interface';
import {
  CreateBookDTO,
  UpdateBookDTO,
  UpdateBookPartialDTO,
} from './dtos/book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async books(): Promise<IResponse<IBook[]>> {
    return this.booksService.books();
  }

  @Post()
  async createBook(
    @Body() createBookDTO: CreateBookDTO,
  ): Promise<IResponse<IBook>> {
    return this.booksService.createBook(createBookDTO);
  }

  @Get(':bookId')
  async findBookById(
    @Param('bookId') bookId: string,
  ): Promise<IResponse<IBook>> {
    return this.booksService.findBookById(bookId);
  }

  @Put(':bookId')
  async updateBook(
    @Param('bookId') bookId: string,
    @Body() updateBookDTO: UpdateBookDTO,
  ): Promise<IResponse<IBook>> {
    return this.booksService.updateBook(bookId, updateBookDTO);
  }

  // Partially update a book (PATCH)
  @Patch(':bookId')
  async partialUpdateBook(
    @Param('bookId') bookId: string,
    @Body() updateBookPartialDTO: UpdateBookPartialDTO,
  ): Promise<IResponse<IBook>> {
    return this.booksService.updateBookPartial(bookId, updateBookPartialDTO);
  }

  @Delete(':bookId')
  async deleteBook(@Param('bookId') bookId: string): Promise<IResponse<void>> {
    return await this.booksService.deleteBook(bookId);
  }
}
