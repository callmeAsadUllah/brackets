import { SetMetadata } from '@nestjs/common';
import { GenreEnum } from './genre.enum';
import { GENRES_KEY } from './genres.metadata';

export const Genres = (...genres: GenreEnum[]) =>
  SetMetadata(GENRES_KEY, genres);
