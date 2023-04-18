const { Client } = require('@elastic/elasticsearch');
const { Pool } = require('pg');

// Set up the PostgreSQL and OpenSearch connections
const pgConfig = {
  user: 'adithyasivasankar',
  host: 'localhost',
  database: 'movies',
  password: 'adithya',
  port: 5432, 
};

const openSearchConfig = {
  node: 'http://localhost:9200', 
  auth: {
    username: 'admin',
    password: 'admin'
  }
};

const pgClient = new Pool(pgConfig);
const openSearchClient = new Client(openSearchConfig);

async function migrate() {

  const { rows } = await pgClient.query('SELECT * FROM movies');

  const documents = rows.map(row => {
    return {
      index: {
        _index: 'movies',
        _id: row.id 
      }
    },
    row
  });

  const { body: bulkResponse } = await openSearchClient.bulk({
    refresh: true,
    body: documents
  });

  if (bulkResponse.errors) {
    console.log(`Failed to insert some documents: ${bulkResponse.items}`);
  } else {
    console.log('Migration complete!');
  }
}

migrate().catch(console.error).finally(() => pgClient.end());