export function createTodoElem(
  title,
  description,
  dueDate = new Date(Date.now())
) {
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
  //   <div><i class="fa-solid fa-ellipsis-vertical clickable"></i></div>
  // </div>
  const todo = document.createElement('div');
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
  const ellipsisVIconContainer = document.createElement('div');
  const ellipsisVIcon = document.createElement('i');

  todo.appendChild(checkedCheckboxIconContainer);
  todo.appendChild(infoContainer);
  todo.appendChild(dueDateContainer);
  todo.appendChild(starIconContainer);
  todo.appendChild(ellipsisVIconContainer);

  todo.className = 'todo';
  checkedCheckboxIcon.className = 'fa-solid fa-square-check clickable';
  titleElem.textContent = title;
  descriptionElem.textContent = description;
  dueDateLabel.textContent = 'Due Date:';
  dueDateElem.textContent = dueDate;
  starIcon.className = 'fa-solid fa-star clickable';
  ellipsisVIcon.className = 'fa-solid fa-ellipsis-vertical clickable';

  checkedCheckboxIconContainer.appendChild(checkedCheckboxIcon);

  infoContainer.appendChild(titleElem);
  infoContainer.appendChild(descriptionElem);

  dueDateContainer.appendChild(dueDateLabel);
  dueDateContainer.appendChild(dueDateElem);

  starIconContainer.appendChild(starIcon);

  ellipsisVIconContainer.appendChild(ellipsisVIcon);

  return todo;
}
