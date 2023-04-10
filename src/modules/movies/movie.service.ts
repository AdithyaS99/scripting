import { Injectable, Inject } from '@nestjs/common';
import { Movie } from './movie.entity';
import { MovieDto } from './dto/movie.dto';
import { MoviesRepository } from './movie.repository';
import { RedisService } from '../redis/redis.service';
import { SearchService } from '../search/search.service';
import { MOVIE_INDEX } from 'src/constants';
import { query } from 'express';

@Injectable()
export class MoviesService {

    constructor(@Inject('redisClient') private readonly redisClient: RedisService,
    private readonly movieRepository: MoviesRepository,
    @Inject('opensearch-client') private readonly openSearchClient: SearchService) {}
    
    async create(movie: MovieDto): Promise<Movie> {
        // this.openSearchClient.addDocToIndex(MOVIE_INDEX, movie);
        return this.movieRepository.create(movie);
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
        this.openSearchClient.deleteDoc(MOVIE_INDEX, id);
        return this.movieRepository.delete(id);
    }

    async update(id, data) {
        // this.openSearchClient.updateDoc(MOVIE_INDEX, id, data);
        const numberOfAffectedRows =  this.movieRepository.update(id, data)[0];
        const updatedmovie =  this.movieRepository.update(id, data)[1];
        const response = await this.redisClient.getValue(id);
        this.redisClient.setValue(id, data)

        return { numberOfAffectedRows, updatedmovie };
    }
}