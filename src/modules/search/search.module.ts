import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import {SearchProvider} from './search.provider';
import { SearchService } from './search.service';

 
@Module({
  providers: [SearchService, ...SearchProvider],
  exports: [SearchService, ...SearchProvider]
})
export class SearchModule {}