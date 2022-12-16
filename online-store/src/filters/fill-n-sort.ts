import { CARDS } from '../components/cards/cards';
import { fill } from '../components/fill';
import { sortFilter } from './sort-filter';
import { valueFilter } from './value-filters';
export function fillSort() {
    const PARAMS = new URLSearchParams(location.search);
    const FOUND = document.querySelector('.main__found-span') as HTMLSpanElement;
    const SELECT = document.querySelector('.form-select') as HTMLSelectElement;
    const SEARCH = document.querySelector('.main__search') as HTMLInputElement;
    if (PARAMS.get('search')) SEARCH.value = PARAMS.get('search') as string;
    if (!localStorage.cards) localStorage.cards = JSON.stringify(CARDS);
    valueFilter();
    if (location.search.includes('select')) {
        SELECT.firstElementChild?.setAttribute('disabled', '');
        SELECT.firstElementChild?.removeAttribute('selected');
    }
    sortFilter();
    fill(JSON.parse(localStorage.cards));
    FOUND.innerHTML = JSON.parse(localStorage.cards).length;
}
