import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { IndexController } from './app.index.controller';
import { NumberController } from './app.number.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, NumberController, IndexController],
  providers: [AppService],
})
export class AppModule {}
