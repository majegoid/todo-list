import { endOfDay, format } from 'date-fns';

/** A Todo has a title, description, isComplete, and dueDate. */
export class Todo {
  #title;
  #description;
  #isComplete;
  #dueDate;

  /** Constructor defaults isComplete to false and the dueDate as the end of today. */
  constructor(
    title = 'default title',
    description = 'default description',
    isComplete = false,
    dueDate = endOfDay(Date.now())
  ) {
    this.#title = title;
    this.#description = description;
    this.#isComplete = isComplete;
    this.#dueDate = dueDate;
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

  // FIXME: rename property to isCompleted
  /** Gets whether or not the todo is completed. */
  get isComplete() {
    return this.#isComplete;
  }

  // FIXME: value check is not supposed to be string
  /** TODO: Sets if the todo is complete. */
  set isComplete(value) {
    if (typeof value === 'string') {
      this.#isComplete = value;
    }
  }

  /** Gets the due date of the Todo as a MM/dd/yyyy formatted string. */
  get dueDate() {
    return format(this.#dueDate, 'MM/dd/yyyy');
  }

  //FIXME: should not have an error thrown if the value is not a date
  /** Sets the due date of the Todo. Does nothing if the value is not a Date. */
  set dueDate(value) {
    if (value instanceof Date) {
      this.#dueDate = value;
    } else {
      throw new Error('dueDate is not a date');
    }
  }

  /** Returns an JSON serializable object that represents this Todo. */
  toJSON = function () {
    return {
      title: this.title,
      description: this.description,
      isComplete: this.isComplete,
      dueDate: this.dueDate,
    };
  };
}
