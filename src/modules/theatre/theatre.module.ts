import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/core/database/database.module';
import { RedisModule } from '../redis/redis.module';
import { TheatresService } from './theatre.service';
import { TheatresRepository } from './theatre.repository';
import { TheatresController } from './theatre.controller';

@Module({
    imports: [DatabaseModule, RedisModule],
    providers: [TheatresService, TheatresRepository],
    controllers: [TheatresController],
    exports: [TheatresService],
})
export class TheatreModule {}
