import { parse } from 'date-fns';
import { Project } from '../data/Project';
import { Todo } from '../data/Todo';

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
      'Description 1',
      true,
      new Date('2023-01-07T21:00:00')
    );
    const todo2 = new Todo(
      'Todo #2',
      'Description 2',
      true,
      new Date('2023-01-07T21:00:00')
    );
    const todo3 = new Todo(
      'Todo #3',
      'Description 3',
      true,
      new Date('2023-01-07T21:00:00')
    );

    const todo4 = new Todo(
      'Todo #4',
      'Description 4',
      true,
      new Date('2023-01-07T21:00:00')
    );
    const todo5 = new Todo(
      'Todo #5',
      'Description 5',
      true,
      new Date('2023-01-07T21:00:00')
    );
    const todo6 = new Todo(
      'Todo #6',
      'Description 6',
      true,
      new Date('2023-01-07T21:00:00')
    );

    const todo7 = new Todo(
      'Todo #7',
      'Description 7',
      true,
      new Date('2023-01-07T21:00:00')
    );
    const todo8 = new Todo(
      'Todo #8',
      'Description 8',
      true,
      new Date('2023-01-07T21:00:00')
    );
    const todo9 = new Todo(
      'Todo #9',
      'Description 9',
      true,
      new Date('2023-01-07T21:00:00')
    );

    const projectList = [
      new Project('Project #1', [todo1, todo2, todo3]),
      new Project('Project #2', [todo4, todo5, todo6]),
      new Project('Project #3', [todo7, todo8, todo9]),
    ];

    for (const project of projectList) {
      localStorage.setItem(project.title, JSON.stringify(project));
    }
  }

  static loadProjects() {
    this.projectList = [];
    let keys = Object.keys(localStorage);
    keys.sort();
    for (const key of keys) {
      let projectData = JSON.parse(
        localStorage.getItem(key),
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
    return [...this.projectList];
  }

  static saveProjects() {
    localStorage.clear();
    for (const project of this.projectList) {
      localStorage.setItem(project.title, JSON.stringify(project));
    }
  }
}
