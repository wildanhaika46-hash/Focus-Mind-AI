/**
 * @file storage.js
 * @description A lightweight wrapper around chrome.storage.local for easier use.
 */

/**
 * Retrieves one or more items from local storage.
 * @param {string|string[]} keys - A key or array of keys to retrieve.
 * @returns {Promise<Object>} A promise that resolves with an object of key-value pairs.
 */
export function getStorage(keys) {
    return new Promise((resolve) => {
        chrome.storage.local.get(keys, (result) => {
            resolve(result);
        });
    });
}

/**
 * Sets one or more items in local storage.
 * @param {Object} items - An object containing key-value pairs to set.
 * @returns {Promise<void>} A promise that resolves when the items have been set.
 */
export function setStorage(items) {
    return new Promise((resolve) => {
        chrome.storage.local.set(items, () => {
            resolve();
        });
    });
}
