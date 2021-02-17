let historyList = document.querySelector('.history-list');
const historyKey = 'history';

document.addEventListener("DOMContentLoaded", showHistoryList);

//functions

function createHistoryItem(item)
{
    let historyItem = createElement('li', 'history-item', item);
    historyList.appendChild(historyItem);
}

function showHistoryList()
{
    let list = JSON.parse(localStorage.getItem(historyKey)) || [];

    list.forEach(function(item){
        createHistoryItem(item);
    })

}

function createElement(elementName, className, innerHTML)
{
    let newElement = document.createElement(elementName);
    newElement.className = className;
    newElement.innerHTML = innerHTML;
    return newElement;
}