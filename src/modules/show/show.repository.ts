import { Injectable, Inject } from '@nestjs/common';
import { Show } from './show.entity';
import { ShowDto } from './dto/show.dto';
import { User } from '../users/user.entity';
import { MOVIE_REPOSITORY, SEQUELIZE } from 'src/constants';
import { Sequelize } from 'sequelize';

@Injectable()
export class ShowsRepository {
    constructor(
        @Inject(SEQUELIZE) private readonly database: any) {}

    async create(show: ShowDto): Promise<Show> {
        //console.log(this.database)
        return this.database.Show.create(show);
        //return await this.movieRepository.create<Movie>(movie);
    }

    async findAll(): Promise<Show[]> {
        return this.database.Show.findAll();
    }

    async findOne(id): Promise<Show> {
        return await this.database.Show.findOne({
        	where: { id },
    	});
    }

    async delete(id) {
        return await this.database.Show.destroy({ where: { id } });
    }

    async update(id, data) {
        const [numberOfAffectedRows, [updatedshow]] = await this.database.Show.update({ ...data }, { where: { id }, returning: true });
        return { numberOfAffectedRows, updatedshow };
    }
}