import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/core/database/database.module';
import { RedisModule } from '../redis/redis.module';
import { SeatsService } from './seat.service';
import { SeatsRepository } from './seat.repository';
import { SeatsController } from './seat.controller';
import { SearchModule } from '../search/search.module';

@Module({
    imports: [DatabaseModule, RedisModule, SearchModule],
    providers: [SeatsService, SeatsRepository],
    controllers: [SeatsController],
    exports: [SeatsService],
})
export class SeatModule {}
