export function addSlash(value: string): string {
    const TEMP = value.split('');
    if (TEMP.length > 2 && !TEMP.includes('/')) {
        TEMP.splice(2, 0, `/`);
        value = `${TEMP.join('')}`;
    }
    return value;
}
