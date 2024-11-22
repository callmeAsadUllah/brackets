import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import {
  CreateAuthorDTO,
  UpdateAuthorDTO,
  UpdateAuthorPartialDTO,
} from './dtos/author.dto';
import { IResponse } from 'src/common/interfaces/response.interface';
import { IAuthor } from './interfaces/author.interface';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  async authors(): Promise<IResponse<IAuthor[]>> {
    return await this.authorsService.authors();
  }

  @Post()
  async createAuthor(
    @Body() createAuthorDTO: CreateAuthorDTO,
  ): Promise<IResponse<IAuthor>> {
    return await this.authorsService.createAuthor(createAuthorDTO);
  }

  @Put(':authorId')
  async findOneAuthorByIdAndUpdate(
    @Param('authorId') authorId: string,
    @Body() updateAuthorDTO: UpdateAuthorDTO,
  ): Promise<IResponse<IAuthor>> {
    return await this.authorsService.findOneAuthorByIdAndUpdate(
      authorId,
      updateAuthorDTO,
    );
  }

  @Patch(':authorId')
  async findOneBookByIdAndUpdatePartial(
    @Param('authorId') authorId: string,
    @Body() updateAuthorPartialDTO: UpdateAuthorPartialDTO,
  ): Promise<IResponse<IAuthor>> {
    return await this.authorsService.findOneBookByIdAndUpdatePartial(
      authorId,
      updateAuthorPartialDTO,
    );
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
