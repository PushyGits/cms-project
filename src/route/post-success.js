module.exports = {
  method: 'POST',
  path: '/post-success',
  handler: function (request, reply) {
    console.log(request.payload)
    reply.view('user')
  }
}
