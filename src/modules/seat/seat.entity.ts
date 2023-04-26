import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, BelongsTo, ForeignKey, HasOne } from 'sequelize-typescript';
import { Movie } from '../movies/movie.entity';
import { Screen } from '../screen/screen.entity';
import { Col } from 'sequelize/types/utils';

@Table
export class Seat extends Model<Seat> {
    @PrimaryKey
    @AutoIncrement
    @Column
    ({
        type: DataType.INTEGER,
        allowNull: false,
    })
    id: number;

    @ForeignKey(()=> Screen)
    screen_id: number;

    @Column({
        type: DataType.NUMBER,
        allowNull: false,
    })
    price: number;

    @Column({
        type: DataType.NUMBER,
        allowNull:false,
    })
    seat_number: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    row: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    class: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    status: string;
}
