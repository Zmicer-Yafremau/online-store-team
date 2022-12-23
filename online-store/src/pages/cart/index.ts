import Page from '../../types/page';

class CartPage extends Page {
    constructor(id: string, tagName: string, className: string) {
        super(id, tagName, className);
    }

    public createContent() {
        //add  create innerHTML code
        const PAGECONTENT = 'enter Cart';
        return PAGECONTENT;
    }

    render() {
        this.addPagesContent(this.createContent());
        return this.container;
    }
}

export default CartPage;
