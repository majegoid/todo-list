import { isThisWeek, isToday, parse } from 'date-fns';
import { TodoListItem } from '../../factories/elements/TodoListItem';
import { Project } from '../data/Project';
import { Persistence } from './Persistence';
import { TodoFilters } from './TodoFilters';
import { UI } from './UI';

/** Contains all user-level Actions for the app. */
export class Actions {
  /**  */
  static addProject(projectTitle) {
    if (projectTitle !== '') {
      // creates and adds a new project to localStorage
      const newProject = new Project(projectTitle, []);
      localStorage.setItem(newProject.title, JSON.stringify(newProject));
    }
    UI.setAddProjectFormDisplay(false);
    UI.setProjectMenuItems(Persistence.loadProjects());
  }

  static closeAddProjectForm() {
    // closes the AddProjectForm
    UI.setAddProjectFormDisplay(false);
  }

  static makeProjectActive(project) {
    // TODO: change active class styles
    Persistence.currentProject = project;
    UI.setProject(project);
  }

  static removeProject(project) {
    let prevProject = Persistence.currentProject;
    Persistence.removeProject(project.title);
    UI.setProjectMenuItems(Persistence.projectList);
    if (prevProject === project) {
      UI.setProject(Persistence.currentProject);
    }
  }

  static addTodoToCurrentProject(todo) {
    Persistence.currentProject.addTodo(todo);
    UI.setProject(Persistence.currentProject);
  }

  static removeTodoFromCurrentProject(todo) {
    Persistence.currentProject.removeTodo(todo);
    UI.setProject(Persistence.currentProject);
  }

  static removeTodoFromProject(project, todo, refreshHandler) {
    project.removeTodo(todo);
    refreshHandler();
  }

  static openAddTodoForm() {
    UI.setCreateTodoFormDisplay(true);
  }

  static closeAddTodoForm() {
    UI.setCreateTodoFormDisplay(false);
  }

  // static setAllTodosView() {
  //   let todoListItems = [];
  //   for (const project of Persistence.projectList) {
  //     for (const todo of project.todoList) {
  //       todoListItems.push(TodoListItem());
  //     }
  //   }
  //   UI.setProject(new Project('All Todos', todoListItems));
  // }

  // Sets the "All Todos" View
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
