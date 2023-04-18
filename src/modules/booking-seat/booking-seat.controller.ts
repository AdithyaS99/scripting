import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BookingSeatService } from './booking-seat.service';
import { BookingSeat as bookingSeatEntity } from './booking-seat.entity';
import { BookingSeatDto } from './dto/booking-seat.dto';

@Controller('booking-seat')
export class BookingSeatController {
    constructor(private readonly bookingseatservice: BookingSeatService) { }

    @Get()
    async findAll() {
        // get all booking-seat records in the db
        const bookingseat = await this.bookingseatservice.findAll();
        return bookingseat;
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<bookingSeatEntity> {
        // find the booking-seat record with this id
        const bookingseat = await this.bookingseatservice.findOne(id);

        // if the record doesn't exit in the db, throw a 404 error
        if (!bookingseat) {
            throw new NotFoundException('This booking-seat doesn\'t exist');
        }

        // if record exist, return the movie
        return bookingseat;
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(@Body() bookingseat: BookingSeatDto): Promise<bookingSeatEntity> {
        // create a new record and return the newly created record
        const response = await this.bookingseatservice.create(bookingseat);
        return response;
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async update(@Param('id') id: number, @Body() bookingseat: BookingSeatDto, @Request() req): Promise<bookingSeatEntity> {
        // get the number of row affected and the updated booking-seat record
        const { numberOfAffectedRows, updatedbookingseat } = await this.bookingseatservice.update(id, bookingseat);

        // if the number of row affected is zero, 
        // it means the record doesn't exist in our db
        if (numberOfAffectedRows === 0) {
            throw new NotFoundException('This booking-seat doesn\'t exist');
        }

        // return the updated record
        return updatedbookingseat;
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        // delete the record with this id
        const deleted = await this.bookingseatservice.delete(id);

        // if the number of row affected is zero, 
        // then the record doesn't exist in our db
        if (deleted === 0) {
            throw new NotFoundException('This booking-seat doesn\'t exist');
        }

        // return success message
        return 'Successfully deleted';
    }
}