// to-do app
// need to create a 'task' object, it should have a name, deadline, description, state (done/not done)
// needs to have folders with different tasks
// logic for loading folders - perhaps add a property to class and cycle through? or better to have a folder 'list' that's gonna have all the tasks in it rather than check all the tasks
// function to delete tasks completely
// separate 'done' folder

const newTaskForm = document.getElementById('new-task-form');
const newFolderForm = document.getElementById('new-folder-form')
const taskTemplate = document.getElementById('task-template');
const taskWrapper = document.getElementById('tasks-wrapper');
const addTaskButton = document.getElementsByClassName('add-task')[0];
const addFolderButton = document.getElementsByClassName('add-folder')[0];
const formCancelButton = document.getElementById('cancel');

addTaskButton.addEventListener('click', () => {
    hideElement(addTaskButton);
    showElement(newTaskForm);
});

formCancelButton.addEventListener('click', (e) => {
    e.preventDefault();
    hideElement(newTaskForm);
    showElement(addTaskButton);
})

newTaskForm.addEventListener('submit', makeNewTask);

let n = 1;
class Task {
    constructor(name, description, deadline, done = false) {
        this.name = name;
        this.description = description;
        this.deadline = deadline;
        this.done = done;
        this.id = `task-${n}`
        n++
    }
}

class Folder {
    constructor(name) {
        this.name = name;
        this.tasks = []
    }
    addTask(task) {
        this.tasks.push(task);
        // return this.tasks;
    }
}

let home = new Folder('Home');
let tasks = [
    new Task('Make an "add new" and "delete" button', 'for folders and tasks', '30 Jun 23', false),
    new Task('change folders to buttons and style them', '', '30 Jun 23'),
    new Task('add edit buttons to tasks', 'write logic for editing, should make the same form as adding, but with pre - written values', '30 Jun 23'),
    new Task('write JS for crossing out done tasks', '+ maybe animate them', '30 Jun 23', true),
    new Task('Fix the problem with long task names', 'pls', '30 Jun 23'),
];
tasks.forEach(task => addTaskToDOM(task));


function makeNewTask(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const name = data.get('task-name');
    const desc = data.get('task-desc');
    const deadline = data.get('task-deadline');
    const done = data.get('done');
    const task = new Task(name, desc, deadline, done);
    home.addTask(task); // this should be removed and a new value set for folder
    newTaskForm.reset();
    addTaskToDOM(task);
}

function addTaskToDOM(task) {  // TODO: change id of task when adding
    const clone = taskTemplate.cloneNode(true);
    clone.classList.remove('hidden');
    taskWrapper.appendChild(clone);
    clone.querySelector('.dom-task-name').textContent = task.name;
    clone.querySelector('.description').textContent = task.description;
    clone.querySelector('.deadline').textContent = task.deadline;
    clone.querySelector('.task-checkbox>input').id = task.id;
    clone.querySelector('.task-vertical>label').htmlFor = task.id;
    clone.addEventListener('change', (e) => {
        clone.classList.toggle('task-checked');
        task.done = e.target.checked;
    })
    clone.removeAttribute('id');
}

// function deleteTask(){}

function editTask() { } // should be able to change name, description, deadline, everything

function makeNewFolder() { }

function addToFolder() { } // all tasks created inside a folder belong to that folder

function markTaskAsDone() { } // should change style of task and move it away

function addFoldertoSidebar() { }

function showElement(el) {
    el.classList.remove('hidden');
}

function hideElement(el) {
    el.classList.add('hidden');
}

