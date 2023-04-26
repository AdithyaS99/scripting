import { Inject, Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Job, Queue } from 'bull';

@Injectable()
export class QueueService {
  constructor(@InjectQueue('update-opensearch-queue') private readonly myQueue: Queue) {}

  async addCreateJob(data: any): Promise<Job> {
    const job = await this.myQueue.add('createRecord', { data });
    return job;
  }

  async addDeleteJob(data: any): Promise<Job> {
    const job = await this.myQueue.add('deleteRecord', { data });
    return job;
  }

  async addUpdateJob(data: any): Promise<Job> {
    const job = await this.myQueue.add('updateRecord', { data });
    return job;
  }
}