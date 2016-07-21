const pg = require('pg')
const env = require('env2')
const tape = require('tape')
const db = require('../../src/postgres')

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

helpers.dropTables(client)
helpers.createUserTable(client)
helpers.createBlogPostsTable(client)

tape('adds a user, returning user id', t => {
  db.addUser(client, 'noga', 'mysecretword', (err, response) => {
    t.error(err)
    t.deepEqual(response, { id: 1 })
    t.end()
  })
})

tape('gets a user returning id, name and password', t => {
  db.getUser(client, 'noga', (err, response) => {
    t.error(err)
    t.deepEqual(response, { id: 1, name: 'noga', password: 'mysecretword' })
    t.end()
  })
})

tape('adds a blogpost for given user', t => {
  const user_id = 1
  const title = 'This is a title'
  const standfirst = 'This is a standfirst'
  const post = 'This is the post body'

  db.addBlogpost(client, user_id, title, standfirst, post, (err, response) => {
    t.error(err)
    t.equal(response.id, 1)
    t.equal(response.user_id, user_id)
    t.equal(response.title, title)
    t.equal(response.standfirst, standfirst)
    t.equal(response.post, post)
    t.ok(response.created instanceof Date)
    t.ok(response.last_edited instanceof Date)
    t.end()
  })
})

tape('retrieves blogposts for a given username', t => {
  const user_id = 1
  const title = 'This is a title'
  const standfirst = 'This is a standfirst'

  db.getBlogposts(client, 'noga', (err, response) => {
    t.error(err)
    t.equal(response[0].id, 1)
    t.equal(response[0].user_id, user_id)
    t.equal(response[0].title, title)
    t.equal(response[0].standfirst, standfirst)
    t.equal(response[0].post, undefined)
    t.ok(response[0].created instanceof Date)
    t.ok(response[0].last_edited instanceof Date)
    t.end()
  })
})

tape('retrieves blogposts for a given blog id', t => {
  const post_id = 1
  const user_id = 1
  const title = 'This is a title'
  const standfirst = 'This is a standfirst'
  const post = 'This is the post body'

  db.getBlogpost(client, post_id, (err, response) => {
    t.error(err)
    t.equal(response[0].id, post_id)
    t.equal(response[0].user_id, user_id)
    t.equal(response[0].title, title)
    t.equal(response[0].standfirst, standfirst)
    t.equal(response[0].post, post)
    t.ok(response[0].created instanceof Date)
    t.ok(response[0].last_edited instanceof Date)
    t.end()
  })
})

tape('updates blogpost title, post, standfirst and last_edited', t => {
  const post_id = 1
  const title = 'This is a titles'
  const standfirst = 'This is a standfirsts'
  const post = 'This is the post bodys'

  db.editBlogpost(client, post_id, post, title, standfirst, (err, response) => {
    t.error(err)
    t.equal(response[0].title, title)
    t.equal(response[0].standfirst, standfirst)
    t.equal(response[0].post, post)
    t.ok(response[0].last_edited instanceof Date)
    t.end()
  })
})

tape('deletes blogpost for given id', t => {
  const post_id = 1

  db.deleteBlogpost(client, post_id, (err, response) => {
    t.error(err)
    t.equal(response.command, 'DELETE')
    t.equal(response.rowCount, 1)
    t.end()
    client.end()
  })
})
