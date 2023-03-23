import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { userProviders } from './user.provider';

@Module({
  providers: [UsersService, ...userProviders],
    exports: [UsersService],
})
export class UsersModule {}
