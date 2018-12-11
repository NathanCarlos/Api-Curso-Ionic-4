const { UserService } = require('../services/index')
const { findUserById, createUser, authUser, findUsers } = require('../schemas/user-schema')
let response
async function routes (fastify, options) {
  fastify.get('/user/find/:password', { schema: findUsers }, async (request, reply) => {
    try {
      if (request.params.password === '@OnGestDevV1') {
        response = await UserService.findUsers()
        reply.send(response)
      } else {
        console.log('Log: Alguém tentou entrar e não conseguiu, senha digitada: ' + request.params.password)
        reply.send({ message: 'Erro, senha não autorizada' })
      }
    } catch (err) {
      response = {
        'error': 'Uncaught server error: ' + JSON.stringify(err)
      }
      let errorCode = 500
      if (err.code != null) {
        errorCode = err.code
      }
      reply.code(errorCode).send(response)
    }
  })
  fastify.get('/user/findById', { beforeHandler: [fastify.authenticate], schema: findUserById }, async (request, reply) => {
    try {
      response = await UserService.findById(request.user.id)
      reply.send(response)
    } catch (err) {
      response = {
        'error': 'Uncaught server error: ' + JSON.stringify(err)
      }
      let errorCode = 500
      if (err.code != null) {
        errorCode = err.code
      }
      reply.code(errorCode).send(response)
    }
  })
  fastify.post('/user/create', { schema: createUser }, async (request, reply) => {
    try {
      response = await UserService.createUser(request.body.username, request.body.password, request.body.email)
      reply.status(201).send(response)
    } catch (err) {
      response = {
        'error': 'Uncaught server error: ' + JSON.stringify(err)
      }
      let errorCode = 500
      if (err.code != null) {
        errorCode = err.code
      }
      reply.code(errorCode).send(response)
    }
  })
  fastify.post('/auth', { schema: authUser }, async (request, reply) => {
    try {
      response = await UserService.authUser(request.body.email, request.body.password)
      const token = fastify.jwt.sign({ id: response.data.id })
      response.token = token
      reply.status(200).send(response)
    } catch (e) {
      reply.status(401).send({
        message: 'Usuario Invalido'
      })
    }
  })
  // fastify.delete('/user/delete/:id', { beforeHandler: [fastify.authenticate] }, async (request, reply) => {
  //   try {
  //     response = await UserService.delete(request.params.id)
  //     reply.status(200).send(response)
  //   } catch (err) {
  //     response = {
  //       'error': 'Uncaught server error: ' + JSON.stringify(err)
  //     }
  //     let errorCode = 500
  //     if (err.code != null) {
  //       errorCode = err.code
  //     }
  //     reply.code(errorCode).send(response)
  //   }
  // })
}
module.exports = routes
