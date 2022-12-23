import Page from '../../types/page';
import { CARDS } from '../../components/cards/cards';
import { cardType } from '../../types/types';

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
            console.log(result);
            result = `7777`;
            console.log(result);
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
                    <button>+</button> 1 <button>-</button>
                    </div>
                    <div class="amount-control"> €${item.price}.00 </div>
                    </div>
                    </div>
                    </div>`;
                }
                return sum + res;
            }, '')}`;

            console.log(result);

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
