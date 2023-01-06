export function addTodoClickDiv() {
  // <div class="menu-item" style="justify-content: flex-start; gap: 16px">
  //   <i class="fa-solid fa-plus clickable"></i>Add Todo
  // </div>

  const menuItemDiv = document.createElement('div');
  const plusIcon = document.createElement('i');

  menuItemDiv.className = 'menu-item';
  menuItemDiv.style = 'justify-content: flex-start; gap: 16px';
  plusIcon.className = 'fa-solid fa-plus clickable';
  menuItemDiv.textContent = 'Add Todo';

  menuItemDiv.appendChild(plusIcon);

  return menuItemDiv;
}
