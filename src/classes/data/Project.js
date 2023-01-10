import { Storage } from '../static/Storage';
import { Todo } from './Todo';

export class Project {
  #title;
  #todoList;

  constructor(title = '', todoList = []) {
    this.#title = title;
    this.#todoList = todoList;
  }

  get title() {
    return this.#title;
  }

  set title(value) {
    if (typeof value === 'string') {
      this.#title = value;
    }
  }

  get todoList() {
    return [...this.#todoList];
  }

  set todoList(value) {
    if (!(value instanceof Array)) {
      return;
    }
    for (const todo of value) {
      if (!(todo instanceof Todo)) {
        return;
      }
    }
    this.#todoList = value;
  }

  addTodo(todo) {
    if (!(todo instanceof Todo)) {
      return;
    }
    this.#todoList.push(todo);
    Storage.setProject(this);
  }

  removeTodo(todo) {
    if (!(todo instanceof Todo)) {
      return;
    }
    this.#todoList = this.#todoList.filter((t) => t !== todo);
    Storage.setProject(this);
  }

  toJSON = function () {
    return { title: this.title, todoList: [...this.todoList] };
  };
}
