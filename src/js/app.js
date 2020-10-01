import Model from './model/model.js';
import View from './view/view.js';
import Controller  from './controller/controller.js';

const App = new Controller(new Model(), new View());
export { App };