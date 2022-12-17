import { CARDS } from './cards/cards';

export function productDetail(cardID: number) {
    const MAIN = document.getElementsByClassName('main')[0] as HTMLElement;
    const ASIDE = document.getElementsByClassName('aside')[0] as HTMLElement;
    MAIN.innerHTML = '';
    ASIDE.remove();

    MAIN.innerHTML = `
  
`;
}
