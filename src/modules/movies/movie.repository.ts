import { Injectable, Inject } from '@nestjs/common';
import { Movie } from './movie.entity';
import { MovieDto } from './dto/movie.dto';
import { User } from '../users/user.entity';
import { MOVIE_REPOSITORY, SEQUELIZE } from 'src/constants';
import { Sequelize } from 'sequelize';

@Injectable()
export class MoviesRepository {
    constructor(
        @Inject(SEQUELIZE) private readonly database: any) {}

    async create(movie: MovieDto): Promise<Movie> {
        //console.log(this.database)
        return this.database.Movie.create(movie);
        //return await this.movieRepository.create<Movie>(movie);
    }

    async findAll(): Promise<Movie[]> {
        return this.database.Movie.findAll();
    }

    async findOne(id): Promise<Movie> {
        return await this.database.Movie.findOne({
        	where: { id },
    	});
    }

    async delete(id) {
        return await this.database.Movie.destroy({ where: { id } });
    }

    async update(id, data) {
        const [numberOfAffectedRows, [updatedmovie]] = await this.database.Movie.update({ ...data }, { where: { id }, returning: true });
        return { numberOfAffectedRows, updatedmovie };
    }
}