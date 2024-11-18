import {
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterUserDTO } from '../users/register-user.dto';
import { ConfigService } from '@nestjs/config';
import { LogInUserDTO } from 'src/users/log-in-user.dto';
import { User } from 'src/users/user.schema';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from 'src/users/user.type';
import { Model } from 'mongoose';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async getAccessToken(): Promise<string> {
    const token = this.configService.get<string>('ACCESS_TOKEN');
    return token;
  }

  async getAccessTokenExpiry(): Promise<string> {
    const expiry = this.configService.get<string>('ACCESS_TOKEN_EXPIRY');
    return expiry;
  }

  async getRefreshToken(): Promise<string> {
    const token = this.configService.get<string>('REFRESH_TOKEN');
    return token;
  }

  async getRefreshTokenExpiry(): Promise<string> {
    const expiry = this.configService.get<string>('REFRESH_TOKEN_EXPIRY');
    return expiry;
  }

  async refreshToken(
    refreshToken: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const secretKey = await this.getRefreshToken();
    const decodedToken = await this.jwtService.verifyAsync(refreshToken, {
      secret: secretKey,
    });
    const user = await this.userModel.findById(decodedToken.userId);

    if (!user || user.refreshToken !== refreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const accessToken = await this.generateAccessToken(user);
    const newRefreshToken = await this.generateRefreshToken(user);

    if (!accessToken || !newRefreshToken) {
      throw new ForbiddenException('there is an issue with tokens');
    }

    user.refreshToken = newRefreshToken;

    await user.save();

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  }

  async logOutUser(userId: string): Promise<{ user: User }> {
    const user = await this.userModel.findOneAndUpdate(
      { _id: userId },
      { $unset: { refreshToken: 1 } },
      { new: true },
    );

    if (!user) {
      throw new Error('user not found');
    }
    const loggedOutUser = await this.userModel
      .findById(user._id)
      .select('-password -refreshToken -createdAt -updatedAt -__v');

    return {
      user: loggedOutUser,
    };
  }

  private async generateAccessToken(user): Promise<string> {
    const payload = {
      userId: user._id,
      username: user.username,
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user.email,
      role: user.role,
    };
    const secretKey = await this.getAccessToken();
    const expiresIn = await this.getAccessTokenExpiry();
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: secretKey,
      expiresIn,
    });
    return accessToken;
  }

  private async generateRefreshToken(user): Promise<string> {
    const payload = { userId: user._id };
    const secretKey = await this.getRefreshToken();
    const expiresIn = await this.getRefreshTokenExpiry();
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: secretKey,
      expiresIn,
    });
    return refreshToken;
  }

  async registerUser(registerUserDTO: RegisterUserDTO): Promise<User> {
    const existingUserEmail = await this.userModel.findOne({
      email: registerUserDTO.email,
    });

    if (existingUserEmail) {
      console.log(`User already exists with this ${existingUserEmail}.`);
      throw new ConflictException(
        `User already exists with this ${existingUserEmail}.`,
      );
    }

    const existingUserUsername = await this.userModel.findOne({
      username: registerUserDTO.username,
    });

    if (existingUserUsername) {
      console.log(`User already exists with this ${existingUserUsername}.`);
      throw new ConflictException(
        `User already exists with this ${existingUserUsername}.`,
      );
    }

    const registeringUser = new this.userModel({
      ...registerUserDTO,
    });

    const user = await registeringUser.save();

    return user;
  }

  private async validatePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcryptjs.compare(plainPassword, hashedPassword);
  }

  async logInUser(
    logInUserDTO: LogInUserDTO,
  ): Promise<{ user: User; accessToken: string; refreshToken: string }> {
    const loggedInUser = await this.userModel.findOne({
      email: logInUserDTO.email,
    });

    if (!loggedInUser) {
      console.log('Invalid credentials');
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.validatePassword(
      logInUserDTO.password,
      loggedInUser.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = await this.generateAccessToken(loggedInUser);
    const refreshToken = await this.generateRefreshToken(loggedInUser);

    loggedInUser.refreshToken = refreshToken;

    await loggedInUser.save();

    return {
      user: loggedInUser,
      accessToken,
      refreshToken,
    };
  }
}
