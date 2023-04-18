import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, BelongsTo, HasMany } from 'sequelize-typescript';
import { Screen } from '../screen/screen.entity';

@Table
export class Theatre extends Model<Theatre> {
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
    location: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    // @HasMany(()=>Screen)
    // screen: Screen
}
