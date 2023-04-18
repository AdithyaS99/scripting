import { Injectable, Inject } from '@nestjs/common';
import { Screen } from './screen.entity';
import { ScreenDto } from './dto/screen.dto';
import { ScreensRepository } from './screen.repository';
import { RedisService } from '../redis/redis.service';
import { SearchService } from '../search/search.service';
import { MOVIE_INDEX } from 'src/constants';
import { query } from 'express';

@Injectable()
export class ScreensService {

    constructor(@Inject('redisClient') private readonly redisClient: RedisService,
    private readonly screenRepository: ScreensRepository,
    @Inject('opensearch-client') private readonly openSearchClient: SearchService) {}
    
    async create(screen: ScreenDto): Promise<Screen> {
        // this.openSearchClient.addDocToIndex(MOVIE_INDEX, movie);
        return this.screenRepository.create(screen);
    }

    async findAll(): Promise<Screen[]> {
        // this.openSearchClient.searchAll(MOVIE_INDEX);
        return this.screenRepository.findAll();
    }

    async findOne(id): Promise<Screen> {
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
            let show = await this.screenRepository.findOne(id);
            this.redisClient.setValue(id, show);
            return show;
        }
    }

    async delete(id) {
        // this.openSearchClient.deleteDoc(MOVIE_INDEX, id);
        return this.screenRepository.delete(id);
    }

    async update(id, data) {
        // this.openSearchClient.updateDoc(MOVIE_INDEX, id, data);
        const numberOfAffectedRows =  this.screenRepository.update(id, data)[0];
        const updatedscreen=  this.screenRepository.update(id, data)[1];
        const response = await this.redisClient.getValue(id);
        this.redisClient.setValue(id, data)

        return { numberOfAffectedRows, updatedscreen };
    }
}