import { fillSort } from '../filters/fill-n-sort';
import { createFilters } from './create-filters';
import { createMainContainer } from './create-main-container';
export class MAIN_PAGE {
    createMainContainer = () => {
        createMainContainer();
        return this;
    };
    fillSort = () => {
        fillSort();
        return this;
    };
    createFilters = () => {
        createFilters();
        return this;
    };
}
