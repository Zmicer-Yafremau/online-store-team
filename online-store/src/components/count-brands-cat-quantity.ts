import { CARDS } from './cards/cards';
import { quantityObject } from '../types/types';
export function countQuantity(): quantityObject {
    return CARDS.reduce((obj: quantityObject, current) => {
        if (!obj[current.brand]) {
            obj[current.brand] = 1;
        } else {
            obj[current.brand] += 1;
        }

        if (!obj[current.category]) {
            obj[current.category] = 1;
        } else {
            obj[current.category] += 1;
        }
        return obj;
    }, {});
}
