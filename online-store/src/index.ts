import './global.scss';
import '../node_modules/normalize.css/normalize.css';
import 'bootstrap';
import { react } from './components/react-on-changes';
import { fillSort } from './filters/fill-n-sort';
import { productDetail } from './components/product-detail';

react();
fillSort();
productDetail(1);
