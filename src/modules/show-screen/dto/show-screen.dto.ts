import { MinLength, IsNotEmpty } from "class-validator";
import { DataType } from "sequelize";

export class ShowScreenDto
{
    @MinLength(6)
    show_id: number;

    @IsNotEmpty()
    screen_id: number;

    getShowObjects() {
        return {
            show: this.show_id,
            screen: this.screen_id
        }
    }
}