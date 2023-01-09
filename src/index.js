import { Project } from './classes/Project';
import { Todo } from './classes/Todo';
import { displayController } from './modules/displayController';
import './styles/index.css';

const todo1 = new Todo(
  'Todo #1',
  'Description',
  true,
  new Date('2023-01-07T21:00:00')
);
const todo2 = new Todo(
  'Todo #2',
  'Description',
  true,
  new Date('2023-01-07T21:00:00')
);
const todo3 = new Todo(
  'Todo #3',
  'Description',
  true,
  new Date('2023-01-07T21:00:00')
);

const projects = [
  new Project('Project #1', [todo1, todo2, todo3]),
  new Project('Project #2', [todo1, todo2, todo3]),
  new Project('Project #3', [todo1, todo2, todo3]),
];

let displayedProject = projects[0];

// projects
displayController.setProjectMenuItems(projects);
displayController.setAddProjectFormDisplay(false);
// todos
displayController.setTodos(displayedProject.todos);
displayController.setCreateTodoFormDisplay(false);

displayController.setProjectOptionsDisplay(false);
// displayController.setProjectOptionsDisplay(true, 100, 100);
