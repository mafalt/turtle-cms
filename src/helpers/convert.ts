export function getNumberFromString(value: string, defaultValue?: number): number {
    let result = Number(value);
    return isNaN(result) ? defaultValue : result;
}
