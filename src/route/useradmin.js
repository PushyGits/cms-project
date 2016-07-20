const useradmin = {
  method: 'GET',
  path: '/{user}/admin',
  handler: function (request, reply) {
      reply.file('./public/useradmin.html');
  }
}

module.exports = useradmin;
