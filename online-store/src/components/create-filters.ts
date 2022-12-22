import { CARDS } from './cards/cards';
import { countQuantity } from './count-brands-cat-quantity';
import { updateQuantity } from './update-brand-cat-quantity';
export function createFilters() {
    const BRAND_CONTAINER = document.getElementsByClassName('checkboxes__brand')[0].children[1] as HTMLDivElement;
    const CATEGORY_CONTAINER = document.getElementsByClassName('checkboxes__category')[0].children[1] as HTMLDivElement;
    const BRAND_SET = new Set();
    const CATEGORY_SET = new Set();
    CARDS.forEach((value) => {
        if (!BRAND_SET.has(value.brand)) {
            const BRAND_LINE = document.createElement('div');
            BRAND_LINE.className = `brand__line brand__${value.category}`;
            BRAND_CONTAINER?.append(BRAND_LINE);
            BRAND_LINE.innerHTML = `
    <div>
        <input class="form-check-input brand__input" type="checkbox" value="" id="${value.brand.replaceAll(
            ' ',
            '_'
        )}" />
        <label class="form-check-label brand__label" for="${value.brand.replaceAll(' ', '_')}">${value.brand}</label>
    </div>
    <div>
        <span class="brand__${value.brand.replaceAll(' ', '_')} brand__on-page">(${
                countQuantity(JSON.parse(localStorage.cards))[value.brand.replaceAll(' ', '_')] | 0
            }/${countQuantity(CARDS)[value.brand.replaceAll(' ', '_')]})</span>
    </div>
    `;
            BRAND_SET.add(value.brand);
        }
        if (!CATEGORY_SET.has(value.category)) {
            const CATEGORY_LINE = document.createElement('div');
            CATEGORY_LINE.className = `category__line category__${value.category}`;
            CATEGORY_CONTAINER?.append(CATEGORY_LINE);
            CATEGORY_LINE.innerHTML = `
    <div>
        <input class="form-check-input category__input" type="checkbox" value="" id="${value.category}" />
        <label class="form-check-label category__label" for="${value.category}">${value.category}</label>
    </div>
    <div>
        <span class="category__${value.category} category__on-page">(${
                countQuantity(JSON.parse(localStorage.cards))[value.category] | 0
            }/${countQuantity(CARDS)[value.category]})</span>
    </div>
    `;
            CATEGORY_SET.add(value.category);
        }
    });
    updateQuantity();
}
