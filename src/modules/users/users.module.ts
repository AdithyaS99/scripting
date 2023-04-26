import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { ConfigModule } from '@nestjs/config';
import { UsersRepository } from './users.repository';
import { DatabaseModule } from 'src/core/database/database.module';
import { RedisModule } from '../redis/redis.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.entity';
import { SearchModule } from '../search/search.module';

@Module({
  imports: [ConfigModule, DatabaseModule, RedisModule, SequelizeModule, SearchModule],
  providers: [UsersService, UsersRepository],
    exports: [UsersService, UsersRepository, SequelizeModule],
})
export class UsersModule {}
