export type cardType = {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
};
export type quantityObject = {
    [word: string]: number;
};
export type sliderValueType = {
    max: number;
    left: number;
    right: number;
    arr: number[];
};
export type promoCodes = {
    title: string;
    description: string;
    discount: number;
};
export type cardIdName = {
    id: number,
    name: string
}
export type urlParseType = {
       brand: string[] | null,
        category: string[] | null,
        min_stock: string,
        max_stock: string | null,
        min_price: string,
        max_price: string | null,
}
