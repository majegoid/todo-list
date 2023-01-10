import { Project } from '../data/Project';
import { Storage } from './Storage';
import { UI } from './UI';

export class Actions {
  static addProjectHandler(projectTitle) {
    if (projectTitle !== '') {
      // creates and adds a new project to localStorage
      const newProject = new Project(projectTitle, []);
      localStorage.setItem(newProject.title, JSON.stringify(newProject));
    }
    UI.setAddProjectFormDisplay(false);
    UI.setProjectMenuItems(Storage.loadProjects());
  }

  static closeAddProjectFormHandler() {
    // closes the AddProjectForm
    UI.setAddProjectFormDisplay(false);
  }

  static makeActiveProjectHandler(project) {
    // TODO: change active class styles
    UI.setProject(project);
  }
}
