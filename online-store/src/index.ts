import './global.scss';
import '../node_modules/normalize.css/normalize.css';
import 'bootstrap';
import { CARDS } from './components/cards/cards';
import { fill } from './components/fill';
import { route } from './router';
fill(CARDS);
route();
