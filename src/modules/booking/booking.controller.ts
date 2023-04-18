import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BookingsService } from './booking.service';
import { Booking as bookingEntity } from './booking.entity';
import { BookingDto } from './dto/booking.dto';

@Controller('bookings')
export class BookingsController {
    constructor(private readonly bookingService: BookingsService) { }

    @Get()
    async findAll() {
        // get all bookings in the db
        const bookings = await this.bookingService.findAll();
        return bookings;
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<bookingEntity> {
        // find the booking with this id
        const booking = await this.bookingService.findOne(id);

        // if the booking doesn't exit in the db, throw a 404 error
        if (!booking) {
            throw new NotFoundException('This booking doesn\'t exist');
        }

        // if booking exist, return the movie
        return booking;
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(@Body() booking: BookingDto): Promise<bookingEntity> {
        // create a new booking and return the newly created booking
        const response = await this.bookingService.create(booking);
        return response;
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async update(@Param('id') id: number, @Body() booking: BookingDto, @Request() req): Promise<bookingEntity> {
        // get the number of row affected and the updated booking
        const { numberOfAffectedRows, updatedbooking } = await this.bookingService.update(id, booking);

        // if the number of row affected is zero, 
        // it means the booking doesn't exist in our db
        if (numberOfAffectedRows === 0) {
            throw new NotFoundException('This booking doesn\'t exist');
        }

        // return the updated booking
        return updatedbooking;
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        // delete the booking with this id
        const deleted = await this.bookingService.delete(id);

        // if the number of row affected is zero, 
        // then the booking doesn't exist in our db
        if (deleted === 0) {
            throw new NotFoundException('This booking doesn\'t exist');
        }

        // return success message
        return 'Successfully deleted';
    }
}