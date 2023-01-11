/** Creates a ProjectOptionsPopup and returns it. */
export function ProjectOptionsPopup(xPos = 0, yPos = 0) {
  // Does nothing if xPos and yPos aren't both numbers that are not NaN.
  if (
    typeof xPos !== 'number' ||
    Number.isNaN(xPos) ||
    typeof yPos !== 'number' ||
    Number.isNaN(yPos)
  ) {
    return;
  }

  // RESULT HTML
  // <div class="menu-item-options-popup">
  //   <button class="button-green">Rename</button>
  //   <button class="button-red">Delete</button>
  // </div>

  // CREATE ELEMENTS
  const projectOptionsPopup = document.createElement('div');
  const renameButton = document.createElement('button');
  const deleteButton = document.createElement('button');

  // MODIFY ELEMENTS
  projectOptionsPopup.className = 'menu-item-options-popup';
  projectOptionsPopup.style.position = 'absolute';
  projectOptionsPopup.style.top = `${yPos}px`;
  projectOptionsPopup.style.left = `${xPos}px`;

  renameButton.className = 'button-green';
  renameButton.textContent = 'Rename';

  deleteButton.className = 'button-red';
  deleteButton.textContent = 'Delete';

  // APPEND CHILD ELEMENTS TO PARENT ELEMENTS
  projectOptionsPopup.appendChild(renameButton);
  projectOptionsPopup.appendChild(deleteButton);

  return projectOptionsPopup;
}
