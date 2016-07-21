module.exports = {
  method: 'POST',
  path: '/register-success',
  handler: function (request, reply) {
    console.log(request.payload)
    reply.view('user')
  }
}
