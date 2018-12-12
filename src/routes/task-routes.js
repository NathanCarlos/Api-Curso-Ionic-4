const { TaskService } = require('../services/index')
const { findTask, findTaskById, createTask, updateTask, deleteTask } = require('../schemas/task-schema')
let response
async function routes (fastify, options) {
  fastify.get('/task/find', { beforeHandler: [fastify.authenticate], schema: findTask }, async (request, reply) => {
    try {
      response = await TaskService.findAllToday(request.user.id)
      reply.status(200).send(response)
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
  fastify.get('/task/findCount', { beforeHandler: [fastify.authenticate], schema: findTask }, async (request, reply) => {
    try {
      response = await TaskService.countTasksToday(request.user.id)
      reply.status(200).send([{ result: response }])
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
  fastify.get('/task/findAll', { beforeHandler: [fastify.authenticate], schema: findTask }, async (request, reply) => {
    try {
      response = await TaskService.findAll(request.user.id)
      reply.status(200).send(response)
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
  fastify.get('/task/findAllDone', { beforeHandler: [fastify.authenticate], schema: findTask }, async (request, reply) => {
    try {
      response = await TaskService.findAllDone(request.user.id)
      reply.status(200).send(response)
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
  fastify.get('/task/findCountAll', { beforeHandler: [fastify.authenticate], schema: findTask }, async (request, reply) => {
    try {
      response = await TaskService.countTasksAll(request.user.id)
      reply.status(200).send([{ result: response }])
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
  fastify.get('/task/findById/:id', { beforeHandler: [fastify.authenticate], schema: findTaskById }, async (request, reply) => {
    try {
      response = await TaskService.findByIdToday(request.params.id, request.user.id)
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
  fastify.post('/task/create', { beforeHandler: [fastify.authenticate], schema: createTask }, async (request, reply) => {
    try {
      response = await TaskService.create(request.body.title, request.body.description, request.body.dataInicio, request.body.dataFim, request.user.id)
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
  fastify.put('/task/update', { beforeHandler: [fastify.authenticate], schema: updateTask }, async (request, reply) => {
    try {
      response = await TaskService.update(request.body.id, request.body.title, request.body.description, request.body.dataInicio, request.body.dataFim, request.user.id, request.body.done)
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
  fastify.delete('/task/delete/:id', { beforeHandler: [fastify.authenticate], schema: deleteTask }, async (request, reply) => {
    try {
      response = await TaskService.delete(request.params.id, request.user.id)
      reply.status(200).send(response)
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
}
module.exports = routes
