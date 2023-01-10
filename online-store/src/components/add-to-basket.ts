import { CARDS } from './cards/cards';
import { cardType } from '../types/types';
export function addToBasket(
    CART: HTMLSpanElement,
    TOTAL_SUM: HTMLSpanElement,
    CARD_ID: string,
    BUTTON: HTMLButtonElement
): () => void {
    return () => {
        if (!localStorage.basket) {
            CART.classList.add('visually-hidden');
            localStorage.basket = `[]`;
            TOTAL_SUM.innerHTML = '0';
        }
        BUTTON.classList.toggle('add');
        BUTTON.classList.toggle('remove');
        let ID_ARR: string[] = JSON.parse(localStorage.basket);
        if (BUTTON.classList.contains('remove')) {
            ID_ARR.push(CARD_ID);
            BUTTON.classList.add('remove');
            BUTTON.classList.remove('add');
        } else {
            ID_ARR = ID_ARR.filter((el: string) => {
                return el !== `${CARD_ID}`;
            });
            BUTTON.classList.remove('remove');
            BUTTON.classList.add('add');
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
            TOTAL_SUM.innerHTML = `${JSON.parse(localStorage.basket).reduce((sum: number, current: string) => {
                if (CARDS.find((item) => item.id === Number(current))) {
                    sum = sum + (CARDS.find((item) => item.id === Number(current)) as cardType)?.price;
                }
                return sum;
            }, 0)}`;
        }
    };
}
