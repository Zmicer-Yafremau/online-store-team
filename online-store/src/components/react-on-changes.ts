import { fillSort } from '../filters/fill-n-sort';
/*import { productDetail } from './product-detail';*/
import { changeSize } from './change-size';
import { addToBasket } from './add-to-basket';
import { countSlider } from './count-slider-values';
export function react() {
    const ADD = document.getElementsByClassName('card__drop-button') as HTMLCollectionOf<HTMLButtonElement>;
    const SELECT = document.querySelector('.form-select') as HTMLSelectElement;
    const SEARCH = document.querySelector('.main__search') as HTMLInputElement;
    const MAIN = document.getElementsByClassName('main')[0] as HTMLElement;
    const CART = document.querySelector('.header__cart-quntity') as HTMLSpanElement;
    const PRODUCTS = MAIN.children[2] as HTMLElement;
    const SIZE = (document.getElementsByClassName('size') as unknown) as NodeListOf<HTMLDivElement>;
    const CONTENT = PRODUCTS.children[1] as HTMLDivElement;
    const TOTAL_SUM = document.getElementsByClassName('header__totlat-sum')[0] as HTMLSpanElement;
    const RESET = document.getElementsByClassName('reset')[0] as HTMLButtonElement;
    const COPY = document.getElementsByClassName('copy')[0] as HTMLButtonElement;
    const SWITCH = document.getElementsByClassName('switch')[0] as HTMLDivElement;
    const ASIDE = document.getElementsByClassName('aside')[0];
    const CHANGE_VIEW = () => {
        if (!ASIDE.classList.contains('in')) {
            ASIDE.classList.add('in');
            ASIDE.classList.remove('out');
            SWITCH.innerHTML = 'SHOW FILTERS';
        } else {
            ASIDE.classList.remove('visually-hidden');
            ASIDE.classList.remove('in');
            ASIDE.classList.add('out');
            SWITCH.innerHTML = 'HIDE FILTERS';
        }
    };
    ASIDE.addEventListener('animationend', () => {
        if (ASIDE.classList.contains('in')) ASIDE.classList.add('visually-hidden');
    });
    SWITCH.addEventListener('click', CHANGE_VIEW);
    RESET.addEventListener('click', () => {
        location.href = location.origin;
    });
    const COPY_LINK = () => {
        navigator.clipboard.writeText(location.href);
        COPY.innerHTML = 'COPIED!';
        setTimeout(() => {
            COPY.innerHTML = ' COPY LINK';
        }, 500);
    };
    COPY.addEventListener('click', COPY_LINK);
    const DETAILS = (document.getElementsByClassName(
        'card__details-button'
    ) as unknown) as NodeListOf<HTMLButtonElement>;
    const LARGE = () => {
        changeSize(SIZE, CONTENT, 'large');
    };
    SIZE[0].addEventListener('click', LARGE);
    const SMALL = () => {
        changeSize(SIZE, CONTENT, 'small');
    };
    SIZE[1].addEventListener('click', SMALL);
    const START_SEARCH = () => {
        const url = new URL(window.location.href);
        SEARCH.value ? url.searchParams.set('search', SEARCH.value) : url.searchParams.delete('search');
        history.replaceState(null, '', url);
        removeAllEvents();
        fillSort();
    };
    SEARCH.addEventListener('input', START_SEARCH);
    const START_SELECT = () => {
        const url = new URL(window.location.href);
        url.searchParams.set('select', SELECT.value);
        history.replaceState(null, '', url);
        removeAllEvents();
        fillSort();
    };
    SELECT.addEventListener('change', START_SELECT);
    Array.from(DETAILS).forEach((item) => {
        const GO_DETAILS = () => {
            /*const ID = +item.classList[3].split('-')[1];
            productDetail(ID);
            const NAME = CARDS.find((el) => el.id === ID);
            history.pushState({}, '', `/${item.classList[3].split('-')[1]}/${NAME?.title.split(' ').join('_')}`);
             */
        };
        item.addEventListener('click', GO_DETAILS);
    });
    Array.from(ADD).forEach((button) => {
        const BUTTON_CONTAINER = button.parentElement as HTMLDivElement;
        const CARD = BUTTON_CONTAINER.parentElement as HTMLDivElement;
        const CARD_ID_CLASS = CARD.classList[1];
        const CARD_ID = CARD_ID_CLASS.split('__')[1];
        const ADD_TO_CART = addToBasket(CART, TOTAL_SUM, CARD_ID, button);
        button.addEventListener('click', ADD_TO_CART);
        button.addEventListener('click', () => {
            CARD.classList.toggle('active');
        });
    });
    function sortBy(criteria: string) {
        return (event: Event) => {
            if (event.target instanceof HTMLInputElement) {
                const input = event.target;
                const url = new URL(window.location.href);
                const CURRENT = url.searchParams.get(criteria);
                if (input.checked) {
                    if (!CURRENT?.includes(input.id))
                        url.searchParams.set(criteria, `${CURRENT ? CURRENT : ''}↕${input.id}`);
                } else {
                    const NEW_CURRENT = CURRENT?.split('↕')
                        .filter((el) => el !== input.id)
                        .join('↕');
                    NEW_CURRENT ? url.searchParams.set(criteria, `${NEW_CURRENT}`) : url.searchParams.delete(criteria);
                }
                history.replaceState(null, '', url);
                removeAllEvents();
                fillSort();
            }
        };
    }
    const CATEGORY_CONTAINER = document.getElementsByClassName('checkboxes__category')[0] as HTMLDivElement;
    const SORT_BY_CATEGORY = sortBy('category');
    CATEGORY_CONTAINER.addEventListener('click', SORT_BY_CATEGORY);
    const BRAND_CONTAINER = document.getElementsByClassName('checkboxes__brand')[0] as HTMLDivElement;
    const SORT_BY_BRAND = sortBy('brand');
    BRAND_CONTAINER.addEventListener('click', SORT_BY_BRAND);
    const PRICE_CONTAINER = document.getElementsByClassName(`price__content`)[0] as HTMLDivElement;
    const STOCK_CONTAINER = document.getElementsByClassName(`stock__content`)[0] as HTMLDivElement;
    function checkSlider(name: 'price' | 'stock') {
        return (event: Event) => {
            if (event.target instanceof HTMLInputElement) {
                const url = new URL(window.location.href);
                if (event.target.classList.contains('fromSlider')) {
                    const THIS_VALUE = countSlider(`${name}`).arr[+event.target.value];
                    url.searchParams.set(
                        `${name}`,
                        `${Math.min(THIS_VALUE, countSlider(`${name}`).right)}↕${Math.max(
                            THIS_VALUE,
                            countSlider(`${name}`).right
                        )}`
                    );
                    removeAllEvents();
                    setTimeout(fillSort, 10);
                }
                if (event.target.classList.contains('toSlider')) {
                    const THIS_VALUE = countSlider(`${name}`).arr[+event.target.value];
                    url.searchParams.set(
                        `${name}`,
                        `${Math.min(THIS_VALUE, countSlider(`${name}`).left)}↕${Math.max(
                            THIS_VALUE,
                            countSlider(`${name}`).left
                        )}`
                    );
                    removeAllEvents();
                    setTimeout(fillSort, 10);
                }
                history.replaceState(null, '', url);
            }
        };
    }
    const PRICE_CHECK = checkSlider('price');
    const STOCK_CHECK = checkSlider('stock');
    PRICE_CONTAINER.addEventListener('change', PRICE_CHECK);
    STOCK_CONTAINER.addEventListener('change', STOCK_CHECK);
    function removeAllEvents() {
        SELECT.removeEventListener('change', START_SELECT);
        SEARCH.removeEventListener('input', START_SEARCH);
        CATEGORY_CONTAINER.removeEventListener('click', SORT_BY_CATEGORY);
        BRAND_CONTAINER.removeEventListener('click', SORT_BY_BRAND);
        PRICE_CONTAINER.removeEventListener('change', PRICE_CHECK);
        STOCK_CONTAINER.removeEventListener('change', STOCK_CHECK);
    }
}
