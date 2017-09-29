//Name: Neha Mansinghka
//CWID: 10420458
//Subject: CS546 Web Programming W1 Lab4

let task1 = {
    title: "Ponder Dinosaurs",
    description: "Has Anyone Really Been Far Even as Decided to Use Even Go Want to do Look More Like?"
}

let task2 = {
    title: "Play Pokemon with Twitch TV",
    description: "Should we revive Helix?"
}
//let taskId = "fa726900-a4b4-11e7-9676-7da86f0d48b5";

const todoItems = require("./todo");
const connection = require("./mongoConnection");

async function main(){

    const createdTask = await todoItems.createTask(task1.title, task1.description);
    console.log("First task: ");
    console.log(createdTask);
    console.log("\n");
   
    const createdTask2 = await todoItems.createTask(task2.title, task2.description);

    const allTasks = await todoItems.getAllTasks();
    console.log("Printing all tasks after creating first task: ");
    console.log(allTasks);
    console.log("\n");

    let firstTask = allTasks[0];
    try{
        const delTask = await todoItems.removeTask(firstTask._id);
    }
    catch(e){
        console.log(e);
    }
    
    const allTasks2 = await todoItems.getAllTasks();
    console.log("Printing all tasks after deleting first task: ");
    console.log(allTasks2);
    console.log("\n");

    const updatedTask = await todoItems.completeTask(allTasks2[0]._id);
    console.log("Printing the updated remaining task: ");
    console.log(updatedTask);


    const db = await connection();
    await db.close();

}

main();