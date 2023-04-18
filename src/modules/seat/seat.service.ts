import { Injectable, Inject } from '@nestjs/common';
import { Seat } from './seat.entity';
import { SeatDto } from './dto/seat.dto';
import { SeatsRepository } from './seat.repository';
import { RedisService } from '../redis/redis.service';
import { SearchService } from '../search/search.service';
import { MOVIE_INDEX } from 'src/constants';
import { query } from 'express';

@Injectable()
export class SeatsService {

    constructor(@Inject('redisClient') private readonly redisClient: RedisService,
    private readonly seatRepository: SeatsRepository,
    @Inject('opensearch-client') private readonly openSearchClient: SearchService) {}
    
    async create(seat: SeatDto): Promise<Seat> {
        // this.openSearchClient.addDocToIndex(MOVIE_INDEX, movie);
        return this.seatRepository.create(seat);
    }

    async findAll(): Promise<Seat[]> {
        // this.openSearchClient.searchAll(MOVIE_INDEX);
        return this.seatRepository.findAll();
    }

    async findOne(id): Promise<Seat> {
        // const query = {
        //     match: {
        //       id: id
        //     }
        //   }

        // this.openSearchClient.searchDoc(MOVIE_INDEX, query);
        const response = await this.redisClient.getValue(id);
        console.log(response, JSON.stringify(id));
        if(response){
            return JSON.parse(await this.redisClient.getValue(id));
        }
        else{
            let seat = await this.seatRepository.findOne(id);
            this.redisClient.setValue(id, seat);
            return seat;
        }
    }

    async delete(id) {
        // this.openSearchClient.deleteDoc(MOVIE_INDEX, id);
        return this.seatRepository.delete(id);
    }

    async update(id, data) {
        // this.openSearchClient.updateDoc(MOVIE_INDEX, id, data);
        const numberOfAffectedRows =  this.seatRepository.update(id, data)[0];
        const updatedseat =  this.seatRepository.update(id, data)[1];
        const response = await this.redisClient.getValue(id);
        this.redisClient.setValue(id, data)

        return { numberOfAffectedRows, updatedseat };
    }
}