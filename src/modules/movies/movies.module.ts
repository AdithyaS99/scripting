import { Module } from '@nestjs/common';
import { MoviesService } from './movie.service';
import { movieProviders } from './movie.provider';
import { MoviesController } from './movie.controller';

@Module({
    providers: [MoviesService, ...movieProviders],
    controllers: [MoviesController],
    exports: [MoviesService],
})
export class MoviesModule {}