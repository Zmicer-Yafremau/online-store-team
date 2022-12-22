import Page from '../../types/page';
import { CARDS } from '../../components/cards/cards';
import { cardType } from '../../types/types';

class CartPage extends Page {
    constructor(id: string, tagName: string, className: string) {
        super(id, tagName, className);
    }

    public createContent() {
        let pageContent = '123';
        const id = CARDS[0];
        let result: string = ``;
        localStorage.basket = JSON.stringify(id);
        if (!localStorage.basket) {
            pageContent = `
            <div class="cart-page">
            <h1>Cart is Empty</h1>
            </div>`;
        } else {
            const ID_ARR: cardType[] = JSON.parse(localStorage.basket);
            console.log(ID_ARR);
            result = Array.from(ID_ARR).map((item) => {
                const CART_ITEM = `
            <div class="app-cart-item">
            <div class="cart-item">
            <div class="item-i">${ID_ARR.indexOf(item)}</div>

            <div class="item-info" tabindex="0">
            <img alt="${item.title}" src="${item.images[item.images.length - 1]}">
            <div class="item-detail-p">
            <div class="product-title">
            <h3>${item.title}</h3>
            </div>
            <div class="product-description">${item.description}</div>
            <div class="product-other">
            <div>Rating: ${item.rating}</div>
            <div>Discount: ${item.discountPercentage}</div>
            </div>
            </div>
            </div>

            <div class="number-control">
            <div class="stock-control"> Stock: ${item.stock} </div>
            <div class="incDec-control">
            <button>+</button> 1 <button>-</button>
            </div>
            <div class="amount-control"> €549.00 </div>
            </div>
            </div>
            </div>
            `;
                return CART_ITEM;
            }).join(' ');

            console.log(result);

            pageContent = `
            <div class="cart-page">
            <div class="cart_container container">

            <div class="products-in-cart">

            <div class="title-and-page-control">
            <h2>Products In Cart</h2>
            <div class="page-control">
            <div class="limit">
            ITEMS: <input type="text" class="ng-untouched ng-pristine ng-valid">
            </div>
            <div class="page-numbers">
            PAGE: 
            <button _ngcontent-tnt-c>
            &lt;
            </button>
            <span _ngcontent-tnt-c24="">1</span>
            <button _ngcontent-tnt-c24="">
            &gt; 
            </button>
            </div>
            </div>
            </div>
            
            <div class="prod-items">
            ${result}
            </div>

            </div>




            </div>
            </div>
            
            `;
        }

        return pageContent;
    }

    render() {
        this.addPagesContent(this.createContent());
        return this.container;
    }
}

export default CartPage;
