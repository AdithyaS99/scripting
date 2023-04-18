import { Injectable, Inject } from '@nestjs/common';
import { Theatre } from './theatre.entity';
import { TheatreDto } from './dto/theatre.dto';
import { User } from '../users/user.entity';
import { MOVIE_REPOSITORY, SEQUELIZE } from 'src/constants';
import { Sequelize } from 'sequelize';

@Injectable()
export class TheatresRepository {
    constructor(
        @Inject(SEQUELIZE) private readonly database: any) {}

    async create(theatre: TheatreDto): Promise<Theatre> {
        //console.log(this.database)
        return this.database.Theatre.create(theatre);
        //return await this.movieRepository.create<Movie>(movie);
    }

    async findAll(): Promise<Theatre[]> {
        return this.database.Theatre.findAll();
    }

    async findOne(id): Promise<Theatre> {
        return await this.database.Theatre.findOne({
        	where: { id },
    	});
    }

    async delete(id) {
        return await this.database.Theatre.destroy({ where: { id } });
    }

    async update(id, data) {
        const [numberOfAffectedRows, [updatedtheatre]] = await this.database.Theatre.update({ ...data }, { where: { id }, returning: true });
        return { numberOfAffectedRows, updatedtheatre };
    }
}