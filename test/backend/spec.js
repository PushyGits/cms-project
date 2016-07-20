//check that there is a connection to the postgres DB

const pg = require('pg');
const tape = require('tape');
const env = require('env2');

env('.env'); //set up environment variables

// checks if POSTGRES_TEST environment variable is set and
// it can be used to connect to a valid postgres database
tape('connect to test postgres DB', t => {
  const client = new pg.Client(process.env.POSTGRES_TEST);
  client.connect(err => {
    t.error(err);
    t.end();
  });
});

tape('connect to development postgres DB', t => {
  const client = new pg.Client(process.env.POSTGRES_DEV);
  client.connect(err => {
    t.error(err);
    t.end();
  });
});

tape('connect to production postgres DB', t => {
  const client = new pg.Client(process.env.POSTGRES_PRODUCTION);
  client.connect(err => {
    t.error(err);
    t.end();
  });
});
