import { MinLength, IsNotEmpty } from "class-validator";

export class MovieDto
{

    readonly id: Number;

    @IsNotEmpty()
    readonly title: string;

    @MinLength(3)
    readonly genre: string;

    @MinLength(6)
    description: string;

    @IsNotEmpty()
    duration: string;

    @IsNotEmpty()
    language: string;

    parent_movie: number;

    show_id: number;

    getMovieObjects() {
        return {
            title: this.title
        }
    }
}