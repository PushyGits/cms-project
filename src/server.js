'use strict';
const staticfile = require('./route/staticfile.js');
const userroute = require('./route/user.js');
const useradmin = require('./route/useradmin.js');

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: process.env.PORT || 3000 });

server.start((err) => {

  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
});

server.register(require('inert'), (err) => {

  if (err) {
    throw err;
  }

  server.route(staticfile);
  server.route(userroute);
  server.route(useradmin);

});

module.exports = server;
