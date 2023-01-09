export function AddProjectMenuItem(clickHandler) {
  // <div class="menu-item">
  //   <i class="fa-solid fa-plus"></i>Add Project
  // </div>;
  const menuItemDiv = document.createElement('div');
  const plusIcon = document.createElement('i');

  menuItemDiv.className = 'menu-item';
  menuItemDiv.style = 'justify-content: flex-start; gap: 16px';
  plusIcon.className = 'fa-solid fa-plus clickable';

  menuItemDiv.appendChild(plusIcon);
  menuItemDiv.appendChild(document.createTextNode('Add Project'));

  menuItemDiv.onclick = clickHandler;

  return menuItemDiv;
}
