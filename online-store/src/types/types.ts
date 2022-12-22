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
};
