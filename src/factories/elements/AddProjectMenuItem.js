import { UI } from '../../classes/static/UI';

/** Creates an AddProjectMenuItem Clickable Div Element and returns it. */
export function AddProjectMenuItem() {
  // RESULT HTML
  // <div class="menu-item">
  //   <i class="fa-solid fa-plus"></i>Add Project
  // </div>;

  // CREATE ELEMENTS
  const menuItemDiv = document.createElement('div');
  const plusIcon = document.createElement('i');

  // MODIFY ELEMENTS
  menuItemDiv.className = 'menu-item';
  menuItemDiv.style = 'justify-content: flex-start; gap: 16px';

  plusIcon.className = 'fa-solid fa-plus clickable';

  // APPEND CHILD ELEMENTS TO PARENT ELEMENTS
  menuItemDiv.appendChild(plusIcon);
  menuItemDiv.appendChild(document.createTextNode('Add Project'));

  // ADD EVENT HANDLERS
  menuItemDiv.onclick = () => {
    UI.setAddProjectFormDisplay(true);
  };

  return menuItemDiv;
}
