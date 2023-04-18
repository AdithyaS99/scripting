import { Injectable, Inject } from '@nestjs/common';
import { Booking } from './booking.entity';
import { BookingDto } from './dto/booking.dto';
import { BookingsRepository } from './booking.repository';
import { RedisService } from '../redis/redis.service';
import { SearchService } from '../search/search.service';
import { MOVIE_INDEX } from 'src/constants';
import { query } from 'express';

@Injectable()
export class BookingsService {

    constructor(@Inject('redisClient') private readonly redisClient: RedisService,
    private readonly bookingRepository: BookingsRepository,
    @Inject('opensearch-client') private readonly openSearchClient: SearchService) {}
    
    async create(booking: BookingDto): Promise<Booking> {
        // this.openSearchClient.addDocToIndex(MOVIE_INDEX, movie);
        return this.bookingRepository.create(booking);
    }

    async findAll(): Promise<Booking[]> {
        // this.openSearchClient.searchAll(MOVIE_INDEX);
        return this.bookingRepository.findAll();
    }

    async findOne(id): Promise<Booking> {
        // const query = {
        //     match: {
        //       id: id
        //     }
        //   }

        // this.openSearchClient.searchDoc(MOVIE_INDEX, query);
        const response = await this.redisClient.getValue(id);
        console.log(response, JSON.stringify(id));
        if(response){
            console.log("\n<<<<\nfrom cache\n<<<<\n");
            return JSON.parse(await this.redisClient.getValue(id));
        }
        else{
            let booking = await this.bookingRepository.findOne(id);
            this.redisClient.setValue(id, booking);
            return booking;
        }
    }

    async delete(id) {
        // this.openSearchClient.deleteDoc(MOVIE_INDEX, id);
        this.openSearchClient.deleteDoc(MOVIE_INDEX, id);
        return this.bookingRepository.delete(id);
    }

    async update(id, data) {
        // this.openSearchClient.updateDoc(MOVIE_INDEX, id, data);
        const numberOfAffectedRows =  this.bookingRepository.update(id, data)[0];
        const updatedbooking =  this.bookingRepository.update(id, data)[1];
        const response = await this.redisClient.getValue(id);
        this.redisClient.setValue(id, data)

        return { numberOfAffectedRows, updatedbooking };
    }
}