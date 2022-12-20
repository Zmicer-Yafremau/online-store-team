import Page from '../../types/page';

class ProductPage extends Page {
    private idProduct: string;
    constructor(id: string, tagName: string, className: string, idProduct: string) {
        super(id, tagName, className);
        this.idProduct = idProduct;
    }

    public createContent() {
        //add  create innerHTML code
        const PAGECONTENT = 'enter Product';
        return PAGECONTENT;
    }

    render() {
        this.addPagesContent(this.createContent());
        return this.container;
    }
}

export default ProductPage;
