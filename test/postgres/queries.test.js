const pg = require('pg')
const env = require('env2')
const tape = require('tape')
const { addUser } = require('../../src/postgres')

const helpers = require('./helpers.js')

env('.env') // set up environment variables

// Connect to test database
const client = new pg.Client(process.env.POSTGRES_TEST)

// Disconnect client when all queries are finished: client.on is an event-
// when data has 'drained' close connection.
// client.on('drain', client.end.bind(client))

client.connect(err => {
  if (err) throw err
})

tape('checks if new user had been created', t => {
  helpers.dropTables(client)
  helpers.createUserTable(client)
  addUser(client, 'noga', 'mysecretword', (err, response) => {
    t.error(err)
    t.deepEqual(response, { userId: 1 })
    t.end()
    client.end()
  })
})
