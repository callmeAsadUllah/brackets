import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterUserDTO } from './register-user.dto';
import { UserDocument } from './user.type';
import { LogInUserDTO } from './log-in-user.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';

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

  async registerUser(registerUserDTO: RegisterUserDTO): Promise<User> {
    const registeredUser = new this.userModel({
      ...registerUserDTO,
    });
    return await registeredUser.save();
  }

  async logInUser(
    logInUserDTO: LogInUserDTO,
  ): Promise<{ user: User; accessToken: string; refreshToken: string }> {
    const user = await this.userModel
      .findOne({ email: logInUserDTO.email })
      .exec();

    if (!user) {
      throw new Error('User not found');
    }
    const isPasswordCorrect = await bcrypt.compare(
      logInUserDTO.password,
      user.password,
    );
    if (!isPasswordCorrect) throw new Error('Incorrect password');

    const accessToken = await this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user);

    if (!refreshToken || !accessToken) throw new Error('error');

    user.refreshToken = refreshToken;
    await user.save();

    const loggedInUser = await this.userModel
      .findById(user._id)
      .select('-password -refreshToken');

    return {
      user: loggedInUser,
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(refreshToken: string): Promise<object> {
    const secretKey = await this.authService.getRefreshToken();
    const decodedToken = await this.jwtService.verifyAsync(refreshToken, {
      secret: secretKey,
    });
    const user = await this.findUserById(decodedToken.userId);

    const accessToken = await this.generateAccessToken(user);
    const newRefreshToken = await this.generateRefreshToken(user);
    user.refreshToken = newRefreshToken;
    // await user.save();
    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  }

  async logOutUser(userId: string): Promise<object> {
    let logOutUser = await this.userModel.findOneAndUpdate(
      { _id: userId },
      { $unset: { refreshToken: 1 } },
      { new: true },
    );

    logOutUser = await this.userModel
      .findById(userId)
      .select('-_id -password -createdAt -updatedAt -__v -refreshToken -books');

    return {
      message: 'User logged Out Successfully',
      logOutUser: logOutUser,
    };
  }

  async findUserById(userId: string): Promise<User | null> {
    return this.userModel.findById(userId).exec();
  }
}
