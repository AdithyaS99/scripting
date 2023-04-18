import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ShowsService } from './show.service';
import { Show as showEntity } from './show.entity';
import { ShowDto } from './dto/show.dto';

@Controller('shows')
export class ShowsController {
    constructor(private readonly showService: ShowsService) { }

    @Get()
    async findAll() {
        // get all movies in the db
        const shows = await this.showService.findAll();
        return shows;
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<showEntity> {
        // find the show with this id
        const show = await this.showService.findOne(id);

        // if the show doesn't exit in the db, throw a 404 error
        if (!show) {
            throw new NotFoundException('This show doesn\'t exist');
        }

        // if show exist, return the show
        return show;
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(@Body() show: ShowDto): Promise<showEntity> {
        // create a new show and return the newly created show
        const response = await this.showService.create(show);
        return response;
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async update(@Param('id') id: number, @Body() show: ShowDto, @Request() req): Promise<showEntity> {
        // get the number of row affected and the updated show
        const { numberOfAffectedRows, updatedshow } = await this.showService.update(id, show);

        // if the number of row affected is zero, 
        // it means the show doesn't exist in our db
        if (numberOfAffectedRows === 0) {
            throw new NotFoundException('This show doesn\'t exist');
        }

        // return the updated show
        return updatedshow;
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        // delete the show with this id
        const deleted = await this.showService.delete(id);

        // if the number of row affected is zero, 
        // then the show doesn't exist in our db
        if (deleted === 0) {
            throw new NotFoundException('This show doesn\'t exist');
        }

        // return success message
        return 'Successfully deleted';
    }
}