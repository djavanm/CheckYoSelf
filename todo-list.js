class ToDoList {
  constructor(object) {
  this.id = object.id;
  this.title = object.title;
  this.urgent = object.urgent || false;
  this.tasks = object.tasks || [];
  }

  saveToStorage(globalArray) {

  }

  deleteFromStorage(globalArray) {

  }

  updateToDo(object) {

  }

  updateTask(object) {

  }
}