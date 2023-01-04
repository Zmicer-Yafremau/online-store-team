export function parseFilter(PARAMS: URLSearchParams, name: 'brand' | 'category'): string[] {
    return (PARAMS.get(name) as string)?.split(`↕`).filter((el) => el);
}
