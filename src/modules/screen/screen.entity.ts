import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, BelongsTo, ForeignKey, HasOne } from 'sequelize-typescript';
import { Theatre } from '../theatre/theatre.entity'

@Table
export class Screen extends Model<Screen> {
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
    name: String;

    @ForeignKey(() => Theatre)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    theatre_id: number;
}
