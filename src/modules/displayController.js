import { addTodoClickDiv } from '../factories/elements/addTodoClickDiv';
import { createTodo } from '../factories/elements/createTodo';
import { createTodoForm } from '../factories/elements/createTodoForm';

export const displayController = (function () {
  // containers
  const todosContainer = document.querySelector('.todos-container');
  const createTodoFormContainer = document.querySelector('.form-container');

  // instantiated elements
  const addTodoForm = createTodoForm();
  const addTodoClickDivElem = addTodoClickDiv();

  // appends
  createTodoFormContainer.appendChild(addTodoForm);

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
    setCreateTodoFormDisplay,
  };
})();
