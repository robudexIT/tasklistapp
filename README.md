# taskListApp
This Project is my own version of TodoList 


# For s3-apigateway-lambdanode-dynamodb Branch.
 This branch turns project into complete serverless architecture.
 The App functionality is still the same, but the approach is different.
 The Idea is creating App without spinning any server. Just focus on the code
 and let AWS handle the rest. On that regards, we will change our architecture into:
 
- Lambda - Backend (nodejs runtime)
- S3 -    FrontEnd 
- DATABASE: DYNAMODB
- ( very simple app with no authentication, and styling styling)

Note:All services used is on the same region.

# DYNAMODB
  - Create Dyamodbo table of name taskdb with primaryKey of taskId.Set the Read and Write Capacity into 1 (to make sure its under freetier)
 
# Lambda Functions
  - Create addtask, delettask, gettasklist functions  Author From Scatch with nodejs.16X runtime 
  - For the code, upload the zip file for each function located on backend/lambda/nodejs_cb/
  - In Configuration tab of each function add environment variables 
     - Key=DB_TABLE Value=taskdb
  - In Configuration tab  of each functions ,choose Permission  and click the role name link. You will redirect to the roles details  of each function 
      -Edit the existing Policy name and add policy for each function. located on backend/iamrole 
      - eg for addtaskPolicy add policy on putitem.json
          {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": "dynamodb:PutItem",
            "Resource": "arn:aws:dynamodb:chosen-region:aws-acount:table/dynamodb_table"
          }
        replace 
          chosen-region  with your own region
          aws-account with your account
          dynamodb_table with taskdb
          
     # API Gateway 
       Under REST API click IMPORT
       - For Protocol choose REST
       - Choose Import from Swagger or Open API 3
       - Click Select Swagger File button and upload json file under backen/api and click IMPORT
       - For Integration type choose Lambda Function
          - /addtask/POST - your addtask function
          - /deletetask/{taskId}/DELETE - your deletetask function
          - /gettasklist/GET - your gettasklist function
          
        - Because /deletetask/ has params {taskId} on its path we need to pass this to lambda function.
            - DELETE method, click Integration Request 
            - Choose Mapping Templates -> When there are no templates defined (recommended)
            - Under Content-Type  type application/json and add object below and save.
             {
                 "takskId": "$input.params('taskId')"
             }
         
       - To use the API we need to deploy it.
          Click Actions  and Click Deploy API
          choose New Stage 
            Stage name: dev
            Stage Descpiton : stage description
            Deployment Description: deployement description
        -Under Stages, you will see the newly deploy api.   
            
         copy the root endpoint that somethin look like this
            https://tmtlklvjge.execute-api.us-east-1.amazonaws.com/dev
       - Open  frontend/tasklist/src/App.vue replce apiAddr with your endpoint.
       -     
   # S3 
     - Create unique bucket name , enable the static webhosting  and create bucket policy to allow access to to this bucket.
     - on frontend/tasklist/ run npm run build.
     - it will create dist folder under takslist project.
       upload all files and folder under dist folder (without dist folder)
     
     Test your application by visiting your static website url and try adding ang deleting task.
     Check Your dynamodb table if the task is recorded 
