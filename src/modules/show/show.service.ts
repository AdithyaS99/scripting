import { Injectable, Inject } from '@nestjs/common';
import { Show } from './show.entity';
import { ShowDto } from './dto/show.dto';
import { ShowsRepository } from './show.repository';
import { RedisService } from '../redis/redis.service';
import { SearchService } from '../search/search.service';
import { MOVIE_INDEX } from 'src/constants';
import { query } from 'express';

@Injectable()
export class ShowsService {

    constructor(@Inject('redisClient') private readonly redisClient: RedisService,
    private readonly showRepository: ShowsRepository,
    @Inject('opensearch-client') private readonly openSearchClient: SearchService) {}
    
    async create(show: ShowDto): Promise<Show> {
        // this.openSearchClient.addDocToIndex(MOVIE_INDEX, movie);
        return this.showRepository.create(show);
    }

    async findAll(): Promise<Show[]> {
        // this.openSearchClient.searchAll(MOVIE_INDEX);
        return this.showRepository.findAll();
    }

    async findOne(id): Promise<Show> {
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
            let show = await this.showRepository.findOne(id);
            this.redisClient.setValue(id, show);
            return show;
        }
    }

    async delete(id) {
        // this.openSearchClient.deleteDoc(MOVIE_INDEX, id);
        return this.showRepository.delete(id);
    }

    async update(id, data) {
        // this.openSearchClient.updateDoc(MOVIE_INDEX, id, data);
        const numberOfAffectedRows =  this.showRepository.update(id, data)[0];
        const updatedshow =  this.showRepository.update(id, data)[1];
        const response = await this.redisClient.getValue(id);
        this.redisClient.setValue(id, data)

        return { numberOfAffectedRows, updatedshow };
    }
}