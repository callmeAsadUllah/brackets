import { PipeTransform, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class HashPasswordPipe implements PipeTransform {
  async transform(value: any) {
    if (!value.password) {
      throw new Error('password must not be undefined');
    }
    const hashedPassword = await bcrypt.hash(value.password, 10);
    value.password = hashedPassword;
    return value;
  }
}
