import { CARDS } from '../components/cards/cards';
export function valueFilter() {
    const PARAMS = new URLSearchParams(location.search);
    /*const BRAND: string[] = JSON.parse(localStorage.brand);
    const CATEGORY: string[] = JSON.parse(localStorage.category);
    const MIN_STOCK: string = localStorage.stock;
    const MAX_STOCK: string = localStorage.stock;
    const MIN_PRICE: string = localStorage.price;
    const MAX_PRICE: string = localStorage.price;*/
    const SEARCH: string | null = PARAMS.get('search');
    const dataSorted = CARDS.filter((el) => {
        return (
            /*  BRAND.includes(el.brand) &&
            CATEGORY.includes(el.category) &&
            el.stock >= +MIN_STOCK &&
            el.stock <= +MAX_STOCK && 
            el.price >= +MIN_PRICE &&
            el.price <= +MAX_MAX_PRICE && */
            SEARCH ? el.category.toLocaleLowerCase().includes(SEARCH.toLocaleLowerCase()) : el
        );
    });
    localStorage.setItem('cards', JSON.stringify(dataSorted));
}
