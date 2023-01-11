import { Persistence } from './classes/static/Persistence';
import { UI } from './classes/static/UI';
import './styles/index.css';

if (localStorage.length === 0) {
  Persistence.seedData();
}

Persistence.loadProjects();
Persistence.currentProject = Persistence.projectList[0];

UI.setup();
