import { cardType } from '../types/types';
import { CARDS } from './cards/cards';
export function countSum(basket: string[]): string {
    return `${basket.reduce((sum: number, current: string) => {
        if (CARDS.find((item) => item.id === Number(current))) {
            sum = sum + (CARDS.find((item) => item.id === Number(current)) as cardType)?.price;
        }
        return sum;
    }, 0)}`;
}
