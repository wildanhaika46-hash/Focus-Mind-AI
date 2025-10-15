/**
 * @file apiConfig.js
 * @description Configuration for Chrome AI APIs.
 * This file is reserved for future settings, such as model preferences or API parameters.
 */

export const AI_CONFIG = {
    // Temperature setting for the AI model (0.0 to 1.0)
    // Lower values are more deterministic, higher values are more creative.
    temperature: 0.5,

    // Default language for translation tasks
    defaultTargetLanguage: 'English',

    // Maximum number of tokens to consider from a webpage for summarization
    maxInputTokensForSummary: 10000,
};
