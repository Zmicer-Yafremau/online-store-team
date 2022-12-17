import { cardType } from '../types/types';
import { react } from './react-on-changes';
export function fill(data: cardType[]) {
    const CONTENT = document.getElementsByClassName('main__content')[0] as HTMLDivElement;
    CONTENT.innerHTML = '';
    data.forEach((value) => {
        const CARD = document.createElement('div');
        CARD.className = `card card__${value.id}`;
        CARD.style.background = `url('${value.images[value.images.length - 1]}') center no-repeat`;
        CONTENT?.append(CARD);
        CARD.innerHTML = `
        <div class="card__header text-center container bg-dark">
        ${value.title}  
     </div>
     <div class="card__description">
        <ul class="card__description-list list-group list-group-flush">
           <li class="card__description-item list-group-item">Category:<span class="card__span card__categoty">${value.category}</span></li>
           <li class="card__description-item list-group-item">Brand:<span class="card__span card__brand">${value.brand}</span></li>
           <li class="card__description-item list-group-item">Price:<span class="card__span card__price">${value.price}</span>€</li>
           <li class="card__description-item list-group-item">Discount:<span class="card__span card__discount">${value.discountPercentage}</span>%</li>
           <li class="card__description-item list-group-item">Rating:<span class="card__span card__rating">${value.rating}</span></li>
           <li class="card__description-item list-group-item">Stock:<span class="card__span card__stock">${value.stock}</span></li>
        </ul>
     </div>
     <div class="card__buttons container">
        <button type="button" class="btn btn-light card__drop-button card__btn-${value.id} fs-6"><span>ADD TO</span> CART</button>
        <button type="button" class="btn btn-light card__details-button fs-6">DETAILS</button>
     </div>  
        
        `;
    });
    react();
    if (!CONTENT.innerHTML) CONTENT.innerHTML = `Sorry, no matches ='(`;
}
