export function projectMenuItem(project) {
  // <div class="menu-item">
  //   <i class="fa-solid fa-list-check"></i>Your Project #1
  //   <i class="fa-solid fa-ellipsis-vertical"></i>
  // </div>

  const projectMenuItemDiv = document.createElement('div');
  const listCheckIcon = document.createElement('i');
  const projectMenuItemDivText = document.createTextNode(
    project.title || 'Unnamed Project'
  );
  const ellipsisVIcon = document.createElement('i');

  projectMenuItemDiv.className = 'menu-item';
  listCheckIcon.className = 'fa-solid fa-list-check';
  ellipsisVIcon.className = 'fa-solid fa-ellipsis-vertical';

  projectMenuItemDiv.appendChild(listCheckIcon);
  projectMenuItemDiv.appendChild(projectMenuItemDivText);
  projectMenuItemDiv.appendChild(ellipsisVIcon);

  return projectMenuItemDiv;
}
