/**
 * @file helper.js
 * @description General utility and helper functions.
 */

/**
 * Debounces a function to limit the rate at which it gets called.
 * @param {Function} func - The function to debounce.
 * @param {number} delay - The debounce delay in milliseconds.
 * @returns {Function} The debounced function.
 */
export function debounce(func, delay) {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), delay);
    };
}

/**
 * Formats milliseconds into a human-readable string (e.g., "X minutes").
 * @param {number} ms - The duration in milliseconds.
 * @returns {string} The formatted time string.
 */
export function formatTime(ms) {
    if (ms < 0) ms = 0;
    const minutes = Math.round(ms / 60000);
    return `${minutes} minutes`;
}
