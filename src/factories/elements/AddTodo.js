import { Actions } from '../../classes/static/Actions';

/** Creates an AddTodo Clickable Div Element and returns it. */
export function AddTodo() {
  // RESULT HTML
  // <div class="menu-item" style="justify-content: flex-start; gap: 16px">
  //   <i class="fa-solid fa-plus clickable"></i>Add Todo
  // </div>

  // CREATE ELEMENTS
  const menuItemDiv = document.createElement('div');
  const plusIcon = document.createElement('i');

  // MODIFY ELEMENTS
  menuItemDiv.className = 'menu-item';
  menuItemDiv.style = 'justify-content: flex-start; gap: 16px';

  plusIcon.className = 'fa-solid fa-plus clickable';

  // APPEND CHILD ELEMENTS TO PARENT ELEMENTS
  menuItemDiv.appendChild(plusIcon);
  menuItemDiv.appendChild(document.createTextNode('Add Todo'));

  // ADD EVENT HANDLERS
  menuItemDiv.onclick = () => Actions.openAddTodoForm();

  return menuItemDiv;
}
