import { countQuantity } from './count-brands-cat-quantity';
export function updateQuantity() {
    const BRAND_SPANS = (document.getElementsByClassName('brand__on-page') as unknown) as NodeListOf<HTMLSpanElement>;
    const CATEGORY_SPANS = (document.getElementsByClassName(
        'category__on-page'
    ) as unknown) as NodeListOf<HTMLSpanElement>;
    const COUNT = (el: HTMLSpanElement) => {
        const PARAM = el.classList[0].split('__')[1];
        console.log(PARAM);
        const tempHTMLArr = el.innerHTML.split('');
        tempHTMLArr.splice(1, 1, `${countQuantity(JSON.parse(localStorage.cards))[PARAM] | 0}`);
        const tempHTML = tempHTMLArr.join('');
        el.innerHTML = `${tempHTML}`;
        if (tempHTML[1] === '0') el.parentElement?.parentElement?.classList.add('zero');
        else el.parentElement?.parentElement?.classList.remove('zero');
    };
    Array.from(BRAND_SPANS).forEach(COUNT);
    Array.from(CATEGORY_SPANS).forEach(COUNT);
}
