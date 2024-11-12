import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class AuthPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    return value;
  }
}
