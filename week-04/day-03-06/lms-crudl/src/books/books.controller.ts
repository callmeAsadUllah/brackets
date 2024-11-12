import {
  Controller,
  UseGuards,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { BooksService } from './books.service';
import { UpdateBookDTO } from './update-book.dto';
import { CreateBookDTO } from './create-book.dto';
import { RoleEnum } from 'src/roles/roles.enum';
import { UpdateBookPartialDTO } from './update-book-partial.dto';
import { BookDocument } from './book.type';

@Controller('books')
@UseGuards(RolesGuard)
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @Roles(RoleEnum.ADMIN, RoleEnum.USER)
  async findListBooks(): Promise<BookDocument[]> {
    const books = await this.booksService.findListBooks();
    return books;
  }

  @Post()
  @Roles(RoleEnum.ADMIN)
  async createBook(
    @Body() createBookDto: CreateBookDTO,
  ): Promise<BookDocument> {
    return await this.booksService.createBook(createBookDto);
  }

  @Put(':bookId')
  @Roles(RoleEnum.ADMIN)
  async updateBookById(
    @Param('bookId') bookId: string,
    @Body() updateBookDto: UpdateBookDTO,
  ) {
    const book = await this.booksService.updateBookById(bookId, updateBookDto);
    return book;
  }

  @Patch(':bookId')
  @Roles(RoleEnum.ADMIN)
  async updateBookByIdPartial(
    @Param('bookId') bookId: string,
    @Body() updateBookPartialDTO: UpdateBookPartialDTO,
  ) {
    const book = await this.booksService.updateBookByIdPartial(
      bookId,
      updateBookPartialDTO,
    );
    return book;
  }

  @Get(':bookId')
  @Roles(RoleEnum.ADMIN, RoleEnum.USER)
  async findOneBookById(@Param('bookId') bookId: string) {
    const book = await this.booksService.findOneBookById(bookId);
    return book;
  }

  @Delete(':bookId')
  @Roles(RoleEnum.ADMIN)
  async deleteBookById(@Param('bookId') bookId: string) {
    await this.booksService.deleteBookById(bookId);
  }
}
