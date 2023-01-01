import { CARDS } from '../../components/cards/cards';

export function buttonBuy(
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
        let ID_ARR: string[] = JSON.parse(localStorage.basket);
        if (BUTTON.classList.contains('addCart')) {
            ID_ARR.push(CARD_ID);
            localStorage.basket = JSON.stringify(ID_ARR);
            BUTTON.classList.add('inCart');
            BUTTON.classList.remove('addCart');
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
}
