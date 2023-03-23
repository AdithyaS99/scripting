import { Injectable, Inject } from '@nestjs/common';
import { Movie } from './movie.entity';
import { MovieDto } from './dto/movie.dto';
import { User } from '../users/user.entity';
import { MOVIE_REPOSITORY } from 'src/constants';

@Injectable()
export class MoviesService {
    constructor(@Inject(MOVIE_REPOSITORY) private readonly movieRepository: typeof Movie) { }

    async create(movie: MovieDto): Promise<Movie> {
        return await this.movieRepository.create<Movie>(movie);
    }

    async findAll(): Promise<Movie[]> {
        return await this.movieRepository.findAll<Movie>();
    }

    async findOne(id): Promise<Movie> {
        return await this.movieRepository.findOne({
        	where: { id },
    	});
    }

    async delete(id) {
        return await this.movieRepository.destroy({ where: { id } });
    }

    async update(id, data) {
        const [numberOfAffectedRows, [updatedmovie]] = await this.movieRepository.update({ ...data }, { where: { id }, returning: true });

        return { numberOfAffectedRows, updatedmovie };
    }
}