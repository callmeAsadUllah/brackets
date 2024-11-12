import { SetMetadata } from '@nestjs/common';
import { GenreEnum } from './genre.enum';

export const Genres = (...genres: GenreEnum[]) => SetMetadata('genres', genres);
