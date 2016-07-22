const proxyquire = require('proxyquire')
const bcrypt = require('bcrypt')
const tape = require('tape')
const sinon = require('sinon')

// Require postgres module via proxyquire (which allows us to stub out module includes)
// This allows us to stub out the getUser function called by login.tryLogin
const dbStub = {}
const login = proxyquire('../../../src/login', { '../postgres': dbStub })

// Set test data mocking out db user return value
const userDetails = { name: 'noga', password: bcrypt.hashSync('valid-password', 8) }

tape('tryLogin yields true if user exists and password is valid', t => {
  // Stub out the getUser method
  // Stub expects callback at arg idx 2
  // Stubbed method calls callback asynchronously with values null and userDetails
  sinon.stub(dbStub, 'getUser').callsArgWithAsync(2, null, userDetails)

  login.tryLogin('noga', 'valid-password', (err, isValid) => {
    t.error(err)
    t.ok(isValid)

    // Remove stub before finishing test
    dbStub.getUser.restore()
    t.end()
  })
})

tape('tryLogin yields false if user exists but password is invalid', t => {
  // Stub out the getUser method
  // Stub expects callback at arg idx 2
  // Stubbed method calls callback asynchronously with values null and userDetails
  sinon.stub(dbStub, 'getUser').callsArgWithAsync(2, null, userDetails)

  login.tryLogin('noga', 'invalid-password', (err, isValid) => {
    t.error(err)
    t.notOk(isValid)

    // Remove stub before finishing test
    dbStub.getUser.restore()
    t.end()
  })
})

tape('tryLogin yields error if postgres or bcrypt throws error', t => {
  const TestError = new Error('postgres or bcrypt error')
  // Stub out the getUser method
  // Stub expects callback at arg idx 2
  // Stubbed method calls callback asynchronously with TestError
  sinon.stub(dbStub, 'getUser').callsArgWithAsync(2, TestError)

  login.tryLogin('noga', 'invalid-password', err => {
    t.equal(err, TestError)

    // Remove stub before finishing test
    dbStub.getUser.restore()
    t.end()
  })
})

tape('addUserLogin yields true and new user id on success', t => {
  const dbResult = { id: 100 }
  sinon.stub(dbStub, 'addUser').callsArgWithAsync(3, null, dbResult)

  login.addUserLogin('noga', 'new-password', (err, result) => {
    t.error(err)
    t.equal(result, dbResult)

    // Remove stub before finishing test
    dbStub.addUser.restore()
    t.end()
  })
})
