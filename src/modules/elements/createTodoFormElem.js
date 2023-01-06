export function createTodoFormElem(
  currentState = {
    title: '',
    description: '',
    date: new Date(Date.now() + 86400000),
  }
) {
  // <form novalidate onsubmit="event.preventDefault();">
  //   <h2>Create Todo</h2>
  //   <div>
  //     <label for="title">Title:</label>
  //     <input
  //       type="text"
  //       id="title"
  //       name="title"
  //       placeholder="Task Title"
  //     />
  //   </div>
  //   <div>
  //     <label for="description">Description:</label>
  //     <input
  //       type="text"
  //       id="description"
  //       name="description"
  //       placeholder="Task Description"
  //     />
  //   </div>
  //   <div>
  //     <label for="date">Date:</label>
  //     <input type="date" id="date" name="date" placeholder="mm/dd/yyyy" />
  //   </div>
  //   <div>
  //     <button class="button-green">Add</button>
  //     <button class="button-red">Cancel</button>
  //   </div>
  // </form>

  const formElem = document.createElement('form');
  const formTitleH2 = document.createElement('h2');
  const titleDiv = document.createElement('div');
  const titleLabel = document.createElement('label');
  const titleInput = document.createElement('input');
  const descriptionDiv = document.createElement('div');
  const descriptionLabel = document.createElement('label');
  const descriptionInput = document.createElement('input');
  const dateDueDiv = document.createElement('div');
  const dateDueLabel = document.createElement('label');
  const dateDueInput = document.createElement('input');
  const buttonsDiv = document.createElement('div');
  const addButton = document.createElement('button');
  const cancelButton = document.createElement('button');

  formElem.novalidate = true;
  formElem.onsubmit = 'event.preventDefault();';

  formTitleH2.textContent = 'Create Todo';

  titleLabel.for = 'title';
  titleLabel.textContent = 'Title:';
  titleInput.type = 'text';
  titleInput.id = 'title';
  titleInput.name = 'title';
  titleInput.placeholder = 'Task Title';

  descriptionLabel.for = 'description';
  descriptionLabel.textContent = 'Description:';
  descriptionInput.type = 'text';
  descriptionInput.id = 'description';
  descriptionInput.name = 'description';
  descriptionInput.placeholder = 'Task Description';

  dateDueLabel.for = 'date-due';
  dateDueLabel.textContent = 'Due Date:';
  dateDueInput.type = 'date';
  dateDueInput.id = 'date-due';
  dateDueInput.name = 'date-due';
  dateDueInput.placeholder = 'mm/dd/yyyy';

  addButton.className = 'button-green';
  addButton.textContent = 'Add';
  cancelButton.className = 'button-red';
  cancelButton.textContent = 'Cancel';

  formElem.appendChild(formTitleH2);
  formElem.appendChild(titleDiv);
  formElem.appendChild(descriptionDiv);
  formElem.appendChild(dateDueDiv);
  formElem.appendChild(buttonsDiv);

  titleDiv.appendChild(titleLabel);
  titleDiv.appendChild(titleInput);

  descriptionDiv.appendChild(descriptionLabel);
  descriptionDiv.appendChild(descriptionInput);

  dateDueDiv.appendChild(dateDueLabel);
  dateDueDiv.appendChild(dateDueInput);

  buttonsDiv.appendChild(addButton);
  buttonsDiv.appendChild(cancelButton);

  return formElem;
}
