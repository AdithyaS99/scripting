import { Sequelize } from 'sequelize-typescript';
import { Movie } from 'src/modules/movies/movie.entity';
import { User } from 'src/modules/users/user.entity';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../../constants';
import { databaseConfig } from './database.config';
import { Show } from 'src/modules/show/show.entity';
import { Screen } from 'src/modules/screen/screen.entity';
import { ShowScreen } from 'src/modules/show-screen/show-screen.entity';
import { Theatre } from 'src/modules/theatre/theatre.entity';
import { Booking } from 'src/modules/booking/booking.entity';
import { Seat } from 'src/modules/seat/seat.entity';
import { BookingSeat } from 'src/modules/booking-seat/booking-seat.entity';

export const databaseProviders = [{
    provide: SEQUELIZE,
    useFactory: async () => {
        let config;
        switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
           config = databaseConfig.development;
           break;
        case TEST:
           config = databaseConfig.test;
           break;
        case PRODUCTION:
           config = databaseConfig.production;
           break;
        default:
           config = databaseConfig.development;
        }
        const sequelize = new Sequelize(config);
        sequelize.addModels([Movie, User, Show, Screen, ShowScreen, Theatre, Booking, Seat, BookingSeat]);
        await sequelize.sync();
        return sequelize.models;
    },
}];
