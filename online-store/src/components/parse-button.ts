import { cardIdName } from '../types/types';
import { CARDS } from './cards/cards';
export function parseButton(button: HTMLButtonElement): cardIdName {
    const CARD_ID = +button.classList[3].split('-')[1];
    const CARD_NAME =
        CARDS.find((el) => el.id === CARD_ID)
            ?.title.split(' ')
            .join('_') || '';
    return {
        id: CARD_ID,
        name: CARD_NAME,
    };
}
