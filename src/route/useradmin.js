module.exports = {
  method: 'GET',
  path: '/{user}/admin',
  handler: function (request, reply) {
    reply.view('useradmin')
  }
}
