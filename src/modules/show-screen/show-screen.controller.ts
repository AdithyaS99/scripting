import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ShowScreenService } from './show-screen.service';
import { ShowScreen as showScreenEntity } from './show-screen.entity';
import { ShowScreenDto } from './dto/show-screen.dto';

@Controller('show-screen')
export class ShowsController {
    constructor(private readonly showScreenService: ShowScreenService) { }

    @Get()
    async findAll() {
        // get all movies in the db
        const showscreens = await this.showScreenService.findAll();
        return showscreens;
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<showScreenEntity> {
        // find the show with this id
        const showscreen = await this.showScreenService.findOne(id);

        // if the show doesn't exit in the db, throw a 404 error
        if (!showscreen) {
            throw new NotFoundException('This show-screen doesn\'t exist');
        }

        // if show exist, return the show
        return showscreen;
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(@Body() showscreen: ShowScreenDto): Promise<showScreenEntity> {
        // create a new show and return the newly created show
        const response = await this.showScreenService.create(showscreen);
        return response;
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async update(@Param('id') id: number, @Body() showscreen: ShowScreenDto, @Request() req): Promise<showScreenEntity> {
        // get the number of row affected and the updated show
        const { numberOfAffectedRows, updatedshowscreen } = await this.showScreenService.update(id, showscreen);

        // if the number of row affected is zero, 
        // it means the show doesn't exist in our db
        if (numberOfAffectedRows === 0) {
            throw new NotFoundException('This show doesn\'t exist');
        }

        // return the updated show
        return updatedshowscreen;
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        // delete the show with this id
        const deleted = await this.showScreenService.delete(id);

        // if the number of row affected is zero, 
        // then the show doesn't exist in our db
        if (deleted === 0) {
            throw new NotFoundException('This show-screen doesn\'t exist');
        }

        // return success message
        return 'Successfully deleted';
    }
}