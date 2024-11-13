import { Controller, Get, Param, Res, HttpStatus } from '@nestjs/common';
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
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  @Get(':userId')
  async findOneUserById(
    @Param('userId') userId: string,
    @Res() response: Response,
  ): Promise<void> {
    const result = await this.usersService.findOneUserById(userId);

    if (!result.data) {
      response.status(HttpStatus.NOT_FOUND).json({
        message: 'User not found',
        data: null,
      });
    }

    response.status(HttpStatus.OK).json({
      message: 'User found',
      data: result.data,
    });
  }
}
