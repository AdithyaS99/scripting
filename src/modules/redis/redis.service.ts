import { DynamicModule, FactoryProvider, ModuleMetadata, Injectable } from '@nestjs/common';
import IORedis, { Redis, RedisOptions } from 'ioredis';
import { Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const IORedisKey = 'IORedis';

// type RedisModuleOptions = {
//     connectionOptions: RedisOptions;
//     onClientReady?: (client: Redis) => void;
//   };

//   type RedisAsyncModuleOptions = {
//     useFactory: (
//       ...args: any[]
//     ) => Promise<RedisModuleOptions> | RedisModuleOptions;
//   } & Pick<ModuleMetadata, 'imports'> &
//     Pick<FactoryProvider, 'inject'>;

@Injectable()
export class RedisService{
    client: IORedis;
    constructor(configService: ConfigService){
    const connectionOptions: RedisOptions = {
        host: configService.get('REDIS_HOST'),
        port: configService.get('REDIS_PORT'),
    }
    this.client = new IORedis(connectionOptions);
    }

    async setIfNotExist(key, value){
        return this.client.setnx(key, value);
    }

    async getValue(key){
        return this.client.get(key);
    }

    async decrement(key){
        return this.client.decr(key);
    }
    async setOtp(key, value){
        try {
            console.log(value, typeof value, key)
        return this.client.set(key, value, 'EX', 30);
        } catch (error) {
            console.log(error)
            throw error
        }
        
    }
    
    async setValue(key, value){
        
        return this.client.set(key, value);
    }
    async invalidate(key){
        return this.client.del(key);
    }

    // async registerAsync({
    //     useFactory,
    //     imports,
    //     inject,
    //   }: RedisAsyncModuleOptions) {const redisProvider = {
    //     provide: IORedisKey,
    //     useFactory: async (...args) => {
    //       const { connectionOptions, onClientReady } = await useFactory(...args);
    
    //       const client = new IORedis(connectionOptions);
    
    //       onClientReady(client);
    
    //       return client;
    //     },
    //     inject,
    //   };
        
    //   }
}