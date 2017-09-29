//Name: Neha Mansinghka
//CWID: 10420458
//Subject: CS546 Web Programming W1 Lab4

let title = "My Second Task";
let description = "This is the second thing I need to do today";
let taskId = "4da54990-a4a0-11e7-b602-ff769b6c6f70";

const todoItems = require("./todo");
const connection = require("./mongoConnection");

async function main(){

    //const createdTask = await todoItems.createTask(title, description);
    //console.log(createdTask);

    //const updatedTask = await todoItems.completeTask(taskId);
    //console.log(updatedTask);

    const allTasks = await todoItems.getAllTasks();
    console.log(allTasks);

    const db = await connection();
    await db.close();

}

main();