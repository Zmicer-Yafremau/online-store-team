import { fillSort } from '../filters/fill-n-sort';
export function react() {
    const SELECT = document.querySelector('.form-select') as HTMLSelectElement;
    const SEARCH = document.querySelector('.main__search') as HTMLInputElement;
    SEARCH.addEventListener('input', () => {
        const url = new URL(window.location.href);
        url.searchParams.set('search', SEARCH.value);
        history.replaceState(null, '', url);
        fillSort();
    });
    SELECT.addEventListener('change', () => {
        const url = new URL(window.location.href);
        url.searchParams.set('select', SELECT.value);
        history.replaceState(null, '', url);
        fillSort();
    });
}
