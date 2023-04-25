import { Injectable, Inject } from '@nestjs/common';
import { Movie } from './movie.entity';
import { MovieDto } from './dto/movie.dto';
import { MoviesRepository } from './movie.repository';
import { RedisService } from '../redis/redis.service';
import { SearchService } from '../search/search.service';
import { MOVIE_INDEX } from 'src/constants';
import { query } from 'express';
import { QueueService } from '../queues/queues.service';

@Injectable()
export class MoviesService {

    constructor(@Inject('redisClient') private readonly redisClient: RedisService,
    private readonly movieRepository: MoviesRepository,
    private readonly queueService: QueueService,
    @Inject('opensearch-client') private readonly openSearchClient: SearchService) {}
    
    async create(movie: MovieDto): Promise<Movie> {
        // this.openSearchClient.addDocToIndex(MOVIE_INDEX, movie);
        const response = await this.movieRepository.create(movie);
        await this.queueService.addCreateJob({
            tableName: 'Movie', 
            id: movie.id
        });
        return response;
    }

    async findAll(): Promise<Movie[]> {
        // this.openSearchClient.searchAll(MOVIE_INDEX);
        return this.movieRepository.findAll();
    }

    async findOne(id): Promise<Movie> {
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
            let movie = await this.movieRepository.findOne(id);
            this.redisClient.setValue(id, movie);
            return movie;
        }
    }

    async delete(id) {
        // this.openSearchClient.deleteDoc(MOVIE_INDEX, id);
        // this.openSearchClient.deleteDoc(MOVIE_INDEX, id);
        const response = await this.movieRepository.delete(id);
        await this.queueService.addDeleteJob({
            tableName: 'Movie', 
            id: id
        });
        return response;
    }

    async update(id, data) {
        // this.openSearchClient.updateDoc(MOVIE_INDEX, id, data);
        const responseArray = await this.movieRepository.update(id, data);
        const numberOfAffectedRows =  responseArray[0];
        const updatedmovie =  responseArray[1];
        this.redisClient.setValue(id, data)

        await this.queueService.addUpdateJob({
            tableName: 'Movie', 
            id: id,
            data: data
        });
        return { numberOfAffectedRows, updatedmovie };
    }
}