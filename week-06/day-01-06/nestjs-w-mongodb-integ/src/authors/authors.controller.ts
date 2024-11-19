import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDTO } from './dtos/author.dto';
import { IResponse } from 'src/common/interfaces/response.interface';
import { IAuthor } from 'src/common/interfaces/author.interface';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  async authors(): Promise<IResponse<IAuthor[]>> {
    return await this.authorsService.authors();
  }
  @Post()
  async createBook(
    @Body() createAuthorDTO: CreateAuthorDTO,
  ): Promise<IResponse<IAuthor>> {
    return await this.authorsService.createBook(createAuthorDTO);
  }
  @Get(':authorId')
  async findOneAuthorById(
    @Param('authorId') authorId: string,
  ): Promise<IResponse<IAuthor>> {
    return await this.authorsService.findOneAuthorById(authorId);
  }
  @Delete(':authorId')
  async findOneAuthorByAndDelete(
    @Param('authorId') authorId: string,
  ): Promise<IResponse<void>> {
    return await this.authorsService.findOneAuthorByAndDelete(authorId);
  }
}
