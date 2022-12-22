import { quantityObject } from '../types/types';
import { cardType } from '../types/types';
export function countQuantity(CARDS: cardType[]): quantityObject {
    return CARDS.reduce((obj: quantityObject, current) => {
        if (!obj[current.brand]) {
            obj[current.brand.replaceAll(' ', '_')] = 1;
        } else {
            obj[current.brand.replaceAll(' ', '_')] += 1;
        }

        if (!obj[current.category]) {
            obj[current.category] = 1;
        } else {
            obj[current.category] += 1;
        }
        return obj;
    }, {});
}
