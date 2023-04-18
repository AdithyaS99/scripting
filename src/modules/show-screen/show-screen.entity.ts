import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, BelongsTo, ForeignKey, HasOne } from 'sequelize-typescript';
import { Movie } from '../movies/movie.entity';
import { Show } from '../show/show.entity';
import { Screen } from '../screen/screen.entity';

@Table
export class ShowScreen extends Model<ShowScreen> {
    @PrimaryKey
    @AutoIncrement
    @Column
    ({
        type: DataType.INTEGER,
        allowNull: false,
    })
    id: number;

    @ForeignKey(() => Show)
    @HasOne(()=> Show)
    @Column
    ({
        type: DataType.NUMBER,
        allowNull: false,
    })
    show_id: number;

    @ForeignKey(() => Screen)
    @HasOne(()=> Screen)
    @Column
    ({
        type: DataType.NUMBER,
        allowNull: false,
    })
    screen_id: number;
}
