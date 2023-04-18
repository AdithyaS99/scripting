import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/core/database/database.module';
import { RedisModule } from '../redis/redis.module';
import { SeatsService } from './seat.service';
import { SeatsRepository } from './seat.repository';
import { SeatsController } from './seat.controller';

@Module({
    imports: [DatabaseModule, RedisModule],
    providers: [SeatsService, SeatsRepository],
    controllers: [SeatsController],
    exports: [SeatsService],
})
export class SeatModule {}
