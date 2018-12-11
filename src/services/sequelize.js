const path = require('path')
const Sequelize = require('sequelize')
const sequelize = new Sequelize('main', '', '', {
  host: 'localhost',
  dialect: 'sqlite',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  // SQLite only
  storage: path.join(__dirname, '../../database/ongest-api.db'),

  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: false
})
sequelize.sync()

module.exports = sequelize
