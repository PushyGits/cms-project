module.exports = {
    path: '/',
    method: 'GET',
    handler: (request, reply) => {
      reply.view('index');
  }
}
