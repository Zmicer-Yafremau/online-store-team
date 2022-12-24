import { countSlider } from './count-slider-values';
import { sliderValueType } from '../types/types';
export function updateSlider(sliderName: 'price' | 'stock') {
    console.log(sliderName);
    const url = new URL(window.location.href);
    const CURRENT = url.searchParams.get(sliderName);
    const SLIDER_CONTAINER = document.getElementsByClassName(`${sliderName}__content`)[0] as HTMLDivElement;
    const RANGE_LEFT = SLIDER_CONTAINER.children[0].children[0] as HTMLSpanElement;
    const RANGE_MIDDLE = SLIDER_CONTAINER.children[0].children[1] as HTMLSpanElement;
    const RANGE_RIGHT = SLIDER_CONTAINER.children[0].children[2] as HTMLSpanElement;
    const INPPUT_FROM = SLIDER_CONTAINER.children[1].children[0] as HTMLInputElement;
    const INPPUT_TO = SLIDER_CONTAINER.children[1].children[1] as HTMLInputElement;
    INPPUT_FROM.max = `${countSlider(sliderName).max - 1}`;
    INPPUT_TO.max = `${countSlider(sliderName).max - 1}`;
    if (!CURRENT) {
        console.log('hello');
        INPPUT_FROM.value = `${countSlider(sliderName).arr.findIndex((el) => el === countSlider(sliderName).left)}`;
        INPPUT_TO.value = `${countSlider(sliderName).arr.findIndex((el) => el === countSlider(sliderName).right)}`;
        RANGE_LEFT.innerHTML = `${sliderName === 'price' ? '€' : ''}${
            (countSlider(sliderName) as sliderValueType).left
        }`;
        RANGE_RIGHT.innerHTML = `${sliderName === 'price' ? '€' : ''}${
            (countSlider(sliderName) as sliderValueType).right
        }`;
    } else {
        INPPUT_FROM.value = `${countSlider(sliderName).arr.findIndex((el) => el === +CURRENT.split(`↕`)[0])}`;
        console.log('val=', INPPUT_FROM.value);
        INPPUT_TO.value = `${countSlider(sliderName).arr.findIndex((el) => el === +CURRENT.split(`↕`)[1])}`;
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
