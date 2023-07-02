
/**
 * @param {string} key 
 * @param {any} value 
 */
export const setStorage = (key, value) => localStorage.setItem(`hello_cac_ban_tre-${key}`, JSON.stringify(value))

/**
 * 
 * @param {string} key 
 * @returns {any}
 */
export const getStorage = (key) => JSON.parse(localStorage.getItem(`hello_cac_ban_tre-${key}`));
