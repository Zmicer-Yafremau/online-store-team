import { cardType } from '../types/types';
export function sortFilter(): void {
    const PARAMS = new URLSearchParams(location.search);
    let dataSorted = JSON.parse(localStorage.cards);
    const SELECT_VALUE = PARAMS.get('select');
    console.log(SELECT_VALUE);
    if (SELECT_VALUE === '1') {
        dataSorted = dataSorted.sort((a: cardType, b: cardType): number => {
            if (a.price > b.price) return 1;
            if (a.price < b.price) return -1;
            return 0;
        });
    } else if (SELECT_VALUE === '2') {
        dataSorted = dataSorted.sort((a: cardType, b: cardType): number => {
            if (a.price > b.price) return -1;
            if (a.price < b.price) return 1;
            return 0;
        });
    } else if (SELECT_VALUE === '3') {
        dataSorted = dataSorted.sort((a: cardType, b: cardType): number => {
            if (a.rating > b.rating) return 1;
            if (a.rating < b.rating) return -1;
            return 0;
        });
    } else if (SELECT_VALUE === '4') {
        dataSorted = dataSorted.sort((a: cardType, b: cardType): number => {
            if (a.rating > b.rating) return -1;
            if (a.rating < b.rating) return 1;
            return 0;
        });
    } else if (SELECT_VALUE === '5') {
        dataSorted = dataSorted.sort((a: cardType, b: cardType): number => {
            if (a.discountPercentage > b.discountPercentage) return 1;
            if (a.discountPercentage < b.discountPercentage) return -1;
            return 0;
        });
    } else if (SELECT_VALUE === '6') {
        dataSorted = dataSorted.sort((a: cardType, b: cardType): number => {
            if (a.discountPercentage > b.discountPercentage) return -1;
            if (a.discountPercentage < b.discountPercentage) return 1;
            return 0;
        });
    }
    localStorage.setItem('cards', JSON.stringify(dataSorted));
}
