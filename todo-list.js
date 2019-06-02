class ToDoList {
  constructor(object) {
  this.id = object.id;
  this.title = object.title;
  this.urgent = object.urgent || false;
  this.tasks = object.tasks || [];
  }

  saveToStorage(globalArray) {
    var stringified = JSON.stringify(globalArray);
    localStorage.setItem("ToDoArray", stringified);
  }

  deleteFromStorage(globalArray, locatedId) {
    var newGlobalArray = globalArray.filter(function(idea) {
      return idea.id !== locatedId;
    });
    globalArray = newGlobalArray;
    var stringified = JSON.stringify(globalArray);
    localStorage.setItem("ToDoArray", stringified);
  }

  updateToDo(globalArray, object) {
  
  }

  updateTask(object) {
    object = object;
  }
}