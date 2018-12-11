const findUserById = {
  description: 'Rota que retorna uma lista dos usuários de uma determinada loja.',
  security: [
    {
      'ApiKeyAuth': []
    }
  ]
}
const createUser = {
  description: 'Rota para criar um usuário.',
  body: {
    type: 'object',
    properties: {
      username: { type: 'string', description: 'Nome do usuário.' },
      password: { type: 'string', description: 'Senha do usuário.' },
      email: { type: 'string', description: 'Email do usuário.' }
    }
  }
}
const authUser = {
  description: 'Rota para autenticação do usuário.',
  body: {
    type: 'object',
    properties: {
      password: { type: 'string', description: 'Senha do usuário.' },
      email: { type: 'string', description: 'Email do usuário.' }
    }
  }
}
const findUsers = {
  description: 'Rota para buscar todos os usuários cadastrados.',
  params: {
    type: 'object',
    properties: {
      password: { type: 'string', description: 'Senha do admin do sistema.' }
    }
  }
}
module.exports = {
  findUserById,
  createUser,
  authUser,
  findUsers
}
