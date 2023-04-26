import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, BelongsTo, ForeignKey, HasOne } from 'sequelize-typescript';
import { Movie } from '../movies/movie.entity';

@Table
export class Show extends Model<Show> {
    @PrimaryKey
    @AutoIncrement
    @Column
    ({
        type: DataType.INTEGER,
        allowNull: false,
    })
    id: number;

    @Column({
        type: DataType.TIME,
        allowNull: false,
    })
    time: String;

    @Column({
        type: DataType.DATEONLY,
        allowNull: false,
    })
    date: string;

    @ForeignKey(() => Movie)
    movieid: number;
}
