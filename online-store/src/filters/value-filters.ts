import { CARDS } from '../components/cards/cards';
export function valueFilter() {
    const PARAMS = new URLSearchParams(location.search);
    const BRAND: string[] | null = (PARAMS.get('brand') as string)?.split(`↕`).filter((el) => el);
    const CATEGORY: string[] | null = (PARAMS.get('category') as string)?.split(`↕`).filter((el) => el);
    const MIN_STOCK: string | null = (PARAMS.get('stock') as string)?.split(`↕`)[0] || '0';
    const MAX_STOCK: string | null = (PARAMS.get('stock') as string)?.split(`↕`)[1];
    const MIN_PRICE: string | null = (PARAMS.get('price') as string)?.split(`↕`)[0] || '0';
    const MAX_PRICE: string | null = (PARAMS.get('price') as string)?.split(`↕`)[1];
    const SEARCH: string | null = PARAMS.get('search');
    const dataSorted = CARDS.filter((el) => {
        return (
            (BRAND ? BRAND.includes(el.brand.replaceAll(' ', '_')) : el) &&
            (CATEGORY ? CATEGORY.includes(el.category) : el) &&
            el.stock >= +MIN_STOCK &&
            ((PARAMS.get('stock') as string) ? el.stock <= +MAX_STOCK : el.stock) &&
            el.price >= +MIN_PRICE &&
            ((PARAMS.get('price') as string) ? el.price <= +MAX_PRICE : el.price) &&
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
