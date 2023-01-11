import { endOfDay, format } from 'date-fns';

/** A Todo has a title, description, isCompleted, and dueDate. */
export class Todo {
  #title;
  #description;
  #isCompleted;
  #dueDate;

  /** Constructor defaults isCompleted to false and the dueDate as the end of today. */
  constructor(
    title = 'default title',
    description = 'default description',
    isCompleted = false,
    dueDate = endOfDay(Date.now())
  ) {
    this.#title = title;
    this.#description = description;
    this.#isCompleted = isCompleted;
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
  get isCompleted() {
    return this.#isCompleted;
  }

  // FIXME: value check is not supposed to be string
  /** TODO: Sets if the todo is complete. */
  set isCompleted(value) {
    if (typeof value === 'string') {
      this.#isCompleted = value;
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
      isCompleted: this.isCompleted,
      dueDate: this.dueDate,
    };
  };
}
