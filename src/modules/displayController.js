import { createTodoElem } from './elements/todoElem';

export const displayController = (function () {
  function replaceChildrenWithTodos(target, todos = []) {
    target.replaceChildren();
    for (const todo of todos) {
      target.appendChild(createTodoElem(todo));
    }
  }

  return { replaceChildrenWithTodos };
})();
