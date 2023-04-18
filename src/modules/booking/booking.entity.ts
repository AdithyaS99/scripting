import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, BelongsTo, HasMany, ForeignKey } from 'sequelize-typescript';
import { Show } from '../show/show.entity';
import { User } from '../users/user.entity';
import { ShowScreen } from '../show-screen/show-screen.entity';
import { Movie } from '../movies/movie.entity';

@Table
export class Booking extends Model<Booking> {
    @PrimaryKey
    @AutoIncrement
    @Column
    ({
        type: DataType.INTEGER,
        allowNull: false,
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    time: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    date: string;

    @ForeignKey(()=> User)
    @BelongsTo(()=> User)
    @Column({
        type: DataType.NUMBER,
        allowNull: false,
    })
    user_id: number;

    @ForeignKey(()=> ShowScreen)
    @BelongsTo(()=> ShowScreen)
    @Column({
        type: DataType.NUMBER,
        allowNull: false,
    })
    show_screen_id: number;

    @ForeignKey(()=> Movie)
    @BelongsTo(()=> Movie)
    @Column({
        type: DataType.NUMBER,
        allowNull: false,
    })
    movie_id: number;
}
