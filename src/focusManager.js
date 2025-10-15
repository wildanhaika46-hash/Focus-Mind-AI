/**
 * @file focusManager.js
 * @description Manages the focus mode, including blocking and unblocking sites.
 */

import { getStorage, setStorage } from '../utils/storage.js';

const RULESET_ID = 'ruleset_1';
const RULE_ID = 1;

/**
 * Toggles the focus mode on or off.
 * @returns {Promise<boolean>} The new state of focus mode (true for on, false for off).
 */
export async function toggleFocusMode() {
    const { focusModeActive, blockedSites } = await getStorage(['focusModeActive', 'blockedSites']);
    const newState = !focusModeActive;

    if (newState) {
        await enableBlocking(blockedSites);
    } else {
        await disableBlocking();
    }

    await setStorage({ focusModeActive: newState });
    console.log(`Focus mode is now ${newState ? 'ON' : 'OFF'}`);
    return newState;
}

/**
 * Enables the declarativeNetRequest rules to block sites.
 * @param {string[]} sites - An array of domain strings to block.
 */
async function enableBlocking(sites) {
    if (!sites || sites.length === 0) {
        console.log("No sites to block.");
        return;
    }

    const rules = [{
        id: RULE_ID,
        priority: 1,
        action: { type: 'block' },
        condition: {
            urlFilter: `||*._${sites.join.toString()}`,
            resourceTypes: ['main_frame']
        }
    }];

    await chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [RULE_ID], // Remove existing rule to be safe
        addRules: rules
    });

    console.log("Blocking enabled for:", sites);
}

/**
 * Disables the declarativeNetRequest rules.
 */
async function disableBlocking() {
    await chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [RULE_ID]
    });
    console.log("Blocking disabled.");
}

/**
 * Updates the list of blocked sites.
 * @param {string[]} sites - The new array of sites to block.
 */
export async function updateBlockedSites(sites) {
    await setStorage({ blockedSites: sites });
    const { focusModeActive } = await getStorage(['focusModeActive']);
    if (focusModeActive) {
        // If focus mode is active, re-apply the rules with the new list
        await enableBlocking(sites);
    }
}
