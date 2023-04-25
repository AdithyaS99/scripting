import { Processor, Process } from '@nestjs/bull';
import { Client } from 'pg';
import { ConfigService } from '@nestjs/config';
import { SearchService } from '../../search/search.service';

@Processor('update-opensearch-queue')
export class UpdateOpenSearchProcessor {
  constructor(
    private readonly configService: ConfigService,
    private readonly openSearchService: SearchService,
    private client: Client
  ) {
    const connectionString = this.configService.get<string>(
        'DATABASE_URL',
      );
    client = new Client({
        connectionString,
      });
    client.connect();
  }

  
  @Process('createRecord')
  async createInOpenSearch(job: any) {
    try {
      const { tableName, recordId } = job.data;

      // Query the database for the record that was written
      const result = await this.client.query(
        `SELECT * FROM ${tableName} WHERE id = $1`,
        [recordId],
      );

      // Transform the record into a document for the OpenSearch index
      const document = {
        id: result.rows[0].id,
        name: result.rows[0].name,
        description: result.rows[0].description,
        // Add more fields as needed
      };

      // Update the OpenSearch index with the document
      await this.openSearchService.addDocToIndex('movie', document);
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
