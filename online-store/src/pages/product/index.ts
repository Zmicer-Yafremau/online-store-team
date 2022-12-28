import Page from '../../types/page';
import { CARDS } from '../../components/cards/cards';
import { cardType } from '../../types/types';
import { addToBasket } from '../../components/add-to-basket';
import { buttonBuy } from './button-buy';

class ProductPage extends Page {
    private idProduct: string;
    constructor(id: string, tagName: string, className: string, idProduct: string) {
        super(id, tagName, className);
        this.idProduct = idProduct;
    }

    public createContent() {
        const CURRENT_PRODUCT: cardType =
            CARDS.find((item) => item.id === Number(this.idProduct)) as cardType;
        const IMG_PRODUCT = imagesProduct(CURRENT_PRODUCT);
        const IMG_GRAND = ` <img alt="${CURRENT_PRODUCT.title}" src=${
            CURRENT_PRODUCT.images[CURRENT_PRODUCT.images.length - 1]
        }>`;
        function imagesProduct(CURRENT_PRODUCT: cardType) {
            let result = '';
            CURRENT_PRODUCT.images.forEach((value: string) => {
                result = result + ` <img alt="${CURRENT_PRODUCT.title}" src=${value}>`;
            });
            return result;
        }

        const ID_ARR: string[] = JSON.parse(localStorage.basket);
        const TOTAL_SUM = document.getElementsByClassName('header__total-sum')[0] as HTMLSpanElement;
        const CART = document.querySelector('.header__cart-quantity') as HTMLSpanElement;

        localStorage.basket = JSON.stringify(ID_ARR);
        if (!JSON.parse(localStorage.basket).length) {
            CART.classList.add('visually-hidden');
            CART.innerHTML = '';
            TOTAL_SUM.innerHTML = '0';
        }
        if (JSON.parse(localStorage.basket).length) {
            CART.classList.remove('visually-hidden');
            CART.innerHTML = `${JSON.parse(localStorage.basket).length}`;
            TOTAL_SUM.innerHTML = `${JSON.parse(localStorage.basket).reduce((sum: number, current: string) => {
                if (CARDS.find((item) => item.id === Number(current))) {
                sum = sum + (CARDS.find((item) => item.id === Number(current))as cardType)?.price;
                }
                return sum;
            }, 0)}`;
        }

        const PAGE_CONTENT = `
        <div class="product-details container">
        <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="/">STORE</a></li>
        <li class="breadcrumb-item"><a href="#">${CURRENT_PRODUCT.category.toUpperCase()}</a></li>
        <li class="breadcrumb-item"><a href="#">${CURRENT_PRODUCT.brand}</a></li>
        <li class="breadcrumb-item active" aria-current="page">${CURRENT_PRODUCT.title}</li>
        </ol>
        </nav>
        <div class="product-details__container">
        <h2 class="product-details__title">${CURRENT_PRODUCT.title}</h2>
        <div class="product-data">
        <div class="product-photo">
        <div class="slides-photo">
        ${IMG_PRODUCT}
        </div>
        <div class="grand-photo">
        ${IMG_GRAND}
        </div>
        </div>
        <div class="product-info">
        <div class="product-detail-item">
        <h4>Description:</h4>
        <p>${CURRENT_PRODUCT.description}</p>
        <div class="product-detail-item">
        </div>
        <h4>Discount Percentage:</h4>
        <p>${CURRENT_PRODUCT.price}</p>
        </div>
        <div class="product-detail-item">
        <h4>Rating:</h4>
        <p>${CURRENT_PRODUCT.rating}</p>
        </div>
        <div class="product-detail-item">
        <h4>Stock:</h4>
        <p>${CURRENT_PRODUCT.stock}</p>
        </div>
        <div class="product-detail-item">
        <h4>Brand:</h4>
        <p>${CURRENT_PRODUCT.brand}</p>
        </div>
        <div class="product-detail-item">
        <h4>Category:</h4>
        <p>${CURRENT_PRODUCT.category}</p>
        </div>
        </div>
        <div class="add-to-cart">
        <div class="cart-button">
        € ${CURRENT_PRODUCT.price}
        <button type="button" class="btn btn-outline-dark card__drop-button card__${CURRENT_PRODUCT.id} add">CART</button>
        <button type="button" class="btn btn-outline-dark card__drop-button card__${CURRENT_PRODUCT.id} buy">BUY NOW</button>
        </div>
        </div>
        </div>
        </div>
        </div>`;
        return PAGE_CONTENT;
    }

    render() {
        this.addPagesContent(this.createContent());
        return this.container;
    }

    public static addEvents() {
        const IMG_SMALL = document.querySelector('.slides-photo') as HTMLDivElement;
        const IMG_LARGE = document.querySelector('.grand-photo') as HTMLDivElement;
        IMG_SMALL.addEventListener('click', function (event) {
            const clickImage = (event.target as HTMLElement).closest('img');
            if (!clickImage) return;
            const VALUE = clickImage.getAttribute('src');
            const TITLE = clickImage.getAttribute('alt');
            IMG_LARGE.innerHTML = `<img alt="${TITLE}" src=${VALUE}>`;
        });

        const CART = document.querySelector('.header__cart-quntity') as HTMLSpanElement;
        const CART_ICON = CART.parentElement as HTMLDivElement;
        CART_ICON.addEventListener('click', () => {
            location.replace(`${location.origin}#cart`);
        });

        //add to main page on logo

        const ADD = document.getElementsByClassName('card__drop-button') as HTMLCollectionOf<HTMLButtonElement>;
        const TOTAL_SUM = document.getElementsByClassName('header__total-sum')[0] as HTMLSpanElement;
        const CARD_ID_CLASS = ADD[0].classList[3];
        const CARD_ID = CARD_ID_CLASS.split('__')[1];

        if (JSON.parse(localStorage.basket).includes(CARD_ID)) {
            ADD[0].classList.remove('add');
            ADD[0].classList.add('remove');
        }
        else {
            const ADD_TO_CART = buttonBuy(CART, TOTAL_SUM, CARD_ID, ADD[1]);
            ADD[1].addEventListener('click', ADD_TO_CART);
        }
        const ADD_TO_CART = addToBasket(CART, TOTAL_SUM, CARD_ID, ADD[0]);
        ADD[0].addEventListener('click', ADD_TO_CART);
        ADD[0].addEventListener('click', () => {
            ADD[0].classList.toggle('active');
        });
        ADD[1].addEventListener('click', () => {
            location.replace(`${location.origin}#cart`);
        });
    }
}

export default ProductPage;
