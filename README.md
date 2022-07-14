# taskListApp
This Project is my own version of TodoList 


# For Master Branch
NodeJS/Express - Backend/API (running locally)
VueJs - FrontEnd (running locally)
DATABASE: MYSQL (running locally)
(functional but very simple app with no authentication, styling, api endpoints and its running locally on my computer)


# s3-beanstalk-rds Branch
NodeJS/EXPRESS - Backend/API (running on EC2 under ElasticBeanstalk)
VueJs - FrontEnd (build and Upload to S3)
DATABASE: MYSQL (RDS instance)

1. RDS: 
 Launch RDS instance (under free tier if possible)
 Put RDS instace under private subnet(no Public Access
 Create new sg-group for RDS Instance
 
 
2. Create Elastic Beansltak Applictation Webtier (Single Instance) NODEJS Platform with Sample application Application Code
After Environment is created, edit EB-EC2 Security Group and tempory allowed port 22 from any source (to access the EC2 Instance)
Connect to EC2 Instance from there issue command
- yum install mysql -y
 -mysql -u admin -h 'rds-endpoint' -p 
  (enter msyql passowrd)
 - create database taskdb
 - exit
 -yum remove mysql
Disconnect on Instance

3.Edit RDS Security Group and allow msyql/maridab access with ec2-sg as source.

4.On backend code create directry name.ebextensions
  Under .ebextensions touch db.config file and put this config
 
 option_settings:
  aws:elasticbeanstalk:application:environment:
    DB_HOST: 'rds instance endpoint eg (taskappdb.cgillmrkupqn.us-east-1.rds.amazonaws.com)'
    PORT: 3000
    DB_PORT: 3306
    DB_NAME: taskdb
    DB_USER: admin
    DB_PWD: rdsinstane-password
    
  under backend directory, zip all files and folders
    -zip backend.zip  -r * .[^.]*
    
  Goto ElasticBeanstalk Application Web Environement and click Upload and deploy and choose  backend.zip and click Deploy.
  With for the ElasticBeanstalk to finish the update.
  
  5.After the update was done, copy Environment endoint eg ('backendapp-env.eba-immn2eqq.us-east-1.elasticbeanstalk.com')
    Open frontend/tasklist/src/App.vue  and look for apiAddr and replace it with your eb-environment endpoint
    
    Under tasklist, run command ('npm run build')
    dist folder will created
    
  6. Create S3 bucket 'name of your choice' with some configuration
     - Static website hosting = enable
     - Block public access = turnoff
     - For Bucket Policy
        {
           "Version": "2012-10-17",
           "Statement": [
              {
                  "Sid": "PublicRead",
                  "Effect": "Allow",
                  "Principal": "*",
                  "Action": [
                      "s3:GetObject",
                      "s3:GetObjectVersion"
                  ],
                  "Resource": "s3-arn/*"
              }
           ]
        }
        
        
 Upload the files under dist folder(dont include the dist folder)  
 
 Look for Static Hosting Address eg (http://tasklistapp.s3-website-us-east-1.amazonaws.com) and test the app.









  

 



