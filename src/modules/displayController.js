import { Project } from '../classes/Project';
import { AddProjectForm } from '../factories/elements/AddProjectForm';
import { AddProjectMenuItem } from '../factories/elements/AddProjectMenuItem';
import { AddTodo } from '../factories/elements/AddTodo';
import { AddTodoForm } from '../factories/elements/AddTodoForm';
import { ProjectMenuItem } from '../factories/elements/ProjectMenuItem';
import { ProjectOptionsPopup } from '../factories/elements/ProjectOptionsPopup';
import { TodoListItem } from '../factories/elements/TodoListItem';

export const displayController = (function () {
  // containers
  const todosContainer = document.querySelector('#todos-container');
  const createTodoFormContainer = document.querySelector(
    '#create-todo-form-container'
  );
  const projectMenuItemsContainer = document.querySelector(
    '#project-menu-items-container'
  );

  // instantiated elements
  const addTodoFormElem = AddTodoForm();
  const addTodoClickDivElem = AddTodo();

  const addProjectFormElem = AddProjectForm(
    function (projectTitle) {
      if (projectTitle !== '') {
        // creates and adds a new project to localStorage
        const newProject = new Project(projectTitle, []);
        localStorage.setItem(newProject.title, newProject.todoList);
        if (newProject.todoList.length === 0) {
          localStorage.setItem(newProject.title, '[]');
        }
      }
      setAddProjectFormDisplay(false);
    },
    function () {
      // closes the AddProjectForm
      setAddProjectFormDisplay(false);
    }
  );

  const addProjectClickDivElem = AddProjectMenuItem(function () {
    setAddProjectFormDisplay(true);
  });

  // popup
  const popup = ProjectOptionsPopup(0, 0);
  const body = document.querySelector('body');
  body.appendChild(popup);

  // document click listener
  document.onclick = function (e) {
    let targetEl = e.target; // the clicked element

    do {
      if (
        targetEl === addProjectClickDivElem ||
        targetEl === addProjectFormElem
      ) {
        return;
      }
      // go up one element from the target.
      targetEl = targetEl.parentNode;
    } while (targetEl);

    // if no element in the hierarchy from the clicked element was clicked:
    setAddProjectFormDisplay(false);
  };

  function setProjectMenuItems(projects = []) {
    projectMenuItemsContainer.replaceChildren();
    for (const project of projects) {
      projectMenuItemsContainer.appendChild(ProjectMenuItem(project));
    }
    projectMenuItemsContainer.appendChild(addProjectClickDivElem);
  }

  function setTodos(todos = []) {
    todosContainer.replaceChildren();
    for (const todo of todos) {
      todosContainer.appendChild(TodoListItem(todo));
    }
    todosContainer.appendChild(addTodoClickDivElem);
  }

  function setCreateTodoFormDisplay(isShown = true) {
    // show
    if (isShown && todosContainer.contains(addTodoClickDivElem)) {
      todosContainer.removeChild(addTodoClickDivElem);
    }
    if (isShown) {
      createTodoFormContainer.appendChild(addTodoFormElem);
    }
    // hide
    if (!isShown && createTodoFormContainer.contains(addTodoFormElem)) {
      createTodoFormContainer.removeChild(addTodoFormElem);
    }
    if (!isShown) {
      todosContainer.appendChild(addTodoClickDivElem);
    }
  }

  function setAddProjectFormDisplay(isShown = true) {
    // show
    if (isShown && projectMenuItemsContainer.contains(addProjectClickDivElem)) {
      projectMenuItemsContainer.removeChild(addProjectClickDivElem);
    }
    if (isShown) {
      projectMenuItemsContainer.appendChild(addProjectFormElem);
    }
    // hide
    if (!isShown && projectMenuItemsContainer.contains(addProjectFormElem)) {
      projectMenuItemsContainer.removeChild(addProjectFormElem);
    }
    if (!isShown) {
      projectMenuItemsContainer.appendChild(addProjectClickDivElem);
    }
  }

  function setProjectOptionsDisplay(isShown = true, xPos = 0, yPos = 0) {
    if (isShown) {
      popup.style.display = 'flex';
      popup.style.top = `${yPos}px`;
      popup.style.left = `${xPos}px`;
    }
    if (!isShown) {
      popup.style.display = 'none';
    }
  }

  return {
    setTodos,
    setProjectMenuItems,
    setCreateTodoFormDisplay,
    setAddProjectFormDisplay,
    setProjectOptionsDisplay,
  };
})();
