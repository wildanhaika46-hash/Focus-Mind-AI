/**
 * @file validation.js
 * @description Functions for validating user input.
 */

/**
 * Validates if a string is a valid domain name.
 * @param {string} domain - The domain string to validate.
 * @returns {boolean} True if the domain is valid, false otherwise.
 */
export function isValidDomain(domain) {
    if (typeof domain !== 'string' || domain.length === 0) {
        return false;
    }
    // A simple regex for domain validation. Not perfect, but good enough for this use case.
    const domainRegex = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/i;
    return domainRegex.test(domain.trim());
}

/**
 * Sanitizes an array of domain strings from a textarea input.
 * @param {string} text - The raw text from a textarea.
 * @returns {string[]} An array of valid, trimmed, and unique domain names.
 */
export function sanitizeDomainList(text) {
    if (!text) return [];
    
    const domains = text
        .split(/[\n,;]+/) // Split by newlines, commas, or semicolons
        .map(domain => domain.trim().toLowerCase())
        .filter(isValidDomain);

    return [...new Set(domains)]; // Return unique domains
}
