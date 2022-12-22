import './global.scss';
import './components/slider.scss';
import '../node_modules/normalize.css/normalize.css';
import 'bootstrap';
import { fillSort } from './filters/fill-n-sort';
import { createFilters } from './components/create-filters';
/*import { productDetail } from './components/product-detail';*/
fillSort();
createFilters();
/*productDetail(1);*/
