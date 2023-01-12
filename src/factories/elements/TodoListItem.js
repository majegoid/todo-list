import { Actions } from '../../classes/static/Actions';

/** Creates a TodoListItem and returns it. */
export function TodoListItem(
  todo,
  checkboxHandler = () => {
    Actions.toggleTodoIsCompleted(todo, Actions.setAllTodosView);
  },
  deleteHandler = () => {
    Actions.removeTodoFromProject(todo, Actions.setAllTodosView);
  }
) {
  // RESULT HTML
  // <div class="todo">
  //   <div><i class="fa-solid fa-square-check clickable"></i></div>
  //   <div>
  //     <h4>Todo Title</h4>
  //     <p>
  //       Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis
  //       ullam voluptas voluptates cumque dolore animi tempora quas
  //       molestias voluptatibus in!
  //     </p>
  //   </div>
  //   <div>
  //     <h4>Due Date:</h4>
  //     <div>yyyy-mm-dd</div>
  //   </div>
  //   <div><i class="fa-solid fa-star clickable"></i></div>
  //   <div><i class="fa-solid fa-trash clickable"></i></div>
  // </div>

  if (!todo) return;

  // CREATE ELEMENTS
  const todoElem = document.createElement('div');
  const checkedCheckboxIconContainer = document.createElement('div');
  const checkedCheckboxIcon = document.createElement('i');
  const infoContainer = document.createElement('div');
  const titleElem = document.createElement('h4');
  const descriptionElem = document.createElement('p');
  const dueDateContainer = document.createElement('div');
  const dueDateLabel = document.createElement('h4');
  const dueDateElem = document.createElement('div');
  const starIconContainer = document.createElement('div');
  const starIcon = document.createElement('i');
  const trashIconContainer = document.createElement('div');
  const trashIcon = document.createElement('i');

  // MODIFY ELEMENTS
  todoElem.className = 'todo';

  checkedCheckboxIcon.className = 'fa-regular fa-square-check clickable';

  if (!todo.isCompleted) {
    checkedCheckboxIcon.classList.remove('fa-square-check');
    checkedCheckboxIcon.classList.add('fa-square');
  }

  titleElem.textContent = todo.title;

  descriptionElem.textContent = todo.description;

  dueDateLabel.textContent = 'Due Date:';

  dueDateElem.textContent = todo.dueDate;

  starIcon.className = 'fa-solid fa-star clickable';

  if (!todo.isStarred) {
    starIcon.classList.remove('fa-solid');
    starIcon.classList.add('fa-regular');
  }

  trashIcon.className = 'fa-solid fa-trash clickable';

  // APPEND CHILD ELEMENTS TO PARENT ELEMENTS
  todoElem.appendChild(checkedCheckboxIconContainer);
  todoElem.appendChild(infoContainer);
  todoElem.appendChild(dueDateContainer);
  todoElem.appendChild(starIconContainer);
  todoElem.appendChild(trashIconContainer);

  if (todo.project !== null) {
    checkedCheckboxIconContainer.appendChild(checkedCheckboxIcon);
  }

  infoContainer.appendChild(titleElem);
  infoContainer.appendChild(descriptionElem);

  dueDateContainer.appendChild(dueDateLabel);
  dueDateContainer.appendChild(dueDateElem);

  starIconContainer.appendChild(starIcon);

  if (todo.project !== null) {
    trashIconContainer.appendChild(trashIcon);
  }

  // ADD EVENT HANDLERS
  if (todo.project !== null) {
    checkedCheckboxIconContainer.onclick = checkboxHandler;

    trashIconContainer.onclick = deleteHandler;
  }

  return todoElem;
}
