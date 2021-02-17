
let addButton = document.getElementById('add-button');
let toDoInput = document.getElementById('to-do-input');
let taskList = document.getElementById('task-list');
const key = 'todo';

document.addEventListener('DOMContentLoaded', showToDoList);
addButton.addEventListener('click', addNewTask);



//functions
function addNewTask()
{
    let toDoList;
    if(localStorage.getItem(key) === null)
    {
        toDoList = [];
    }
    else
    {
        toDoList = JSON.parse(localStorage.getItem(key));
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
    //append tasktext into task-item
    appendChild(taskItem, taskText);
    let deleteTask = createElement('button', 'delete-task', '<i class = "fas fa-trash"></i>');
    deleteTask.setAttribute('title', 'Delete This Task');
    deleteTask.addEventListener('click', deleteTastFromList);
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

function deleteTastFromList(e)
{
    let parent = this.parentElement;
    let sibling = this.previousElementSibling;
    let list = JSON.parse(localStorage.getItem(key));
    let historyList = JSON.parse(localStorage.getItem('history')) || [];
    let index = list.indexOf(sibling.innerHTML);
    historyList.push(list[index]);
    list.splice(index, 1);
    localStorage.setItem(key, JSON.stringify(list));
    localStorage.setItem('history', JSON.stringify(historyList));
    parent.remove();
}

