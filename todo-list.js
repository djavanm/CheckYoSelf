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
    return globalArray;
  }

  updateToDo(globalArray, object) {
  
  }

  updateTask(globalArray, taskIndex) {
    this.tasks[taskIndex].complete = !this.tasks[taskIndex].complete;
    this.saveToStorage(globalArray);
  }
}