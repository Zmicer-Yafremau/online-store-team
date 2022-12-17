import { CARDS } from './cards/cards';

export function productDetail(cardID: number) {
    const MAIN = document.getElementsByClassName('main')[0] as HTMLElement;
    const ASIDE = document.getElementsByClassName('aside')[0] as HTMLElement;
    MAIN.innerHTML = '';
    ASIDE.remove();
    const currentProduct = CARDS.find((item) => item.id === cardID);
    MAIN.innerHTML = `
  
<div class="product-details">
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><a href="/">Главная</a></li>
      <li class="breadcrumb-item"><a href="#">${currentProduct.category}</a></li>
      <li class="breadcrumb-item"><a href="#">${currentProduct.brand}</a></li>
      <li class="breadcrumb-item active" aria-current="page">${currentProduct.title}</li>
    </ol>
  </nav>
    
  <div class="product-details__container container">
    
    <h2 class="product-details__title">${currentProduct.title}</h2>
    

  </div>
</div>`;
}
