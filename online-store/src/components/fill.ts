import { cardType } from '../types/types';
import { CARDS } from './cards/cards';
import { changeSize } from './change-size';
export function fill(data: cardType[]) {
    const CONTENT = document.getElementsByClassName('main__content')[0] as HTMLDivElement;
    const SIZE = (document.getElementsByClassName('size') as unknown) as NodeListOf<HTMLDivElement>;
    CONTENT.innerHTML = '';
    data.forEach((value) => {
        const CARD = document.createElement('div');
        CARD.className = `card card__${value.id}`;
        CARD.style.background = `url('${value.images[value.images.length - 1]}') center no-repeat`;
        CONTENT?.append(CARD);
        CARD.innerHTML = `
        <div class="card__header text-center container bg-dark center">
        ${value.title}  
     </div>
     <div class="card__description">
        <ul class="card__description-list list-group list-group-flush">
           <li class="card__description-item list-group-item">Category:<span class="card__span card__category">${value.category}</span></li>
           <li class="card__description-item list-group-item">Brand:<span class="card__span card__brand">${value.brand}</span></li>
           <li class="card__description-item list-group-item">Price:<span class="card__span card__price">${value.price}</span>€</li>
           <li class="card__description-item list-group-item">Discount:<span class="card__span card__discount">${value.discountPercentage}</span>%</li>
           <li class="card__description-item list-group-item">Rating:<span class="card__span card__rating">${value.rating}</span></li>
           <li class="card__description-item list-group-item">Stock:<span class="card__span card__stock">${value.stock}</span></li>
        </ul>
     </div>
     <div class="card__buttons container bg-dark">
        <button type="button" class="btn btn-light card__drop-button card__btn-${value.id} fs-6 add">CART</button>
        <button type="button" class="btn btn-light card__details-button card__btn-${value.id}  fs-6">DETAILS</button>
     </div>  
        
        `;
    });
    if (!CONTENT.innerHTML) CONTENT.innerHTML = `Sorry, no matches ='(`;
    const DIV_CARDS = (document.getElementsByClassName('card') as unknown) as NodeListOf<HTMLDivElement>;
    const CART = document.querySelector('.header__cart-quntity') as HTMLSpanElement;
    const TOTAL_SUM = document.getElementsByClassName('header__totlat-sum')[0] as HTMLSpanElement;
    Array.from(DIV_CARDS).forEach((el) => {
        if (
            !el.classList.contains('active') &&
            JSON.parse(localStorage.basket).includes(el.classList[1].split(`_`)[2])
        ) {
            el.classList.add('active');
            el.children[2].children[0].classList.add('remove');
            el.children[2].children[0].classList.remove('add');
        } else if (JSON.parse(localStorage.basket).includes(el.classList[1].split(`_`)[2])) {
            el.classList.remove('active');
            el.children[2].children[0].classList.remove('remove');
            el.children[2].children[0].classList.add('add');
        }
    });
    if (!localStorage.basket) {
        CART.classList.add('visually-hidden');
        localStorage.basket = `[]`;
        TOTAL_SUM.innerHTML = '0';
    }
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
            }
            return sum + curPrice;
        }, 0)}`;
    }
    const PARAMS = new URLSearchParams(location.search);
    const SELECT_SIZE = PARAMS.get('size');
    changeSize(SIZE, CONTENT, SELECT_SIZE ? SELECT_SIZE : 'large');
}
