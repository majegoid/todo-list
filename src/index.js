import { Todo } from './classes/todo';
import { displayController } from './modules/displayController';
import './styles/index.css';

const todo = new Todo(
  'some title',
  'some description',
  true,
  new Date('2023-01-07T21:00:00')
);

const projects = [[todo, todo, todo]];
let displayedProject = projects[0];

displayController.setTodos(displayedProject);
displayController.setCreateTodoFormDisplay(false);
