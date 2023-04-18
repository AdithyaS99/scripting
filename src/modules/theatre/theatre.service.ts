import { Injectable, Inject } from '@nestjs/common';
import { Theatre } from './theatre.entity';
import { TheatreDto } from './dto/theatre.dto';
import { TheatresRepository } from './theatre.repository';
import { RedisService } from '../redis/redis.service';
import { SearchService } from '../search/search.service';
import { MOVIE_INDEX } from 'src/constants';
import { query } from 'express';

@Injectable()
export class TheatresService {

    constructor(@Inject('redisClient') private readonly redisClient: RedisService,
    private readonly theatreRepository: TheatresRepository,
    @Inject('opensearch-client') private readonly openSearchClient: SearchService) {}
    
    async create(theatre: TheatreDto): Promise<Theatre> {
        // this.openSearchClient.addDocToIndex(MOVIE_INDEX, movie);
        return this.theatreRepository.create(theatre);
    }

    async findAll(): Promise<Theatre[]> {
        // this.openSearchClient.searchAll(MOVIE_INDEX);
        return this.theatreRepository.findAll();
    }

    async findOne(id): Promise<Theatre> {
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
            let theatre = await this.theatreRepository.findOne(id);
            this.redisClient.setValue(id, theatre);
            return theatre;
        }
    }

    async delete(id) {
        // this.openSearchClient.deleteDoc(MOVIE_INDEX, id);
        return this.theatreRepository.delete(id);
    }

    async update(id, data) {
        // this.openSearchClient.updateDoc(MOVIE_INDEX, id, data);
        const numberOfAffectedRows =  this.theatreRepository.update(id, data)[0];
        const updatedtheatre =  this.theatreRepository.update(id, data)[1];
        const response = await this.redisClient.getValue(id);
        this.redisClient.setValue(id, data)

        return { numberOfAffectedRows, updatedtheatre };
    }
}