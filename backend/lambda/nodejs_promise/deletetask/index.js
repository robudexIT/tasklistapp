const AWS = require('aws-sdk')
exports.handler = async(event) => {
    const dbTable = process.env.DB_TABLE
    const documentClient = new AWS.DynamoDB.DocumentClient()
    const taskId = event.taskId

    const params = {
        TableName: dbTable,
        Key: {
            taskId: taskId
        }
    }
    try {
        const data = await  documentClient.delete(params).promise()
        console.log(data)
        return {statusCode:200,message: 'Deleting task is Successful', deleteTask:true, data:data}
    } catch(error){
        console.log(error)
        return {statusCode:400,message:'Deleting task is unsuccessful', deleteTask:false, error: error}
    } 
   
}