import { createTodoFormElem } from './elements/createTodoFormElem';
import { createTodoElem } from './elements/todoElem';

export const displayController = (function () {
  // containers
  const todosContainer = document.querySelector('.todos-container');
  const createTodoFormContainer = document.querySelector('.form-container');

  // instantiated elements
  const createTodoForm = createTodoFormElem();

  // appends
  createTodoFormContainer.appendChild(createTodoForm);

  function setTodos(todos = []) {
    todosContainer.replaceChildren();
    for (const todo of todos) {
      todosContainer.appendChild(createTodoElem(todo));
    }
  }

  function setCreateTodoFormDisplay(isShown = true) {
    if (isShown) {
      createTodoForm.classList.remove('hidden');
    } else {
      createTodoForm.classList.add('hidden');
    }
  }

  return {
    setTodos,
    setCreateTodoFormDisplay,
  };
})();
