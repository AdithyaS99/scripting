import { RedisService } from "./redis.service"
import { Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const redisProviders = [{
    provide: 'redisClient',
    useFactory: async(configService: ConfigService) => {
        const redisClient = new RedisService(configService)
        return redisClient;
        },
        inject: [ConfigService]
    }
];