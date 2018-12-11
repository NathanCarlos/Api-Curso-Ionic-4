const sqlize = require('../services/sequelize')
const Sequelize = require('sequelize')

const User = sqlize.define('user', {
  username: { type: Sequelize.STRING(50), allowNull: false },
  password: { type: Sequelize.STRING(50), allowNull: false },
  email: { type: Sequelize.STRING(255), unique: true, allowNull: false, validate: { isEmail: true } }
})
module.exports = User
