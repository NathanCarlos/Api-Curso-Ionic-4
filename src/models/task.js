const sqlize = require('../services/sequelize')
const Sequelize = require('sequelize')
const User = require('./user')

const Task = sqlize.define('task', {
  title: { type: Sequelize.STRING(50), allowNull: false },
  description: { type: Sequelize.STRING(255), allowNull: false },
  dataInicio: { type: Sequelize.DATE, allowNull: false, validate: { isDate: true } },
  dataFim: { type: Sequelize.DATE, allowNull: false, validate: { isDate: true } },
  userId: { type: Sequelize.INTEGER, allowNull: false, validate: { isInt: true } },
  done: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
  aviso: { type: Sequelize.STRING, allowNull: false }
})
Task.belongsTo(User)
User.hasMany(Task)

module.exports = Task
