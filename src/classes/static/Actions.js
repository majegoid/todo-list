import { isThisWeek, isToday, parse } from 'date-fns';
import { TodoListItem } from '../../factories/elements/TodoListItem';
import { Project } from '../data/Project';
import { Persistence } from './Persistence';
import { TodoFilters } from './TodoFilters';
import { UI } from './UI';

/** Contains all user-level Actions for the app. Each action may be a combination of UI and
 * Persistence methods. */
export class Actions {
  /** Views a particular project. */
  static setProjectView(project) {
    UI.setProjectMenuItems(project.title);
    UI.setTodoFilterMenuItems();
    UI.setProject(project);
  }

  /** Adds a new Project to localStorage, hides the Add Project Form, and sets the Project Menu
   * Items with the new Project.*/
  static addProject(projectTitle) {
    if (projectTitle !== '') {
      // creates and adds a new project to localStorage
      const newProject = new Project(projectTitle, []);
      localStorage.setItem(newProject.title, JSON.stringify(newProject));
      UI.setAddProjectFormDisplay(false);
      UI.setTodoFilterMenuItems();
      UI.setProjectMenuItems(projectTitle);
      Persistence.currentProject = newProject;
      UI.setProject(Persistence.currentProject);
    }
  }

  /** Closes/Hides the Add Project Form. */
  static closeAddProjectForm() {
    // closes the AddProjectForm
    UI.setAddProjectFormDisplay(false);
  }

  /** Removes a project from localStorage, sets the Project Menu Items display and Todo List display. */
  static removeProject(project) {
    Persistence.removeProject(project.title);
    UI.setTodoFilterMenuItems();
    UI.setProjectMenuItems(Persistence.currentProject.title);
    UI.setProject(Persistence.currentProject);
  }

  /** Adds a Todo to the current Project in localStorage and refreshes the Todo List display. */
  static addTodoToCurrentProject(todo) {
    Persistence.currentProject.addTodo(todo);
    UI.setProject(Persistence.currentProject);
  }

  /** Removes a todo from the current Project in localStorage and refreshes the Todo List display.*/
  static removeTodoFromCurrentProject(todo) {
    Persistence.currentProject.removeTodo(todo);
    UI.setProject(Persistence.currentProject);
  }

  /** Toggles the isCompleted field for a Todo.*/
  static toggleTodoIsCompleted(todo, refreshHandler) {
    todo.isCompleted = !todo.isCompleted;
    todo.project.setTodo(todo);
    refreshHandler();
  }

  /** Toggles the isStarred field for a Todo.*/
  static toggleTodoIsStarred(todo, refreshHandler) {
    todo.isStarred = !todo.isStarred;
    todo.project.setTodo(todo);
    refreshHandler();
  }

  /** Removes a todo from a particular Project in localStorage and refreshes using any handler. */
  static removeTodoFromProject(todo, refreshHandler) {
    todo.project.removeTodo(todo);
    refreshHandler();
  }

  /** Shows the Add Todo Form and hides the Add Todo Click Div. */
  static openAddTodoForm() {
    UI.setCreateTodoFormDisplay(true);
  }

  /** Hides the Add Todo Form and shows the Add Todo Click Div. */
  static closeAddTodoForm() {
    UI.setCreateTodoFormDisplay(false);
  }

  /** Sets the Todo List display with every Todo from every project. */
  static setAllTodosView() {
    let todoListItems = [];
    for (const project of Persistence.projectList) {
      for (const todo of project.todoList) {
        if (TodoFilters.isTodo(todo)) {
          todoListItems.push(
            TodoListItem(
              todo,
              () => {
                Actions.toggleTodoIsCompleted(todo, Actions.setAllTodosView);
              },
              () => {
                Actions.toggleTodoIsStarred(todo, Actions.setAllTodosView);
              },
              () => {
                Actions.removeTodoFromProject(todo, Actions.setAllTodosView);
              }
            )
          );
        }
      }
    }
    UI.setProjectMenuItems();
    UI.setTodoFilterMenuItems('all-todos-menu-item');
    UI.setTodoFilter('All Todos', todoListItems);
    UI.updateAddTodoForm(Actions.setAllTodosView);
  }

  /** Sets the Todo List display with Todos that are due today. */
  static setDueTodayTodosView() {
    let dueTodayTodos = [];
    for (const project of Persistence.projectList) {
      for (const todo of project.todoList) {
        const todoDueDateAsDate = parse(todo.dueDate, 'MM/dd/yyyy', new Date());
        if (isToday(todoDueDateAsDate)) {
          dueTodayTodos.push(
            TodoListItem(
              todo,
              () => {
                Actions.toggleTodoIsCompleted(
                  todo,
                  Actions.setDueTodayTodosView
                );
              },
              () => {
                Actions.toggleTodoIsStarred(todo, Actions.setDueTodayTodosView);
              },
              () => {
                Actions.removeTodoFromProject(
                  todo,
                  Actions.setDueTodayTodosView
                );
              }
            )
          );
        }
      }
    }
    UI.setProjectMenuItems();
    UI.setTodoFilterMenuItems('due-today-todos-menu-item');
    UI.setTodoFilter('Due Today', dueTodayTodos);
    UI.updateAddTodoForm(Actions.setDueTodayTodosView);
  }

  /** Sets the Todo List display with Todos that are due this week. */
  static setDueThisWeekTodos() {
    let dueThisWeekTodos = [];
    for (const project of Persistence.projectList) {
      for (const todo of project.todoList) {
        const todoDueDateAsDate = parse(todo.dueDate, 'MM/dd/yyyy', new Date());
        if (isThisWeek(todoDueDateAsDate)) {
          dueThisWeekTodos.push(
            TodoListItem(
              todo,
              () => {
                Actions.toggleTodoIsCompleted(
                  todo,
                  Actions.setDueThisWeekTodos
                );
              },
              () => {
                Actions.toggleTodoIsStarred(todo, Actions.setDueThisWeekTodos);
              },
              () => {
                Actions.removeTodoFromProject(
                  todo,
                  Actions.setDueThisWeekTodos
                );
              }
            )
          );
        }
      }
    }
    UI.setProjectMenuItems();
    UI.setTodoFilterMenuItems('due-this-week-todos-menu-item');
    UI.setTodoFilter('Due This Week', dueThisWeekTodos);
    UI.updateAddTodoForm(Actions.setDueThisWeekTodos);
  }
}
