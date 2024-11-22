import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './book.schema';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { AuthorsModule } from 'src/authors/authors.module';
import { Author, AuthorSchema } from 'src/authors/author.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Book.name,
        useFactory: () => {
          return BookSchema;
        },
      },
      {
        name: Author.name,
        useFactory: () => {
          return AuthorSchema;
        },
      },
    ]),
    forwardRef(() => AuthorsModule),
  ],
  controllers: [BooksController],
  providers: [BooksService],
  exports: [BooksService],
})
export class BooksModule {}
