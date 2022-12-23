import { cardType } from '../types/types';
import { CARDS } from './cards/cards';
import { sliderValueType } from '../types/types';
export function countSlider(sliderName: 'price' | 'stock'): sliderValueType {
    const SLIDER_SET = new Set(CARDS.map((el) => el[sliderName]));
    const ARRAY_OF_VALUES = Array.from(SLIDER_SET).sort((a, b) => a - b);
    const SLIDER_SET_ON_PAGE = new Set(JSON.parse(localStorage.cards).map((el: cardType) => el[sliderName]));
    const ARRAY_OF_VALUES_ON_PAGE = (Array.from(SLIDER_SET_ON_PAGE) as number[]).sort((a, b) => a - b);
    const SLIDER_MAX = ARRAY_OF_VALUES.length;
    const LEFT_SPAN = ARRAY_OF_VALUES_ON_PAGE[0];
    const RIGHT_SPAN = ARRAY_OF_VALUES_ON_PAGE[ARRAY_OF_VALUES_ON_PAGE.length - 1];
    return { max: SLIDER_MAX, left: LEFT_SPAN, right: RIGHT_SPAN, arr: ARRAY_OF_VALUES };
}
