import { CARDS } from '../components/cards/cards';
export function valueFilter() {
    const PARAMS = new URLSearchParams(location.search);
    const BRAND: string[] | null = (PARAMS.get('brand') as string)?.split(`↕`).filter((el) => el);
    const CATEGORY: string[] | null = (PARAMS.get('category') as string)?.split(`↕`).filter((el) => el);
    /*const MIN_STOCK: string = localStorage.stock;
    const MAX_STOCK: string = localStorage.stock;
    const MIN_PRICE: string = localStorage.price;
    const MAX_PRICE: string = localStorage.price;*/
    const SEARCH: string | null = PARAMS.get('search');
    console.log(CATEGORY);
    const dataSorted = CARDS.filter((el) => {
        return (
            (BRAND ? BRAND.includes(el.brand.replaceAll(' ', '_')) : el) &&
            (CATEGORY ? CATEGORY.includes(el.category) : el) &&
            (SEARCH
                ? el.title.toLocaleLowerCase().includes(SEARCH.toLocaleLowerCase()) ||
                  el.brand.toLocaleLowerCase().includes(SEARCH.toLocaleLowerCase()) ||
                  el.category.toLocaleLowerCase().includes(SEARCH.toLocaleLowerCase()) ||
                  el.price.toString().includes(SEARCH) ||
                  el.discountPercentage.toString().includes(SEARCH) ||
                  el.rating.toString().includes(SEARCH) ||
                  el.stock.toString().includes(SEARCH.toLocaleLowerCase())
                : el)
        );
    });
    localStorage.setItem('cards', JSON.stringify(dataSorted));
}

/*el.stock >= +MIN_STOCK &&
            el.stock <= +MAX_STOCK && 
            el.price >= +MIN_PRICE &&
            el.price <= +MAX_MAX_PRICE && */
