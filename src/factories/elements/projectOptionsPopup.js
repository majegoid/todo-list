export function projectOptionsPopup(xPos = 0, yPos = 0) {
  if (
    typeof xPos !== 'number' ||
    Number.isNaN(xPos) ||
    typeof yPos !== 'number' ||
    Number.isNaN(yPos)
  ) {
    return;
  }

  // <div class="menu-item-options-popup">
  //   <button class="button-green">Rename</button>
  //   <button class="button-red">Delete</button>
  // </div>

  const projectOptionsPopup = document.createElement('div');
  const renameButton = document.createElement('button');
  const deleteButton = document.createElement('button');

  projectOptionsPopup.className = 'menu-item-options-popup';
  renameButton.className = 'button-green';
  renameButton.textContent = 'Rename';
  deleteButton.className = 'button-red';
  deleteButton.textContent = 'Delete';

  projectOptionsPopup.appendChild(renameButton);
  projectOptionsPopup.appendChild(deleteButton);

  projectOptionsPopup.style.position = 'absolute';
  projectOptionsPopup.style.top = `${yPos}px`;
  projectOptionsPopup.style.left = `${xPos}px`;

  return projectOptionsPopup;
}
