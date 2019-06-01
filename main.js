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
saveBtn.addEventListener("click", addCards);
addTaskBtn.addEventListener("click", appendNewTask);
// saveBtn.addEventListener("click", instantiateIdea);
// searchInput.addEventListener("keyup", searchIdeas);
// bottomContainer.addEventListener("click", deleteCard);
// bottomContainer.addEventListener("click", starCard);
// bottomContainer.addEventListener("click", upvoteQuality);
// bottomContainer.addEventListener("click", downvoteQuality);
// bottomContainer.addEventListener("focusout", setText);
// bottomContainer.addEventListener("keyup", returnHandler);
// asideList.addEventListener("click", filterQualityHandler);
// asideStarBtn.addEventListener("click", toggleStarList);
// recentIdeasBtn.addEventListener("click", toggleIdeaList);
// this.addEventListener("load", reinstantiateIdeas);

//************************* */Global var
var globalArray = JSON.parse(localStorage.getItem("TaskListArr")) || [];

// function appendList() {
//     var ul = document.getElementById('listitems');
//     var li = document.createElement('li');
//     var item = document.getElementById('item');
//     li.appendChild(document.createTextNode(item.value));
//     ul.appendChild(li);
// }

function appendNewTask(e) {
    if(e.target === addTaskBtn && taskInput.value !== "") {
    var ul = document.querySelector('.side__ul--new--task');
    var newTask = taskInput.value;
    ul.insertAdjacentHTML('afterbegin', `<li class="side__li--task">${newTask}</li>`)
    }
};

// function addNewTaskObject() {
//     var newTaskList = new ToDoList ({
//         this.id = Date.now();
//         this.title = titleInput.value;
//     })
// }



function addCards(e) {
if(e.target === saveBtn) {
    mainContainer.insertAdjacentHTML('afterbegin', `<article class="main__article--card" data-id="">
    <header>
        <h2 class="main__article--title">Task Title</h1>
    </header>
    <section class="main__article--body">
      <ul class="main__article--task-list">
        <li class="main__article--task">Don't ever play yourself.</li>
        <li class="main__article--task">Every change I get, I water the plants.</li>
        <li class="main__article--task">Lion! Cloth talk.</li>
        <li class="main__article--task">Lion! Cloth talk.</li>
        <li class="main__article--task">Lion! Cloth talk.</li>
        <li class="main__article--task">Lion! Cloth talk.</li>
        <li class="main__article--task">Lion! Cloth talk.</li>
        <li class="main__article--task">Lion! Cloth talk.</li>
        <li class="main__article--task">Lion! Cloth talk.</li>
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
}
}