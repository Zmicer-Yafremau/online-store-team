import { CARDS } from "../../components/cards/cards";
import { cardType } from "../../types/types";
import { displayProduct } from "./displayProduct";

export function removeQuantity(
    CART: HTMLSpanElement,
    TOTAL_SUM: HTMLSpanElement,
    CARD_ID: string,
    BUTTON: HTMLButtonElement,
    STOCK: HTMLCollectionOf<HTMLSpanElement>,
    QUANTITY: HTMLCollectionOf<HTMLSpanElement>,
    SUMMARY_PRODUCT: HTMLSpanElement,
    SUMMARY_TOTAL: HTMLSpanElement,    
    REMOVE_ITEM: HTMLDivElement,
    ITEM_NUMBER: HTMLCollectionOf<HTMLDivElement>,
    CART_PAGE: HTMLDivElement,
    NUMBER: number
): () => void {
    return () => {
        if (!localStorage.basket) {
            CART.classList.add('visually-hidden');
            localStorage.basket = `[]`;
            TOTAL_SUM.innerHTML = '0';
        }
        let ID_ARR: string[] = JSON.parse(localStorage.basket);
        if (Number(QUANTITY[NUMBER].textContent)>1) {
            const positionID = ID_ARR.lastIndexOf(CARD_ID);
            ID_ARR.splice(positionID, 1);
            STOCK[NUMBER].textContent = `${Number(STOCK[NUMBER].textContent) + 1}`;
            QUANTITY[NUMBER].textContent = `${Number(QUANTITY[NUMBER].textContent) - 1}`            
        }
        else {
            ID_ARR = ID_ARR.filter((el: string) => {
                return el !== `${CARD_ID}`;
            });
            displayProduct(arrItem, rows, currentPage, PRODUCT_ITEMS);
            
            Array.from(ITEM_NUMBER).forEach((item) => {
                item.innerText = `${Array.from(ITEM_NUMBER).indexOf(item)+1}`
            });
            if (Array.from(ITEM_NUMBER).length === 0) {
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