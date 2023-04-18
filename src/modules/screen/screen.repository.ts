import { Injectable, Inject } from '@nestjs/common';
import { Screen } from './screen.entity';
import { ScreenDto } from './dto/screen.dto';
import { User } from '../users/user.entity';
import { MOVIE_REPOSITORY, SEQUELIZE } from 'src/constants';
import { Sequelize } from 'sequelize';

@Injectable()
export class ScreensRepository {
    constructor(
        @Inject(SEQUELIZE) private readonly database: any) {}

    async create(screen: ScreenDto): Promise<Screen> {
        //console.log(this.database)
        return this.database.Screen.create(screen);
        //return await this.movieRepository.create<Movie>(movie);
    }

    async findAll(): Promise<Screen[]> {
        return this.database.Screen.findAll();
    }

    async findOne(id): Promise<Screen> {
        return await this.database.Screen.findOne({
        	where: { id },
    	});
    }

    async delete(id) {
        return await this.database.Screen.destroy({ where: { id } });
    }

    async update(id, data) {
        const [numberOfAffectedRows, [updatedscreen]] = await this.database.Screen.update({ ...data }, { where: { id }, returning: true });
        return { numberOfAffectedRows, updatedscreen };
    }
}