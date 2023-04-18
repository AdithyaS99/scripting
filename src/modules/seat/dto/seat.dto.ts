import { MinLength, IsNotEmpty } from "class-validator";

export class SeatDto
{
    @IsNotEmpty()
    readonly screen_id: number;

    @IsNotEmpty()
    readonly price: number;

    @IsNotEmpty()
    readonly seat_number: number;

    @IsNotEmpty()
    readonly row: string;

    @IsNotEmpty()
    readonly class: string;

    @IsNotEmpty()
    readonly status: string;

    getMovieObjects() {
        return {
            row: this.row,
            seat: this.seat_number
        }
    }
}