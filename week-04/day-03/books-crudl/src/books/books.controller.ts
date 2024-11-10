import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('books')
export class BooksController {
  @Get()
  @UseGuards(AuthGuard)
  getBooks() {
    return 'Get all books';
  }
}
