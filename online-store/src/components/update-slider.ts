import { countSlider } from './count-slider-values';
import { sliderValueType } from '../types/types';
export function updateSlider(sliderName: 'price' | 'stock') {
    const url = new URL(window.location.href);
    const CURRENT = url.searchParams.get(sliderName);
    const SLIDER_CONTAINER = document.getElementsByClassName(`${sliderName}__content`)[0] as HTMLDivElement;
    const RANGE_LEFT = SLIDER_CONTAINER.children[0].children[0] as HTMLSpanElement;
    const RANGE_MIDDLE = SLIDER_CONTAINER.children[0].children[1] as HTMLSpanElement;
    const RANGE_RIGHT = SLIDER_CONTAINER.children[0].children[2] as HTMLSpanElement;
    const INPUT_FROM = SLIDER_CONTAINER.children[1].children[0] as HTMLInputElement;
    const INPUT_TO = SLIDER_CONTAINER.children[1].children[1] as HTMLInputElement;
    INPUT_FROM.max = `${countSlider(sliderName).max - 1}`;
    INPUT_TO.max = `${countSlider(sliderName).max - 1}`;
    if (!CURRENT) {
        console.log('hello');
        INPUT_FROM.value = `${countSlider(sliderName).arr.findIndex((el) => el === countSlider(sliderName).left)}`;
        INPUT_TO.value = `${countSlider(sliderName).arr.findIndex((el) => el === countSlider(sliderName).right)}`;
        RANGE_LEFT.innerHTML = `${sliderName === 'price' ? '€' : ''}${
            (countSlider(sliderName) as sliderValueType).left
        }`;
        RANGE_RIGHT.innerHTML = `${sliderName === 'price' ? '€' : ''}${
            (countSlider(sliderName) as sliderValueType).right
        }`;
    } else {
        INPUT_FROM.value = `${countSlider(sliderName).arr.findIndex((el) => el === +CURRENT.split(`↕`)[0])}`;
        console.log('val=', INPUT_FROM.value);
        INPUT_TO.value = `${countSlider(sliderName).arr.findIndex((el) => el === +CURRENT.split(`↕`)[1])}`;
        RANGE_LEFT.innerHTML = `${sliderName === 'price' ? '€' : ''}${CURRENT.split(`↕`)[0]}`;
        RANGE_RIGHT.innerHTML = `${sliderName === 'price' ? '€' : ''}${+CURRENT.split(`↕`)[1]}`;
    }
    RANGE_MIDDLE.innerHTML = '-';
    if (RANGE_LEFT.innerHTML === RANGE_RIGHT.innerHTML) {
        RANGE_MIDDLE.innerHTML = RANGE_LEFT.innerHTML;
        RANGE_LEFT.innerHTML = '';
        RANGE_RIGHT.innerHTML = '';
    }
    if (!JSON.parse(localStorage.cards).length) {
        RANGE_LEFT.innerHTML = '';
        RANGE_RIGHT.innerHTML = '';
        RANGE_MIDDLE.innerHTML = 'NOT FOUND';
    }
}
