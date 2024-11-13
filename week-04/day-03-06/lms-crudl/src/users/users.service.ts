import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterUserDTO } from './register-user.dto';
import { UserDocument } from './user.type';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import {
  IUserResponse,
  IUserRegisterResponse,
} from 'src/interfaces/response.interface';
import * as bcryptjs from 'bcryptjs';
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

  // async registerUser(
  //   registerUserDTO: RegisterUserDTO,
  // ): Promise<IUserRegisterResponse> {
  //   const existingUserEmail = await this.findOneUserByEmail(
  //     registerUserDTO.email,
  //   );
  //   if (existingUserEmail) {
  //     throw new Error('User already exists with this email.');
  //   }
  //   const existingUserUsername = await this.findOneUserByUsername(
  //     registerUserDTO.username,
  //   );
  //   if (existingUserUsername) {
  //     throw new Error('User already exists with this username.');
  //   }
  //   const registeringUser = new this.userModel({
  //     ...registerUserDTO,
  //   });
  //   const user = await registeringUser.save();
  //   return {
  //     message: '',
  //     data: user,
  //   };
  // }

  //   async logInUser(logInUserDTO: LogInUserDTO): Promise<IUserLogInResponse> {
  //     const user = await this.findOneUserByEmail(logInUserDTO.email);
  //
  //     if (!user) {
  //       throw new Error('User not found');
  //     }
  //
  //     const isPasswordValid = await this.validatePassword(
  //       logInUserDTO.password,
  //       user.password,
  //     );
  //     if (!isPasswordValid) {
  //       throw new Error('Incorrect password');
  //     }
  //
  //     const accessToken = await this.generateAccessToken(user);
  //     const refreshToken = await this.generateRefreshToken(user);
  //
  //     if (!refreshToken || !accessToken) throw new Error('error');
  //
  //     user.refreshToken = refreshToken;
  //     await user.save();
  //
  //     const loggedInUser = await this.userModel
  //       .findById(user._id)
  //       .select('-password -refreshToken');
  //
  //     return;
  //   }

  async validatePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const isPasswordValid = await bcryptjs.compare(
      plainPassword,
      hashedPassword,
    );
    return isPasswordValid;
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

    if (!user) {
      return { message: 'User not found', data: null };
    }

    return {
      message: 'User found',
      data: {
        username: user.username,
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user.email,
        role: {
          name: user.role,
        },
      },
    };
  }

  async findOneUserByUsername(username: string): Promise<IUserResponse> {
    const user = await this.userModel.findOne({ $or: [{ username }] }).exec();
    return { message: '', data: user };
  }

  async findOneUserByEmail(email: string): Promise<IUserResponse> {
    const user = await this.userModel.findOne({ $or: [{ email }] }).exec();
    return { message: '', data: user };
  }
}
