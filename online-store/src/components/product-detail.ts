import { cardType } from '../types/types';
import { CARDS } from './cards/cards';

export function productDetail(cardID: number) {
    const MAIN = document.getElementsByClassName('main')[0] as HTMLElement;
    const ASIDE = document.getElementsByClassName('aside')[0] as HTMLElement;
    const BODY = document.getElementsByClassName('body')[0] as HTMLElement;
    MAIN.innerHTML = '';
    ASIDE.remove();
    BODY.style.gridTemplateAreas =
        '"A A A A A A A A A A A A A A" "C C C C C C C C C C C C C C" "C C C C C C C C C C C C C C" "C C C C C C C C C C C C C C" "C C C C C C C C C C C C C C" "C C C C C C C C C C C C C C" "C C C C C C C C C C C C C C" "C C C C C C C C C C C C C C"  "C C C C C C C C C C C C C C" "C C C C C C C C C C C C C C" "D D D D D D D D D D D D D D"';
    const currentProduct: cardType | undefined = CARDS.find((item) => item.id === cardID) || CARDS[0];
    const imgProduct = imagesProduct(currentProduct);
    const imgGrand = ` <img alt="${currentProduct.title}" src=${
        currentProduct.images[currentProduct.images.length - 1]
    }>`;
    function imagesProduct(currentProduct: cardType) {
        let result = '';
        currentProduct.images.forEach((value: string) => {
            result = result + ` <img alt="${currentProduct.title}" src=${value}>`;
        });
        return result;
    }

    MAIN.innerHTML = `
  
<div class="product-details container">
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><a href="/">STORE</a></li>
      <li class="breadcrumb-item"><a href="#">${currentProduct.category.toUpperCase()}</a></li>
      <li class="breadcrumb-item"><a href="#">${currentProduct.brand}</a></li>
      <li class="breadcrumb-item active" aria-current="page">${currentProduct.title}</li>
    </ol>
  </nav>
    
  <div class="product-details__container">
    <h2 class="product-details__title">${currentProduct.title}</h2>
    <div class="product-data">
    <div class="product-photo">
    <div class="slides-photo">
    ${imgProduct}
    </div>
    <div class="grand-photo">
    ${imgGrand}
    </div>
    </div>
    <div class="product-info">
    <div class="product-detail-item">
    <h4>Description:</h4>
    <p>${currentProduct.description}</p>
    </div>
    <div class="product-detail-item">
    <h4>Discount Percentage:</h4>
    <p>${currentProduct.price}</p>
    </div>
    <div class="product-detail-item">
    <h4>Rating:</h4>
    <p>${currentProduct.rating}</p>
    </div>
    <div class="product-detail-item">
    <h4>Stock:</h4>
    <p>${currentProduct.stock}</p>
    </div>
    <div class="product-detail-item">
    <h4>Brand:</h4>
    <p>${currentProduct.brand}</p>
    </div>
    <div class="product-detail-item">
    <h4>Category:</h4>
    <p>${currentProduct.category}</p>
    </div>
    </div>
    <div class="add-to-cart">
    <div class="cart-button">
     €${currentProduct.price}.00
     <button type="button" class="btn btn-outline-dark">DROP FROM CART</button>
     <button type="button" class="btn btn-outline-dark">BUY NOW</button>
     </div>
    </div>
    </div>
  </div>
</div>`;

    const imgSmall = document.querySelector('.slides-photo') as HTMLDivElement;
    const imgLarge = document.querySelector('.grand-photo') as HTMLDivElement;

    imgSmall.addEventListener('click', function (event) {
        const clickImage = (event.target as HTMLElement).closest('img');
        if (!clickImage) return;
        const value = clickImage.getAttribute('src');
        console.log(clickImage);
        imgLarge.innerHTML = `<img alt="${currentProduct.title}" src=${value}>`;
    });
}
