import { Module } from '@nestjs/common';
import { MoviesService } from './movie.service';
import { MoviesController } from './movie.controller';
import { DatabaseModule } from 'src/core/database/database.module';
import { MoviesRepository } from './movie.repository';
import { RedisModule } from '../redis/redis.module';
import { QueuesModule } from '../queues/queues.module';
import { SearchModule } from '../search/search.module';

@Module({
    imports: [DatabaseModule, RedisModule, QueuesModule, SearchModule],
    providers: [MoviesService, MoviesRepository],
    controllers: [MoviesController],
    exports: [MoviesService],
})
export class MoviesModule {}