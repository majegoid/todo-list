import { isThisWeek, isToday, parse } from 'date-fns';
import { Todo } from '../data/Todo';

/** Contains functions that check if a Todo meets certain criteria. */
export class TodoFilters {
  /** Is this object a Todo? */
  static isTodo(todo) {
    if (todo instanceof Todo) {
      return true;
    }
    return false;
  }

  /** Is this object a Todo that has a dateDue of today? */
  static isDueToday(todo) {
    if (todo instanceof Todo) {
      const todoDueDateAsDate = parse(todo.dueDate, 'MM/dd/yyyy', new Date());
      if (isToday(todoDueDateAsDate)) {
        return true;
      }
    }
    return false;
  }

  /** Is this object a Todo that has a dateDue that's within this week? */
  static isDueThisWeek(todo) {
    if (todo instanceof Todo) {
      const todoDueDateAsDate = parse(todo.dueDate, 'MM/dd/yyyy', new Date());
      if (isThisWeek(todoDueDateAsDate)) {
        return true;
      }
    }
    return false;
  }
}
