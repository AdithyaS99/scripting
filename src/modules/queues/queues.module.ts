import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UpdateOpenSearchProcessor } from './Processors/UpdateOpenSearch';
import { QueueService } from './queues.service';
import { QueueProvider } from './queues.provider';
import { SearchService } from '../search/search.service';
import { SearchModule } from '../search/search.module';
import { MoviesModule } from '../movies/movies.module';

@Module({
    imports: [
    BullModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST'),
          port: Number(configService.get('REDIS_PORT')),
        },
      }),
      inject: [ConfigService]
    }),
    BullModule.registerQueue({
      name: 'update-opensearch-queue'
    }), 
    SearchModule
  ],
  providers: [QueueService, UpdateOpenSearchProcessor, QueueProvider],
  exports: [QueueService]
})
export class QueuesModule {}
