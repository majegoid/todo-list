import { Todo } from './modules/todo';
import './styles/index.css';

const projectArr = [];

let todo = new Todo(
  'some title',
  'some description',
  true,
  new Date('2023-01-07T21:00:00')
);

projectArr.push(todo);

console.log(todo);
