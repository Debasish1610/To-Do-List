
let addButton = document.getElementById('add-button');
let toDoInput = document.getElementById('to-do-input');
let taskList = document.getElementById('task-list');
const key = 'todo';

document.addEventListener('DOMContentLoaded', showToDoList);
addButton.addEventListener('click', addNewTask);



//functions
function addNewTask()
{
    let toDoList = JSON.parse(localStorage.getItem(key)) || [];
    if(toDoInput.value === '')
    {
        alert("Please Input Some Text");
        return;
    }
    if(toDoList.includes(toDoInput.value))
    {
        alert("This Task Already Exists");
        return;
    }
    toDoList.push(toDoInput.value);
    localStorage.setItem(key, JSON.stringify(toDoList));

      //clear input value
      toDoInput.value = "";
}

function showToDoList()
{
    let list = JSON.parse(localStorage.getItem(key)) || [];
    list.forEach(function(toDo){
        createToDoItem(toDo)
    })
}

function createToDoItem(toDo)
{
    // create task item
    let taskItem = createElement('div', 'task-item');
    let taskText = createElement('li', 'task-text', toDo);
    //append taskText into task-item
    appendChild(taskItem, taskText);

    //Edit feature
    let editTask = createElement('button', 'edit-task', '<i class = "fas fa-edit"></i>');
    editTask.setAttribute('title', 'Edit This Task');
    editTask.addEventListener('click', editTaskIntoList);
    appendChild(taskItem, editTask);

    //delete feature.
    let deleteTask = createElement('button', 'delete-task', '<i class = "fas fa-trash"></i>');
    deleteTask.setAttribute('title', 'Delete This Task');
    deleteTask.addEventListener('click', deleteTaskFromList);
    //append task delete button into task item.
    appendChild(taskItem, deleteTask);

    //append each task item into task list
    appendChild(taskList, taskItem);
}


function createElement(elementName, className, innerHTML)
{
    let newElement = document.createElement(elementName);
    newElement.className = className || '';
    newElement.innerHTML = innerHTML || '';
    return newElement;
}

function appendChild(parent, child)
{
    parent.appendChild(child);
}

function deleteTaskFromList(e)
{
    let parent = this.parentElement;
    let sibling = this.previousElementSibling.previousElementSibling; // this element refer to li element.
    let list = JSON.parse(localStorage.getItem(key)); // todo list.
    let historyList = JSON.parse(localStorage.getItem('history')) || [];
    let index = list.indexOf(sibling.innerHTML);
    historyList.push(list[index]);
    list.splice(index, 1);
    localStorage.setItem(key, JSON.stringify(list));
    localStorage.setItem('history', JSON.stringify(historyList));
    parent.remove();
}

function editTaskIntoList(e)
{
    let listItem = this.previousElementSibling; 
    let listItemText = listItem.innerHTML;
    listItem.innerHTML = '';
    //Create input field for edit task.
    let inputField = createElement('input', 'edit-input-field');
    inputField.setAttribute('type', 'text');
    inputField.value = listItemText;

    inputField.addEventListener('keypress', addEditedTextIntoList);
    function addEditedTextIntoList(e)
    {
        if(e.key === 'Enter')
        {
            let list = JSON.parse(localStorage.getItem(key));
            let index = list.indexOf(listItemText);
            list[index] = inputField.value;
            localStorage.setItem(key, JSON.stringify(list));
            listItem.innerHTML = inputField.value;
        }
    }
    listItem.appendChild(inputField);
}

