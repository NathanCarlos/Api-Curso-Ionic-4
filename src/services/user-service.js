const { User } = require('../models/index')
const crypto = require('crypto')

class UserService {
  static async getPasswordHash (password) {
    return crypto.createHash('sha256').update(password).digest('hex')
  }
  static async findUsers () {
    try {
      let result = await User.findAll({})
      return result
    } catch (err) {
      let msg = 'Ocorreu um erro ao processar a requisição.'
      const error = new Error(msg)
      error.code = 500
      throw error
    }
  }
  static async findById (id) {
    try {
      let result = await User.findOne({
        where: { id }
      })
      return result
    } catch (err) {
      let msg = 'Ocorreu um erro ao processar a requisição.'
      const error = new Error(msg)
      error.code = 500
      throw error
    }
  }
  static async createUser (username, password, email) {
    try {
      let hash = await this.getPasswordHash(password)
      let result = await User.create({
        username,
        password: hash,
        email
      })
      result.password = '******'

      return result
    } catch (err) {
      let msg = 'Ocorreu um erro ao processar a requisição.'
      const error = new Error(msg)
      error.code = 500
      throw error
    }
  }
  static async authUser (email, password) {
    try {
      const user = await User.findOne({
        where: {
          email,
          password: await this.getPasswordHash(password)
        }
      })

      if (user == null) {
        let msg = { message: 'Usuario ou senha invalida' }
        return msg
      }

      const retorno = {
        token: '',
        data: {
          id: user.id,
          email: user.email,
          name: user.username
        }
      }
      return retorno
    } catch (err) {
      let msg = 'Ocorreu um erro ao processar a requisição.'
      const error = new Error(msg)
      error.code = 500
      throw error
    }
  }
  static async delete (id) {
    try {
      let result = await User.destroy({ where: { id } })
      return result
    } catch (err) {
      let msg = 'Ocorreu um erro ao processar a requisição.'
      const error = new Error(msg)
      error.code = 500
      throw error
    }
  }
}

module.exports = UserService
