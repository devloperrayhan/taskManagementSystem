// Import Some Built-in Module
import readline from 'node:readline';
import {exit} from "process";

// Show Manu Fanction
/** This function can show oure menu items */
export function allTaskList(){
    console.log("=============== Menu Start ===============");
    console.log("1. Add Task");
    console.log("2. View Tasks");
    console.log("3. Search Task");
    console.log("4. Update Task Status");
    console.log("5. Delete Task");
    console.log("6. Exit");
    return "=============== Menu End ===============";
};

// Create Input Function For Input.
/** This function can input a value */
export async function input(message = "Input : "){
    const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
    });
    return new Promise((resolve) => {
        rl.question(message, (inputData) => {
            rl.close();
            resolve(inputData);
        });
    });
};

// Create a dateTime Function.
/** This function can show current time */
export function dateTime(){
    const timestamp = Date.now();
    const currentDate = new Date(timestamp);
    const formattedDate = currentDate.toISOString().split('T')[0];
    return formattedDate;
};

// 6. Exit utils function
/** This function can exit from program */
export function programExit(){
    exit()
}
