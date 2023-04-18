import { MinLength, IsNotEmpty } from "class-validator";

export class TheatreDto
{
    @IsNotEmpty()
    readonly location: string;

    @MinLength(3)
    readonly name: string;

    getMovieObjects() {
        return {
            name: this.name
        }
    }
}