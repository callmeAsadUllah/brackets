import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class PaginationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const defaultPage = 1;
    const defaultLimit = 10;

    const page = value.page ? parseInt(value.page, 10) : defaultPage;
    const limit = value.limit ? parseInt(value.limit, 10) : defaultLimit;

    if (isNaN(page) || page <= 0) {
      throw new BadRequestException('Page must be a positive integer');
    }

    if (isNaN(limit) || limit <= 0 || limit > 100) {
      throw new BadRequestException(
        'Limit must be a positive integer and cannot exceed 100',
      );
    }

    return {
      page,
      limit,
    };
  }
}
