import { Project } from '../data/Project';
import { Storage } from './Storage';
import { UI } from './UI';

export class Actions {
  static addProject(projectTitle) {
    if (projectTitle !== '') {
      // creates and adds a new project to localStorage
      const newProject = new Project(projectTitle, []);
      localStorage.setItem(newProject.title, JSON.stringify(newProject));
    }
    UI.setAddProjectFormDisplay(false);
    UI.setProjectMenuItems(Storage.loadProjects());
  }

  static closeAddProjectForm() {
    // closes the AddProjectForm
    UI.setAddProjectFormDisplay(false);
  }

  static makeProjectActive(project) {
    // TODO: change active class styles
    Storage.currentProject = project;
    UI.setProject(project);
  }

  static addTodoToCurrentProject(todo) {
    Storage.currentProject.addTodo(todo);
  }

  static openAddTodoForm() {
    UI.setCreateTodoFormDisplay(true);
  }

  static closeAddTodoForm() {
    UI.setCreateTodoFormDisplay(false);
  }
}
