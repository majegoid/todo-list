export function TodoFilterMenuItem(
  id,
  iconClass = 'fa-list-check',
  isActive = false,
  label = 'Default Todo Filter',
  clickHandler
) {
  // <div id="${ID}" class="menu-item[ menu-item-active]">
  //   <i class="fa-solid ${iconClass}"></i>${label}
  // </div>

  // CREATE ELEMENTS
  const menuItemDiv = document.createElement('div');
  const icon = document.createElement('i');

  // MODIFY ELEMENTS
  menuItemDiv.id = id;
  menuItemDiv.className = 'menu-item';
  if (isActive) {
    menuItemDiv.classList.add('menu-item-active');
  }

  icon.className = `fa-solid ${iconClass}`;

  // APPEND CHILD ELEMENTS TO PARENT ELEMENTS
  menuItemDiv.appendChild(icon);
  menuItemDiv.appendChild(document.createTextNode(label));

  // ADD EVENT HANDLERS
  menuItemDiv.onclick = clickHandler;

  return menuItemDiv;
}
