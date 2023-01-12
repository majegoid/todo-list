import { Persistence } from '../static/Persistence';
import { Todo } from './Todo';

/** A Project has a title and a todoList. */
export class Project {
  #title;
  #todoList;

  constructor(title = '', todoList = []) {
    if (todoList instanceof Array && todoList[0] instanceof HTMLElement) {
      throw new Error('Not a Todo');
    }
    this.#title = title;
    this.#todoList = todoList;

    for (const todo of this.#todoList) {
      todo.project = this;
    }
  }

  /** Gets the title of the Project. */
  get title() {
    return this.#title;
  }

  /** Sets the title of the Project. */
  set title(value) {
    if (typeof value === 'string') {
      this.#title = value;
    }
  }

  /** Gets a copy of the todoList of the Project. */
  get todoList() {
    return [...this.#todoList];
  }

  /** Sets the todoList of the project. Does not set if the input is not an Array with only Todo
   * elements. */
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

    for (const todo of this.#todoList) {
      todo.project = this;
    }
  }

  /** Adds or overwrites a Todo in this project's todoList. */
  setTodo(todo) {
    if (!(todo instanceof Todo)) {
      return;
    }
    let indexOfTodo = this.#todoList.indexOf(todo);
    if (indexOfTodo === -1) {
      this.#todoList.push(todo);
      return;
    }
    this.#todoList[indexOfTodo] = todo;
    // save to localStorage
    Persistence.setProject(this);
  }

  /** Adds one Todo to the Project's todoList. Overwrites the Project in localStorage. */
  addTodo(todo) {
    if (!(todo instanceof Todo)) {
      return;
    }
    todo.project = this;
    this.#todoList.push(todo);
    Persistence.setProject(this);
  }

  /** Removes one Todo from the Project's todoList. Overwrites the Project in localStorage. */
  removeTodo(todo) {
    if (!(todo instanceof Todo)) {
      return;
    }
    this.#todoList = this.#todoList.filter((t) => t !== todo);
    Persistence.setProject(this);
  }

  /** Returns an JSON serializable object that represents this Project. */
  toJSON = function () {
    return { title: this.title, todoList: [...this.todoList] };
  };
}
