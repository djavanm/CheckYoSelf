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

  updateToDo(globalArray) {
  this.urgent = this.urgent;
  this.title = this.title;
  this.saveToStorage(globalArray);
  }

  updateTask(globalArray) {
    this.tasks = this.tasks;
    this.saveToStorage(globalArray);
  }
};