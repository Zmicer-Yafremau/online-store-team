import { cardType } from '../types/types';
import { CARDS } from './cards/cards';
export function countSum<T>(basket: T[]): string {
    return `${basket.reduce((sum: number, current: T) => {
        if (CARDS.find((item) => item.id === Number(current))) {
            sum = sum + (CARDS.find((item) => item.id === Number(current)) as cardType)?.price;
        }
        return sum;
    }, 0)}`;
}
