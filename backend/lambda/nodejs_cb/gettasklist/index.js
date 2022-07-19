const AWS = require('aws-sdk')
exports.handler = (event, context, cb) => {
    const dbTable = process.env.DB_TABLE
    const documentClient = new AWS.DynamoDB.DocumentClient()
    const params = {
        TableName: dbTable,
        
    }

    documentClient.scan(params, (error, data) => {
        if(error){
            console.log(error)
            cb(null, {message:'Fetching Data is unsuccessful', error, getList:false})
            return
        }
        console.log(data)
        cb(null, {message: 'Fetching Data is Successful', data: data.Items, getList:true})
    })


}