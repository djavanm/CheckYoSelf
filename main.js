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
mainContainer.addEventListener("click", checkTask);
mainContainer.addEventListener("click", deleteCard);
mainContainer.addEventListener("click", toggleUrgent);
searchInput.addEventListener("keyup", searchToDoList);
urgencyBtn.addEventListener("click", urgencyHandler);
this.addEventListener("load", reinstantiateToDo);

//*************************Global var
var globalArray = JSON.parse(localStorage.getItem("ToDoArray")) || [];



function appendNewTask(e) {
    if(e.target === addTaskBtn && titleInput.value !== "" && taskInput.value !== "") {
    var ul = document.querySelector('.side__ul--new-task');
    var newTask = taskInput.value;
    ul.insertAdjacentHTML('beforeend', `<li class="side__li--task">${newTask}</li>`)
    taskInput.value = "";
    }
    saveBtn.disabled = false;
};

function removeNewTask(e) {
if(e.target.classList.contains('side__li--task')) {
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
  var h2Src = toDoList.urgent ? "main__article--title-urgent" : "main__article--title"
  var classSrc = toDoList.urgent ? "main__article--card-urgent" : "main__article--card";
  var urgentSrc = toDoList.urgent ? "images/urgent-active.svg" : "images/urgent.svg";
  var deleteSrc = deleteIcon(toDoList) ? "images/delete-active.svg" : "images/delete.svg";
  var listItems = generateToDoList(toDoList);
  mainContainer.insertAdjacentHTML('afterbegin', `<article class="${classSrc}" data-id="${toDoList.id}">
  <header>
      <h2 class="${h2Src}">${toDoList.title}</h1>
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
      return `<li class="main__article--task" data-index=${index}>${tasks.task}</li>`
    } else if (tasks.complete === true) {
      return `<li class="main__article--task-complete" data-index=${index}>${tasks.task}</li>`
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
  if(e.target.classList.contains('main__article--task') ||
     e.target.classList.contains('main__article--task-complete')) {
    var li = e.target
    var index = parseInt(li.dataset.index);
  }
  return index;
};

function checkTask(e) {
  if(e.target.classList.contains('main__article--task') ||
     e.target.classList.contains('main__article--task-complete')) {
    var taskLi = e.target;
    var index = locateIndex(e);
    var taskIndex = locateTaskIndex(e);
    globalArray[index].updateTask(globalArray, taskIndex);
    updateLiStyle(index, taskIndex, taskLi);
    value = checkDelete(index);
    enableDelete(value, e)
  }
};

function updateLiStyle(index, taskIndex, taskLi) {
  if (globalArray[index].tasks[taskIndex].complete === false) {
    taskLi.setAttribute("class", "main__article--task");
  } else if (globalArray[index].tasks[taskIndex].complete === true) {
    taskLi.setAttribute("class", "main__article--task-complete");
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
      globalArray[index].deleteFromStorage(globalArray, id);
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
     globalArray[index].saveToStorage(globalArray);
     updateUrgentCard(index, urgentIcon, card, cardTitle, cardFooter);
  }
};

function updateUrgentCard(index, urgentIcon, card, cardTitle, cardFooter) {
  if (globalArray[index].urgent === true) {
    cardTitle.setAttribute("class", "main__article--title-urgent")
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
    return (toDoList.title.toLowerCase().includes(search))});
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
  urgentArray.map(function(toDoList) {
    generateCard(toDoList);
  });
};