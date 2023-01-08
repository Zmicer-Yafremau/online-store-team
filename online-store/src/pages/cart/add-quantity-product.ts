import { promoCodes } from '../../types/types';
import { countSum } from '../../components/count-sum';

export function addQuantity(
    CART: HTMLSpanElement,
    TOTAL_SUM: HTMLSpanElement,
    CARD_ID: string,
    STOCK: HTMLCollectionOf<HTMLSpanElement>,
    QUANTITY: HTMLCollectionOf<HTMLSpanElement>,
    SUMMARY_PRODUCT: HTMLSpanElement,
    SUMMARY_TOTAL: HTMLSpanElement,
    NUMBER: number
): () => void {
    return () => {
        if (!localStorage.basket) {
            CART.classList.add('visually-hidden');
            localStorage.basket = `[]`;
            TOTAL_SUM.innerHTML = '0';
        }
        const ID_ARR: string[] = JSON.parse(localStorage.basket);
        if (Number(STOCK[NUMBER].textContent) > 0) {
            ID_ARR.push(CARD_ID);
            STOCK[NUMBER].textContent = `${Number(STOCK[NUMBER].textContent) - 1}`;
            QUANTITY[NUMBER].textContent = `${Number(QUANTITY[NUMBER].textContent) + 1}`;
        } else {
            alert('no more product');
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

        if (JSON.parse(localStorage.basket).length) {
            const PROMO_ARR: promoCodes[] = JSON.parse(localStorage.promo);
            const sumPromo: number = PROMO_ARR.reduce((sum: number, current) => {
                sum = sum + current.discount;
                return sum;
            }, 0);
            if (JSON.parse(localStorage.promo).length) {
                const RESULT_TOTAL = document.getElementsByClassName('result-total')[0] as HTMLSpanElement;
                RESULT_TOTAL.innerHTML = `€ ${(+TOTAL_SUM.innerHTML * (1 - sumPromo / 100)).toFixed(2)}`;
            }
        }
    };
}
