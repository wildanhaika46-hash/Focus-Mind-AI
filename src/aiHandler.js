/**
 * @file aiHandler.js
 * @description Handles interactions with the built-in Chrome AI APIs.
 */

/**
 * Checks if the on-device AI model is available.
 * @returns {Promise<boolean>} True if the model is available, false otherwise.
 */
async function isAiModelAvailable() {
    try {
        const state = await chrome.ai.canCreateGenericSession();
        return state === 'readily';
    } catch (error) {
        console.error("AI model availability check failed:", error);
        return false;
    }
}

/**
 * Creates a text session with the AI model.
 * @returns {Promise<chrome.ai.AITextSession>} The AI text session object.
 * @throws {Error} If the AI model is not available or session creation fails.
 */
async function createAiSession() {
    if (!(await isAiModelAvailable())) {
        throw new Error("AI model is not available. Please check Chrome settings.");
    }
    return await chrome.ai.createGenericSession();
}

/**
 * Summarizes the given text.
 * @param {string} text - The text to summarize.
 * @returns {Promise<string>} The summarized text.
 */
export async function summarizeText(text) {
    const session = await createAiSession();
    const prompt = `Summarize the following text concisely:\n\n${text}`;
    const result = await session.prompt(prompt);
    session.destroy();
    return result;
}

/**
 * Rewrites the given text.
 * @param {string} text - The text to rewrite.
 * @param {string} [tone='neutral'] - The desired tone (e.g., 'formal', 'casual').
 * @returns {Promise<string>} The rewritten text.
 */
export async function rewriteText(text, tone = 'neutral') {
    const session = await createAiSession();
    const prompt = `Rewrite the following text in a ${tone} tone:\n\n${text}`;
    const result = await session.prompt(prompt);
    session.destroy();
    return result;
}

/**
 * Translates the given text to English.
 * @param {string} text - The text to translate.
 * @returns {Promise<string>} The translated text.
 */
export async function translateText(text) {
    const session = await createAiSession();
    const prompt = `Translate the following text to English:\n\n${text}`;
    const result = await session.prompt(prompt);
    session.destroy();
    return result;
}

/**
 * Proofreads the given text for grammar and spelling.
 * @param {string} text - The text to proofread.
 * @returns {Promise<string>} The corrected text.
 */
export async function proofreadText(text) {
    const session = await createAiSession();
    const prompt = `Correct any spelling and grammar mistakes in the following text:\n\n${text}`;
    const result = await session.prompt(prompt);
    session.destroy();
    return result;
}

/**
 * Summarizes the content of the currently active tab.
 * @returns {Promise<string>} The summary of the page content.
 */
export async function summarizeActiveTab() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab) {
        throw new Error("No active tab found.");
    }

    const results = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => document.body.innerText,
    });

    const pageText = results[0].result;
    if (!pageText) {
        throw new Error("Could not extract text from the page.");
    }

    return summarizeText(pageText.substring(0, 10000)); // Limit text size
}
