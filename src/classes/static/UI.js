import { AddProjectForm } from '../../factories/elements/AddProjectForm';
import { AddProjectMenuItem } from '../../factories/elements/AddProjectMenuItem';
import { AddTodo } from '../../factories/elements/AddTodo';
import { AddTodoForm } from '../../factories/elements/AddTodoForm';
import { ProjectMenuItem } from '../../factories/elements/ProjectMenuItem';
import { ProjectOptionsPopup } from '../../factories/elements/ProjectOptionsPopup';
import { TodoFilterMenuItem } from '../../factories/elements/TodoFilterMenuItem';
import { TodoListItem } from '../../factories/elements/TodoListItem';
import { Actions } from './Actions';
import { Persistence } from './Persistence';

/** Contains functions that replace parts of the document with newly generated HTML. */
export class UI {
  // Container elements (Targets for replacement)
  static body = document.querySelector('body');
  static todosContainer = document.querySelector('#todos-container');
  static projectFiltersContainer = document.querySelector(
    '#project-filters-container'
  );
  static createTodoFormContainer = document.querySelector(
    '#create-todo-form-container'
  );
  static projectMenuItemsContainer = document.querySelector(
    '#project-menu-items-container'
  );
  static todoListTitle = document.querySelector('main > div > h1');

  // Display Elements
  // Forms
  static addTodoFormElem = AddTodoForm();
  static addProjectFormElem = AddProjectForm();
  // Add object Click Divs
  static addTodoClickDivElem = AddTodo();
  static addProjectClickDivElem = AddProjectMenuItem();
  // Popups
  static popup = ProjectOptionsPopup(0, 0);

  /** Runs the initial setup of the UI. */
  static setup() {
    // Append elements
    UI.body.appendChild(UI.popup);

    // Menu Items
    UI.setTodoFilterMenuItems();
    UI.setProjectMenuItems(Persistence.currentProject.title);
    UI.setAddProjectFormDisplay(false);
    // Set the Project (Todo List) and Todo Form
    UI.setProject(Persistence.currentProject);
    UI.setCreateTodoFormDisplay(false);
    // Set ProjectOptionsPopup display
    UI.setProjectOptionsDisplay(false);

    // Event Listeners
    // Detect clicks outside of specific elements
    document.onclick = function (e) {
      let targetEl = e.target; // the clicked element

      do {
        if (
          targetEl === UI.addProjectClickDivElem ||
          targetEl === UI.addProjectFormElem ||
          targetEl === UI.addTodoClickDivElem ||
          targetEl === UI.addTodoFormElem
        ) {
          return;
        }
        targetEl = targetEl.parentNode; // go up one element from the target.
      } while (targetEl);

      // If no element in the hierarchy from the clicked element was clicked:
      // 1) Close all forms.
      UI.setAddProjectFormDisplay(false);
      UI.setCreateTodoFormDisplay(false);
    };
  }

  /* PRIVATE METHODS */
  /** Sets the Todo List Item display using a Todo[]. */
  static #setTodos(todos = []) {
    UI.todosContainer.replaceChildren();
    for (const todo of todos) {
      UI.todosContainer.appendChild(
        TodoListItem(
          todo,
          () => {
            Actions.toggleTodoIsCompleted(todo, () =>
              Actions.setProjectView(todo.project)
            );
          },
          () => {
            Actions.toggleTodoIsStarred(todo, () =>
              Actions.setProjectView(todo.project)
            );
          },
          () => {
            Actions.removeTodoFromProject(todo, () =>
              Actions.setProjectView(todo.project)
            );
          }
        )
      );
    }
    UI.todosContainer.appendChild(UI.addTodoClickDivElem);
  }

  /** Sets the Todo List Item display using a TodoListItem[]. */
  static #setTodoListItems(todoListItems = []) {
    UI.todosContainer.replaceChildren();
    for (const todoListItem of todoListItems) {
      UI.todosContainer.appendChild(todoListItem);
    }
    UI.todosContainer.appendChild(UI.addTodoClickDivElem);
  }
  /* END PRIVATE METHODS */

  /* PUBLIC METHODS */

  /** Sets all Project Menu Items using a Project[].*/
  static setProjectMenuItems(activeProjectTitle = '') {
    const projects = Persistence.projectList;
    UI.projectMenuItemsContainer.replaceChildren();
    for (const project of projects) {
      UI.projectMenuItemsContainer.appendChild(
        ProjectMenuItem(
          project,
          activeProjectTitle === project.title ? true : false,
          Persistence.projectList.length === 1 ? false : true,
          () => {
            Actions.setProjectView(project);
          }
        )
      );
    }
    UI.projectMenuItemsContainer.appendChild(UI.addProjectClickDivElem);
  }

  /** Sets the Todo List title and Todo List Items using a Project. */
  static setProject(project) {
    UI.todoListTitle.textContent = project.title;
    UI.#setTodos(project.todoList);
    Persistence.currentProject = project;
  }

  /** Sets the Todo List title and Todo List Items using a Title and TodoListItem[]. */
  static setTodoFilter(title, todoListItems) {
    UI.todoListTitle.textContent = title;
    UI.#setTodoListItems(todoListItems);
    Persistence.currentProject = null;
  }

  /** Sets the Add Todo Form display and Add Todo Click Div display together. */
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

  /** Sets the Add Project Form display and Add Project Click Div display together. */
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

  /** Sets the position and show value for the ProjectOptionsMenu. */
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

  /** Sets the Todo Filter Menu Items, highlighting one of them by id. */
  static setTodoFilterMenuItems(activeId = '') {
    const todoFilters = {
      'all-todos-menu-item': {
        id: 'all-todos-menu-item',
        iconClass: 'fa-list-check',
        isActive: false,
        label: 'All Todos',
        clickHandler: () => {
          Actions.setAllTodosView();
        },
      },
      'due-today-todos-menu-item': {
        id: 'due-today-todos-menu-item',
        iconClass: 'fa-calendar-day',
        isActive: false,
        label: 'Due Today',
        clickHandler: () => {
          Actions.setDueTodayTodosView();
        },
      },
      'due-this-week-todos-menu-item': {
        id: 'due-this-week-todos-menu-item',
        iconClass: 'fa-calendar-week',
        isActive: false,
        label: 'Due This Week',
        clickHandler: () => {
          Actions.setDueThisWeekTodos();
        },
      },
    };

    switch (activeId) {
      case 'all-todos-menu-item':
      case 'due-today-todos-menu-item':
      case 'due-this-week-todos-menu-item':
        todoFilters[activeId].isActive = true;
        break;
      default:
        break;
    }

    UI.projectFiltersContainer.replaceChildren();
    for (const todoFilter of Object.values(todoFilters)) {
      UI.projectFiltersContainer.appendChild(
        TodoFilterMenuItem(
          todoFilter.id,
          todoFilter.iconClass,
          todoFilter.isActive,
          todoFilter.label,
          todoFilter.clickHandler
        )
      );
    }
  }

  /** Updates the AddTodoForm instance. Replaces the current Add Todo Form if its in the DOM.*/
  static updateAddTodoForm(refreshHandler = null) {
    const addTodoFormToRemove = UI.addTodoFormElem;
    UI.addTodoFormElem = AddTodoForm(
      {
        title: '',
        description: '',
        dueDate: new Date(Date.now() + 86400000),
      },
      refreshHandler
    );
    if (UI.createTodoFormContainer.contains(addTodoFormToRemove)) {
      UI.createTodoFormContainer.removeChild(addTodoFormToRemove);
      UI.createTodoFormContainer.appendChild(UI.addTodoFormElem);
    }
  }
  /* END PUBLIC METHODS */
}
