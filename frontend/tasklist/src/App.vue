<script >
   export default {
    data(){
        return {
            taskList: {},
            name: 'Rogmer Bulaclac',
            taskName: '',
            apiAddr: 'https://6f3t0q8z49.execute-api.us-east-1.amazonaws.com/dev'
        }
    },
    methods: {
        async getTaskList(){
            const taskList = await fetch(`${this.apiAddr}/gettasklist`,{
                method:'GET',
              
            })
            this.taskList = await taskList.json()
            console.log(this.taskList)
        },
        async addTask(){
            if(this.taskName == ''){
                alert('Adding Empty Task is prohibited')
                return
            }
            const data = { taskName: this.taskName}
            const addTask = await fetch(`${this.apiAddr}/addtask`,{
                headers: {
                    'Content-Type': 'application/json'
                    
                },
                method: 'POST',
                body: JSON.stringify(data)
            })
             const response = await addTask.json()
             if(response.addTask){
                alert(response.message)
                this.getTaskList()
                this.taskName = ''
             }
             

        },
   
        async deleteTask(e){
            console.log(e.target.id)
            const taskId = e.target.id
            try {
               const deleteTask = await fetch(`${this.apiAddr}/deletetask/${taskId}`,{
                    method: 'DELETE'
                })
                const response = await deleteTask.json()
                 if(response.deleteTask){
                    console.log(response)
                    alert(response.message)
                    this.getTaskList()
                 }
              
               
            }catch(e){
                console.log('error?')
                console.log(e)
            }
        },
        test(){
            alert('test')
        }
    },
    computed: {
        allTask(){
            return this.taskList
        }
    },
    created(){
        this.getTaskList()
    }
   }
</script>

<template>
 <h1>Welcome to TaskList App</h1>
 <ul>
    <li v-for="task in taskList.data" :key="task.taskId">
       
        <p>{{task.taskName}} <span> <button v-bind:id="task.taskId" @click="deleteTask">Delete</button></span></p>
       
        <!-- <button>Update</button> -->
    </li>
 </ul>
 <!-- <button @click="getTaskList">GETTASKLIST</button> -->
 <form >
  
    <input type="text"  v-model="taskName">
    <button @click.prevent="addTask">AddTask</button>
 </form>
</template>

<style>

</style>
