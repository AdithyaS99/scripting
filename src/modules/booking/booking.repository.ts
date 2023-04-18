import { Injectable, Inject } from '@nestjs/common';
import { Booking } from './booking.entity';
import { BookingDto } from './dto/booking.dto';
import { User } from '../users/user.entity';
import { MOVIE_REPOSITORY, SEQUELIZE } from 'src/constants';
import { Sequelize } from 'sequelize';

@Injectable()
export class BookingsRepository {
    constructor(
        @Inject(SEQUELIZE) private readonly database: any) {}

    async create(booking: BookingDto): Promise<Booking> {
        //console.log(this.database)
        return this.database.Booking.create(booking);
        //return await this.movieRepository.create<Movie>(movie);
    }

    async findAll(): Promise<Booking[]> {
        return this.database.Booking.findAll();
    }

    async findOne(id): Promise<Booking> {
        return await this.database.Booking.findOne({
        	where: { id },
    	});
    }

    async delete(id) {
        return await this.database.Booking.destroy({ where: { id } });
    }

    async update(id, data) {
        const [numberOfAffectedRows, [updatedbooking]] = await this.database.Booking.update({ ...data }, { where: { id }, returning: true });
        return { numberOfAffectedRows, updatedbooking };
    }
}