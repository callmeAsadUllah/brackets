import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Author, AuthorSchema } from './author.schema';
@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Author.name,
        useFactory: () => {
          return AuthorSchema;
        },
      },
    ]),
  ],
  providers: [AuthorsService],
  controllers: [AuthorsController],
  exports: [AuthorsService],
})
export class AuthorsModule {}
