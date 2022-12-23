import Page from '../../types/page';
import { CARDS } from '../../components/cards/cards';
import { cardType } from '../../types/types';

class ProductPage extends Page {
    private idProduct: string;
    constructor(id: string, tagName: string, className: string, idProduct: string) {
        super(id, tagName, className);
        this.idProduct = idProduct;
    }

    public createContent() {
        const CURRENT_PRODUCT: cardType | undefined =
            CARDS.find((item) => item.id === Number(this.idProduct)) || CARDS[0];
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
        €${CURRENT_PRODUCT.price}.00
        <button type="button" class="btn btn-outline-dark">DROP FROM CART</button>
        <button type="button" class="btn btn-outline-dark">BUY NOW</button>
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

    public static imgChange() {
        const IMG_SMALL = document.querySelector('.slides-photo') as HTMLDivElement;
        const IMG_LARGE = document.querySelector('.grand-photo') as HTMLDivElement;

        IMG_SMALL.addEventListener('click', function (event) {
            const clickImage = (event.target as HTMLElement).closest('img');
            if (!clickImage) return;
            const VALUE = clickImage.getAttribute('src');
            const TITLE = clickImage.getAttribute('alt');
            IMG_LARGE.innerHTML = `<img alt="${TITLE}" src=${VALUE}>`;
        });
    }
}

export default ProductPage;
