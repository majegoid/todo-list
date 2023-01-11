import { parse } from 'date-fns';
import { Project } from '../data/Project';
import { Todo } from '../data/Todo';

export class Persistence {
  static projectList = [];
  static #currentProject = undefined;

  static get currentProject() {
    return this.#currentProject;
  }

  static set currentProject(value) {
    if (value instanceof Project) {
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
      Persistence.projectList.push(project);
    }
  }

  static loadProjects() {
    this.projectList = [];
    let localStorageKeys = Object.keys(localStorage);
    localStorageKeys.sort();
    for (const localStorageKey of localStorageKeys) {
      let projectString = localStorage.getItem(localStorageKey);
      let projectData = JSON.parse(projectString, function (key, value) {
        if (key === 'todoList') {
          let todoList = value;
          let replacementList = [];
          for (let i = 0; i < todoList.length; i++) {
            let replacementTodo = new Todo(
              todoList[i].title,
              todoList[i].description,
              todoList[i].isComplete,
              parse(todoList[i].dueDate, 'MM/dd/yyyy', new Date())
            );
            replacementList.push(replacementTodo);
          }
          return replacementList;
        }
        return value;
      });

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

  static setProject(project) {
    this.projectList = this.projectList.filter((p) => p !== project);
    localStorage.setItem(project.title, JSON.stringify(project));
    Persistence.loadProjects();
  }

  static getProject(projectTitle) {
    return localStorage.getItem(projectTitle);
  }

  static removeProject(projectTitle) {
    if (this.projectList.length === 1) {
      return; //delete doesn't work on the last project
    }
    this.projectList = this.projectList.filter((p) => p.title !== projectTitle);
    localStorage.removeItem(projectTitle);
    if (this.currentProject.title === projectTitle) {
      this.currentProject = this.projectList[0];
    }
    Persistence.loadProjects();
  }
}
