import { Actions } from '../../classes/static/Actions';

/** Creates an AddProjectForm and returns it. */
export function AddProjectForm() {
  // RESULT HTML
  // <div class="menu-item menu-item-form">
  //   <div><i class="fa-solid fa-list-check"></i><input type="text" /></div>
  //   <div>
  //     <button class="button-green">Add</button
  //     ><button class="button-red">Cancel</button>
  //   </div>
  // </div>

  // CREATE ELEMENTS
  const projectFormDiv = document.createElement('div');
  const titleDiv = document.createElement('div');
  const listCheckIcon = document.createElement('i');
  const titleInput = document.createElement('input');
  const buttonsDiv = document.createElement('div');
  const addButton = document.createElement('button');
  const cancelButton = document.createElement('button');

  // MODIFY ELEMENTS
  projectFormDiv.className = 'menu-item menu-item-form';

  listCheckIcon.className = 'fa-solid fa-list-check';

  titleInput.type = 'text';

  addButton.className = 'button-green';
  addButton.textContent = 'Add';

  cancelButton.className = 'button-red';
  cancelButton.textContent = 'Cancel';

  // APPEND CHILD ELEMENTS TO PARENT ELEMENTS
  projectFormDiv.appendChild(titleDiv);
  projectFormDiv.appendChild(buttonsDiv);

  titleDiv.appendChild(listCheckIcon);
  titleDiv.appendChild(titleInput);

  buttonsDiv.appendChild(addButton);
  buttonsDiv.appendChild(cancelButton);

  // ADD EVENT HANDLERS
  addButton.onclick = () => {
    Actions.addProject(titleInput.value);
    titleInput.value = '';
  };

  cancelButton.onclick = () => {
    Actions.closeAddProjectForm();
    titleInput.value = '';
  };

  return projectFormDiv;
}
