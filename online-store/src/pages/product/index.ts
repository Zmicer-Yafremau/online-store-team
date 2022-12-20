import Page from '../../core/templates/page';

class ProductPage extends Page {
    constructor(id: string, tagName: string, className: string) {
        super(id, tagName, className);
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
