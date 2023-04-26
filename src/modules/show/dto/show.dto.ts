import { MinLength, IsNotEmpty } from "class-validator";
import { DataType } from "sequelize";
import { AutoIncrement } from "sequelize-typescript";

export class ShowDto
{
    @IsNotEmpty()
    readonly time: string;

    @MinLength(3)
    readonly date: string;

    @IsNotEmpty()
    movie_id: number;

    getShowObjects() {
        return {
            time: this.time,
            date: this.date
        }
    }
}