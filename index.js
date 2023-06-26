// to-do app
// need to create a 'task' object, it should have a name, deadline, description, state (done/not done)
// needs to have folders with different tasks
// logic for loading folders - perhaps add a property to class and cycle through? or better to have a folder 'list' that's gonna have all the tasks in it rather than check all the tasks
// function to delete tasks completely
// separate 'done' folder

const newTaskForm = document.getElementById('new-task-form');
const taskTemplate = document.getElementById('task-template');
const taskWrapper = document.getElementById('tasks-wrapper');

newTaskForm.addEventListener('submit', makeNewTask);
class Task {
    constructor(name, description, deadline, done = false) {
        this.name = name;
        this.description = description;
        this.deadline = deadline;
        this.done = done;
    }
}

class Folder {
    constructor(name){
        this.name = name;
        this.tasks = []
    }
    addTask(task){
        this.tasks.push(task);
        // return this.tasks;
    }
}

let home = new Folder('Home');


function makeNewTask(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const name = data.get('task-name');
    const desc = data.get('task-desc');
    const deadline = data.get('task-deadline');
    const done = data.get('done');
    const task = new Task(name, desc, deadline, done);
    home.addTask(task);
    console.log(home.tasks);
    newTaskForm.reset();
    addTaskToDOM(task);
}

function addTaskToDOM(task){
    const clone = taskTemplate.cloneNode(true);
    taskWrapper.appendChild(clone);
    clone.querySelector('.dom-task-name').textContent = task.name;
	clone.querySelector('.description').textContent = task.description;
	clone.querySelector('.deadline').textContent = task.deadline;
    clone.removeAttribute('id');
}

function deleteTask(){}

function editTask(){} // should be able to change name, description, deadline, everything

function makeFolder(){}

function addToFolder(){}

function markTaskAsDone(){}