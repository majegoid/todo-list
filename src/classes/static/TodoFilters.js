import { isThisWeek, isToday, parse } from 'date-fns';
import { Todo } from '../data/Todo';

export class TodoFilters {
  static isTodo(todo) {
    if (todo instanceof Todo) {
      return true;
    }
    return false;
  }

  static isDueToday(todo) {
    if (todo instanceof Todo) {
      const todoDueDateAsDate = parse(todo.dueDate, 'MM/dd/yyyy', new Date());
      if (isToday(todoDueDateAsDate)) {
        return true;
      }
    }
    return false;
  }

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
