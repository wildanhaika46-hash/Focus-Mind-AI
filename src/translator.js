/**
 * @file translator.js
 * @description Standalone module for translation functionality.
 */

import { createAiSession } from './aiHandler.js';

/**
 * Translates text using the Chrome AI API.
 * @param {string} text - The text to translate.
 * @param {string} targetLang - The target language (e.g., 'English', 'Spanish').
 * @returns {Promise<string>} The translated text.
 */
export async function translate(text, targetLang = 'English') {
    try {
        const session = await createAiSession();
        const prompt = `Translate the following text to ${targetLang}:\n\n"${text}"`;
        const result = await session.prompt(prompt);
        session.destroy();
        return result;
    } catch (error) {
        console.error("Translation failed:", error);
        throw new Error("Failed to translate text. Ensure the AI model is available.");
    }
}
