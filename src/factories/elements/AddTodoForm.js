import { parse } from 'date-fns';
import { Todo } from '../../classes/data/Todo';
import { Actions } from '../../classes/static/Actions';
import { Persistence } from '../../classes/static/Persistence';
import { UI } from '../../classes/static/UI';

/** Creates an AddTodoForm and returns it. */
export function AddTodoForm(
  initialState = {
    title: '',
    description: '',
    dueDate: new Date(Date.now() + 86400000),
  }
) {
  // RESULT HTML
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

  // CREATE ELEMENTS
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
  const dueDateInput = document.createElement('input');
  const buttonsDiv = document.createElement('div');
  const addButton = document.createElement('button');
  const cancelButton = document.createElement('button');

  // MODIFY ELEMENTS
  formTitleH2.textContent = 'Create Todo';
  titleLabel.for = 'title';
  titleLabel.textContent = 'Title:';

  titleInput.type = 'text';
  titleInput.id = 'title';
  titleInput.name = 'title';
  titleInput.placeholder = 'Task Title';
  titleInput.value = initialState.title;

  descriptionLabel.for = 'description';
  descriptionLabel.textContent = 'Description:';

  descriptionInput.type = 'text';
  descriptionInput.id = 'description';
  descriptionInput.name = 'description';
  descriptionInput.placeholder = 'Task Description';
  descriptionInput.value = initialState.description;

  dateDueLabel.for = 'date-due';
  dateDueLabel.textContent = 'Due Date:';

  dueDateInput.type = 'date';
  dueDateInput.id = 'date-due';
  dueDateInput.name = 'date-due';
  dueDateInput.placeholder = 'mm/dd/yyyy';
  dueDateInput.value = initialState.dueDate;

  addButton.className = 'button-green';
  addButton.textContent = 'Add';
  addButton.type = 'submit';

  cancelButton.className = 'button-red';
  cancelButton.textContent = 'Cancel';

  formElem.novalidate = true;

  // APPEND CHILD ELEMENTS TO PARENT ELEMENTS
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
  dateDueDiv.appendChild(dueDateInput);

  buttonsDiv.appendChild(addButton);
  buttonsDiv.appendChild(cancelButton);

  // FUNCTIONS
  function isFormDataValid() {
    if (titleInput.value === '') {
      return false;
    }
    if (descriptionInput.value === '') {
      return false;
    }
    if (
      dueDateInput.value === '' ||
      dueDateInput.value === undefined ||
      dueDateInput.value === null
    ) {
      return false;
    }
    return true;
  }

  function submitForm(e) {
    e.preventDefault();
    if (isFormDataValid()) {
      const todo = new Todo(
        titleInput.value,
        descriptionInput.value,
        false,
        false,
        parse(dueDateInput.value, 'yyyy-MM-dd', new Date())
      );
      Actions.addTodoToCurrentProject(todo);
      Actions.closeAddTodoForm();
      UI.setProject(Persistence.currentProject);
    }
  }

  // ADD EVENT HANDLERS
  formElem.onsubmit = submitForm;
  cancelButton.onclick = Actions.closeAddTodoForm;

  return formElem;
}
