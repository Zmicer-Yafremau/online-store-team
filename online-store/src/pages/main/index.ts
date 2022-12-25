import Page from '../../types/page';
class MainPage extends Page {
    constructor(id: string, tagName: string, className: string) {
        super(id, tagName, className);
    }

    public createContent() {
        //add  create innerHTML code
        const PAGECONTENT = `
        <div class="switch btn bg-light btn-lg">SHOW FILTERS</div>
    <aside class="aside in">
        <div class="asside__panel">
            <div class="aside__content">
                <div class="aside__buttons between">
                    <button type="button" class="reset btn btn-outline-dark btn-lg">RESET FILTERS</button>
                    <button type="button" class="reset-all btn btn-outline-dark btn-lg">RESET ALL</button>
                    <button type="button" class="copy btn btn-outline-dark btn-lg">COPY LINK</button>
                </div>
                <div class="checkboxes checkboxes__category category">
                    <div class="aside__header checkbox__header center">Category</div>
                    <div class="checkbox__content between">
                    </div>
                </div>
                <div class="checkboxes checkboxes__brand brand">
                    <div class="aside__header checkbox__header center">Brand</div>
                    <div class="checkbox__content"></div>
                </div>
                <div class="range price">
                    <div class="aside__header range__header center">Price</div>
                    <div class="range__content price__content center">
                        <div class="range__values between">
                            <span class="range__left price__left">100</span>
                            <span class="range__middle price__middle"> - </span>
                            <span class="range__right price__right">100</span>
                        </div>
                        <div class="sliders_control">
                            <input class="fromSlider price__l-input" type="range" value="20" min="0" max="100"/>
                            <input class="toSlider price__r-input" type="range" value="80" min="0" max="100"/>
                        </div>
                    </div>
                </div>
                <div class="range stock">
                    <div class="aside__header range__header center">Stock</div>
                    <div class="range__content stock__content center">
                        <div class="range__values between">
                            <span class="range__left stock__left">100</span>
                            <span class="range__middle stock__middle"> - </span>
                            <span class="range__right stock__right">100</span>
                        </div>
                        <div class="sliders_control">
                            <input class="fromSlider stock__l-input" type="range" value="20" min="0" max="100"/>
                            <input class="toSlider stock__r-input" type="range" value="80" min="0" max="100"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </aside>
    <section class="products">
        <div class="accordion main__filters" id="accordionExample">
            <div class="accordion-item">
                <h2 class="accordion-header" id="headingOne">
                    <button
                        class="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                    >
                        SORTS
                    </button>
                </h2>
                <div
                    id="collapseOne"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                >
                    <div class="accordion-body d-flex justify-content-between align-items-center">
                        <select class="form-select" aria-label="Default select example">
                            <option selected>Select options:</option>
                            <option value="1">Sort by price ASC</option>
                            <option value="2">Sort by price DESC</option>
                            <option value="3">Sort by rating ASC</option>
                            <option value="4">Sort by rating DESC</option>
                            <option value="5">Sort by discount ASC</option>
                            <option value="6">Sort by discount DESC</option>
                        </select>
                        <div class="main__found">FOUND: <span class="main__found-span"></span></div>
                        <input class="main__search" type="search" placeholder="Search by name" autofocus />
                        <div class="size size__large between active">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                        <div class="size size__small between">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="main__content"></div>
    </section>
        `;
        return PAGECONTENT;
    }

    render() {
        this.addPagesContent(this.createContent());
        return this.container;
    }
}

export default MainPage;
