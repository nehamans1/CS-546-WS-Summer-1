//Name: Neha Mansinghka
//CWID: 10420458
//Subject: CS546 Web Programming W1 Lab4

const mongoCollections = require("./mongoCollections");
const tasks = mongoCollections.tasks;
const uuidv1 = require("uuid/v1");
  
  module.exports = {

    //Function to get task by giving the task id
    async getTask(id){
      if (!id) throw "You must provide an id to search for";

      const taskCollection = await tasks();
      const task = await taskCollection.findOne({ _id: id });
      if (task === null) throw "No task with that id";
  
      return task;
    },
    
    //Function to add a new task to the database
    async createTask(title, description) {
    if ((!title)||(!description)) throw "You must provide a title and a description for the task";

    if (typeof(title)!="string" || typeof(description)!="string"){
      throw "You must provide title and description as strings";
    }

    let taskId = uuidv1();
    //console.log("Id: "+taskId);
    let taskCompleted = false;
    let taskCompletedAt = null;

    const taskCollection = await tasks();

    let newTask = {
        _id: taskId,
        title: title,
        description: description,
        completed: taskCompleted,
        completedAt: taskCompletedAt
    };

    const insertTask = await taskCollection.insertOne(newTask);
    if (insertTask.insertedCount === 0) throw "Could not create task";

    const newId = insertTask.insertedId;

    const task = await this.getTask(newId);
    //console.log(task);
    return task;
  },

  async getAllTasks(){

    const taskCollection = await tasks();
    let allTasks = await taskCollection.find().toArray();

    if((!allTasks)||(allTasks.length===0)){
      throw "No tasks found";
    }

    return allTasks;
  },


  async completeTask(taskId) {

    if (!taskId) throw "You must provide an id to complete the task";

    let completed = true;
    let currDateTime = (new Date()).toString();
    
    const taskCollection = await tasks();
    
    const updateTask = await taskCollection.updateOne({ _id: taskId }, {$set: {"completed":true, "completedAt":currDateTime}});
        if (updateTask.modifiedCount === 0) {
          throw "could not complete the task successfully";
        }
    
        return await this.getTask(taskId);
  },

  async removeTask(id){

    if (!id) throw "You must provide an id to remove the task";

    const taskCollection = await tasks();
    const deletionTask = await taskCollection.removeOne({ _id: id });

    if (deletionTask.deletedCount === 0) {
      throw `Could not delete task with id of ${id}`;
    }
    return;
  }
};