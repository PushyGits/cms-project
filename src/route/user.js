module.exports = {
  method: 'GET',
  path: '/{user}',
  handler: function (request, reply) {
    reply.view('user')
  }
}
