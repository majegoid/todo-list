import { AddProjectForm } from '../../factories/elements/AddProjectForm';
import { AddProjectMenuItem } from '../../factories/elements/AddProjectMenuItem';
import { AddTodo } from '../../factories/elements/AddTodo';
import { AddTodoForm } from '../../factories/elements/AddTodoForm';
import { ProjectMenuItem } from '../../factories/elements/ProjectMenuItem';
import { ProjectOptionsPopup } from '../../factories/elements/ProjectOptionsPopup';
import { TodoListItem } from '../../factories/elements/TodoListItem';
import { Actions } from './Actions';
import { Persistence } from './Persistence';

export class UI {
  // containers
  static body = document.querySelector('body');
  static todosContainer = document.querySelector('#todos-container');
  static allTodosMenuItem = document.querySelector('#all-todos-menu-item');
  static dueTodayTodosMenuItem = document.querySelector(
    '#due-today-todos-menu-item'
  );
  static dueThisWeekTodosMenuItem = document.querySelector(
    '#due-this-week-todos-menu-item'
  );
  static starredTodosMenuItem = document.querySelector(
    '#starred-todos-menu-item'
  );
  static createTodoFormContainer = document.querySelector(
    '#create-todo-form-container'
  );
  static projectMenuItemsContainer = document.querySelector(
    '#project-menu-items-container'
  );
  // instantiated elements
  static addTodoFormElem = AddTodoForm();
  static addTodoClickDivElem = AddTodo();
  static addProjectClickDivElem = AddProjectMenuItem();
  static addProjectFormElem = AddProjectForm();
  // popups
  static popup = ProjectOptionsPopup(0, 0);

  static setup() {
    UI.body.appendChild(UI.popup);

    // detect clicks outside of specific elements
    document.onclick = function (e) {
      let targetEl = e.target; // the clicked element

      do {
        if (
          targetEl === UI.addProjectClickDivElem ||
          targetEl === UI.addProjectFormElem
        ) {
          return;
        }
        targetEl = targetEl.parentNode; // go up one element from the target.
      } while (targetEl);

      // if no element in the hierarchy from the clicked element was clicked:
      UI.setAddProjectFormDisplay(false);
    };

    // projects
    UI.setProjectMenuItems(Persistence.projectList);
    UI.setAddProjectFormDisplay(false);
    // todos
    UI.setProject(Persistence.currentProject);
    UI.setCreateTodoFormDisplay(false);

    UI.setProjectOptionsDisplay(false);
    // UI.setProjectOptionsDisplay(true, 100, 100);

    UI.allTodosMenuItem.onclick = () => {
      Actions.setAllTodosView();
    };

    UI.dueTodayTodosMenuItem.onclick = () => {
      Actions.setDueTodayTodosView();
    };

    UI.dueThisWeekTodosMenuItem.onclick = () => {
      Actions.setDueThisWeekTodos();
    };
  }

  /* PRIVATE METHODS */
  static #setTodos(todos = []) {
    UI.todosContainer.replaceChildren();
    for (const todo of todos) {
      UI.todosContainer.appendChild(TodoListItem(todo));
    }
    UI.todosContainer.appendChild(UI.addTodoClickDivElem);
  }

  static #setTodoListItems(todoListItems = []) {
    UI.todosContainer.replaceChildren();
    for (const todoListItem of todoListItems) {
      UI.todosContainer.appendChild(todoListItem);
    }
    UI.todosContainer.appendChild(UI.addTodoClickDivElem);
  }
  /* END PRIVATE METHODS */

  /* PUBLIC METHODS */
  static setProjectMenuItems(projects = []) {
    UI.projectMenuItemsContainer.replaceChildren();
    if (Persistence.projectList.length === 1) {
      UI.projectMenuItemsContainer.appendChild(
        ProjectMenuItem(projects[0], false)
      );
    }
    if (Persistence.projectList.length > 1) {
      for (const project of projects) {
        UI.projectMenuItemsContainer.appendChild(ProjectMenuItem(project));
      }
    }
    UI.projectMenuItemsContainer.appendChild(UI.addProjectClickDivElem);
  }

  /** Sets the UI for a Project */
  static setProject(project) {
    // <div><h1>Project Name</h1></div>
    // <div id="todos-container" class="todos-container"></div>
    // <div id="create-todo-form-container"></div>
    const mainElement = document.querySelector('main');
    const projectNameH1 = mainElement.querySelector('div > h1');

    // change active class of project
    projectNameH1.textContent = project.title;
    UI.#setTodos(project.todoList);
  }

  /** Sets the UI for a Todo Filter */
  static setTodoFilter(title, todoListItems) {
    const mainElement = document.querySelector('main');
    const todoFilterLabel = mainElement.querySelector('div > h1');

    todoFilterLabel.textContent = title;

    UI.#setTodoListItems(todoListItems);
  }

  static setCreateTodoFormDisplay(isShown = true) {
    // show
    if (isShown && UI.todosContainer.contains(UI.addTodoClickDivElem)) {
      UI.todosContainer.removeChild(UI.addTodoClickDivElem);
    }
    if (isShown) {
      UI.createTodoFormContainer.appendChild(UI.addTodoFormElem);
    }
    // hide
    if (!isShown && UI.createTodoFormContainer.contains(UI.addTodoFormElem)) {
      UI.createTodoFormContainer.removeChild(UI.addTodoFormElem);
    }
    if (!isShown) {
      UI.todosContainer.appendChild(UI.addTodoClickDivElem);
    }
  }

  static setAddProjectFormDisplay(isShown = true) {
    // show
    if (
      isShown &&
      UI.projectMenuItemsContainer.contains(UI.addProjectClickDivElem)
    ) {
      UI.projectMenuItemsContainer.removeChild(UI.addProjectClickDivElem);
    }
    if (isShown) {
      UI.projectMenuItemsContainer.appendChild(UI.addProjectFormElem);
    }
    // hide
    if (
      !isShown &&
      UI.projectMenuItemsContainer.contains(UI.addProjectFormElem)
    ) {
      UI.projectMenuItemsContainer.removeChild(UI.addProjectFormElem);
    }
    if (!isShown) {
      UI.projectMenuItemsContainer.appendChild(UI.addProjectClickDivElem);
    }
  }

  static setProjectOptionsDisplay(isShown = true, xPos = 0, yPos = 0) {
    if (isShown) {
      UI.popup.style.display = 'flex';
      UI.popup.style.top = `${yPos}px`;
      UI.popup.style.left = `${xPos}px`;
    }
    if (!isShown) {
      UI.popup.style.display = 'none';
    }
  }
  /* END PUBLIC METHODS */
}
