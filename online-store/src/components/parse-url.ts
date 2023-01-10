import { urlParseType } from '../types/types';
import { parseSlider } from './parse-slider';
import { parseFilter } from './parse-filter';
export function parseUrl(PARAMS: URLSearchParams): urlParseType {
    return {
        brand: parseFilter(PARAMS, 'brand'),
        category: parseFilter(PARAMS, 'category'),
        min_stock: parseSlider(PARAMS, 'stock', 'min'),
        max_stock: parseSlider(PARAMS, 'stock', 'max'),
        min_price: parseSlider(PARAMS, 'price', 'min'),
        max_price: parseSlider(PARAMS, 'price', 'max'),
    };
}
