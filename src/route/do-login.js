const Joi = require('joi')

// Joi's way of setting a schema which we will compare our data against.
const schema = Joi.object().keys({
  username: Joi.string().alphanum().min(3).max(20).required(),
  password: Joi.string().alphanum().min(3).max(20).required()
})

module.exports = {
  method: 'POST',
  path: '/do-login',
  handler: function (request, reply) {
    console.log(request.payload)
    Joi.validate(request.payload, schema, (err, value) => {
      if (err) reply('').redirect('/')
      else reply('').redirect('/useradmin')
    })
  }
}
