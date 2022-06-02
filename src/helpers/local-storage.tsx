
export const setDataLS = (key: string, data: {} | []) => {
    localStorage.setItem(key, JSON.stringify(data));
}
export const getDataObjectLS = (key: string) => {
    return JSON.parse(localStorage.getItem(key) || '{}') ;
}
export const getDataArrayLS = (key: string) => {
    return JSON.parse(localStorage.getItem(key) || '[]') ;
}