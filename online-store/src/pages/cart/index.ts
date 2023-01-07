import Page from '../../types/page';
import { CARDS } from '../../components/cards/cards';
import { addQuantity } from './add-quantity-product';
import { promoCodes } from '../../types/types';
import { removeQuantity } from './remove-quantity-product';
import { displayProduct } from './displayProduct';
import { PROMO_CODES } from './promo-codes';
import { countSum } from '../../components/count-sum';

class CartPage extends Page {
    constructor(id: string, tagName: string, className: string) {
        super(id, tagName, className);
    }

    public createContent() {
        const TOTAL_SUM = document.getElementsByClassName('header__total-sum')[0] as HTMLSpanElement;
        const CART = document.querySelector('.header__cart-quantity') as HTMLSpanElement;
        const result = ``;
        let pageContent = `
            <div class="cart-page">
            <h1>Cart is Empty</h1>
            </div>`;
        if (localStorage.basket && localStorage.basket !== `[]`) {
            const ID_ARR: string[] = JSON.parse(localStorage.basket);
            localStorage.basket = JSON.stringify(ID_ARR);
            if (!JSON.parse(localStorage.basket).length) {
                CART.classList.add('visually-hidden');
                CART.innerHTML = '';
                TOTAL_SUM.innerHTML = '0';
            }
            if (JSON.parse(localStorage.basket).length) {
                CART.classList.remove('visually-hidden');
                CART.innerHTML = `${JSON.parse(localStorage.basket).length}`;
                TOTAL_SUM.innerHTML = countSum(JSON.parse(localStorage.basket));
            }

            pageContent = `
            <div class="cart-page">
            <div class="cart_container container">
            <div class="products-in-cart">
            <div class="title-and-page-control">
            <h2>Products In Cart</h2>
            <div class="page-control">
            <div class="limit">
            LIMIT: <input type="number" class="number-on-page" min="0" value="3">
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
            <input type="search" placeholder="Enter promo code" class="promo-input"></div>
            <span class="promo-ex">Promo for test: 'RS', 'EPM'</span>
            <button class="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#exampleModalToggle">BUY NOW</button>
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

    static contentProduct() {
        const PAGE_NUMBER = document.querySelector('.page-number') as HTMLSpanElement;
        const NUMBER_ON_PAGE = document.querySelector('.number-on-page') as HTMLInputElement;
        const url = new URL(window.location.href);
        if (url.searchParams.get('page')) {
            PAGE_NUMBER.innerText = `${url.searchParams.get('page')}`;
        }
        const currentPage = Number(PAGE_NUMBER.innerText);
        if (url.searchParams.get('limit')) {
            NUMBER_ON_PAGE.value = `${url.searchParams.get('limit')}`;
        }
        const rows = Number(NUMBER_ON_PAGE.value);
        const PRODUCT_ITEMS = document.querySelector('.prod-items') as HTMLDivElement;
        const ID_ARR: string[] = JSON.parse(localStorage.basket);
        const arrItem: string[] = [...new Set(ID_ARR)];

        displayProduct(arrItem, rows, currentPage, PRODUCT_ITEMS);
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
        const CART_PAGE = document.querySelector('.cart-page') as HTMLDivElement;
        const PAGE_NUMBER = document.querySelector('.page-number') as HTMLSpanElement;
        const NUMBER_ON_PAGE = document.querySelector('.number-on-page') as HTMLInputElement;
        let currentPage = Number(PAGE_NUMBER.innerText);
        let rows = Number(NUMBER_ON_PAGE.value);
        const PRODUCT_ITEMS = document.querySelector('.prod-items') as HTMLDivElement;
        const ID_ARR: string[] = JSON.parse(localStorage.basket);
        const arrItem: string[] = [...new Set(ID_ARR)];

        const updateValue = () => {
            rows = Number(NUMBER_ON_PAGE.value);
            const url = new URL(window.location.href);
            url.searchParams.set('limit', NUMBER_ON_PAGE.value);
            history.replaceState(null, '', url);
            removeAllEvents();
            if (!arrItem.slice(rows * (currentPage - 1), rows * (currentPage - 1) + rows).length) {
                while (!arrItem.slice(rows * (currentPage - 1), rows * (currentPage - 1) + rows).length) {
                    currentPage = currentPage - 1;
                }
                PAGE_NUMBER.innerText = `${currentPage}`;
                const url = new URL(window.location.href);
                url.searchParams.set('page', PAGE_NUMBER.innerText);
                history.replaceState(null, '', url);
                displayProduct(arrItem, rows, currentPage, PRODUCT_ITEMS);
            } else {
                displayProduct(arrItem, rows, currentPage, PRODUCT_ITEMS);
            }
        };
        NUMBER_ON_PAGE.addEventListener('change', updateValue);

        const PAGE_NEXT = document.getElementsByClassName('page-next')[0] as HTMLButtonElement;
        const PAGE_PREV = document.getElementsByClassName('page-prev')[0] as HTMLButtonElement;

        const pageNext = () => {
            if (currentPage < Math.ceil(arrItem.length / rows)) {
                currentPage = currentPage + 1;
                PAGE_NUMBER.innerText = `${currentPage}`;
                const url = new URL(window.location.href);
                url.searchParams.set('page', PAGE_NUMBER.innerText);
                history.replaceState(null, '', url);
                removeAllEvents();
                displayProduct(arrItem, rows, currentPage, PRODUCT_ITEMS);
            }
        };
        PAGE_NEXT.addEventListener('click', pageNext);

        const pagePrev = () => {
            if (currentPage > 1) {
                currentPage = currentPage - 1;
                PAGE_NUMBER.innerText = `${currentPage}`;
                const url = new URL(window.location.href);
                url.searchParams.set('page', PAGE_NUMBER.innerText);
                history.replaceState(null, '', url);
                removeAllEvents();
                displayProduct(arrItem, rows, currentPage, PRODUCT_ITEMS);
            }
        };
        PAGE_PREV.addEventListener('click', pagePrev);

        Array.from(ADD).forEach((button) => {
            const CARD = button.parentElement as HTMLDivElement;
            const CARD_ID_CLASS = CARD.classList[1];
            const CARD_ID = CARD_ID_CLASS.split('__')[1];
            const NUMBER = Number(button.classList[3]);
            const ADD_TO_CART = addQuantity(
                CART,
                TOTAL_SUM,
                CARD_ID,
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
            const NUMBER = Number(button.classList[3]);
            const REMOVE_FROM_CART = removeQuantity(
                CART,
                TOTAL_SUM,
                CARD_ID,
                STOCK,
                QUANTITY,
                SUMMARY_PRODUCT,
                SUMMARY_TOTAL,
                PRODUCT_ITEMS,
                CART_PAGE,
                NUMBER,
                currentPage,
                rows,
                PAGE_NUMBER
            );
            button.addEventListener('click', REMOVE_FROM_CART);
        });

        function removeAllEvents() {
            NUMBER_ON_PAGE.removeEventListener('change', updateValue);
            PAGE_NEXT.removeEventListener('click', pageNext);
            PAGE_PREV.removeEventListener('click', pagePrev);
            Array.from(REMOVE).forEach((button) => {
                const CARD = button.parentElement as HTMLDivElement;
                const CARD_ID_CLASS = CARD.classList[1];
                const CARD_ID = CARD_ID_CLASS.split('__')[1];
                const NUMBER = Number(button.classList[3]);
                const REMOVE_FROM_CART = removeQuantity(
                    CART,
                    TOTAL_SUM,
                    CARD_ID,
                    STOCK,
                    QUANTITY,
                    SUMMARY_PRODUCT,
                    SUMMARY_TOTAL,
                    PRODUCT_ITEMS,
                    CART_PAGE,
                    NUMBER,
                    currentPage,
                    rows,
                    PAGE_NUMBER
                );
                button.removeEventListener('click', REMOVE_FROM_CART);
            });
        }

        const PRODUCT_INFO = document.getElementsByClassName('item-info') as HTMLCollectionOf<HTMLButtonElement>;
        Array.from(PRODUCT_INFO).forEach((item) => {
            const GO_DETAILS = () => {
                const ID = +item.classList[1].split('__')[1];
                const NAME = CARDS.find((el) => el.id === ID)
                    ?.title.split(' ')
                    .join('_');
                location.replace(`${location.origin}${location.pathname}#product-details/${ID}/${NAME}`);
            };
            item.addEventListener('click', GO_DETAILS);
        });
    }

    static addPromoCode() {
        const TOTAL_SUM = document.getElementsByClassName('header__total-sum')[0] as HTMLSpanElement;
        const PROMO = document.querySelector('.promo-input') as HTMLInputElement;
        const PROMO_CODE = document.querySelector('.promo-code') as HTMLDivElement;
        const CODE = document.createElement('div');
        CODE.classList.add('res-promo');
        const ADD_CODE = document.createElement('span');
        ADD_CODE.classList.add('add-code');
        ADD_CODE.innerText = 'ADD';
        const TOTAL_PRICE = document.getElementsByClassName('total-price') as HTMLCollectionOf<HTMLDivElement>;
        const RESULT_PRICE = document.createElement('div');
        RESULT_PRICE.classList.add('result-price');
        RESULT_PRICE.classList.add('total-price');

        if (!localStorage.promo) {
            localStorage.promo = `[]`;
        }
        const INPUT_PROMO = () => {
            const CURRENT_PROMO: promoCodes = PROMO_CODES.find(
                (item) => item.title.toUpperCase() === PROMO.value.toUpperCase()
            ) as promoCodes;
            if (CURRENT_PROMO) {
                PROMO_CODE.after(CODE);
                CODE.innerHTML = CURRENT_PROMO.description;
                const PROMO_ARR: promoCodes[] = JSON.parse(localStorage.promo);
                if (!Array.from(PROMO_ARR).find((item) => item.title === CURRENT_PROMO.title)) {
                    CODE.append(ADD_CODE);
                }
            } else {
                CODE.remove();
            }
        };
        PROMO.addEventListener('input', INPUT_PROMO);

        const APPLY_PROMO = () => {
            const CURRENT_PROMO: promoCodes = PROMO_CODES.find(
                (item) => item.title.toUpperCase() === PROMO.value.toUpperCase()
            ) as promoCodes;
            const PROMO_ARR: promoCodes[] = JSON.parse(localStorage.promo);
            if (!Array.from(PROMO_ARR).find((item) => item === CURRENT_PROMO)) {
                PROMO_ARR.push(CURRENT_PROMO);
                localStorage.promo = JSON.stringify(PROMO_ARR);
                addAppliedPromo();
            }
        };
        ADD_CODE.addEventListener('click', APPLY_PROMO);

        addAppliedPromo();

        function addAppliedPromo() {
            const PROMO_ARR: promoCodes[] = JSON.parse(localStorage.promo);
            const sumPromo: number = PROMO_ARR.reduce((sum: number, current) => {
                sum = sum + current.discount;
                return sum;
            }, 0);
            const TOTAL_SUM_PROMO = (+TOTAL_SUM.innerHTML * (1 - sumPromo / 100)).toFixed(2);
            const result = `${PROMO_ARR.reduce((sum, currentPromo) => {
                let res = '';
                res = `
                    <div class="applied-promo ${currentPromo.title}">
                    ${currentPromo.description}
                    <span class="drop-code">DROP</span>
                    </div>
                    `;
                return sum + res;
            }, '')}`;
            if (PROMO_ARR.length) {
                TOTAL_PRICE[1].classList.add('old-price');
                TOTAL_PRICE[1].after(RESULT_PRICE);
                RESULT_PRICE.innerHTML = `Total: 
            <span class="summary-total result-total">€ ${TOTAL_SUM_PROMO}</span>
            <div class="applied-codes">
            <h6>Applied codes</h6>
            ${result}
            </div>`;

                if (PROMO_ARR.find((item) => item.title.toUpperCase() === PROMO.value.toUpperCase())) {
                    ADD_CODE.remove();
                }
            } else {
                RESULT_PRICE.remove();
                TOTAL_PRICE[1].classList.remove('old-price');
            }
            const DROP_CODES = document.getElementsByClassName('drop-code') as HTMLCollectionOf<HTMLSpanElement>;
            const RESULT_TOTAL = document.getElementsByClassName('result-total')[0] as HTMLSpanElement;
            Array.from(DROP_CODES).forEach((button) => {
                let PROMO_ARR: promoCodes[] = JSON.parse(localStorage.promo);
                const PROMO_NUMBER = Array.from(DROP_CODES).indexOf(button);
                const sumPromo: number = PROMO_ARR.reduce((sum: number, current) => {
                    sum = sum + current.discount;
                    return sum;
                }, 0);
                const DROP = () => {
                    RESULT_TOTAL.innerText = `€ ${(
                        +TOTAL_SUM.innerHTML -
                        (1 - (sumPromo - PROMO_ARR[PROMO_NUMBER].discount) / 100)
                    ).toFixed(2)}`;
                    PROMO_ARR = PROMO_ARR.filter((el) => {
                        return el.title !== PROMO_ARR[PROMO_NUMBER].title;
                    });
                    localStorage.promo = JSON.stringify(PROMO_ARR);
                    const CURRENT_PROMO: promoCodes = PROMO_CODES.find(
                        (item) => item.title.toUpperCase() === PROMO.value.toUpperCase()
                    ) as promoCodes;
                    if (CURRENT_PROMO) {
                        if (!PROMO_ARR.find((item) => item.title.toUpperCase() === CURRENT_PROMO.title.toUpperCase())) {
                            CODE.append(ADD_CODE);
                        }
                    }
                    addAppliedPromo();
                };
                button.addEventListener('click', DROP);
            });
        }
    }
}

export default CartPage;
