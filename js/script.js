let todoInput;   //miejsce gdzie uzytkownik wpisuje treść zadania
let alertInfo;  //info o braku zadań/koniecznosć dodania tekstu
let addBtn;   //przycisk add dodaje nowy element do listy
let ulList;   //nasza lista zadań,tagi ul
let newTask;  //nowo dodane li nowy task

let popup;  //pobieramy popup
let popupInfo;  //alert w popupie jak się doda pusty tekst
let editedTodo;  //edytowany Todo
let popupInput;  //tekst wpisywany w input w popupie
let addPopupBtn;  //przycisk zatwierdź w popupie
let closeTodoBtn; //przycisk od zamykania popupu
let idNumber = 0;
let allTasks;



const main = () => {
    prepareDOMelements();
    prepareDOMevents();
};
// pobieramy nasze elementy
const prepareDOMelements = () => {
    todoInput = document.querySelector('.todoInput');
    alertInfo = document.querySelector('.alertInfo');
    addBtn = document.querySelector('.addBtn');
    ulList = document.querySelector('.todoList ul');
    allTasks = ulList.getElementsByTagName('li');

    popup = document.querySelector('.popup');
    popupInfo = document.querySelector('.popupInfo');
    popupInput = document.querySelector('.popupInput');
    addPopupBtn = document.querySelector('.accept');
    closePopupBtn = document.querySelector('.cancel');
};
// nadajemy nasłuchiwanie
const prepareDOMevents = () => {
    addBtn.addEventListener('click', addNewTask);
    ulList.addEventListener('click', checkClick);
    closePopupBtn.addEventListener('click', closePopup);
    addPopupBtn.addEventListener('click', changeTodo);
    closePopupBtn.addEventListener('click', deleteTask);
    todoInput.addEventListener('keyup', enterCheck);

};

const addNewTask = () => {
    if (todoInput.value !== "") {
        idNumber++;
        newTask = document.createElement('li');
        newTask.innerText = todoInput.value;
        newTask.setAttribute('id', `todo-${idNumber}`);
        ulList.appendChild(newTask);
        todoInput.value = "";
        alertInfo.innerText = "";
        createToolsArea();

    } else {
        alertInfo.innerText = 'wpisz treść zadania';
    };
};

const enterCheck = () => {
    if (event.keyCode === 13) {
        addNewTask();
    }
}
const createToolsArea = () => {
    let toolsPanel = document.createElement('div');
    toolsPanel.classList.add('tools');
    newTask.appendChild(toolsPanel);

    let completeBtn = document.createElement('button');
    completeBtn.classList.add('complete');
    completeBtn.innerHTML = '<i class="fas fa-check"></i>';

    let editBtn = document.createElement('button');
    editBtn.classList.add('edit');
    editBtn.innerText = 'EDIT';

    let deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete');
    deleteBtn.innerHTML = '<i class="fas fa-times"></i>';

    toolsPanel.appendChild(completeBtn);
    toolsPanel.appendChild(editBtn);
    toolsPanel.appendChild(deleteBtn);

};

const checkClick = (e) => {
    if (e.target.closest('button').classList.contains('complete')) {
        e.target.closest('li').classList.toggle('completed');
        e.target.closest('button').classList.toggle('completed');
    } else if (e.target.closest('button').className === 'edit') {
        editTask(e);
    } else if (e.target.closest('button').className === 'delete') {
        deleteTask(e);
    }
};
// edycja zadania 

const editTask = (e) => {
    const oldTodo = e.target.closest('li').id;
    editedTodo = document.getElementById(oldTodo);
    console.log(editedTodo);
    popupInput.value = editedTodo.firstChild.textContent;

    popup.style.display = 'flex';
};

const changeTodo = () => {
    if (popupInput.value !== '') {
        editedTodo.firstChild.textContent = popupInput.value;
        popup.style.display = 'none';
        popupInfo.innerText = '';
    } else {
        popupInfo.innerText = 'Podaj jakąś treść!';

    }
};

const closePopup = () => {
    popup.style.display = 'none';
    popupInfo.innerText = '';
};

const deleteTask = (e) => {
    const deleteTodo = e.target.closest('li');
    deleteTodo.remove();

    if (allTasks.length === 0) {
        alertInfo.innerText = 'Brak zadań na liście';

    }


};





document.addEventListener('DOMContentLoaded', main);