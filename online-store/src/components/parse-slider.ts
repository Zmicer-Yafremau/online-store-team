export function parseSlider(PARAMS: URLSearchParams, name: 'stock' | 'price', val: 'min' | 'max'): string {
    return val == 'max'
        ? (PARAMS.get(name) as string)?.split(`↕`)[1]
        : (PARAMS.get(name) as string)?.split(`↕`)[0] || '0';
}
