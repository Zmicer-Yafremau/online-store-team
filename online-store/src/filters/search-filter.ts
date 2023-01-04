import { cardType } from '../types/types';
export function searchFilter(el: cardType, SEARCH: string): boolean {
    return (
        el.title.toLocaleLowerCase().includes(SEARCH.toLocaleLowerCase()) ||
        el.brand.toLocaleLowerCase().includes(SEARCH.toLocaleLowerCase()) ||
        el.category.toLocaleLowerCase().includes(SEARCH.toLocaleLowerCase()) ||
        el.price.toString().includes(SEARCH) ||
        el.discountPercentage.toString().includes(SEARCH) ||
        el.rating.toString().includes(SEARCH) ||
        el.stock.toString().includes(SEARCH.toLocaleLowerCase())
    );
}
