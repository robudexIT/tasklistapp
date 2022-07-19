const AWS = require('aws-sdk')
const crypto = require('crypto')
exports.handler = (event, context, cb) => {
    const dbTable = process.env.DB_TABLE
    const taskId = crypto.randomBytes(30).toString('hex')
    const taskName = event.taskName

    const documentClient = new AWS.DynamoDB.DocumentClient()
    const params = {
        TableName: dbTable,
        Item: {
            taskId: taskId,
            taskName: taskName
        }
        
    }
    documentClient.put(params, (error, data) => {
        if(error){
            cb(null, {message:'Adding New Task is unsuccessful',error:error,addTask: false})
            return    
        }
        cb(null, {message:'Adding New Task is Successful,', data:data, addTask: true})
    })
}