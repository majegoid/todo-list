import { Todo } from './modules/todo';
import './styles/index.css';

let todo = new Todo(
  'some title',
  'some description',
  true,
  new Date('2023-01-07T21:00:00')
);

console.log(todo);
