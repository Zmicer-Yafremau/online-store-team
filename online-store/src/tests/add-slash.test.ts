import { addSlash } from '../components/add-slash';
describe('take string and return string with slash or not', () => {
    it('add slash if length > 2', () => {
        expect(addSlash('11')).toEqual('11');
        expect(addSlash('')).toEqual('');
        expect(addSlash('111')).toEqual('11/1');
    });
});
