import { addProjectClickDiv } from '../factories/elements/addProjectClickDiv';
import { addProjectForm } from '../factories/elements/addProjectForm';
import { addTodoClickDiv } from '../factories/elements/addTodoClickDiv';
import { createTodo } from '../factories/elements/createTodo';
import { createTodoForm } from '../factories/elements/createTodoForm';
import { projectMenuItem } from '../factories/elements/projectMenuItem';

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
  const addTodoFormElem = createTodoForm();
  const addTodoClickDivElem = addTodoClickDiv();

  const addProjectFormElem = addProjectForm();
  const addProjectClickDivElem = addProjectClickDiv();

  function setProjectMenuItems(projects = []) {
    projectMenuItemsContainer.replaceChildren();
    for (const project of projects) {
      projectMenuItemsContainer.appendChild(projectMenuItem(project));
    }
    projectMenuItemsContainer.appendChild(addProjectClickDivElem);
  }

  function setTodos(todos = []) {
    todosContainer.replaceChildren();
    for (const todo of todos) {
      todosContainer.appendChild(createTodo(todo));
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

  return {
    setTodos,
    setProjectMenuItems,
    setCreateTodoFormDisplay,
    setAddProjectFormDisplay,
  };
})();
