<script >
   export default {
    data(){
        return {
            taskList: {},
            name: 'Rogmer Bulaclac',
            taskName: ''
        }
    },
    methods: {
        async getTaskList(){
            const taskList = await fetch('http://localhost:3000/getTaskList',{
                method:'GET',
              
            })
            this.taskList = await taskList.json()
            console.log(this.taskList)
        },
        async addTask(){
            const data = { taskName: this.taskName}
            const addTask = await fetch('http://localhost:3000/task',{
                headers: {
                    'Content-Type': 'application/json'
                    
                },
                method: 'POST',
                body: JSON.stringify(data)
            })
             const response = await addTask.json()
             if(response.taskId){
                alert(response.message)
                this.getTaskList()
                this.taskName = ''
             }
             

        },
        async deleteTask(e){
            console.log(e.target.id)
            const taskId = e.target.id
            try {
               const deleteTask = await fetch(`http://localhost:3000/task/${taskId}`,{
                    method: 'DELETE'
                })
                const response = await deleteTask.json()
                 if(response.deleteTask){
                    alert(response.message)
                    this.getTaskList()
                 }
            }catch(e){
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
<div>
    <h1>Welcome to TaskList App</h1>
    <ul>
        <li v-for="task in taskList.taskList" :key="task.taskId">
            <p>{{task.taskName}} <span> <button v-bind:id="task.taskId" @click="deleteTask">Delete</button></span></p>
        
            <!-- <button>Update</button> -->
        </li>
    </ul>
    <!-- <button @click="getTaskList">GETTASKLIST</button> -->
    <form >
    
        <input type="text"  v-model="taskName">
        <button @click.prevent="addTask">AddTask</button>
    </form>
 </div>
</template>

<style>

</style>
