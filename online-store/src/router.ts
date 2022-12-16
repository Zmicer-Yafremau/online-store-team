const route = (event: Event) => {
  event = event || window.event;
  event.preventDefault();
  let target = event.target as HTMLElement;
  let href = target.getAttribute('href');
  window.history.pushState({}, "", href);
  handleLocation();
};

type routesPath = {
  [key: string]: string;
}

const routes: routesPath = {
  404: "/pages/404.html",
  "/": "/index.html",
  "/product-details/1": "/pages/product-details.html",
  "/cart": "/pages/cart.html",
};

const handleLocation = async () => {
  const path: string = window.location.pathname;
  const route = routes[path] || routes[404];
  const html = await fetch(route).then((data) => data.text());
  const mainPage = document.getElementById("main-page") as HTMLDivElement;
  mainPage.innerHTML = html;
};



window.onpopstate = handleLocation;
window.addEventListener('DOMContentLoaded', handleLocation);
//window.route = route;

handleLocation();