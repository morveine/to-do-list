// to-do app
// need to create a 'task' object, it should have a name, deadline, description, state (done/not done), priority - 1st/2nd/3rd
// priority logic - should sort by priority number, 1st on the beginning then 2nd then 3rd
// needs to have folders with different tasks
// logic for loading folders - perhaps add a property to class and cycle through? or better to have a folder 'list' that's gonna have all the tasks in it rather than check all the tasks
// function to delete tasks completely
// separate 'done' folder

const newTaskForm = document.getElementById('new-task-form');

newTaskForm.addEventListener('submit', makeNewTask);
class Task {
    constructor(name, description, deadline, priority, folder, done = false) {
        this.name = name;
        this.description = description;
        this.deadline = deadline;
        this.priority = priority;
        this.folder = folder;
        this.done = done;
    }
}


let taskList = [];

function makeNewTask(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    console.log([...data.entries()]);
}