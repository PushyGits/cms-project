const pg = require('pg');
const env = require('env2');
const tape = require('tape');

const helpers = require('./helpers.js');

env('.env'); //set up environment variables

// Connect to test database
const client = new pg.Client(process.env.POSTGRES_TEST);

// Disconnect client when all queries are finished: client.on is an event-
// when data has 'drained' close connection.
client.on('drain', client.end.bind(client));

client.connect(err => {
  if (err) throw err;
});

tape('checks if new user had been created', t => {

  helpers.dropTables(client);
  helpers.createUserTable(client);
  client.query(`INSERT INTO users(name, password) VALUES ('yo1234', '129ipijam394ia')`, err => {
    t.error(err);
    t.end();
  });


});
