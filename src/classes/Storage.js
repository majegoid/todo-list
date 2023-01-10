import { parse } from 'date-fns';
import { Project } from './Project';
import { Todo } from './Todo';

export class Storage {
  static projectList = [];
  static #currentProject = undefined;

  static get currentProject() {
    return this.#currentProject;
  }

  static set currentProject(value) {
    if (typeof value === 'object' && value instanceof Project) {
      this.#currentProject = value;
    }
  }

  // add seed data to localstorage if its empty.
  static seedData() {
    const todo1 = new Todo(
      'Todo #1',
      'Description',
      true,
      new Date('2023-01-07T21:00:00')
    );
    const todo2 = new Todo(
      'Todo #2',
      'Description',
      true,
      new Date('2023-01-07T21:00:00')
    );
    const todo3 = new Todo(
      'Todo #3',
      'Description',
      true,
      new Date('2023-01-07T21:00:00')
    );

    const projectList = [
      new Project('Project #1', [todo1, todo2, todo3]),
      new Project('Project #2', [todo1, todo2, todo3]),
      new Project('Project #3', [todo1, todo2, todo3]),
    ];

    for (const project of projectList) {
      localStorage.setItem(project.title, JSON.stringify(project));
    }
  }

  static loadProjects() {
    for (let i = 0; i < localStorage.length; i++) {
      let projectName = localStorage.key(i);
      let projectData = JSON.parse(
        localStorage.getItem(projectName),
        function (key, value) {
          if (key === 'dueDate') return parse(value, 'MM/dd/yyyy', new Date());
          return value;
        }
      );

      // check project data matches the right structure:
      this.projectList.push(
        new Project(projectData.title, projectData.todoList)
      );
    }
  }

  static saveProjects() {
    localStorage.clear();
    for (const project of this.projectList) {
      localStorage.setItem(project.title, JSON.stringify(project));
    }
  }
}
