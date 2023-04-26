import { Processor, Process } from '@nestjs/bull';
import { Client } from 'pg';
import { ConfigService } from '@nestjs/config';
import { SearchService } from '../../search/search.service';
import { Injectable } from '@nestjs/common';

@Injectable()
@Processor('update-opensearch-queue')
export class UpdateOpenSearchProcessor {
  constructor(
    private readonly configService: ConfigService,
    private readonly openSearchService: SearchService
  ) {
    // const connectionString = this.configService.get<string>(
    //     'DATABASE_URL',
    //   );
    // client = new Client({
    //     connectionString,
    //   });
    // client.connect();
  }

  
  @Process('createRecord')
  async createInOpenSearch(job: any) {
    try {
      const { tableName, record } = job.data;

      // Update the OpenSearch index with the document
      await this.openSearchService.addDocToIndex('movie', record);
    } 
    catch(error)
    {
        console.log(error);
    }
  }

  @Process('deleteRecord')
  async deleteInOpenSearch(job: any) {
    try{
        const { tableName, recordId } = job.data;
        await this.openSearchService.deleteDoc(tableName, recordId);
    }
    catch(error)
    {
        console.log(error);
    }
  }

  @Process('updateRecord')
  async updateInOpenSearch(job: any) {
    try{
        const { tableName, recordId , data} = job.data;
        await this.openSearchService.updateDoc(tableName, recordId, data);
    }
    catch(error)
    {
        console.log(error);
    }
  }
}
