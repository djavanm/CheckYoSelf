var titleInput = document.querySelector("#side__input--title");
var taskInput = document.querySelector("#side__input--task");
var addTaskBtn = document.querySelector(".side__input--task-icon");
var saveBtn = document.querySelector("#side__input--save");
var clearBtn = document.querySelector("#side__input--clear");
var searchInput = document.querySelector("#nav__input--search");
var mainContainer = document.querySelector(".main");
var navContainer = document.querySelector(".side__nav");
var headerContainer = document.querySelector(".header");
var searchInput = document.querySelector(".header__input--search");
var urgencyBtn = document.querySelector(".side__input--filter");
//******************   Event listeners
saveBtn.addEventListener("click", makeTaskList);
addTaskBtn.addEventListener("click", appendNewTask);
navContainer.addEventListener("click", removeNewTask);
titleInput.addEventListener("keyup", buttonHandler);
taskInput.addEventListener("keyup", buttonHandler);
clearBtn.addEventListener("click", clearNavInputs);
mainContainer.addEventListener("click", mainContainerClick); 
searchInput.addEventListener("keyup", searchToDoList);
urgencyBtn.addEventListener("click", urgencyHandler);
mainContainer.addEventListener("focusout", setToDo);
mainContainer.addEventListener("focusout", setTask);
mainContainer.addEventListener("keydown", returnHandler)
this.addEventListener("load", reinstantiateToDo);

//*************************Global Array
var globalArray = JSON.parse(localStorage.getItem("ToDoArray")) || [];

//*************************Main Functions

function mainContainerClick(e) {
if(e.target.classList.contains('main__img--checkbox') || e.target.classList.contains('main__img--checkbox-complete')) {
  checkTask(e)
  }
if(e.target.classList.contains('main__article--delete-icon')) {
  deleteCard(e);
  }
if(e.target.classList.contains('main__article--urgency-icon')) {
  toggleUrgent(e);
  }
};

function appendNewTask(e) {
    if(e.target === addTaskBtn && titleInput.value !== "" && taskInput.value !== "") {
    var ul = document.querySelector('.side__ul--new-task');
    var newTask = taskInput.value;
    ul.insertAdjacentHTML('beforeend', `<li class="side__li--task"><img class="side__img--delete" alt="delete button for new tasks" src="images/delete-list-item.svg"><p class="side__p--task">${newTask}</p></li>`)
    taskInput.value = "";
    saveBtn.disabled = false;
    }
};

function removeNewTask(e) {
if(e.target.classList.contains('side__img--delete')) {
    e.target.closest("li").remove();
    reset(saveBtn);
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
  var footerSrc = toDoList.urgent ? "main__article--footer-urgent" : "main__article--footer"
  var h2Src = toDoList.urgent ? "main__article--title urgent" : "main__article--title"
  var classSrc = toDoList.urgent ? "main__article--card-urgent" : "main__article--card";
  var urgentSrc = toDoList.urgent ? "images/urgent-active.svg" : "images/urgent.svg";
  var deleteSrc = deleteIcon(toDoList) ? "images/delete-active.svg" : "images/delete.svg";
  var listItems = generateToDoList(toDoList);
  mainContainer.insertAdjacentHTML('afterbegin', `<article class="${classSrc}" data-id="${toDoList.id}">
  <header>
      <h2 class="${h2Src}" contenteditable="true">${toDoList.title}</h2>
  </header>
  <section class="main__article--body">
    <ul class="main__article--task-list">
    ${listItems}
    </ul>
  </section> 
    <footer class="${footerSrc}">
      <label class="main__urgency-label" for="main__article--urgency-icon">
        <img class="main__article--urgency-icon" id="main__article--urgency-icon" src="${urgentSrc}" alt="lightning icon to denote urgency">
      URGENT</label>
      <label class="main__delete-label" for="main__article--delete-icon">
        <img class="main__article--delete-icon" id="main__article--delete-icon"src="${deleteSrc}" alt="delete button">
      DELETE</label>
    </footer> 
</article>`)
};

function generateToDoList(toDoList) {
  var toDoText = "";
  var toDoItems = toDoList.tasks.map(function(tasks, index){
    if(tasks.complete === false) {
      return `<li class="main__article--task" data-index=${index}><img class="main__img--checkbox" alt="empty checkbox to complete tasks" src="images/checkbox.svg"><p class="main__article--p" contenteditable="true">${tasks.task}</p></li>`
    } else if (tasks.complete === true) {
      return `<li class="main__article--task-complete" data-index=${index}><img class="main__img--checkbox-complete" alt="checkbox for completed tasks" src="images/checkbox-active.svg"><p class="main__article--p complete" contenteditable="true">${tasks.task}</li>`
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
  mainContainer.innerHTML = "";
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
  var locatedIndex = globalArray.findIndex(function(toDoList) {
    return toDoList.id === parentId;
  });
  return locatedIndex;
};

function locateTaskIndex(e) {
  if(e.target.classList.contains('main__img--checkbox') ||
     e.target.classList.contains('main__img--checkbox-complete')) {
      var li = e.target.closest('li')
      var index = parseInt(li.dataset.index);
     }
  return index;
};

function checkTask(e) {
  if(e.target.classList.contains('main__img--checkbox') || e.target.classList.contains('main__img--checkbox-complete')) {
    var taskText = e.target.nextSibling;
    var index = locateIndex(e);
    var taskIndex = locateTaskIndex(e);
    globalArray[index].tasks[taskIndex].complete = !globalArray[index].tasks[taskIndex].complete;
    globalArray[index].updateTask(globalArray);
    updateCheckbox(e);
    updateTextStyle(index, taskIndex, taskText);
    value = checkDelete(index);
    enableDelete(value, e)
  }
};

function updateCheckbox(e) {
  var index = locateIndex(e);
  var taskIndex = locateTaskIndex(e);
  var checkbox = e.target;
  if (globalArray[index].tasks[taskIndex].complete === false) {
    checkbox.setAttribute("src", "images/checkbox.svg");
  } else if (globalArray[index].tasks[taskIndex].complete === true) {
    checkbox.setAttribute("src", "images/checkbox-active.svg");
  }
};

function updateTextStyle(index, taskIndex, taskText) {
  if (globalArray[index].tasks[taskIndex].complete === false) {
    taskText.setAttribute("class", "main__article--p ");
  } else if (globalArray[index].tasks[taskIndex].complete === true) {
    taskText.setAttribute("class", "main__article--p complete");
  }
};

function isTrue(task) {
  return task.complete === true
};

function checkDelete(index) {
taskArray = globalArray[index].tasks;
return taskArray.every(isTrue)
};

function deleteIcon(toDoList){
  taskArray = toDoList.tasks;
  return  taskArray.every(isTrue)
};

function enableDelete(value, e) {
  deleteImg = e.target.closest('article').querySelector('.main__article--delete-icon');
  if (value === true) {
    deleteImg.setAttribute("src", "images/delete-active.svg");
  } else if (value === false) {
    deleteImg.setAttribute("src", "images/delete.svg");
  }
};

function deleteCard(e) {
  if(e.target.classList.contains('main__article--delete-icon')) {
    var index = locateIndex(e);
    var tasksComplete = checkDelete(index);
    var id = locateId(e);
    if (tasksComplete === true) {
      e.target.closest("article").remove();
      globalArray = globalArray[index].deleteFromStorage(globalArray, id);
    }
  }
};

function toggleUrgent(e) {
  if(e.target.classList.contains('main__article--urgency-icon')) {
     var index = locateIndex(e)
     var urgentIcon = e.target;
     var card = e.target.closest('article');
     var cardTitle = e.target.closest('article').querySelector('h2');
     var cardFooter = e.target.closest('footer');
     globalArray[index].urgent = !globalArray[index].urgent;
     globalArray[index].updateToDo(globalArray);
     updateUrgentCard(index, urgentIcon, card, cardTitle, cardFooter);
  }
};

function updateUrgentCard(index, urgentIcon, card, cardTitle, cardFooter) {
  if (globalArray[index].urgent === true) {
    cardTitle.setAttribute("class", "main__article--title urgent")
    cardFooter.setAttribute("class", "main__article--footer-urgent")
    card.setAttribute("class", "main__article--card-urgent")
    urgentIcon.setAttribute("src", "images/urgent-active.svg");
  } else if (globalArray[index].urgent === false) {
    cardTitle.setAttribute("class", "main__article--title")
    cardFooter.setAttribute("class", "main__article--footer")
    card.setAttribute("class", "main__article--card")
    urgentIcon.setAttribute("src", "images/urgent.svg");
  }
};

function searchToDoList() {
  var search = searchInput.value.toLowerCase();
  var searchArray = domSearchToDo();
  mainContainer.innerHTML = "";
  searchArray = searchArray.filter(function(toDoList) {
    return (toDoList.title.toLowerCase().includes(search))
  });
  searchArray.map(function(toDoList) {
    generateCard(toDoList)});
  if (searchInput.value === "") {
    pageReload();
  }
};

function domSearchToDo() {
  var nodeArray = document.querySelectorAll("article");
  var articleArray = Array.from(nodeArray);
  var toDoArray = articleArray.map(function(article) {
    return parseInt(article.dataset.id);});
  var searchArray = globalArray.filter(function(toDoList) {
      return toDoArray.includes(toDoList.id); });
  return searchArray;
};

function urgencyHandler() {
  if(urgencyBtn.classList.contains("side__input--filter")) {
    urgencyBtn.value = "View All To Do's";
    filterToUrgent();
    urgencyBtn.setAttribute("class", "side__input side__input--filter-urgent")
  } else if(urgencyBtn.classList.contains('side__input--filter-urgent')) {
    urgencyBtn.value = "Filter By Urgency";
    pageReload();
    urgencyBtn.setAttribute("class", "side__input side__input--filter")
  }
};

function filterToUrgent() {
  mainContainer.innerHTML = "";
  urgentArray = globalArray.filter(function(toDoList) {
    return toDoList.urgent === true;
  });
  if(urgentArray.length === 0) {
    appendUrgentWelcome()
  } else {
    urgentArray.map(function(toDoList) {
      generateCard(toDoList);});
  }
};

function appendUrgentWelcome() {
  mainContainer.insertAdjacentHTML('afterbegin', `<article class="main__article--card-urgent main__article--welcome" data-id="">
  <header>
      <h2 class="main__article--title urgent">Welcome to Check Yo' Self!</h1>
  </header>
  <section class="main__article--body">
    <ul class="main__article--task-list">
      <li class="main__article--task"><img class="main__img--checkbox-welcome" alt="empty checkbox to complete tasks" src="images/checkbox.svg"><p class="main__article--p">Welcome to Check Yo' Self!</p></li>
      <li class="main__article--task"><img class="main__img--checkbox-welcome" alt="empty checkbox to complete tasks" src="images/checkbox.svg"><p class="main__article--p">Click the urgent button to see cards here!</p></li>
    </ul>
  </section> 
    <footer class="main__article--footer-urgent">
      <label class="main__urgency-label" for="main__article--urgency-icon">
        <img class="main__article--urgency-icon-welcome" id="main__article--urgency-icon" src="images/urgent-active.svg" alt="lightning icon to denote urgency">
      URGENT</label>
      <label class="main__delete-label" for="main__article--delete-icon">
        <img class="main__article--delete-icon-welcome" id="main__article--delete-icon"src="images/delete.svg" alt="delete button">
      DELETE</label>
    </footer> 
</article>`)
};

function setToDo(e) {
  if (e.target.classList.contains("main__article--title")) {
    var index = locateIndex(e);
    var title = e.target.closest("article").querySelector(".main__article--title").textContent;
    globalArray[index].title = title;
    globalArray[index].saveToStorage(globalArray);
  }
};

function returnHandler(e) {
  if (e.keyCode == 13) {
    e.preventDefault();
    e.target.blur();
  }
};

function setTask(e) {
  if (e.target.classList.contains("main__article--p")) {
    var index = locateIndex(e);
    var title = e.target.closest("article").querySelector(".main__article--title").textContent;
    globalArray[index].title = title;
    var taskArray = e.target.closest("article").querySelectorAll('.main__article--p');
    taskArray = Array.from(taskArray);
    taskArray = taskArray.map(function(task) {
      return task.innerText});
  }
  insertNewTasks(index, taskArray)
};

function insertNewTasks(index, taskArray) {
  if(taskArray !== undefined) {
    for (var i = 0; i < taskArray.length; i++) {
      if(globalArray[index].tasks[i].task !== taskArray[i]) {
        globalArray[index].tasks[i].task = taskArray[i];
      }
    }
    globalArray[index].updateTask(globalArray);
  }
};
