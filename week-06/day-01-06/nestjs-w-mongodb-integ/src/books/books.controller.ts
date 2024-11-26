import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
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
  async findManyBooks(
    @Query('search') search?: string,
    @Query('title') title?: string,
    @Query('description') description?: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<IResponse<IBook[]>> {
    return await this.booksService.findManyBooks(
      search,
      title,
      description,
      page,
      limit,
    );
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
    try {
      return await this.booksService.findBookById(bookId);
    } catch {
      throw new NotFoundException(`Book with ID ${bookId} not found.`);
    }
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
