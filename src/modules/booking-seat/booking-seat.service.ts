import { Injectable, Inject } from '@nestjs/common';
import { BookingSeat } from './booking-seat.entity';
import { BookingSeatDto } from './dto/booking-seat.dto';
import { BookingSeatRepository } from './booking-seat.repository';
import { RedisService } from '../redis/redis.service';
import { SearchService } from '../search/search.service';
import { MOVIE_INDEX } from 'src/constants';
import { query } from 'express';

@Injectable()
export class BookingSeatService {

    constructor(@Inject('redisClient') private readonly redisClient: RedisService,
    private readonly bookingseatRepository: BookingSeatRepository,
    @Inject('opensearch-client') private readonly openSearchClient: SearchService) {}
    
    async create(bookingseat: BookingSeatDto): Promise<BookingSeat> {
        // this.openSearchClient.addDocToIndex(MOVIE_INDEX, movie);
        return this.bookingseatRepository.create(bookingseat);
    }

    async findAll(): Promise<BookingSeat[]> {
        // this.openSearchClient.searchAll(MOVIE_INDEX);
        return this.bookingseatRepository.findAll();
    }

    async findOne(id): Promise<BookingSeat> {
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
            let bookingseat = await this.bookingseatRepository.findOne(id);
            this.redisClient.setValue(id, bookingseat);
            return bookingseat;
        }
    }

    async delete(id) {
        // this.openSearchClient.deleteDoc(MOVIE_INDEX, id);
        this.openSearchClient.deleteDoc(MOVIE_INDEX, id);
        return this.bookingseatRepository.delete(id);
    }

    async update(id, data) {
        // this.openSearchClient.updateDoc(MOVIE_INDEX, id, data);
        const numberOfAffectedRows =  this.bookingseatRepository.update(id, data)[0];
        const updatedbookingseat =  this.bookingseatRepository.update(id, data)[1];
        const response = await this.redisClient.getValue(id);
        this.redisClient.setValue(id, data)

        return { numberOfAffectedRows, updatedbookingseat };
    }
}