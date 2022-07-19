const AWS = require('aws-sdk')
exports.handler = async(event) => {
    const dbTable = process.env.DB_TABLE
    const documentClient = new AWS.DynamoDB.DocumentClient()
    const params = {
        TableName: dbTable,
        
    }
    try {
        const data = await documentClient.scan(params).promise()
        console.log(data)
        return {statusCode:200,message: 'Fetching Data is Successful', data: data.Items, getList:true}
    }catch(error){
        console.log(error)
        return {statusCode:400,message:'Fetching Data is unsuccessful', error, getList:false}
    }
    


}