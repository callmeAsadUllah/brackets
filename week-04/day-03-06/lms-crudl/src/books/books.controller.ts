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
  NotFoundException,
  Query,
  UsePipes,
  UseInterceptors,
} from '@nestjs/common';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { BooksService } from './books.service';
import { UpdateBookDTO } from './update-book.dto';
import { CreateBookDTO } from './create-book.dto';
import { RoleEnum } from 'src/roles/roles.enum';
import { UpdateBookPartialDTO } from './update-book-partial.dto';
import { BookDocument } from './book.type';
import { VerifyAdminGuard } from 'src/guards/verify-admin.guard';
import { PaginationPipe } from 'src/pipes/pagination/pagination.pipe';
import { VerifyAccessTokenInterceptor } from 'src/interceptors/verify-access-token.interceptor';

@Controller('books')
@UseGuards(RolesGuard)
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @UseGuards(VerifyAdminGuard)
  @Roles(RoleEnum.ADMIN)
  async createBook(
    @Body() createBookDTO: CreateBookDTO,
  ): Promise<BookDocument> {
    return await this.booksService.createBook(createBookDTO);
  }

  @Put(':bookId')
  @UseGuards(VerifyAdminGuard)
  @Roles(RoleEnum.ADMIN)
  async updateBook(
    @Body() updateBookDTO: UpdateBookDTO,
    @Param('bookId') bookId: string,
  ): Promise<BookDocument> {
    return await this.booksService.updateBook(updateBookDTO, bookId);
  }

  @Patch(':bookId')
  @UseGuards(VerifyAdminGuard)
  @Roles(RoleEnum.ADMIN)
  async updateBookPartial(
    @Body() updateBookPartialDTO: UpdateBookPartialDTO,
    @Param('bookId') bookId: string,
  ): Promise<BookDocument> {
    return await this.booksService.updateBook(updateBookPartialDTO, bookId);
  }

  @Get('list')
  @UsePipes(PaginationPipe)
  @Roles(RoleEnum.ADMIN, RoleEnum.USER)
  async findListBooks(
    @Query() paginationParams: { page: number; limit: number },
  ): Promise<{
    data: BookDocument[];
    total: number;
    page: number;
    limit: number;
  }> {
    return await this.booksService.findListBooks(paginationParams);
  }

  @Get(':title')
  @Roles(RoleEnum.ADMIN, RoleEnum.USER)
  async findBookByTitle(
    @Query('title') title: string,
  ): Promise<BookDocument[]> {
    const books = await this.booksService.findBookByTitle(title);
    if (books.length === 0) {
      throw new NotFoundException(
        `No books found with name containing "${title}"`,
      );
    }
    return books;
  }

  @Post(':bookId/borrow')
  @UseInterceptors(VerifyAccessTokenInterceptor)
  @Roles(RoleEnum.ADMIN, RoleEnum.USER)
  async findBorrowedBooksByUserId(
    @Param('userId') userId: string,
    @Param('bookId') bookId: string,
  ): Promise<string> {
    return await this.booksService.findBorrowedBooksByUserId(userId, bookId);
  }

  @Post(':bookId/return')
  @UseInterceptors(VerifyAccessTokenInterceptor)
  @Roles(RoleEnum.ADMIN, RoleEnum.USER)
  async findReturnedBooksByUserId(
    @Param('userId') userId: string,
    @Param('bookId') bookId: string,
  ): Promise<string> {
    return await this.booksService.findReturnedBooksByUserId(userId, bookId);
  }

  @Delete(':bookId')
  @UseGuards(VerifyAdminGuard)
  @Roles(RoleEnum.ADMIN)
  async deleteBookById(@Param('bookId') bookId: string): Promise<BookDocument> {
    return await this.booksService.deleteBookById(bookId);
  }
}
