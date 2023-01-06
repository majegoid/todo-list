import { addProjectClickDiv } from '../factories/elements/addProjectClickDiv';
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
  const addTodoForm = createTodoForm();
  const addTodoClickDivElem = addTodoClickDiv();

  // appends
  createTodoFormContainer.appendChild(addTodoForm);

  function setProjectMenuItems(projects = []) {
    projectMenuItemsContainer.replaceChildren();
    for (const project of projects) {
      projectMenuItemsContainer.appendChild(projectMenuItem(project));
    }
    projectMenuItemsContainer.appendChild(addProjectClickDiv());
  }

  function setTodos(todos = []) {
    todosContainer.replaceChildren();
    for (const todo of todos) {
      todosContainer.appendChild(createTodo(todo));
    }
    todosContainer.appendChild(addTodoClickDivElem);
  }

  function setCreateTodoFormDisplay(isShown = true) {
    if (isShown) {
      addTodoForm.classList.remove('hidden');
    } else {
      addTodoForm.classList.add('hidden');
    }
  }

  return {
    setTodos,
    setProjectMenuItems,
    setCreateTodoFormDisplay,
  };
})();
