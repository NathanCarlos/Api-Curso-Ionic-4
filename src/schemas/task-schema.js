const findTask = {
  description: 'Rota que retorna uma lista das tarefas de um determinado usuário.',
  security: [
    {
      'ApiKeyAuth': []
    }
  ]
}
const findTaskById = {
  description: 'Rota que retorna uma única task de um determinado usuário.',
  params: {
    type: 'object',
    properties: {
      id: { type: 'number', description: 'Id da task.' }
    }
  },
  security: [
    {
      'ApiKeyAuth': []
    }
  ]
}
const createTask = {
  description: 'Rota para criar uma task nova.',
  body: {
    type: 'object',
    properties: {
      title: { type: 'string', description: 'Título da task.' },
      description: { type: 'string', description: 'Descrição da task.' },
      dataInicio: { type: 'string', description: 'Data de início da task.' },
      dataFim: { type: 'string', description: 'Data de fim da task.' }
    }
  },
  security: [
    {
      'ApiKeyAuth': []
    }
  ]
}
const updateTask = {
  description: 'Rota para fazer update em uma task.',
  body: {
    type: 'object',
    properties: {
      id: { type: 'number', description: 'Id da task.' },
      title: { type: 'string', description: 'Título da task.' },
      description: { type: 'string', description: 'Descrição da task.' },
      dataInicio: { type: 'string', description: 'Data de início da task.' },
      dataFim: { type: 'string', description: 'Data de fim da task.' }
    }
  },
  security: [
    {
      'ApiKeyAuth': []
    }
  ]
}
const deleteTask = {
  description: 'Rota para fazer delete de uma task.',
  params: {
    type: 'object',
    properties: {
      id: { type: 'number', description: 'Id da task.' }
    }
  },
  security: [
    {
      'ApiKeyAuth': []
    }
  ]
}
module.exports = {
  findTask,
  findTaskById,
  createTask,
  updateTask,
  deleteTask
}
