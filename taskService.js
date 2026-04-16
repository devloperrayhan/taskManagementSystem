// Import a Build-in Module.
import fs from 'fs/promises';
// Import local fileHandler.js
import {fileContent, filePath} from "./fileHandler.js";
import {input} from "./utils.js";

// 1. Add A Task Function 
/** This function can add a task in our database, If the taskTitle is not already exist. */
export async function addTask(taskTitle, taskDescription, taskPriority, taskDate){
    try {
      let tasks = [];
      try {
          tasks = JSON.parse(fileContent);
          if (!Array.isArray(tasks)) {
              tasks = [];
            }
        } catch {
            tasks = [];
        };
        let taskIDs = [];
        taskIDs = tasks.map(task => task.taskID);
        let newTaskId = 1;
        if (taskIDs.length > 0){
            newTaskId = Math.max(...taskIDs) + 1;
        };
        const taskExists = tasks.some(task => task.taskTitle === taskTitle);
        if (taskExists) {
            console.error('Error: Task with this title already exists');
        } else {
            const newTask = {taskID: newTaskId, taskTitle, taskDescription, taskPriority, taskDate, taskStatus : null};
            tasks.push(newTask);
            await fs.writeFile(filePath, JSON.stringify(tasks, null, 2), 'utf8');
            console.log("Task added successfully");
        };
    } catch (err) {
        console.error('Error writing files:', err);
    };
};

// 2. View All Tasks Function
/** This function can show all tasks whice is exist in oure database */
export async function viewTask(){
    try {
        let countNumber = 1;
        const tasks = JSON.parse(fileContent);
        for (let task of tasks){
            console.log(`=============${countNumber}=============`);
            console.log(task);
            countNumber++;
        };
    } catch (err) {
        console.error('Error reading file:', err);
    };
};

// 3. Search Task Function
/** This function can search a task using by taskID */
export async function searchTask(id, taskStatus){
    try{
        let tasks = [];
        const searchID = id;
            tasks = JSON.parse(fileContent);
            const foundTask = tasks.find(task => task.taskID === searchID);
            if (foundTask) {
                console.log("=============Task found=============");
                console.log(foundTask);
            } else {
                console.log(`TaskID ${searchID} is not exist in our databases`);
            }
    } catch (err){
        console.log(`Search Error ${err}`);
    };
};

// 4. Update a Task Statuse Function
/** This function can update a task status useing by taskID. */
export async function updateTaskStatus(id, newStatus){
    try {
        const validStatuses = ['Pending', 'In Progress', 'Completed'];
        if (!validStatuses.includes(newStatus)) {
            console.error('Error: Status must be Pending, In Progress, or Completed');
            return;
        };
        let tasks = [];
        tasks = JSON.parse(fileContent);
        const taskIndex = tasks.findIndex(task => task.taskID === id);
        if (taskIndex !== -1) {
            tasks[taskIndex].taskStatus = newStatus;
            await fs.writeFile(filePath, JSON.stringify(tasks, null, 2), 'utf8');
            console.log("=============1=============");
            console.log(tasks[taskIndex]);
            console.log("Task status updated successfully");
        } else {
            console.error(`TaskID ${id} not found`);
        };
    } catch (err) {
        console.error('Error updating task:', err);
    };
};

// 5. Delete Task Function
/**This function Can Delete a Task Using by TaskID.*/
export async function deleteTask(id){
    try{
        let tasks = [];
        const deleteID = id;
        tasks = JSON.parse(fileContent);
        const taskIndex = tasks.findIndex(task => task.taskID === deleteID);
        if (taskIndex !== -1) {
            console.log("Do you want to delete this task, N/Y");
            const userResponse = String(await input("Delete for 'Y' / No For 'N' : "));
            if (userResponse === 'Y' || 'y' || 'Yess' || 'Yeah') {
                tasks.splice(taskIndex, 1);
                await fs.writeFile(filePath, JSON.stringify(tasks, null, 2), 'utf8');
                console.log('Task deleted successfully');
            } else {
                console.log("Task deletion cancelled");
            };
        } else {
            console.error(`TaskID ${deleteID} not found`);
        };
    } catch (err){
        console.log("Error deleting task :", err);
    };
};


// Assignment (Exam-week-4)
// Developer Rayhan
// 04/16/2026, 02:06 AM
// Learner from Ostad, Batch-9, python Django.