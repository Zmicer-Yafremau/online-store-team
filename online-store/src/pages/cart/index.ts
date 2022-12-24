import Page from '../../types/page';
import { CARDS } from '../../components/cards/cards';

class CartPage extends Page {
    constructor(id: string, tagName: string, className: string) {
        super(id, tagName, className);
    }

    public createContent() {
        let id: number[] = [];
        let result: string = `1234`;
        id.push(1);
        id.push(2);
        localStorage.basket = JSON.stringify(id);
        let pageContent = `
            <div class="cart-page">
            <h1>Cart is Empty</h1>
            </div>`;
        if(localStorage.basket) {
            const ID_ARR: number[]|string[] = JSON.parse(localStorage.basket);
            console.log(ID_ARR);
            result = `${CARDS.reduce((sum, item) => {
                let res = '';
            if (ID_ARR.includes(item.id as never)) {
                    res =
                    `<div class="app-cart-item">
                    <div class="cart-item">
                    <div class="item-i">${ID_ARR.indexOf(item.id as never)+1}</div>
                    <div class="item-info">
                    <img alt="${item.title}" src="${item.images[item.images.length - 1]}">
                    <div class="item-detail-p">
                    <div class="product-title">
                    <h6>${item.title}</h6>
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
                    <button type="button" class="btn btn-outline-dark">+</button> 1 <button type="button" class="btn btn-outline-dark">-</button>
                    </div>
                    <div class="amount-control"> €${item.price}.00 </div>
                    </div>
                    </div>
                    </div>`;
                }
                return sum + res;
            }, '')}`;

            const TOTAL_SUM = `${CARDS.reduce((sum, item) => {
                let curPrice = 0;
                if (ID_ARR.includes(item.id as never)) {
                    curPrice = item.price;
                    console.log(curPrice);
                }
                return sum + curPrice;
            }, 0)}`;

            pageContent = `
            <div class="cart-page">
            <div class="cart_container container">
            <div class="products-in-cart">
            <div class="title-and-page-control">
            <h2>Products In Cart</h2>
            <div class="page-control">
            <div class="limit">
            ITEMS: <input type="text" class="number-on-page">
            </div>
            <div class="page-numbers">
            PAGE: 
            <button>
            &lt;
            </button>
            <span>1</span>
            <button>
            &gt; 
            </button>
            </div>
            </div>
            </div>            
            <div class="prod-items">
            ${result}
            </div>
            </div>
            <div class="total-cart">
            <h2>Summary</h2>
            <div class="total-price">
            <span>Products: </span>${ID_ARR.length}</div>
            <div class="total-price">
            <span>Total: </span>€${TOTAL_SUM}.00</div>
            <div class="promo-code">
            <input type="search" placeholder="Enter promo code" class=""></div>
            <button class="btn btn-outline-dark">BUY NOW</button>
            </div>
            </div>
            </div>
            `;
            return pageContent;
        }
        return pageContent;
    }

    render() {
        this.addPagesContent(this.createContent());
        return this.container;
    }
}

export default CartPage;
