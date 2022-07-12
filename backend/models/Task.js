const sequelize = require('../config/seqeulizedb')
const { DataTypes } = require('sequelize')
const { STRING } = require('sequelize')

const Task = sequelize.define('Task', {
    taskId: {
        type:DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
    },
    taskName: {
        type:DataTypes.STRING
    }
})
Task.sync() // this creates table if it doesn't exist (and does nothing if it already exist)
module.exports = Task