import { CARDS } from '../components/cards/cards';
import { searchFilter } from './search-filter';
import { parseUrl } from '../components/parse-url';
export function valueFilter() {
    const PARAMS = new URLSearchParams(location.search);
    const BRAND = parseUrl(PARAMS).brand;
    const CATEGORY = parseUrl(PARAMS).category;
    const MIN_STOCK = parseUrl(PARAMS).min_stock;
    const MAX_STOCK = parseUrl(PARAMS).max_stock as string;
    const MIN_PRICE = parseUrl(PARAMS).min_price;
    const MAX_PRICE = parseUrl(PARAMS).max_price as string;
    const SEARCH = PARAMS.get('search');
    const dataSorted = CARDS.filter((el) => {
        return (
            (BRAND ? BRAND.includes(el.brand.replaceAll(' ', '_')) : el) &&
            (CATEGORY ? CATEGORY.includes(el.category) : el) &&
            el.stock >= +MIN_STOCK &&
            ((PARAMS.get('stock') as string) ? el.stock <= +MAX_STOCK : el.stock) &&
            el.price >= +MIN_PRICE &&
            ((PARAMS.get('price') as string) ? el.price <= +MAX_PRICE : el.price) &&
            (SEARCH ? searchFilter(el, SEARCH) : el)
        );
    });
    localStorage.setItem('cards', JSON.stringify(dataSorted));
}
