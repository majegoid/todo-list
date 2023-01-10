import { Storage } from './classes/static/Storage';
import { UI } from './classes/static/UI';
import './styles/index.css';

if (localStorage.length === 0) {
  Storage.seedData();
}

Storage.loadProjects();

Storage.currentProject = Storage.projectList[0];

UI.setup();
// projects
UI.setProjectMenuItems(Storage.projectList);
UI.setAddProjectFormDisplay(false);
// todos
UI.setProject(Storage.currentProject);
UI.setCreateTodoFormDisplay(false);

UI.setProjectOptionsDisplay(false);
// UI.setProjectOptionsDisplay(true, 100, 100);
