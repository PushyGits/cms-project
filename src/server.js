'use strict';

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
    layout: 'default',
    layoutPath: '../views/layout',
    partialsPath: '../views/partials',
    helpersPath: '../views/helpers'
  });
});

module.exports = server;
