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
// titleInput.addEventListener("keypress", validate);
// bodyInput.addEventListener("keypress", validate);
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