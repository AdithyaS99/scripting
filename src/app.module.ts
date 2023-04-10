import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './core/database/database.module';
import { MoviesModule } from './modules/movies/movies.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { RedisModule } from './modules/redis/redis.module';
import { SearchModule } from './modules/search/search.module';
import { ShowModule } from './modules/show/show.module';
import { ScreenModule } from './modules/screen/screen.module';
import { TheatreModule } from './modules/theatre/theatre.module';
import { BookingModule } from './modules/booking/booking.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        RedisModule,
        DatabaseModule,
        MoviesModule,
        AuthModule,
        UsersModule,
        SearchModule,
        ShowModule,
        ScreenModule,
        TheatreModule,
        BookingModule,
    ]
})
export class AppModule { }