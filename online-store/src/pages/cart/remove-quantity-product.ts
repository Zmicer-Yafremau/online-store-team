import { displayProduct } from './displayProduct';
import { promoCodes } from '../../types/types';
import { countSum } from '../../components/count-sum';
import { CARDS } from '../../components/cards/cards';
import { cardType } from '../../types/types';

export function removeQuantity(
    CART: HTMLSpanElement,
    TOTAL_SUM: HTMLSpanElement,
    CARD_ID: string,
    STOCK: HTMLCollectionOf<HTMLSpanElement>,
    QUANTITY: HTMLCollectionOf<HTMLSpanElement>,
    SUMMARY_PRODUCT: HTMLSpanElement,
    SUMMARY_TOTAL: HTMLSpanElement,
    PRODUCT_ITEMS: HTMLDivElement,
    CART_PAGE: HTMLDivElement,
    NUMBER: number,
    AMOUNT_PRODUCT: HTMLCollectionOf<HTMLDivElement>,
    currentPage: number,
    rows: number,
    PAGE_NUMBER: HTMLSpanElement
): () => void {
    return () => {
        if (!localStorage.basket) {
            CART.classList.add('visually-hidden');
            localStorage.basket = `[]`;
            TOTAL_SUM.innerHTML = '0';
        }
        let ID_ARR: string[] = JSON.parse(localStorage.basket);
        const PRICE = (CARDS.find((item) => item.id === Number(CARD_ID)) as cardType)?.price;
        if (Number(QUANTITY[NUMBER].textContent) > 1) {
            const positionID = ID_ARR.lastIndexOf(CARD_ID);
            ID_ARR.splice(positionID, 1);
            STOCK[NUMBER].textContent = `${Number(STOCK[NUMBER].textContent) + 1}`;
            QUANTITY[NUMBER].textContent = `${Number(QUANTITY[NUMBER].textContent) - 1}`;
            AMOUNT_PRODUCT[NUMBER].textContent = `€ ${Number(QUANTITY[NUMBER].textContent) * PRICE}`
        } else {
            ID_ARR = ID_ARR.filter((el: string) => {
                return el !== `${CARD_ID}`;
            });
            localStorage.basket = JSON.stringify(ID_ARR);
            const arrItem = [...new Set(ID_ARR)];
            if (!arrItem.slice(rows * (currentPage - 1), rows * (currentPage - 1) + rows).length) {
                currentPage = currentPage - 1;
                PAGE_NUMBER.innerText = `${currentPage}`;
                const url = new URL(window.location.href);
                url.searchParams.set('page', PAGE_NUMBER.innerText);
                history.replaceState(null, '', url);
                displayProduct(arrItem, rows, currentPage, PRODUCT_ITEMS);
            } else {
                displayProduct(arrItem, rows, currentPage, PRODUCT_ITEMS);
            }
            if (arrItem.length === 0) {
                CART_PAGE.innerHTML = `<h1>Cart is Empty</h1>`;
            }
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
            TOTAL_SUM.innerHTML = countSum(JSON.parse(localStorage.basket));
        }
        SUMMARY_PRODUCT.textContent = CART.textContent;
        SUMMARY_TOTAL.textContent = `€ ${TOTAL_SUM.textContent}`;
        if (JSON.parse(localStorage.promo).length) {
            const PROMO_ARR: promoCodes[] = JSON.parse(localStorage.promo);
            const sumPromo: number = PROMO_ARR.reduce((sum: number, current) => {
                sum = sum + current.discount;
                return sum;
            }, 0);
            const RESULT_TOTAL = document.getElementsByClassName('result-total')[0] as HTMLSpanElement;
            RESULT_TOTAL.innerHTML = `€ ${(+TOTAL_SUM.innerHTML * (1 - sumPromo / 100)).toFixed(2)}`;
        }
    };
}
