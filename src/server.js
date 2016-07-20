'use strict';
// const homepage = require('./route/homepage.js');
// const staticfile = require('./route/staticfile.js');
// const userroute = require('./route/user.js');
// const useradmin = require('./route/useradmin.js');
//
// const Hapi = require('hapi');
// const Handlebars = require('handlebars');

// const plugins = [require('inert'), require('vision')];
// const serverroutes = [homepage, staticfile, userroute, useradmin];

const req = require('./require.js');

const server = new req.Hapi.Server();
server.connection({ port: process.env.PORT || 3000 });

server.start((err) => {

  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
});

server.register(req.plugins, (err) => {

  if (err) {
    throw err;
  }

  server.route(req.serverroutes);

  server.views({
    engines: {html: req.Handlebars},
    relativeTo: __dirname,
    path: '../views',
    layoutPath: '../views/layout',
    partialsPath: '../views/partials',
    helpersPath: '../views/helpers'
  });

});

module.exports = server;
