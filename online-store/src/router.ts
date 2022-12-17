export function route() {
    const route = (event: Event) => {
        event = event || window.event;
        event.preventDefault();
        const target = event.target as HTMLElement;
        const href = target.getAttribute('href');
        window.history.pushState({}, '', href);
        handleLocation();
    };

    type routesPath = {
        [key: string]: string;
    };

    const routes: routesPath = {
        404: '/pages/404.html',
        '/': '/index.html',
        '/product-details/1': '/product-details.html',
        '/cart': '/cart.html',
    };

    const handleLocation = async () => {
        console.log('click');
        const path: string = window.location.pathname;
        const route = routes[path] || routes[404];
        const html = await fetch(route).then((data) => data.text());
        const mainPage = document.getElementById('main-page') as HTMLDivElement;
        mainPage.innerHTML = html;
    };

    window.onpopstate = handleLocation;
    window.addEventListener('DOMContentLoaded', handleLocation);
    
    interface superWindow extends Window {
        route: (event: Event) => void;
    }

    ((window as unknown) as superWindow).route = route;
   
    if (performance.navigation.type === 1) {
        handleLocation();
      console.log( "Страница перезагружена" );
      } else {
      console.log( "Страница не перезагружена");
      }

    handleLocation();
}
