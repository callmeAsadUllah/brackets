import {
  Controller,
  Get,
  Param,
  Res,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from './user.type';
import { UsersService } from './users.service';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  @Get(':userId')
  async findOneUserById(
    @Param('userId') userId: string,
    @Res() response: Response,
  ): Promise<void> {
    try {
      const result = await this.usersService.findOneUserById(userId);

      if (!result.data) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }

      response.status(HttpStatus.OK).json({
        message: 'User found',
        data: result.data,
      });
    } catch (error) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'An error occurred',
        error: error.message,
      });
    }
  }
}
