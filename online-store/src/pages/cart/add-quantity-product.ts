import { CARDS } from "../../components/cards/cards";
import { cardType } from "../../types/types";

export function addQuantity(
    CART: HTMLSpanElement,
    TOTAL_SUM: HTMLSpanElement,
    CARD_ID: string,
    BUTTON: HTMLButtonElement,
    STOCK: HTMLCollectionOf<HTMLSpanElement>,
    QUANTITY: HTMLCollectionOf<HTMLSpanElement>,
    SUMMARY_PRODUCT: HTMLSpanElement,
    SUMMARY_TOTAL: HTMLSpanElement    
): () => void {
    return () => {
        if (!localStorage.basket) {
            CART.classList.add('visually-hidden');
            localStorage.basket = `[]`;
            TOTAL_SUM.innerHTML = '0';
        }
      let ID_ARR: string[] = JSON.parse(localStorage.basket);
      let quantityCart: number = ID_ARR.reduce((sum, current) => {
        if (current === CARD_ID) {
          sum = sum + 1;
        }
        return sum;
      }, 0);
      console.log(quantityCart);

      const STOCK_SET = [...new Set(ID_ARR)].indexOf(CARD_ID);

      if (Number(STOCK[STOCK_SET].textContent)>0) {
        ID_ARR.push(CARD_ID);
        STOCK[STOCK_SET].textContent = `${Number(STOCK[STOCK_SET].textContent) - 1}`;
        QUANTITY[STOCK_SET].textContent = `${Number(QUANTITY[STOCK_SET].textContent) + 1}`
        } else {
      console.log('no more product')
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
                sum = sum + (CARDS.find((item) => item.id === Number(current))as cardType)?.price;
                }
                return sum;
            }, 0)}`;
      }
      SUMMARY_PRODUCT.textContent = CART.textContent;
      SUMMARY_TOTAL.textContent = `€ ${TOTAL_SUM.textContent}`;
    };
}
