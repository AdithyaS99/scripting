import { Inject } from '@nestjs/common';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';
import {SEQUELIZE} from 'src/constants';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { USER_REPOSITORY } from 'src/constants';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class UsersRepository {
  // to use time-to-live from configuration
  private readonly ttl: string;
  private readonly logger = new Logger(UsersRepository.name);

  constructor(
    configService: ConfigService,
    @Inject('redisClient') private readonly redisClient: RedisService,
    @Inject(SEQUELIZE) private readonly database: any,
  ) {
    this.ttl = configService.get('POLL_DURATION');
  }

  async create(user: UserDto): Promise<User> {
    return await this.database.User.create(user);
  }

  async findOneByName(name: string): Promise<User> {
    return await this.database.User.findOne({ where: { name: name } });
  }

  async findOneByEmail(email: string): Promise<User> {
      return this.database.User.findOne({ where: { email: email } });
  }

  async findOneById(id: number): Promise<User> {
    return await this.database.User.findOne({ where: { id: id } });
  }

}