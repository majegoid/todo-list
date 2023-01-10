import { Storage } from './classes/Storage';
import { displayController } from './modules/displayController';
import './styles/index.css';

if (localStorage.length === 0) {
  Storage.seedData();
}

Storage.loadProjects();

Storage.currentProject = Storage.projectList[0];

// projects
displayController.setProjectMenuItems(Storage.projectList);
displayController.setAddProjectFormDisplay(false);
// todos
displayController.setTodos(Storage.currentProject.todoList);
displayController.setCreateTodoFormDisplay(false);

displayController.setProjectOptionsDisplay(false);
// displayController.setProjectOptionsDisplay(true, 100, 100);
