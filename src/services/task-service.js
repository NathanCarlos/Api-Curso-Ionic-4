const { Task } = require('../models/index')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
class TaskService {
  static async create (title, description, dataInicio, dataFim, userId, aviso) {
    try {
      let result = await Task.create({
        title,
        description,
        dataInicio,
        dataFim,
        userId,
        aviso
      })
      return result
    } catch (err) {
      let msg = 'Ocorreu um erro ao processar a requisição.'
      const error = new Error(msg)
      error.code = 500
      throw error
    }
  }
  static async update (id, title, description, dataInicio, dataFim, userId, done, aviso) {
    try {
      let result = await Task.update({
        title,
        description,
        dataInicio,
        dataFim,
        userId,
        done,
        aviso
      }, { where: { id } })
      return result
    } catch (err) {
      let msg = 'Ocorreu um erro ao processar a requisição.'
      const error = new Error(msg)
      error.code = 500
      throw error
    }
  }
  static async countTasksAll (userId) {
    try {
      let calcDate = new Date()
      calcDate.setHours(calcDate.getHours() - 2)
      let result = await Task.count({
        where: { userId: userId }
      })
      return result
    } catch (err) {
      let msg = 'Ocorreu um erro ao processar a requisição.'
      const error = new Error(msg)
      error.code = 500
      throw error
    }
  }
  static async findAll (idUser) {
    try {
      let calcDate = new Date()
      calcDate.setHours(calcDate.getHours() - 2)
      let result = await Task.findAll({
        where: { userId: idUser, done: false },
        order: [['dataInicio', 'ASC']]
      })
      return result
    } catch (err) {
      console.log(err)
      let msg = 'Ocorreu um erro ao processar a requisição.'
      const error = new Error(msg)
      error.code = 500
      throw error
    }
  }
  static async findAllDone (idUser) {
    try {
      let calcDate = new Date()
      calcDate.setHours(calcDate.getHours() - 2)
      let result = await Task.findAll({
        where: { userId: idUser, done: true },
        order: [['dataInicio', 'ASC']]
      })
      return result
    } catch (err) {
      console.log(err)
      let msg = 'Ocorreu um erro ao processar a requisição.'
      const error = new Error(msg)
      error.code = 500
      throw error
    }
  }
  static async findAllToday (idUser) {
    try {
      let calcDate = new Date()
      let newCalcDate = new Date()
      let calcStartDate = new Date()
      newCalcDate.setHours(newCalcDate.getHours() - 2)
      calcDate.setHours(23)
      calcDate.setMinutes(59)
      calcStartDate.setHours(0)
      calcStartDate.setMinutes(1)
      let result = await Task.findAll({
        where: { [Op.or]: [ { [Op.and]: { userId: idUser, [Op.and]: { dataInicio: { [Op.gte]: calcStartDate }, dataFim: { [Op.lte]: calcDate } } } }, { [Op.and]: { userId: idUser, [Op.and]: { dataInicio: { [Op.lte]: calcDate }, dataFim: { [Op.gte]: calcDate } } } } ] },
        order: [['dataInicio', 'ASC']]
      })
      return result
    } catch (err) {
      let msg = 'Ocorreu um erro ao processar a requisição.'
      const error = new Error(msg)
      error.code = 500
      throw error
    }
  }
  static async findByIdToday (id, userId) {
    try {
      let calcDate = new Date()
      calcDate.setHours(23)
      calcDate.setMinutes(59)
      let result = await Task.findAll({
        where: { id, userId, dataInicio: { [Op.lte]: calcDate } }
      })
      return result
    } catch (err) {
      let msg = 'Ocorreu um erro ao processar a requisição.'
      const error = new Error(msg)
      error.code = 500
      throw error
    }
  }
  static async countTasksToday (userId) {
    try {
      let calcDate = new Date()
      let newCalcDate = new Date()
      let calcStartDate = new Date()
      newCalcDate.setHours(newCalcDate.getHours() - 2)
      calcDate.setHours(23)
      calcDate.setMinutes(59)
      calcStartDate.setHours(0)
      calcStartDate.setMinutes(1)
      let result = await Task.count({
        where: { [Op.or]: [ { [Op.and]: { userId: userId, [Op.and]: { dataInicio: { [Op.gte]: calcStartDate }, dataFim: { [Op.lte]: calcDate } } } }, { [Op.and]: { userId: userId, [Op.and]: { dataInicio: { [Op.lte]: calcDate }, dataFim: { [Op.gte]: calcDate } } } } ] }
      })
      return result
    } catch (err) {
      let msg = 'Ocorreu um erro ao processar a requisição.'
      const error = new Error(msg)
      error.code = 500
      throw error
    }
  }
  static async delete (id, userId) {
    try {
      let result = await Task.destroy({
        where: { id, userId }
      })
      return result
    } catch (err) {
      let msg = 'Ocorreu um erro ao processar a requisição.'
      const error = new Error(msg)
      error.code = 500
      throw error
    }
  }
}
module.exports = TaskService
