import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SeatsService } from './seat.service';
import { Seat as seatEntity } from './seat.entity';
import { SeatDto } from './dto/seat.dto';

@Controller('seats')
export class SeatsController {
    constructor(private readonly seatService: SeatsService) { }

    @Get()
    async findAll() {
        // get all seats in the db
        const seats = await this.seatService.findAll();
        return seats;
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<seatEntity> {
        // find the seat with this id
        const seat = await this.seatService.findOne(id);

        // if the show doesn't exit in the db, throw a 404 error
        if (!seat) {
            throw new NotFoundException('This seat doesn\'t exist');
        }

        // if show exist, return the show
        return seat;
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(@Body() seat: SeatDto): Promise<seatEntity> {
        // create a new seat and return the newly created seat
        const response = await this.seatService.create(seat);
        return response;
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async update(@Param('id') id: number, @Body() seat: SeatDto, @Request() req): Promise<seatEntity> {
        // get the number of row affected and the updated seat
        const { numberOfAffectedRows, updatedseat } = await this.seatService.update(id, seat);

        // if the number of row affected is zero, 
        // it means the seat doesn't exist in our db
        if (numberOfAffectedRows === 0) {
            throw new NotFoundException('This seat doesn\'t exist');
        }

        // return the updated show
        return updatedseat;
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        // delete the seat with this id
        const deleted = await this.seatService.delete(id);

        // if the number of row affected is zero, 
        // then the seat doesn't exist in our db
        if (deleted === 0) {
            throw new NotFoundException('This seat doesn\'t exist');
        }

        // return success message
        return 'Successfully deleted';
    }
}