import { Actions } from '../../classes/static/Actions';

export function ProjectMenuItem(project, isDeletable = true) {
  // <div class="menu-item">
  //   <i class="fa-solid fa-list-check"></i>Your Project #1
  //   <div>
  //     <i class="fa-solid fa-trash clickable"></i>
  //   </div>
  // </div>

  const projectMenuItemDiv = document.createElement('div');
  const listCheckIcon = document.createElement('i');
  const projectMenuItemDivText = document.createTextNode(
    project.title || 'Unnamed Project'
  );
  const trashIconContainer = document.createElement('div');

  projectMenuItemDiv.className = 'menu-item';
  listCheckIcon.className = 'fa-solid fa-list-check';

  projectMenuItemDiv.appendChild(listCheckIcon);
  projectMenuItemDiv.appendChild(projectMenuItemDivText);
  projectMenuItemDiv.appendChild(trashIconContainer);

  projectMenuItemDiv.onclick = () => Actions.makeProjectActive(project);

  if (isDeletable) {
    const trashIcon = document.createElement('i');
    trashIcon.className = 'fa-solid fa-trash clickable';
    trashIconContainer.appendChild(trashIcon);
    trashIcon.onclick = (e) => {
      Actions.removeProject(project);
      e.stopPropagation();
    };
  }

  return projectMenuItemDiv;
}
