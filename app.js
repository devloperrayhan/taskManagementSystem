import {allTaskList, input, dateTime, programExit} from "./utils.js"; // import utils.js
import {addTask, viewTask, searchTask, updateTaskStatus, deleteTask} from "./taskService.js"; // import taskService.js

allTaskList(); // Menu show.

const choiceNumber = Number(await input("Select Option (1 to 6): "));

switch (choiceNumber) {
    case 1:
        const taskTitle = String(await input("Enter Task Title : "));
        const taskDescription = String(await input("Enter Task Description : "));
        const taskPriority = String(await input("Enter Task Priority ['High', 'Medium', 'Low'] : "));
        const taskDate = dateTime();
        await addTask(taskTitle, taskDescription, taskPriority, taskDate);
        break;
    case 2:
        viewTask();
        break;
    case 3:
        const searchID = Number(await input("Search Task (Enter Task-ID) : "));
        searchTask(searchID);
        break;
    case 4:
        const inputUpdateTaskID = Number(await input("Enter Task-ID to update task status : "));
        const inputUpdateTaskStatus = String(await input("Enter Task Status ['Pending', 'In Progress', 'Completed'] : "));
        updateTaskStatus(inputUpdateTaskID, inputUpdateTaskStatus);
        break;
    case 5:
        const deleteTaskID = Number(await input("Enter Delete Task-ID : "));
        deleteTask(deleteTaskID);
        break;
    case 6:
        programExit();
        break;
    default:
        console.error("Don't Use String. Use Number (1 to 5).");
        break;
};