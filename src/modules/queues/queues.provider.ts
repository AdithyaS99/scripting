import { Provider } from '@nestjs/common';
import { Queue } from 'bull';
import { getQueueToken } from '@nestjs/bull';

export const QueueProvider: Provider = {
  provide: 'update-opensearch-queue',
  useFactory: (queue: Queue) => queue,
  inject: [getQueueToken('my-queue')],
};
