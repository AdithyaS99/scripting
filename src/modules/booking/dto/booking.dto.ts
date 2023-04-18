import { MinLength, IsNotEmpty } from "class-validator";

export class BookingDto
{
    @IsNotEmpty()
    readonly time: string;

    @MinLength(3)
    readonly date: string;

    @MinLength(6)
    customer_id: number;

    @IsNotEmpty()
    show_screen_id: number;

    user_id: number;

    movie_id: number;

    getMovieObjects() {
        return {
            customer_id: this.customer_id,
            show: this.show_screen_id
        }
    }
}