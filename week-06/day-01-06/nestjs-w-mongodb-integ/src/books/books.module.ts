import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './book.schema';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

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
    // forwardRef(() => AuthModule),
  ],
  controllers: [BooksController],
  providers: [BooksService],
  exports: [BooksService],
})
export class BooksModule {}
