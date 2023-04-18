import { MinLength, IsNotEmpty } from "class-validator";
import { DataType } from "sequelize";

export class ScreenDto
{
    @IsNotEmpty()
    readonly time: string;

    @MinLength(3)
    readonly date: string;

    @MinLength(6)
    movie_id: number;

    @IsNotEmpty()
    duration: string;

    @IsNotEmpty()
    language: string;

    parent_movie: number;

    getShowObjects() {
        return {
            time: this.time,
            date: this.date
        }
    }
}