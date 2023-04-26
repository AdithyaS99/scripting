import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/core/database/database.module';
import { RedisModule } from '../redis/redis.module';
import { ShowsService } from './show.service';
import { ShowsRepository } from './show.repository';
import { ShowsController } from './show.controller';
import { SearchModule } from '../search/search.module';

@Module({
    imports: [DatabaseModule, RedisModule, SearchModule],
    providers: [ShowsService, ShowsRepository],
    controllers: [ShowsController],
    exports: [ShowsService],
})
export class ShowModule {}
