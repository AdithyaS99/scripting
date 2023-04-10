import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from '@opensearch-project/opensearch';
import { OPENSEARCH_AUTH, OPENSEARCH_HOST, OPENSEARCH_PORT, OPENSEARCH_PROTOCOL } from 'src/constants';

export const SearchProvider=[
    {
        provide: 'opensearch-client',
        useFactory: async (configService: ConfigService) => {
          try {
            const opensearchClient = new Client({
                node: OPENSEARCH_PROTOCOL + '://' + OPENSEARCH_AUTH + '@' + OPENSEARCH_HOST + ':' + OPENSEARCH_PORT,
            });
            return opensearchClient;
          } catch (error) {
            Logger.error(error);
            throw new Error('Fatal! Could not Create Search Service CLient Connection');
          }
        },
        inject: [ConfigService],
      },
]
