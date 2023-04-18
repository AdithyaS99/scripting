import { Injectable, Inject } from '@nestjs/common';
import { Seat } from './seat.entity';
import { SeatDto } from './dto/seat.dto';
import { User } from '../users/user.entity';
import { MOVIE_REPOSITORY, SEQUELIZE } from 'src/constants';
import { Sequelize } from 'sequelize';

@Injectable()
export class SeatsRepository {
    constructor(
        @Inject(SEQUELIZE) private readonly database: any) {}

    async create(seat: SeatDto): Promise<Seat> {
        //console.log(this.database)
        return this.database.Seat.create(seat);
        //return await this.movieRepository.create<Movie>(movie);
    }

    async findAll(): Promise<Seat[]> {
        return this.database.Seat.findAll();
    }

    async findOne(id): Promise<Seat> {
        return await this.database.Seat.findOne({
        	where: { id },
    	});
    }

    async delete(id) {
        return await this.database.Seat.destroy({ where: { id } });
    }

    async update(id, data) {
        const [numberOfAffectedRows, [updatedseat]] = await this.database.Seat.update({ ...data }, { where: { id }, returning: true });
        return { numberOfAffectedRows, updatedseat };
    }
}