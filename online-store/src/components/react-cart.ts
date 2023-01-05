export function reactCart() {
    const CART = document.querySelector('.header__cart-quantity') as HTMLSpanElement;
    const CART_ICON = CART.parentElement as HTMLDivElement;
    CART_ICON.addEventListener('click', () => {
        location.replace(`${location.origin}${location.pathname}#cart`);
    });
}
