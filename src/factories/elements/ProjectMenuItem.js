import { Actions } from '../../classes/static/Actions';

/** Creates a ProjectMenuItem and returns it. */
export function ProjectMenuItem(project, isDeletable = true) {
  // RESULT HTML
  // <div class="menu-item">
  //   <i class="fa-solid fa-list-check"></i>Your Project #1
  //   <div>
  //     <i class="fa-solid fa-trash clickable"></i>
  //   </div>
  // </div>

  // CREATE ELEMENTS
  const projectMenuItemDiv = document.createElement('div');
  const listCheckIcon = document.createElement('i');
  const projectMenuItemDivText = document.createTextNode(
    project.title || 'Unnamed Project'
  );
  const trashIconContainer = document.createElement('div');

  // MODIFY ELEMENTS
  projectMenuItemDiv.className = 'menu-item';

  listCheckIcon.className = 'fa-solid fa-list-check';

  // APPEND CHILD ELEMENTS TO PARENT ELEMENTS
  projectMenuItemDiv.appendChild(listCheckIcon);
  projectMenuItemDiv.appendChild(projectMenuItemDivText);
  projectMenuItemDiv.appendChild(trashIconContainer);

  // ADD EVENT HANDLERS
  projectMenuItemDiv.onclick = () => Actions.makeProjectActive(project);

  // CONDITIONAL CHILD ELEMENTS
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
