import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class HashPasswordPipe implements PipeTransform {
  async transform(value: any) {
    if (value.password) {
      try {
        const hashedPassword = await bcryptjs.hash(value.password, 10);
        value.password = hashedPassword;
      } catch {
        throw new BadRequestException('Error hashing password');
      }
    } else {
      throw new BadRequestException('Password is required');
    }
    return value;
  }
}
