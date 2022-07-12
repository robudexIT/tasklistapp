const express = require('express')
const { sync } = require('../config/seqeulizedb')
const router = express.Router()
const Task = require('../models/Task')

router.get('/getTaskList', async (req, res,next) => {
    try {
        const taskList = await Task.findAll()
        if(taskList.length == 0){
            res.status(200).json({message:'No Available Task',NumberOfTask:taskList.length})
            return
        }
        res.status(200).json({NumberOfTask: taskList.length, taskList: taskList})
       
    }catch(error){
        console.log(error)
        
    }
    
   
})

router.get('/getTask/:taskId', async(req,res, next)=> {
    try{
        const taskId = req.params.taskId
        const task = await Task.findOne({where: {taskId:taskId}}) 
        if(!task || task== null){
            res.json({message:'Task Not Found!', task:false})
            return
        }
        console.log(task)
        res.json({message: 'Found One task', task: task, })
    }catch(error){
        console.log(error)
    }
   

})
router.post('/task', async(req, res,next)=> {
   try {
        const task = await Task.create({taskName: req.body.taskName})
        console.log('Successfully adding task with taskId of:', task.taskId)
   }catch(error){
    console.log(error)
   }
})

router.put('/task/:taskId', async(req,res, next) =>{
   try {
        const taskId = req.params.taskId
        const newTaskName = req.body.newTaskName
        const updateTask = await Task.update({taskName: newTaskName},
                          {where:{taskId:taskId}})
        if(updateTask== 0){
            res.status(200).json({message:'Update is not successfull',updateTask:false})
            return
        } 
        res.status(200).json({message:'Successfully updated taskName', updateTask:true})                
   }catch(error){
    console.log(error)
   }
})

router.delete('/task/:taskId', async(req, res, next) => {
    try{
        const taskId = req.params.taskId
        const deleteTask = await Task.destroy({where:{taskId:taskId}})
        if(deleteTask == 0){
            res.json({message:"task not found or delete is not successfull", deleteTask:false})
            return
        }
        res.json({message:'Task is successfully deleted', deleteTask:true})
    }catch(error){
        console.log(error)
    }
})

module.exports = router