import Page from '../../types/page';
import { CARDS } from '../../components/cards/cards';
import { addQuantity } from './add-quantity-product';
import { cardType } from '../../types/types';
import { removeQuantity } from './remove-quantity-product';

class CartPage extends Page {
    constructor(id: string, tagName: string, className: string) {
        super(id, tagName, className);
    }

    public createContent() {

        const TOTAL_SUM = document.getElementsByClassName('header__totlat-sum')[0] as HTMLSpanElement;
        const CART = document.querySelector('.header__cart-quntity') as HTMLSpanElement;
        const ITEM_NUMBER = document.getElementsByClassName('item-i') as HTMLCollectionOf<HTMLDivElement>;
        let result = ``;
        let pageContent = `
            <div class="cart-page">
            <h1>Cart is Empty</h1>
            </div>`;
        if (localStorage.basket && localStorage.basket !== `[]`) {
            const ID_ARR: string[] = JSON.parse(localStorage.basket);
            console.log(ID_ARR);
            result = `${CARDS.reduce((sum, item) => {
                let res = '';
                if ([...new Set(ID_ARR)].includes(String(item.id) as never)) {

                    let quantityCart: number = ID_ARR.reduce((sum, current) => {
                        if (current === String(item.id)) {
                            sum = sum + 1;
                        }
                        return sum;
                        }, 0);

                    res = `<div class="app-cart-item card__${item.id}">
                    <div class="cart-item">
                    <div class="item-i">${[...new Set(ID_ARR)].indexOf(String(item.id) as never) + 1}</div>
                    <div class="item-info">
                    <img alt="${item.title}" src="${item.images[item.images.length - 1]}">
                    <div class="item-detail-p">
                    <div class="product-title">
                    <h6>${item.title}</h6>
                    </div>
                    <div class="product-description">${item.description}</div>
                    <div class="product-other">
                    <div>Rating: ${item.rating}</div>
                    <div>Discount: ${item.discountPercentage}</div>
                    </div>
                    </div>
                    </div>
                    <div class="number-control">
                    <div class="stock-control"> Stock: <span class="stock">${item.stock-quantityCart}</span></div>
                    <div class="incDec-control card__${item.id}">
                    <button type="button" class="btn btn-outline-dark card__add-button">+</button>
                    <span class="quantity"> ${quantityCart} </span>
                    <button type="button" class="btn btn-outline-dark card__remove-button">-</button>
                    </div>
                    <div class="amount-control">€ ${item.price}</div>
                    </div>
                    </div>
                    </div>`;
                }
                return sum + res;
            }, '')}`;

            localStorage.basket = JSON.stringify(ID_ARR);
        if (!JSON.parse(localStorage.basket).length) {
            CART.classList.add('visually-hidden');
            CART.innerHTML = '';
            TOTAL_SUM.innerHTML = '0';
        }
        if (JSON.parse(localStorage.basket).length) {
            CART.classList.remove('visually-hidden');
            CART.innerHTML = `${JSON.parse(localStorage.basket).length}`;
            TOTAL_SUM.innerHTML = `${JSON.parse(localStorage.basket).reduce((sum: number, current: string) => {
                if (CARDS.find((item) => item.id === Number(current))) {
                sum = sum + (CARDS.find((item) => item.id === Number(current))as cardType)?.price;
                }
                return sum;
            }, 0)}`;
        }

            pageContent = `
            <div class="cart-page">
            <div class="cart_container container">
            <div class="products-in-cart">
            <div class="title-and-page-control">
            <h2>Products In Cart</h2>
            <div class="page-control">
            <div class="limit">
            ITEMS: <input type="text" class="number-on-page">
            </div>
            <div class="page-numbers">
            PAGE: 
            <button>
            &lt;
            </button>
            <span>1</span>
            <button>
            &gt; 
            </button>
            </div>
            </div>
            </div>            
            <div class="prod-items">
            ${result}
            </div>
            </div>
            <div class="total-cart">
            <h2>Summary</h2>
            <div class="total-price">
            Products: <span class="summary-product">${ID_ARR.length}</span></div>
            <div class="total-price">
            Total: <span class="summary-total">€ ${TOTAL_SUM.innerHTML}</span></div>
            <div class="promo-code">
            <input type="search" placeholder="Enter promo code" class=""></div>
            <button class="btn btn-outline-dark">BUY NOW</button>
            </div>
            </div>
            </div>
            `;
            return pageContent;
        }
        return pageContent;
    }

    render() {
        this.addPagesContent(this.createContent());
        return this.container;
    }

    static addEvents() {
        const ADD = document.getElementsByClassName('card__add-button') as HTMLCollectionOf<HTMLButtonElement>;
        const REMOVE = document.getElementsByClassName('card__remove-button') as HTMLCollectionOf<HTMLButtonElement>;
        const TOTAL_SUM = document.getElementsByClassName('header__totlat-sum')[0] as HTMLSpanElement;
        const CART = document.querySelector('.header__cart-quntity') as HTMLSpanElement;
        const STOCK = document.getElementsByClassName('stock') as HTMLCollectionOf<HTMLSpanElement>;
        const QUANTITY = document.getElementsByClassName('quantity') as HTMLCollectionOf<HTMLSpanElement>;
        const SUMMARY_PRODUCT = document.querySelector('.summary-product') as HTMLSpanElement;
        const SUMMARY_TOTAL = document.querySelector('.summary-total') as HTMLSpanElement;
        const ITEM_NUMBER = document.getElementsByClassName('item-i') as HTMLCollectionOf<HTMLDivElement>;
        const CART_PAGE = document.querySelector('.cart-page') as HTMLDivElement;
        
        Array.from(ADD).forEach((button) => {
            const CARD = button.parentElement as HTMLDivElement;
            const CARD_ID_CLASS = CARD.classList[1];
            const CARD_ID = CARD_ID_CLASS.split('__')[1];
            const ADD_TO_CART = addQuantity(CART, TOTAL_SUM, CARD_ID, button, STOCK, QUANTITY, SUMMARY_PRODUCT, SUMMARY_TOTAL);
            button.addEventListener('click', ADD_TO_CART);
        });

        Array.from(REMOVE).forEach((button) => {
            const CARD = button.parentElement as HTMLDivElement;
            const CARD_ID_CLASS = CARD.classList[1];
            const CARD_ID = CARD_ID_CLASS.split('__')[1];
            const REMOVE_ITEM = CARD.parentElement?.parentElement?.parentElement as HTMLDivElement;
            const REMOVE_FROM_CART = removeQuantity(CART, TOTAL_SUM, CARD_ID, button, STOCK, QUANTITY, SUMMARY_PRODUCT, SUMMARY_TOTAL, REMOVE_ITEM, ITEM_NUMBER, CART_PAGE);
            button.addEventListener('click', REMOVE_FROM_CART);
        });
    }
} 

export default CartPage;
