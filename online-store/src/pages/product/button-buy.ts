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
        //BUTTON.classList.toggle('addCart');
        //BUTTON.classList.toggle('inCart');
        let ID_ARR: string[] = JSON.parse(localStorage.basket);
        console.log(123)
        console.log(ID_ARR)
        if (BUTTON.classList.contains('addCart')) {
            ID_ARR.push(CARD_ID);
            localStorage.basket = JSON.stringify(ID_ARR);
            BUTTON.classList.add('inCart');
            BUTTON.classList.remove('addCart');
        }
        console.log(localStorage.basket)
        // else {
        //     ID_ARR = ID_ARR.filter((el: string) => {
        //         return el !== `${CARD_ID}`;
        //     });
        //     BUTTON.classList.remove('inCart');
        //     BUTTON.classList.add('addCart');
        // }
        //localStorage.basket = JSON.stringify(ID_ARR);
        // if (!JSON.parse(localStorage.basket).length) {
        //     CART.classList.add('visually-hidden');
        //     CART.innerHTML = '';
        //     TOTAL_SUM.innerHTML = '0';
        // }
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
