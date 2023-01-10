import { searchFilter } from '../filters/search-filter';
describe('Take cardType element and search value and check and return if there is matches in sny element property value', () => {
    it('return true if there is matches', () => {
        const el = {
            id: 1,
            title: 'iPhone 9',
            description: 'An apple mobile which is nothing like apple',
            price: 549,
            discountPercentage: 12.96,
            rating: 4.69,
            stock: 94,
            brand: 'Apple',
            category: 'smartphones',
            thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
            images: [
                'https://i.dummyjson.com/data/products/1/3.jpg',
                'https://i.dummyjson.com/data/products/1/4.jpg',
                'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
            ],
        };
        expect(searchFilter(el, '94')).toBeTruthy();
        expect(searchFilter(el, '99999999999')).toBeFalsy();
        expect(searchFilter(el, 'sm')).toBeTruthy();
    });
});
