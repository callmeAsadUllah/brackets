import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Author, AuthorDocument } from './author.schema';
import { Model } from 'mongoose';
import { IResponse } from 'src/common/interfaces/response.interface';
import {
  CreateAuthorDTO,
  UpdateAuthorDTO,
  UpdateAuthorPartialDTO,
} from './dtos/author.dto';
import { IAuthor } from './interfaces/author.interface';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectModel(Author.name) private authorsModel: Model<AuthorDocument>,
  ) {}

  async authors(): Promise<IResponse<IAuthor[]>> {
    const authors = await this.authorsModel.find().populate('books').exec();
    return { message: 'Authors fetched successfully', data: authors };
  }

  async createAuthor(
    createAuthorDTO: CreateAuthorDTO,
  ): Promise<IResponse<IAuthor>> {
    const author = new this.authorsModel(createAuthorDTO);
    await author.save();
    return { message: 'Author created successfully', data: author };
  }

  async findOneAuthorByIdAndUpdate(
    authorId: string,
    updateAuthorDTO: UpdateAuthorDTO,
  ): Promise<IResponse<IAuthor>> {
    const updatedAuthor = await this.authorsModel
      .findByIdAndUpdate(authorId, updateAuthorDTO, {
        new: true,
        runValidators: true,
      })
      .exec();

    return {
      message: 'Author updated successfully',
      data: updatedAuthor,
    };
  }

  async findOneBookByIdAndUpdatePartial(
    authorId: string,
    updateAuthorPartialDTO: UpdateAuthorPartialDTO,
  ): Promise<IResponse<IAuthor>> {
    const updatedAuthor = await this.authorsModel
      .findByIdAndUpdate(authorId, updateAuthorPartialDTO, {
        new: true,
        runValidators: true,
      })
      .exec();

    return {
      message: 'Author partially updated successfully',
      data: updatedAuthor,
    };
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
