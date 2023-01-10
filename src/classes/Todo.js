import { format } from 'date-fns';

export class Todo {
  #title;
  #description;
  #isComplete;
  #dueDate;

  constructor(
    title = 'default title',
    description = 'default description',
    isComplete = false,
    dueDate = new Date(Date.now() + 24 * 60 * 60 * 1000)
  ) {
    this.#title = title;
    this.#description = description;
    this.#isComplete = isComplete;
    this.#dueDate = dueDate;
  }

  get title() {
    return this.#title;
  }

  set title(value) {
    if (typeof value === 'string') {
      this.#title = value;
    }
  }

  get description() {
    return this.#description;
  }

  set description(value) {
    if (typeof value === 'string') {
      this.#description = value;
    }
  }

  get isComplete() {
    return this.#isComplete;
  }

  set isComplete(value) {
    if (typeof value === 'string') {
      this.#isComplete = value;
    }
  }

  get dueDate() {
    return format(this.#dueDate, 'MM/dd/yyyy');
  }

  set dueDate(value) {
    if (typeof value === 'object') {
      this.#dueDate = value;
    }
  }

  toJSON = function () {
    return {
      title: this.#title,
      description: this.#description,
      isComplete: this.#isComplete,
      dueDate: format(this.#dueDate, 'MM/dd/yyyy'),
    };
  };
}
