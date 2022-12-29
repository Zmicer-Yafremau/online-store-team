import { CARDS } from "../../components/cards/cards";
import { cardType } from "../../types/types";
import CartPage from ".";

export function displayProduct(arrItem: string[], rows: number, currentPage: number, PRODUCT_ITEMS: HTMLDivElement) { 
  PRODUCT_ITEMS.innerHTML = "";
  currentPage--;

  const start: number = rows * currentPage;
  const end: number = start + rows;
  const paginatedData = arrItem.slice(start, end);
  console.log(rows);
  console.log(paginatedData);

  PRODUCT_ITEMS.innerHTML = `${paginatedData.reduce((sum, currentId) => {
      let res = '';
      const item = CARDS.find((item) => item.id === Number(currentId)) as cardType;
      let quantityCart: number = JSON.parse(localStorage.basket).reduce((sum: number, current: string) => {
          if (current === String(item.id)) {
              sum = sum + 1;
          }
          return sum;
      }, 0);

      console.log([...new Set(JSON.parse(localStorage.basket))].indexOf(String(item.id) as never) + 1);

      res = `<div class="app-cart-item card__${item.id}">
      <div class="cart-item">
      <div class="item-i">${[...new Set(JSON.parse(localStorage.basket))].indexOf(String(item.id) as never) + 1}</div>
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
      <div class="stock-control"> Stock: <span class="stock">${item.stock - quantityCart}</span></div>
      <div class="incDec-control card__${item.id}">
      <button type="button" class="btn btn-outline-dark card__add-button ${paginatedData.indexOf(String(item.id) as never)}">+</button>
      <span class="quantity"> ${quantityCart} </span>
      <button type="button" class="btn btn-outline-dark card__remove-button ${paginatedData.indexOf(String(item.id) as never)}">-</button>
      </div>
      <div class="amount-control">€ ${item.price}</div>
      </div>
      </div>
      </div>`;
      return sum + res;
  }, '')}`;
    CartPage.addEvents();
}
