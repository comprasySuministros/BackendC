const boom = require('@hapi/boom')
const Joi = require('joi')

function validate(data, schema){
  const {error} = Joi.object(schema).validate(data)
  return error
}

function validateHandler(shema, check="body") {
  return((req, res, next)=>{
    const error = validate(req[check], shema)

    error ? next(boom.badRequest(error)) : next()
  })
}

module.exports = validateHandler