const { Pool } = require('pg');

const pgConfig = {
  user: 'adithyasivasankar',
  host: 'localhost',
  database: 'movies',
  password: 'adithya',
  port: 5432, // or your custom PostgreSQL port
};

const pgClient = new Pool(pgConfig);

async function up() {

  await pgClient.query('ALTER TABLE Users ADD COLUMN phone_s TEXT');

  
  await pgClient.query('UPDATE Users SET phone_s = phone::TEXT');


  await pgClient.query('ALTER TABLE Users DROP COLUMN phone');
}

async function down() {

    await pgClient.query('ALTER TABLE Users ADD COLUMN phone NUMERIC');


    await pgClient.query('UPDATE Users SET phone = phone_s::NUMERIC');


    await pgClient.query('ALTER TABLE Users DROP COLUMN phone_s');
}

module.exports = { up, down };