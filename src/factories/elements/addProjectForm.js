export function AddProjectForm() {
  // <div class="menu-item menu-item-form">
  //   <div><i class="fa-solid fa-list-check"></i><input type="text" /></div>
  //   <div>
  //     <button class="button-green">Add</button
  //     ><button class="button-red">Cancel</button>
  //   </div>
  // </div>

  const projectFormDiv = document.createElement('div');
  const titleDiv = document.createElement('div');
  const listCheckIcon = document.createElement('i');
  const titleInput = document.createElement('input');
  const buttonsDiv = document.createElement('div');
  const addButton = document.createElement('button');
  const cancelButton = document.createElement('button');

  projectFormDiv.className = 'menu-item menu-item-form';
  listCheckIcon.className = 'fa-solid fa-list-check';
  titleInput.type = 'text';
  addButton.className = 'button-green';
  addButton.textContent = 'Add';
  cancelButton.className = 'button-red';
  cancelButton.textContent = 'Cancel';

  projectFormDiv.appendChild(titleDiv);
  projectFormDiv.appendChild(buttonsDiv);

  titleDiv.appendChild(listCheckIcon);
  titleDiv.appendChild(titleInput);

  buttonsDiv.appendChild(addButton);
  buttonsDiv.appendChild(cancelButton);

  return projectFormDiv;
}
