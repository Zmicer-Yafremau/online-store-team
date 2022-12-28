import Page from '../../types/page';
import { CARDS } from '../../components/cards/cards';
import { addQuantity } from './add-quantity-product';
import { cardType } from '../../types/types';
import { removeQuantity } from './remove-quantity-product';
import { displayProduct } from './displayProduct';

class CartPage extends Page {
    constructor(id: string, tagName: string, className: string) {
        super(id, tagName, className);
    }

    public createContent() {
        const TOTAL_SUM = document.getElementsByClassName('header__total-sum')[0] as HTMLSpanElement;
        const CART = document.querySelector('.header__cart-quantity') as HTMLSpanElement;
        let result = ``;
        let pageContent = `
            <div class="cart-page">
            <h1>Cart is Empty</h1>
            </div>`;
        if (localStorage.basket && localStorage.basket !== `[]`) {
            const ID_ARR: string[] = JSON.parse(localStorage.basket);
            console.log(ID_ARR);

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
                        sum = sum + (CARDS.find((item) => item.id === Number(current)) as cardType)?.price;
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
            LIMIT: <input type="text" class="number-on-page" min="0" value="3">
            </div>
            <div class="page-numbers">
            PAGE: 
            <button class="page-prev">
            &lt;
            </button>
            <span class="page-number">1</span>
            <button class="page-next">
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
        const TOTAL_SUM = document.getElementsByClassName('header__total-sum')[0] as HTMLSpanElement;
        const CART = document.querySelector('.header__cart-quantity') as HTMLSpanElement;
        const STOCK = document.getElementsByClassName('stock') as HTMLCollectionOf<HTMLSpanElement>;
        const QUANTITY = document.getElementsByClassName('quantity') as HTMLCollectionOf<HTMLSpanElement>;
        const SUMMARY_PRODUCT = document.querySelector('.summary-product') as HTMLSpanElement;
        const SUMMARY_TOTAL = document.querySelector('.summary-total') as HTMLSpanElement;
        const ITEM_NUMBER = document.getElementsByClassName('item-i') as HTMLCollectionOf<HTMLDivElement>;
        const CART_PAGE = document.querySelector('.cart-page') as HTMLDivElement;

        const PAGE_NUMBER = document.querySelector('.page-number') as HTMLSpanElement;
        const NUMBER_ON_PAGE = document.querySelector('.number-on-page') as HTMLInputElement;
        let currentPage = Number(PAGE_NUMBER.innerText);
        let rows = Number(NUMBER_ON_PAGE.value);
        const PRODUCT_ITEMS = document.querySelector('.prod-items') as HTMLDivElement;
        const ID_ARR: string[] = JSON.parse(localStorage.basket);
        const arrItem = [...new Set(ID_ARR)];

        displayProduct(arrItem, rows, currentPage, PRODUCT_ITEMS);

        NUMBER_ON_PAGE.addEventListener("change", () => updateValue());
        console.log(NUMBER_ON_PAGE.value);
        
        function updateValue() {
            rows = Number(NUMBER_ON_PAGE.value);
            console.log(rows);
            displayProduct(arrItem, rows, currentPage, PRODUCT_ITEMS);
        }

        const PAGE_NEXT = document.querySelector('.page-next') as HTMLSpanElement;
        const PAGE_PREV = document.querySelector('.page-prev') as HTMLSpanElement;

        PAGE_NEXT.addEventListener('click', () => {
            if (currentPage < Math.ceil(arrItem.length / rows)) {
                currentPage = currentPage + 1;
                PAGE_NUMBER.innerText = `${currentPage}`;
                displayProduct(arrItem, rows, currentPage, PRODUCT_ITEMS)
            };
        });

        PAGE_PREV.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage = currentPage - 1;
                PAGE_NUMBER.innerText = `${currentPage}`;
                displayProduct(arrItem, rows, currentPage, PRODUCT_ITEMS)
            };
        });

        Array.from(ADD).forEach((button) => {
            const CARD = button.parentElement as HTMLDivElement;
            const CARD_ID_CLASS = CARD.classList[1];
            const CARD_ID = CARD_ID_CLASS.split('__')[1];
            const NUMBER = Number(button.classList[3]);
            const ADD_TO_CART = addQuantity(
                CART,
                TOTAL_SUM,
                CARD_ID,
                button,
                STOCK,
                QUANTITY,
                SUMMARY_PRODUCT,
                SUMMARY_TOTAL,
                NUMBER
            );
            button.addEventListener('click', ADD_TO_CART);
        });

        Array.from(REMOVE).forEach((button) => {
            const CARD = button.parentElement as HTMLDivElement;
            const CARD_ID_CLASS = CARD.classList[1];
            const CARD_ID = CARD_ID_CLASS.split('__')[1];
            const REMOVE_ITEM = CARD.parentElement?.parentElement?.parentElement as HTMLDivElement;
            const NUMBER = Number(button.classList[3]);
            const REMOVE_FROM_CART = removeQuantity(
                CART,
                TOTAL_SUM,
                CARD_ID,
                button,
                STOCK,
                QUANTITY,
                SUMMARY_PRODUCT,
                SUMMARY_TOTAL,
                REMOVE_ITEM,
                ITEM_NUMBER,
                CART_PAGE,
                NUMBER
            );
            button.addEventListener('click', REMOVE_FROM_CART);
        });

    }
}

export default CartPage;
