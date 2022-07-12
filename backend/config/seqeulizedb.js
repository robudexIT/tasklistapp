

const { Sequelize } = require('sequelize')
require('dotenv').config()
const dbhost= process.env.DB_HOST
const dbname = process.env.DB_NAME
const dbuser = process.env.DB_USER
const dbpwd = process.env.DB_PWD

module.exports = new Sequelize(dbname, dbuser,dbpwd,{
    host:dbhost,
    dialect: 'mysql'
})