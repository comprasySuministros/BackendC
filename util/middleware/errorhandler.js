/* eslint-disable no-unused-vars */
const boom = require('@hapi/boom')
const { resolveConfigFile } = require('prettier')
const {config} = require('../../config/index')

function errorStack(error, stack){
  if(!config.dev){
    return {...error, stack}
  }
  return error
}

function logError(err, req, res, next) {
  console.log(err)
  next(err)
}

function wrapError(err, req, res, next){
  if (!err.isBoom){
    next(boom.badImplementation(err))
  }
  next(err)
}

function handlerError(err, req, res, next) {
  const {output:{statusCode,payload}}=err
  res.status(statusCode)
  res.json(errorStack(payload, err.stack))
}

module.exports = {
  logError,
  wrapError,
  handlerError
}