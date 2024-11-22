import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { IResponse } from 'src/common/interfaces/response.interface';
import { CreateBookDTO, UpdateBookPartialDTO } from './dtos/book.dto';
import { IBook } from './interfaces/book.interface';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async searchBooks(
    @Query('search') search: string,
  ): Promise<IResponse<IBook[]>> {
    return await this.booksService.searchBooks(search);
  }
  @Get()
  async findManyBooks(): Promise<IResponse<IBook[]>> {
    return await this.booksService.findManyBooks();
  }

  @Post()
  async createBook(
    @Body() createBookDTO: CreateBookDTO,
  ): Promise<IResponse<IBook>> {
    return await this.booksService.createBook(createBookDTO);
  }

  @Get(':bookId')
  async findBookById(
    @Param('bookId') bookId: string,
  ): Promise<IResponse<IBook>> {
    return await this.booksService.findBookById(bookId);
  }

  @Patch(':bookId')
  async updateBookPartial(
    @Param('bookId') bookId: string,
    @Body() updateBookPartialDTO: UpdateBookPartialDTO,
  ): Promise<IResponse<IBook>> {
    return await this.booksService.findOneBookByIdAndUpdatePartial(
      bookId,
      updateBookPartialDTO,
    );
  }

  @Delete(':bookId')
  async deleteBook(@Param('bookId') bookId: string): Promise<IResponse<void>> {
    return await this.booksService.deleteBook(bookId);
  }
}
