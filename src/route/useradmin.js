module.exports = {
  method: 'GET',
  path: '/useradmin',
  handler: function (request, reply) {
    reply.view('useradmin')
  }
}
