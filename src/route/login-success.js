module.exports = {
  method: 'POST',
  path: '/login-success',
  handler: function (request, reply) {
    console.log(request.payload)
    reply.view('useradmin')
  }
}
