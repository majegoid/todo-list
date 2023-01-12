import { endOfDay, format } from 'date-fns';
import { Project } from './Project';

/** A Todo has a title, description, isCompleted, and dueDate. */
export class Todo {
  #title;
  #description;
  #isCompleted;
  #isStarred;
  #dueDate;
  #project;

  /** Constructor defaults isCompleted to false and the dueDate as the end of today. */
  constructor(
    title = 'default title',
    description = 'default description',
    isCompleted = false,
    dueDate = endOfDay(Date.now()),
    project = null
  ) {
    this.#title = title;
    this.#description = description;
    this.#isCompleted = isCompleted;
    this.#dueDate = dueDate;
    this.#project = project;
  }

  /** Gets the title of the Todo. */
  get title() {
    return this.#title;
  }

  /** Sets the title of the Todo. Does nothing if the value is not a string. */
  set title(value) {
    if (typeof value === 'string') {
      this.#title = value;
    }
  }

  /** Gets the description of the Todo. */
  get description() {
    return this.#description;
  }

  /** Sets the description of the Todo. Does nothing if the value is not a string. */
  set description(value) {
    if (typeof value === 'string') {
      this.#description = value;
    }
  }

  /** Gets whether or not the todo is completed. */
  get isCompleted() {
    return this.#isCompleted;
  }

  /** Sets if the todo is complete. */
  set isCompleted(value) {
    if (typeof value === 'boolean') {
      this.#isCompleted = value;
    }
  }

  /** Gets whether or not the todo is starred. */
  get isStarred() {
    return this.#isStarred;
  }

  /** Sets if the todo is starred. */
  set isStarred(value) {
    if (typeof value === 'boolean') {
      this.#isStarred = value;
    }
  }

  /** Gets the due date of the Todo as a MM/dd/yyyy formatted string. */
  get dueDate() {
    return format(this.#dueDate, 'MM/dd/yyyy');
  }

  /** Sets the due date of the Todo. Does nothing if the value is not a Date. */
  set dueDate(value) {
    if (value instanceof Date) {
      this.#dueDate = value;
    }
  }

  get project() {
    return this.#project;
  }

  set project(value) {
    if (value instanceof Project) {
      this.#project = value;
    }
  }

  /** Returns an JSON serializable object that represents this Todo. */
  toJSON = function () {
    return {
      title: this.title,
      description: this.description,
      isCompleted: this.isCompleted,
      isStarred: this.isStarred,
      dueDate: this.dueDate,
    };
  };
}
