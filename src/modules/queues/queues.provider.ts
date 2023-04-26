import { Provider } from '@nestjs/common';
import { Queue } from 'bull';
import { BullModule, getQueueToken } from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';

export const QueueProvider: Provider = {
  provide: 'update-opensearch-queue',
  useFactory: (queue: Queue) => {
  BullModule.registerQueue({
    name: 'update-opensearch-queue'
  }) },
  inject: [getQueueToken('update-opensearch-queue')],
};
