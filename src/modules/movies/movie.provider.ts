import { Movie } from './movie.entity';
import { MOVIE_REPOSITORY } from '../../constants';

export const movieProviders = [{
    provide: MOVIE_REPOSITORY,
    useValue: Movie,
}];
