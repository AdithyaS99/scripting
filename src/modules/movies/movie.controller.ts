import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MoviesService } from './movie.service';
import { Movie as movieEntity } from './movie.entity';
import { MovieDto } from './dto/movie.dto';

@Controller('movies')
export class MoviesController {
    constructor(private readonly movieService: MoviesService) { }

    @Get()
    async findAll() {
        // get all movies in the db
        return await this.movieService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<movieEntity> {
        // find the movie with this id
        const movie = await this.movieService.findOne(id);

        // if the movie doesn't exit in the db, throw a 404 error
        if (!movie) {
            throw new NotFoundException('This movie doesn\'t exist');
        }

        // if movie exist, return the movie
        return movie;
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(@Body() movie: MovieDto): Promise<movieEntity> {
        // create a new movie and return the newly created movie
        return await this.movieService.create(movie);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async update(@Param('id') id: number, @Body() movie: MovieDto, @Request() req): Promise<movieEntity> {
        // get the number of row affected and the updated movie
        const { numberOfAffectedRows, updatedmovie } = await this.movieService.update(id, movie);

        // if the number of row affected is zero, 
        // it means the movie doesn't exist in our db
        if (numberOfAffectedRows === 0) {
            throw new NotFoundException('This movie doesn\'t exist');
        }

        // return the updated movie
        return updatedmovie;
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        // delete the movie with this id
        const deleted = await this.movieService.delete(id);

        // if the number of row affected is zero, 
        // then the movie doesn't exist in our db
        if (deleted === 0) {
            throw new NotFoundException('This movie doesn\'t exist');
        }

        // return success message
        return 'Successfully deleted';
    }
}