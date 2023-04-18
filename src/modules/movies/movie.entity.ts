import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, BelongsTo, HasMany } from 'sequelize-typescript';
import { Show } from '../show/show.entity';

@Table
export class Movie extends Model<Movie> {
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
    title: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    genre: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    duration: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    description: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    language: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    parent_movie: number;

    @HasMany(()=>Show)
    show_id: Show
}
