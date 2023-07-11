
const newTaskForm = document.getElementById('new-task-form');
const newFolderForm = document.getElementById('new-folder-form');

const taskTemplate = document.getElementById('task-template');
const folderTemplate = document.getElementById('folder-template');

const taskWrapper = document.getElementById('tasks-wrapper');
const folderWrapper = document.getElementById('folder-wrapper');

const addTaskButton = document.getElementsByClassName('add-task')[0];
const addFolderButton = document.getElementsByClassName('add-folder')[0];

const taskFormCancelButton = document.getElementById('cancel-task');
const folderFormCancelButton = document.getElementById('cancel-folder');

// show and hide forms for adding new things
addTaskButton.addEventListener('click', () => {
    hideElement(addTaskButton);
    showElement(newTaskForm);
});

taskFormCancelButton.addEventListener('click', (e) => {
    e.preventDefault();
    hideElement(newTaskForm);
    showElement(addTaskButton);
})

addFolderButton.addEventListener('click', () => {
    hideElement(addFolderButton);
    showElement(newFolderForm);
})

folderFormCancelButton.addEventListener('click', (e) => {
    e.preventDefault();
    hideElement(newFolderForm);
    showElement(addFolderButton);
})

newTaskForm.addEventListener('submit', makeNewTask);
newFolderForm.addEventListener('submit', makeNewFolder);

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
    }
}

let folders = [];
let currentFolder; // eventListener on each button should change this

function makeNewTask(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const name = data.get('task-name');
    const desc = data.get('task-desc');
    const deadline = data.get('task-deadline');
    const task = new Task(name, desc, deadline);
    // currentFolder.addTask(task); 
    newTaskForm.reset();
    addTaskToDOM(task);
    currentFolder.addTask(task);
    rewriteLocalStorage()
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


function makeNewFolder(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const name = data.get('input-folder-name');
    const folder = new Folder(name);
    newFolderForm.reset();
    addFoldertoDOM(folder);
    folders.push(folder);
    rewriteLocalStorage();
}

function addFoldertoDOM(folder) {
    const clone = folderTemplate.cloneNode(true);
    clone.classList.remove('hidden');
    folderWrapper.appendChild(clone);
    clone.querySelector('.folder-name').textContent = folder.name;
    clone.removeAttribute('id');
}

function deleteTask() {
    rewriteLocalStorage();
}

function editTask() { } // should be able to change name, description, deadline, everything

function addToFolder() { } // all tasks created inside a folder belong to that folder

function showElement(el) {
    el.classList.remove('hidden');
}

function hideElement(el) {
    el.classList.add('hidden');
}

function rewriteLocalStorage() {
    // localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderHtml(folder) {

}


// rendering HTML should be based on the contents of every folder. localStorage should save a list of tasks with the key = folder name, by default the app should have a Home folder.
// TODO: make it so 'Tasks' heading is changed to the folder name
// figure out date rendering format in tasks, its ugly now