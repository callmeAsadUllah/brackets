import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Author, AuthorDocument } from './author.schema';
import { Model } from 'mongoose';
import { IAuthor } from 'src/common/interfaces/author.interface';
import { IResponse } from 'src/common/interfaces/response.interface';
import { CreateAuthorDTO } from './dtos/author.dto';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectModel(Author.name) private authorsModel: Model<AuthorDocument>,
  ) {}

  async authors(): Promise<IResponse<IAuthor[]>> {
    const authors = await this.authorsModel.find().exec();
    return { message: 'Authors fetched successfully', data: authors };
  }

  async createBook(
    createAuthorDTO: CreateAuthorDTO,
  ): Promise<IResponse<IAuthor>> {
    const author = new this.authorsModel(createAuthorDTO);
    await author.save();
    return { message: 'Book created successfully', data: author };
  }

  async findOneAuthorById(authorId: string): Promise<IResponse<IAuthor>> {
    const author = await this.authorsModel.findById(authorId).exec();
    return { message: 'Author fetched successfully', data: author };
  }

  async findOneAuthorByAndDelete(authorId: string): Promise<IResponse<void>> {
    await this.authorsModel.findByIdAndDelete(authorId).exec();
    return { message: 'Author deleted successfully', data: null };
  }
}
