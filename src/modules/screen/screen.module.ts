import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/core/database/database.module';
import { RedisModule } from '../redis/redis.module';
import { ScreensService } from './screen.service';
import { ScreensRepository } from './screen.repository';
import { ScreensController } from './screen.controller';
import { SearchModule } from '../search/search.module';

@Module({
    imports: [DatabaseModule, RedisModule, SearchModule],
    providers: [ScreensService, ScreensRepository],
    controllers: [ScreensController],
    exports: [ScreensService],
})
export class ScreenModule {}
