/**
 * @file background.js
 * @description Service worker for FocusMind AI extension.
 * Handles background tasks, context menus, and message passing.
 */

import { toggleFocusMode } from './focusManager.js';
import { summarizeText, rewriteText, translateText, proofreadText } from './aiHandler.js';
import { saveNote } from './notesManager.js';
import { handleMessage } from './messageHandler.js';

/**
 * Initializes the extension on installation.
 */
chrome.runtime.onInstalled.addListener(() => {
    console.log("FocusMind AI installed.");

    // Set up default blocked sites
    const defaultBlockedSites = [
        "youtube.com",
        "facebook.com",
        "twitter.com",
        "instagram.com",
        "tiktok.com",
        "reddit.com",
        "netflix.com"
    ];
    chrome.storage.local.set({ blockedSites: defaultBlockedSites });

    // Create context menus
    chrome.contextMenus.create({
        id: "summarize-selection",
        title: "Summarize with FocusMind",
        contexts: ["selection"]
    });

    chrome.contextMenus.create({
        id: "rewrite-selection",
        title: "Rewrite with FocusMind",
        contexts: ["selection"]
    });

    chrome.contextMenus.create({
        id: "translate-selection",
        title: "Translate with FocusMind",
        contexts: ["selection"]
    });
});

/**
 * Listens for context menu clicks.
 */
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (!tab) return;

    const actions = {
        "summarize-selection": summarizeText,
        "rewrite-selection": rewriteText,
        "translate-selection": translateText,
    };

    const action = actions[info.menuItemId];
    if (action) {
        action(info.selectionText)
            .then(result => {
                // Send result back to content script or popup if needed
                chrome.tabs.sendMessage(tab.id, {
                    action: "displayResult",
                    data: result
                });
            })
            .catch(error => console.error(`Error with ${info.menuItemId}:`, error));
    }
});

/**
 * Listens for messages from other parts of the extension.
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    handleMessage(request, sender, sendResponse);
    return true; // Indicates that the response is sent asynchronously
});

console.log("FocusMind AI service worker started.");
