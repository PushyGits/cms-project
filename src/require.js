const homepage = require('./route/homepage.js')
const staticfile = require('./route/staticfile.js')
const userroute = require('./route/user.js')
const useradmin = require('./route/useradmin.js')
const loginsuccess = require('./route/login-success.js')
const registersuccess = require('./route/register-success.js')
const postsuccess = require('./route/post-success.js')

module.exports = {
  Hapi: require('hapi'),
  Handlebars: require('handlebars'),
  plugins: [require('inert'), require('vision')],
  serverroutes: [homepage, staticfile, userroute, useradmin, loginsuccess, registersuccess, postsuccess]
}
