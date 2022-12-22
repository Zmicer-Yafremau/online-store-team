import { fillSort } from '../filters/fill-n-sort';
import { CARDS } from './cards/cards';

export function react() {
    const ADD = document.getElementsByClassName('card__drop-button') as HTMLCollectionOf<HTMLDivElement>;
    const SELECT = document.querySelector('.form-select') as HTMLSelectElement;
    const SEARCH = document.querySelector('.main__search') as HTMLInputElement;
    const MAIN = document.getElementsByClassName('main')[0] as HTMLElement;
    const CART = document.querySelector('.header__cart-quntity') as HTMLSpanElement;
    const PRODUCTS = MAIN.children[1] as HTMLElement;
    const SIZE = (document.getElementsByClassName('size') as unknown) as NodeListOf<HTMLDivElement>;
    const CONTENT = PRODUCTS.children[1] as HTMLDivElement;
    const TOTAL_SUM = document.getElementsByClassName('header__totlat-sum')[0] as HTMLSpanElement;
    const DETAILS = (document.getElementsByClassName(
        'card__details-button'
    ) as unknown) as NodeListOf<HTMLButtonElement>;
    const REMOVE_STYLES = () => {
        console.log('0');
        Array.from((CONTENT.children as unknown) as NodeListOf<HTMLDivElement>).forEach((el) => {
            localStorage.size = 'large';
            el.style.width = '';
            el.style.height = '';
            el.children[1].classList.remove('visually-hidden');
            (el.children[0] as HTMLDivElement).style.height = ``;
            (el.children[2] as HTMLDivElement).style.height = ``;
            (el.children[2] as HTMLDivElement).style.fontSize = ``;
            (el.children[0] as HTMLDivElement).style.fontSize = ``;
        });
    };
    console.log(SIZE[0]);
    SIZE[0].addEventListener('click', REMOVE_STYLES);
    const ADD_STYLES = () => {
        console.log('1');
        Array.from((CONTENT.children as unknown) as NodeListOf<HTMLDivElement>).forEach((el) => {
            localStorage.size = 'small';
            el.style.width = '15%';
            el.style.height = '200px';
            el.children[1].classList.add('visually-hidden');
            (el.children[0] as HTMLDivElement).style.height = `20%`;
            (el.children[0] as HTMLDivElement).style.fontSize = `70%`;
            (el.children[2] as HTMLDivElement).style.height = `25%`;
            (el.children[2] as HTMLDivElement).style.fontSize = `80%`;
        });
    };
    SIZE[0].addEventListener('click', REMOVE_STYLES);
    SIZE[1].addEventListener('click', ADD_STYLES);
    const START_SEARCH = () => {
        const url = new URL(window.location.href);
        url.searchParams.set('search', SEARCH.value);
        history.replaceState(null, '', url);
        SEARCH.removeEventListener('input', START_SEARCH);
        fillSort();
    };
    SEARCH.addEventListener('input', START_SEARCH);
    const START_SELECT = () => {
        const url = new URL(window.location.href);
        url.searchParams.set('select', SELECT.value);
        history.replaceState(null, '', url);
        SELECT.removeEventListener('change', START_SELECT);
        fillSort();
    };
    SELECT.addEventListener('change', START_SELECT);
    Array.from(DETAILS).forEach((item) => {
        const GO_DETAILS = () => {
            console.log(item.classList[3].split('-')[1]);
            const ID = +item.classList[3].split('-')[1];
            productDetail(ID);
            const NAME = CARDS.find((el) => el.id === ID);
            history.pushState({}, '', `/${item.classList[3].split('-')[1]}/${NAME?.title.split(' ').join('_')}`);
        };
        item.addEventListener('click', GO_DETAILS);
    });
    Array.from(ADD).forEach((item) => {
        const ADD_TO_CART = () => {
            if (!localStorage.basket) {
                CART.classList.add('visually-hidden');
                localStorage.basket = `[]`;
                TOTAL_SUM.innerHTML = '0';
            }
            const BUTTON_CONTAINER = item.parentElement as HTMLDivElement;
            const CARD = BUTTON_CONTAINER.parentElement as HTMLDivElement;
            const CARD_ID_CLASS = CARD.classList[1];
            const CARD_ID = CARD_ID_CLASS.split('__')[1];

            CARD.classList.toggle('active');

            let ID_ARR: string[] = JSON.parse(localStorage.basket);
            if (CARD.classList.contains('active')) {
                ID_ARR.push(CARD_ID);
                (item.firstElementChild as HTMLSpanElement).innerHTML = 'REMOVE FROM';
            } else {
                ID_ARR = ID_ARR.filter((el: string) => {
                    return el !== `${CARD_ID}`;
                });
                (item.firstElementChild as HTMLSpanElement).innerHTML = 'ADD TO';
            }
            localStorage.basket = JSON.stringify(ID_ARR);
            if (!JSON.parse(localStorage.basket).length) {
                CART.classList.add('visually-hidden');
                CART.innerHTML = '';
                TOTAL_SUM.innerHTML = '0';
            }
            if (JSON.parse(localStorage.basket).length) {
                CART.classList.remove('visually-hidden');
                CART.innerHTML = `${JSON.parse(localStorage.basket).length}`;
                TOTAL_SUM.innerHTML = `${CARDS.reduce((sum, current) => {
                    let curPrice = 0;
                    if (JSON.parse(localStorage.basket).includes(`${current.id}`)) {
                        curPrice = current.price;
                        console.log(curPrice);
                    }
                    return sum + curPrice;
                }, 0)}`;
            }
        };
        item.addEventListener('click', ADD_TO_CART);
    });
}
