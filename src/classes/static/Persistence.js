import { parse } from 'date-fns';
import { Project } from '../data/Project';
import { Todo } from '../data/Todo';

/** Persists projects to localStorage. */
export class Persistence {
  /** A copy of localStorage. */
  static #projectList = [];

  /** Gets projectList with new values from localStorage. */
  static get projectList() {
    this.#projectList = this.loadProjects();
    return this.#projectList;
  }

  /** Represents the project currently being displayed. */
  static #currentProject = undefined;

  /** Gets the currentProject value. */
  static get currentProject() {
    return this.#currentProject;
  }

  /** Sets the currentProject to value. Does nothing if value is not a Project. */
  static set currentProject(value) {
    if (value instanceof Project) {
      this.#currentProject = value;
    }
  }

  /** Revives JSON for a project, handling a special case for todoList. */
  static #projectReviver(key, value) {
    if (key === 'todoList') {
      const todoList = [];
      for (let i = 0; i < value.length; i++) {
        const todo = new Todo(
          value[i].title,
          value[i].description,
          value[i].isCompleted,
          parse(value[i].dueDate, 'MM/dd/yyyy', new Date())
        );
        todoList.push(todo);
      }
      return todoList;
    }
    return value;
  }

  /** Add seed data to localStorage if its empty. */
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
      this.#projectList.push(project);
    }
  }

  /** Loads all localStorage key-value-pairs into projectList. */
  static loadProjects() {
    const loadedProjects = [];
    const localStorageKeys = Object.keys(localStorage);
    localStorageKeys.sort();
    for (const localStorageKey of localStorageKeys) {
      const projectString = localStorage.getItem(localStorageKey);
      const projectData = JSON.parse(projectString, this.#projectReviver);
      loadedProjects.push(new Project(projectData.title, projectData.todoList));
    }
    return loadedProjects;
  }

  /** Clears and then sets localStorage with each project from projectList. */
  static saveProjects() {
    localStorage.clear();
    for (const project of this.#projectList) {
      localStorage.setItem(project.title, JSON.stringify(project));
    }
  }

  /** Sets one project in localStorage. */
  static setProject(project) {
    localStorage.setItem(project.title, JSON.stringify(project));
    this.loadProjects();
  }

  /** Gets one project from localStorage by key (Project Title). */
  static getProject(projectTitle) {
    return localStorage.getItem(projectTitle);
  }

  /** Removes a project from localStorage by key (Project Title). Does not remove the last project
   * in the projectList. */
  static removeProject(projectTitle) {
    if (this.#projectList.length === 1) {
      return; //delete doesn't work on the last project
    }
    this.#projectList = this.#projectList.filter(
      (p) => p.title !== projectTitle
    );
    localStorage.removeItem(projectTitle);
    if (this.currentProject.title === projectTitle) {
      this.currentProject = this.#projectList[0];
    }
    this.loadProjects();
  }
}
