const homepage = require('./route/homepage.js')
const staticfile = require('./route/staticfile.js')
const userroute = require('./route/user.js')
const useradmin = require('./route/useradmin.js')

module.exports = {
  Hapi: require('hapi'),
  Handlebars: require('handlebars'),
  plugins: [require('inert'), require('vision')],
  serverroutes: [homepage, staticfile, userroute, useradmin]
}
