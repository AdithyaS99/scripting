import { Injectable, Inject } from '@nestjs/common';
import { ShowScreen } from './show-screen.entity';
import { ShowScreenDto } from './dto/show-screen.dto';
import { User } from '../users/user.entity';
import { MOVIE_REPOSITORY, SEQUELIZE } from 'src/constants';
import { Sequelize } from 'sequelize';

@Injectable()
export class ShowScreenRepository {
    constructor(
        @Inject(SEQUELIZE) private readonly database: any) {}

    async create(showScreen: ShowScreenDto): Promise<ShowScreen> {
        //console.log(this.database)
        return this.database.ShowScreen.create(showScreen);
        //return await this.movieRepository.create<Movie>(movie);
    }

    async findAll(): Promise<ShowScreen[]> {
        return this.database.ShowScreen.findAll();
    }

    async findOne(id): Promise<ShowScreen> {
        return await this.database.ShowScreen.findOne({
        	where: { id },
    	});
    }

    async delete(id) {
        return await this.database.ShowScreen.destroy({ where: { id } });
    }

    async update(id, data) {
        const [numberOfAffectedRows, [updatedshowscreen]] = await this.database.ShowScreen.update({ ...data }, { where: { id }, returning: true });
        return { numberOfAffectedRows, updatedshowscreen };
    }
}