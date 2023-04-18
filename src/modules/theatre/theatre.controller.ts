import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TheatresService } from './theatre.service';
import { Theatre as theatreEntity } from './theatre.entity';
import { TheatreDto } from './dto/theatre.dto';

@Controller('theatres')
export class TheatresController {
    constructor(private readonly theatreService: TheatresService) { }

    @Get()
    async findAll() {
        // get all theatres in the db
        const theatres = await this.theatreService.findAll();
        return theatres;
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<theatreEntity> {
        // find the theatre with this id
        const theatre = await this.theatreService.findOne(id);

        // if the theatre doesn't exit in the db, throw a 404 error
        if (!theatre) {
            throw new NotFoundException('This theatre doesn\'t exist');
        }

        // if theatre exist, return the show
        return theatre;
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(@Body() theatre: TheatreDto): Promise<theatreEntity> {
        // create a new theatre and return the newly created show
        const response = await this.theatreService.create(theatre);
        return response;
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async update(@Param('id') id: number, @Body() theatre: TheatreDto, @Request() req): Promise<theatreEntity> {
        // get the number of row affected and the updated theatre
        const { numberOfAffectedRows, updatedtheatre } = await this.theatreService.update(id, theatre);

        // if the number of row affected is zero, 
        // it means the theatre doesn't exist in our db
        if (numberOfAffectedRows === 0) {
            throw new NotFoundException('This theatre doesn\'t exist');
        }

        // return the updated show
        return updatedtheatre;
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        // delete the theatre with this id
        const deleted = await this.theatreService.delete(id);

        // if the number of row affected is zero, 
        // then the theatre doesn't exist in our db
        if (deleted === 0) {
            throw new NotFoundException('This theatre doesn\'t exist');
        }

        // return success message
        return 'Successfully deleted';
    }
}