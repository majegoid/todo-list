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
    if (typeof value !== 'object' || !(value instanceof Array)) {
      return;
    }
    for (const elem of value) {
      if (typeof elem !== 'object' || !(value instanceof Todo)) {
        return;
      }
    }
    this.#todoList = value;
  }

  toJSON = function () {
    return { title: this.title, todoList: [...this.todoList] };
  };
}
