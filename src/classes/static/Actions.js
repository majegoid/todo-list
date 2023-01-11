import { isThisWeek, isToday, parse } from 'date-fns';
import { Project } from '../data/Project';
import { Persistence } from './Persistence';
import { UI } from './UI';

export class Actions {
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

  static openAddTodoForm() {
    UI.setCreateTodoFormDisplay(true);
  }

  static closeAddTodoForm() {
    UI.setCreateTodoFormDisplay(false);
  }

  static setAllTodosView() {
    let allTodos = [];
    for (const project of Persistence.projectList) {
      for (const todo of project.todoList) {
        allTodos.push(todo);
      }
    }
    UI.setProject(new Project('All Tasks', allTodos));
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
