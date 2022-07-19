const AWS = require('aws-sdk')
const crypto = require('crypto')
exports.handler = async(event) => {
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
    try {
        const data = await documentClient.put(params).promise()
        console.log(data)
        return  {statusCode:200,message:'Adding New Task is Successful,', data:data, addTask: true}
        
    }catch(error){
        console.log(error)
        return {statuCode:400,message:'Adding New Task is unsuccessful',error:error,addTask: false}
        
    }
    
}