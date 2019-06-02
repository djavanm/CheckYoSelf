var titleInput = document.querySelector("#side__input--title");
var taskInput = document.querySelector("#side__input--task");
var addTaskBtn = document.querySelector(".side__input--task-icon");
var saveBtn = document.querySelector("#side__input--save");
var clearBtn = document.querySelector("#side__input--clear");
var searchInput = document.querySelector("#nav__input--search");
var mainContainer = document.querySelector(".main");
var navContainer = document.querySelector(".side__nav");
var headerContainer = document.querySelector(".header");
//******************   Event listeners
saveBtn.addEventListener("click", makeTaskList);
addTaskBtn.addEventListener("click", appendNewTask);
navContainer.addEventListener("click", removeNewTask);
titleInput.addEventListener("keyup", buttonHandler);
taskInput.addEventListener("keyup", buttonHandler);
clearBtn.addEventListener("click", clearNavInputs);
mainContainer.addEventListener("click", checkTask);
// recentIdeasBtn.addEventListener("click", toggleIdeaList);
this.addEventListener("load", reinstantiateToDo);

//*************************Global var
var globalArray = JSON.parse(localStorage.getItem("ToDoArray")) || [];



function appendNewTask(e) {
    if(e.target === addTaskBtn && titleInput.value !== "" && taskInput.value !== "") {
    var ul = document.querySelector('.side__ul--new-task');
    var newTask = taskInput.value;
    ul.insertAdjacentHTML('beforeend', `<li class="side__li--task">${newTask}</li>`)
    taskInput.value = "";
    reset(saveBtn);
    }
};

function removeNewTask(e) {
if(e.target.classList.contains('side__li--task')) {
    e.target.closest("li").remove();
    }
};

function makeTaskList(e) {
  var taskItems = createTaskItems();
  var toDoList = new ToDoList ({
    id: Date.now(),
    title: titleInput.value,
    urgent: false,
    tasks: taskItems
  });
  newToDoHandler(toDoList) 
};

function newToDoHandler(toDoList) {
  globalArray.push(toDoList);
  clearWelcomeMessage();
  toDoList.saveToStorage(globalArray);
  generateCard(toDoList);
  resetForm();
  reset(saveBtn);
  reset(clearBtn);
};

function createTaskItems() {
  newTasks = document.querySelectorAll('.side__li--task');
  newTasks = Array.from(newTasks);
  newTasks = newTasks.map(function(task) {
    return task.innerText
  });
  taskObjects = newTasks.map(function(task){
    return {complete: false, task: `${task}`};
  });
  return taskObjects;
};

function resetForm() {
  var sideForm = document.querySelector('.side__form');
  ul = document.querySelector('.side__ul--new-task');
  sideForm.reset();
  ul.innerHTML = "";
};

function generateCard(toDoList) {
  var listItems = generateToDoList(toDoList);
  mainContainer.insertAdjacentHTML('afterbegin', `<article class="main__article--card" data-id="${toDoList.id}">
  <header>
      <h2 class="main__article--title">${toDoList.title}</h1>
  </header>
  <section class="main__article--body">
    <ul class="main__article--task-list">
    ${listItems}
    </ul>
  </section> 
    <footer class="main__article--footer">
      <label class="main__urgency-label" for="main__article--urgency-icon">
        <img class="main__article--urgency-icon" id="main__article--urgency-icon" src="images/urgent.svg" alt="lightning icon to denote urgency">
      URGENT</label>
      <label class="main__delete-label" for="main__article--delete-icon">
        <img class="main__article--delete-icon" id="main__article--delete-icon"src="images/delete.svg" alt="delete button">
      DELETE</label>
    </footer> 
</article>`)
};

function generateToDoList(toDoList) {
  var toDoText = "";
  var toDoItems = toDoList.tasks.map(function(tasks, index){
    if(tasks.complete === false) {
      return `<li class="main__article--task" data-index=${index}>${tasks.task}</li>`
    } else if (tasks.complete === true) {
      return `<li class="main__article--task main__article--task-complete" data-index=${index}>${tasks.task}</li>`
    }
  })
  for(var i = 0; i<toDoItems.length; i++) {
    toDoText += toDoItems[i];
  }
  return toDoText;
};

function reinstantiateToDo() {
    if (globalArray.length !== 0) {
      clearWelcomeMessage();
      var newArray = globalArray.map(ToDo => {
        var newToDoList = new ToDoList ({ ...ToDo});
        return newToDoList;});
      globalArray = newArray;
      pageReload();
    }
};

function pageReload() {
  globalArray.map(ToDoList => {
    generateCard(ToDoList);
  });
};

function clearWelcomeMessage() {
  var welcomeMessage = document.querySelector('.main__article--welcome');
  if (mainContainer.contains(welcomeMessage)) {
    mainContainer.removeChild(welcomeMessage);
  }
};

function clearNavInputs() {
  resetForm();
  reset(clearBtn);
};

function buttonHandler(e) {
  var validateArray = createTaskItems();
    if(titleInput.value != "" || taskInput.value != ""){
    clearBtn.disabled = false;
  }
    if(titleInput.value != "" &&  validateArray.length > 0) {
    saveBtn.disabled = false;
  }
};

function reset(btn) {
  btn.disabled = !btn.disabled;
};

function locateId(e) {
  var parent = e.target.closest("article");
  var parentId = parseInt(parent.dataset.id);
  return parentId;
};

function locateIndex(e) {
  var parent = e.target.closest("article");
  var parentId = parseInt(parent.dataset.id);
  var locatedIndex = globalArray.findIndex(function(idea) {
    return idea.id === parentId;
  });
  return locatedIndex;
};

function locateTaskIndex(e) {
  if(e.target.classList.contains('main__article--task')) {
    var li = e.target
    var index = parseInt(li.dataset.index);
  }
  return index;
};

function checkTask(e) {
  if(e.target.classList.contains('main__article--task')) {
    var index = locateIndex(e);
    var taskIndex = locateTaskIndex(e);
    globalArray[index].updateTask(globalArray, taskIndex)
  }
};

