import { PipeTransform, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { RegisterUserDTO } from 'src/users/register-user.dto';

@Injectable()
export class HashPasswordPipe implements PipeTransform {
  async transform(value: RegisterUserDTO) {
    if (!value.password) {
      throw new Error('password must not be undefined');
    }
    const hashedPassword = await bcrypt.hash(value.password, 10);
    return {
      ...value,
      password: hashedPassword,
    };
  }
}
