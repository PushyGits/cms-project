const userroute = {
      method: 'GET',
      path: '/{user}',
      handler: function (request, reply) {
          reply.file('./public/user.html');
      }
}

module.exports = userroute;
