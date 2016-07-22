const pg = require('pg')
const bcrypt = require('bcrypt')
const postgres = require('../postgres')
const client = new pg.Client(process.env.POSTGRES_TEST)

const addUserLogin = (username, password, callback) => {
  const passwordHash = bcrypt.hashSync('valid-password', 8)
  postgres.addUser(client, username, passwordHash, (err, result) => {
    if (err) callback(err)
    else callback(null, result)
  })
}

const tryLogin = (username, password, callback) => {
  postgres.getUser(client, username, (err, result) => {
    if (err) {
      callback(err)
    } else {
      bcrypt.compare(password, result.password, (err, isValid) => {
        if (err) callback(err)
        else callback(null, isValid)
      })
    }
  })
}

module.exports = { tryLogin, addUserLogin }
