import { Storage } from './classes/static/Storage';
import { UI } from './classes/static/UI';
import './styles/index.css';

if (localStorage.length === 0) {
  Storage.seedData();
}

Storage.loadProjects();
Storage.currentProject = Storage.projectList[0];

UI.setup();
