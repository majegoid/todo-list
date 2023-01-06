export function AddTodo() {
  // <div class="menu-item" style="justify-content: flex-start; gap: 16px">
  //   <i class="fa-solid fa-plus clickable"></i>Add Todo
  // </div>

  const menuItemDiv = document.createElement('div');
  const plusIcon = document.createElement('i');

  menuItemDiv.className = 'menu-item';
  menuItemDiv.style = 'justify-content: flex-start; gap: 16px';
  plusIcon.className = 'fa-solid fa-plus clickable';

  menuItemDiv.appendChild(plusIcon);
  menuItemDiv.appendChild(document.createTextNode('Add Todo'));

  return menuItemDiv;
}
