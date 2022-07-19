const AWS = require('aws-sdk')
exports.handler = (event, context, cb) => {
    const dbTable = process.env.DB_TABLE
    const documentClient = new AWS.DynamoDB.DocumentClient()
    const taskId = event.taskId

    const params = {
        TableName: dbTable,
        Key: {
            taskId: taskId
        }
    }

    documentClient.delete(params, (error, data) => {
        if (error){
            console.log(error)
            cb(null, {message:'Deleting task is unsuccessful', deleteTask:false, error: error})
            return
        }
        cb(null, {message: 'Deleting task is Successful', deleteTask:true, data:data})
    })
}