import { MinLength, IsNotEmpty } from "class-validator";

export class BookingSeatDto
{
    @IsNotEmpty()
    booking_id: number;

    @IsNotEmpty()
    seat_id: number;

    getMovieObjects() {
        return {
            booking_id: this.booking_id,
            seat_id: this.seat_id
        }
    }
}