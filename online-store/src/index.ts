import './global.scss';
import '../node_modules/normalize.css/normalize.css';
import 'bootstrap';
import { fillSort } from './filters/fill-n-sort';

import App from './pages/app';

const app = new App();
app.run();

//fillSort();
