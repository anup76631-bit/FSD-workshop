import { EventEmitter} from "node:events";
const task = new EventEmitter();

task.on("greet", (name) => {
    console.log(`Hello, ${name}! Welcome to the session.`);
});
task.on("exist", (reason) => {
    console.log(`Hello, ${reason}! session ending. Reason: ${reason}`);
});
task.on("greet",()=>{;
    console. log("class started by chandrahas mishra");
});
task.on("exist",()=>{;
    console. log("class ended by chandrahas mishra");
});
task.off("start", (course)=> {
    console.log(`Hello, ${course}! session started.`);
});
task.emit("greet", "Student");
task.emit("exist", "class completed");
task.emit("start", "fsd");