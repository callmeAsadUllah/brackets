import { forwardRef, Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Author, AuthorSchema } from './author.schema';
import { Book, BookSchema } from 'src/books/book.schema';
import { BooksModule } from 'src/books/books.module';
@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Author.name,
        useFactory: () => {
          return AuthorSchema;
        },
      },
      {
        name: Book.name,
        useFactory: () => {
          return BookSchema;
        },
      },
    ]),
    forwardRef(() => BooksModule),
  ],
  providers: [AuthorsService],
  controllers: [AuthorsController],
  exports: [AuthorsService],
})
export class AuthorsModule {}
