import { Injectable, Inject } from '@nestjs/common';
import { ShowScreen } from './show-screen.entity';
import { ShowScreenDto } from './dto/show-screen.dto';
import { ShowScreenRepository } from './show-screen.repository';
import { RedisService } from '../redis/redis.service';
import { SearchService } from '../search/search.service';
import { MOVIE_INDEX } from 'src/constants';
import { query } from 'express';

@Injectable()
export class ShowScreenService {

    constructor(@Inject('redisClient') private readonly redisClient: RedisService,
    private readonly showScreenRepository: ShowScreenRepository,
    @Inject('opensearch-client') private readonly openSearchClient: SearchService) {}
    
    async create(showScreen: ShowScreenDto): Promise<ShowScreen> {
        // this.openSearchClient.addDocToIndex(MOVIE_INDEX, movie);
        return this.showScreenRepository.create(showScreen);
    }

    async findAll(): Promise<ShowScreen[]> {
        // this.openSearchClient.searchAll(MOVIE_INDEX);
        return this.showScreenRepository.findAll();
    }

    async findOne(id): Promise<ShowScreen> {
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
            let showScreen = await this.showScreenRepository.findOne(id);
            this.redisClient.setValue(id, showScreen);
            return showScreen;
        }
    }

    async delete(id) {
        // this.openSearchClient.deleteDoc(MOVIE_INDEX, id);
        return this.showScreenRepository.delete(id);
    }

    async update(id, data) {
        // this.openSearchClient.updateDoc(MOVIE_INDEX, id, data);
        const numberOfAffectedRows =  this.showScreenRepository.update(id, data)[0];
        const updatedshowscreen =  this.showScreenRepository.update(id, data)[1];
        const response = await this.redisClient.getValue(id);
        this.redisClient.setValue(id, data)

        return { numberOfAffectedRows, updatedshowscreen };
    }
}