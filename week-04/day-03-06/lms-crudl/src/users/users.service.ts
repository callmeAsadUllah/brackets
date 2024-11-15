import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterUserDTO } from './register-user.dto';
import { UserDocument } from './user.type';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import {
  IUserResponse,
  IUserLogInResponse,
  IUserRegisterResponse,
} from 'src/interfaces/response.interface';
import * as bcryptjs from 'bcryptjs';
import { LogInUserDTO } from './log-in-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  private async generateAccessToken(user): Promise<string> {
    const payload = {
      userId: user._id,
      username: user.username,
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user.email,
      role: user.role,
      books: user?.books,
    };
    const secretKey = await this.authService.getAccessToken();
    const expiresIn = await this.authService.getAccessTokenExpiry();
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: secretKey,
      expiresIn,
    });
    return accessToken;
  }

  private async generateRefreshToken(user): Promise<string> {
    const payload = { userId: user._id };
    const secretKey = await this.authService.getRefreshToken();
    const expiresIn = await this.authService.getRefreshTokenExpiry();
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: secretKey,
      expiresIn,
    });
    return refreshToken;
  }

  async findUsersList(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    return users;
  }

  async registerUser(
    registerUserDTO: RegisterUserDTO,
  ): Promise<IUserRegisterResponse> {
    const existingUserEmail = await this.findOneUserByEmail(
      registerUserDTO.email,
    );

    if (existingUserEmail) {
      throw new HttpException(
        `User already exists with this ${existingUserEmail}.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const existingUserUsername = await this.findOneUserByUsername(
      registerUserDTO.username,
    );

    if (existingUserUsername) {
      throw new HttpException(
        `User already exists with this ${existingUserUsername}.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const registeringUser = new this.userModel({
      ...registerUserDTO,
    });

    const user = await registeringUser.save();

    return {
      message: 'User registered successfully',
      data: user,
    };
  }

  private async validatePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcryptjs.compare(plainPassword, hashedPassword);
  }

  async logInUser(logInUserDTO: LogInUserDTO): Promise<IUserLogInResponse> {
    const user = await this.findOneUserByEmail(logInUserDTO.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.validatePassword(
      logInUserDTO.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = await this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user);

    return {
      message: 'Login successful',
      data: user,
      accessToken,
      refreshToken,
    };
  }

  //
  //   async refreshToken(refreshToken: string): Promise<object> {
  //     const secretKey = await this.authService.getRefreshToken();
  //     const decodedToken = await this.jwtService.verifyAsync(refreshToken, {
  //       secret: secretKey,
  //     });
  //     const user = await this.findOneUserById(decodedToken.userId);
  //
  //     const accessToken = await this.generateAccessToken(user);
  //     const newRefreshToken = await this.generateRefreshToken(user);
  //     user.refreshToken = newRefreshToken;
  //     // await user.save();
  //     return {
  //       accessToken,
  //       refreshToken: newRefreshToken,
  //     };
  //   }
  //
  //   async logOutUser(userId: string): Promise<object> {
  //     let logOutUser = await this.userModel.findOneAndUpdate(
  //       { _id: userId },
  //       { $unset: { refreshToken: 1 } },
  //       { new: true },
  //     );
  //
  //     logOutUser = await this.userModel
  //       .findById(userId)
  //       .select('-_id -password -createdAt -updatedAt -__v -refreshToken -books');
  //
  //     return {
  //       message: 'User logged Out Successfully',
  //       logOutUser: logOutUser,
  //     };
  //   }

  async findOneUserById(userId: string): Promise<IUserResponse> {
    const user = await this.userModel
      .findById(userId)
      .populate('books')
      .select('-password -refreshToken -role')
      .exec();
    console.log(user);

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return {
      message: 'User found',
      data: user,
    };
  }

  async findOneUserByEmail(email: string): Promise<UserDocument | null> {
    const user = await this.userModel
      .findOne({ email: email })
      .populate('books')
      .select('-password -refreshToken -role')
      .exec();

    if (user) {
      throw new HttpException(
        `User with email ${email} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return null;
  }

  async findOneUserByUsername(username: string): Promise<UserDocument | null> {
    const user = await this.userModel
      .findOne({ username: username })
      .populate('books')
      .select('-password -refreshToken -role')
      .exec();

    if (user) {
      throw new HttpException(
        `User with username ${username} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return null;
  }
}
