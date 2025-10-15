/**
 * @file messageHandler.js
 * @description Centralized message handler for communication between extension components.
 */

import { toggleFocusMode, updateBlockedSites } from './focusManager.js';
import { summarizeActiveTab } from './aiHandler.js';
import { saveNote, getNotes, clearAllNotes } from './notesManager.js';
import { getFocusStats, resetFocusStats } from './analytics.js';

const messageActions = {
    toggleFocusMode: async () => {
        const newState = await toggleFocusMode();
        return { success: true, focusModeActive: newState };
    },
    summarizePage: async () => {
        try {
            const summary = await summarizeActiveTab();
            return { summary };
        } catch (error) {
            return { error: error.message };
        }
    },
    saveNote: async (request) => {
        await saveNote(request.content);
        return { success: true };
    },
    getNotes: async () => {
        const notes = await getNotes();
        return { notes };
    },
    clearAllNotes: async () => {
        await clearAllNotes();
        return { success: true };
    },
    updateBlockedSites: async (request) => {
        await updateBlockedSites(request.sites);
        return { success: true };
    },
    getFocusStats: async () => {
        const stats = await getFocusStats();
        return { stats };
    },
    resetFocusStats: async () => {
        await resetFocusStats();
        return { success: true };
    },
    openOptionsPage: (request) => {
        chrome.runtime.openOptionsPage();
        // If a specific section is requested, we could pass it as a hash
        // e.g., chrome.tabs.create({ url: `options.html#${request.section}` });
        return { success: true };
    }
};

/**
 * Handles incoming messages from other parts of the extension.
 * @param {object} request - The message request object.
 * @param {object} sender - The sender of the message.
 * @param {function} sendResponse - The function to call to send a response.
 */
export function handleMessage(request, sender, sendResponse) {
    const action = messageActions[request.action];
    if (action) {
        action(request)
            .then(sendResponse)
            .catch(error => {
                console.error(`Error handling action "${request.action}":`, error);
                sendResponse({ error: error.message });
            });
    } else {
        console.warn("Unknown action received:", request.action);
        sendResponse({ error: "Unknown action" });
    }
}
