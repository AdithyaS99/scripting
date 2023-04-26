import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, BelongsTo, HasMany, ForeignKey } from 'sequelize-typescript';
import { Show } from '../show/show.entity';
import { User } from '../users/user.entity';
import { ShowScreen } from '../show-screen/show-screen.entity';
import { Booking } from '../booking/booking.entity';
import { Seat } from '../seat/seat.entity';

@Table
export class BookingSeat extends Model<BookingSeat> {
    @PrimaryKey
    @AutoIncrement
    @Column
    ({
        type: DataType.INTEGER,
        allowNull: false,
    })
    id: number;

    @ForeignKey(()=> Booking)
    @Column({
        type: DataType.NUMBER,
        allowNull: false,
    })
    booking_id: number;

    @ForeignKey(()=> Seat)
    @Column({
        type: DataType.NUMBER,
        allowNull: false,
    })
    seat_id: number;
}
