import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ScreensService } from './screen.service';
import { Screen as screenEntity } from './screen.entity';
import { ScreenDto } from './dto/screen.dto';

@Controller('screens')
export class ScreensController {
    constructor(private readonly screenService: ScreensService) { }

    @Get()
    async findAll() {
        // get all screens in the db
        const shows = await this.screenService.findAll();
        return shows;
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<screenEntity> {
        // find the screen with this id
        const screen = await this.screenService.findOne(id);

        // if the screen doesn't exit in the db, throw a 404 error
        if (!screen) {
            throw new NotFoundException('This screen doesn\'t exist');
        }

        // if screen exist, return the show
        return screen;
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(@Body() screen: ScreenDto): Promise<screenEntity> {
        // create a new screen and return the newly created screen
        const response = await this.screenService.create(screen);
        return response;
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async update(@Param('id') id: number, @Body() screen: ScreenDto, @Request() req): Promise<screenEntity> {
        // get the number of row affected and the updated screen
        const { numberOfAffectedRows, updatedscreen } = await this.screenService.update(id, screen);

        // if the number of row affected is zero, 
        // it means the screen doesn't exist in our db
        if (numberOfAffectedRows === 0) {
            throw new NotFoundException('This screen doesn\'t exist');
        }

        // return the updated show
        return updatedscreen;
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        // delete the show with this id
        const deleted = await this.screenService.delete(id);

        // if the number of row affected is zero, 
        // then the screen doesn't exist in our db
        if (deleted === 0) {
            throw new NotFoundException('This screen doesn\'t exist');
        }

        // return success message
        return 'Successfully deleted';
    }
}