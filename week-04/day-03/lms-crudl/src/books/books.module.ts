import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { Book, BookSchema } from './book.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { PaginationPipe } from 'pagination/pagination.pipe';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Book.name,
        useFactory: () => {
          return BookSchema;
        },
      },
    ]),
  ],
  exports: [BooksService],
  controllers: [BooksController],
  providers: [BooksService, PaginationPipe],
})
export class BooksModule {}
