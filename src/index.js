import { Todo } from './classes/todo';
import { displayController } from './modules/displayController';
import './styles/index.css';

const todo = new Todo(
  'some title',
  'some description',
  true,
  new Date('2023-01-07T21:00:00')
);

const projects = [
  { title: 'Project #1', todos: [todo, todo, todo] },
  { title: 'Project #2', todos: [todo, todo, todo] },
  { title: 'Project #3', todos: [todo, todo, todo] },
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
