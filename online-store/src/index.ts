import './global.scss';
import './components/slider.scss';
import '../node_modules/normalize.css/normalize.css';
import 'bootstrap';
import { MAIN_PAGE } from './components/create-main-page';
const MAIN = new MAIN_PAGE();
MAIN.createMainContainer().fillSort().createFilters();
