import { isThisWeek, isToday, parse } from 'date-fns';
import { TodoListItem } from '../../factories/elements/TodoListItem';
import { Project } from '../data/Project';
import { Persistence } from './Persistence';
import { TodoFilters } from './TodoFilters';
import { UI } from './UI';

/** Contains all user-level Actions for the app. Each action may be a combination of UI and
 * Persistence methods. */
export class Actions {
  /** Adds a new Project to localStorage, hides the Add Project Form, and sets the Project Menu
   * Items with the new Project.*/
  static addProject(projectTitle) {
    if (projectTitle !== '') {
      // creates and adds a new project to localStorage
      const newProject = new Project(projectTitle, []);
      localStorage.setItem(newProject.title, JSON.stringify(newProject));
    }
    UI.setAddProjectFormDisplay(false);
    UI.setProjectMenuItems(Persistence.loadProjects());
  }

  /** Closes/Hides the Add Project Form. */
  static closeAddProjectForm() {
    // closes the AddProjectForm
    UI.setAddProjectFormDisplay(false);
  }

  /** Removes a project from localStorage, sets the Project Menu Items display and Todo List display. */
  static removeProject(project) {
    let prevProject = Persistence.currentProject;
    Persistence.removeProject(project.title);
    UI.setProjectMenuItems(Persistence.projectList);
    if (prevProject === project) {
      UI.setProject(Persistence.currentProject);
    }
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

  //FIXME:
  /** Removes a todo from a particular Project in localStorage and refreshes using any handler. */
  static removeTodoFromProject(project, todo, refreshHandler) {
    project.removeTodo(todo);
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

  //FIXME: incomplete filter actions
  // static setAllTodosView() {
  //   let todoListItems = [];
  //   for (const project of Persistence.projectList) {
  //     for (const todo of project.todoList) {
  //       todoListItems.push(TodoListItem());
  //     }
  //   }
  //   UI.setProject(new Project('All Todos', todoListItems));
  // }

  /** Sets the Todo List display with every Todo from every project. */
  static setAllTodosView() {
    let todoListItems = [];
    for (const project of Persistence.projectList) {
      for (const todo of project.todoList) {
        if (TodoFilters.isTodo(todo)) {
          todoListItems.push(
            TodoListItem(todo, () => {
              Actions.removeTodoFromProject(
                project,
                todo,
                Actions.setAllTodosView
              );
            })
          );
        }
      }
    }
    UI.setTodoFilter('All Todos', todoListItems);
  }

  /** Sets the Todo List display with Todos that are due today. */
  static setDueTodayTodosView() {
    let dueTodayTodos = [];
    for (const project of Persistence.projectList) {
      for (const todo of project.todoList) {
        const todoDueDateAsDate = parse(todo.dueDate, 'MM/dd/yyyy', new Date());
        if (isToday(todoDueDateAsDate)) {
          dueTodayTodos.push(todo);
        }
      }
    }
    UI.setProject(new Project('Due Today', dueTodayTodos));
  }

  /** Sets the Todo List display with Todos that are due this week. */
  static setDueThisWeekTodos() {
    let dueThisWeekTodos = [];
    for (const project of Persistence.projectList) {
      for (const todo of project.todoList) {
        const todoDueDateAsDate = parse(todo.dueDate, 'MM/dd/yyyy', new Date());
        if (isThisWeek(todoDueDateAsDate)) {
          dueThisWeekTodos.push(todo);
        }
      }
    }
    UI.setProject(new Project('Due This Week', dueThisWeekTodos));
  }
}
