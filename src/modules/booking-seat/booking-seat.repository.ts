import { Injectable, Inject } from '@nestjs/common';
import { BookingSeat } from './booking-seat.entity';
import { BookingSeatDto } from './dto/booking-seat.dto';
import { User } from '../users/user.entity';
import { MOVIE_REPOSITORY, SEQUELIZE } from 'src/constants';
import { Sequelize } from 'sequelize';

@Injectable()
export class BookingSeatRepository {
    constructor(
        @Inject(SEQUELIZE) private readonly database: any) {}

    async create(bookingseat: BookingSeatDto): Promise<BookingSeat> {
        //console.log(this.database)
        return this.database.BookingSeat.create(bookingseat);
        //return await this.movieRepository.create<Movie>(movie);
    }

    async findAll(): Promise<BookingSeat[]> {
        return this.database.BookingSeat.findAll();
    }

    async findOne(id): Promise<BookingSeat> {
        return await this.database.BookingSeat.findOne({
        	where: { id },
    	});
    }

    async delete(id) {
        return await this.database.BookingSeat.destroy({ where: { id } });
    }

    async update(id, data) {
        const [numberOfAffectedRows, [updatedbookingseat]] = await this.database.BookingSeat.update({ ...data }, { where: { id }, returning: true });
        return { numberOfAffectedRows, updatedbookingseat};
    }
}