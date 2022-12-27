import { CARDS } from '../components/cards/cards';
import { fill } from '../components/fill';
import { react } from '../components/react-on-changes';
import { sortFilter } from './sort-filter';
import { valueFilter } from './value-filters';
import { updateQuantity } from '../components/update-brand-cat-quantity';
import { updateSlider } from '../components/update-slider';
export function fillSort() {
    const PARAMS = new URLSearchParams(location.search);
    const FOUND = document.querySelector('.main__found-span') as HTMLSpanElement;
    const SELECT = document.querySelector('.form-select') as HTMLSelectElement;
    const SEARCH = document.querySelector('.main__search') as HTMLInputElement;
    const CART = document.querySelector('.header__cart-quantity') as HTMLSpanElement;
    if (PARAMS.get('search')) SEARCH.value = PARAMS.get('search') as string;
    if (!localStorage.cards) localStorage.cards = JSON.stringify(CARDS);
    if (!localStorage.basket) localStorage.basket = `[]`;
    if (!JSON.parse(localStorage.basket).length) CART.innerHTML = '';
    if (JSON.parse(localStorage.basket)) CART.innerHTML = `${JSON.parse(localStorage.basket).length}`;
    valueFilter();
    if (location.search.includes('select')) {
        SELECT.firstElementChild?.setAttribute('disabled', '');
        SELECT.firstElementChild?.removeAttribute('selected');
    }
    sortFilter();
    fill(JSON.parse(localStorage.cards));
    updateQuantity();
    updateSlider('price');
    updateSlider('stock');
    react();
    FOUND.innerHTML = JSON.parse(localStorage.cards).length;
}
