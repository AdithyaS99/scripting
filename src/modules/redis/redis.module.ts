import { DynamicModule, FactoryProvider, ModuleMetadata } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import IORedis, { Redis, RedisOptions } from 'ioredis';
import { redisProviders } from './redis.provider';
import { RedisService } from './redis.service';

@Module({
    imports:[ConfigModule],
    providers:[...redisProviders, RedisService],
    exports: [...redisProviders, RedisService],
})
export class RedisModule {}