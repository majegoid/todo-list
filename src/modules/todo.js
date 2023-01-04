export class Todo {
  #title;
  #description;
  #isComplete;
  #dueDate;

  constructor(
    title = '',
    description = '',
    isComplete = false,
    dueDate = new Date(Date.now() + 86400000)
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
    return this.#dueDate;
  }

  set dueDate(value) {
    if (typeof value === 'object') {
      this.#dueDate = value;
    }
  }
}
