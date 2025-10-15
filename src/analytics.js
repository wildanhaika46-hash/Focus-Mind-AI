/**
 * @file analytics.js
 * @description Handles anonymous logging and tracking of focus stats.
 * No personal data is ever collected.
 */

import { getStorage, setStorage } from '../utils/storage.js';

let focusSessionStartTime = null;

/**
 * Starts tracking a focus session.
 */
export function startFocusSession() {
    focusSessionStartTime = Date.now();
    console.log("Focus session started.");
}

/**
 * Ends a focus session and records the duration.
 */
export async function endFocusSession() {
    if (focusSessionStartTime) {
        const duration = Date.now() - focusSessionStartTime;
        const { totalFocusTime = 0 } = await getStorage(['totalFocusTime']);
        await setStorage({ totalFocusTime: totalFocusTime + duration });
        focusSessionStartTime = null;
        console.log(`Focus session ended. Duration: ${Math.round(duration / 60000)} minutes.`);
    }
}

/**
 * Increments the count of blocked distractions.
 */
export async function logBlockedDistraction() {
    const { distractionsBlocked = 0 } = await getStorage(['distractionsBlocked']);
    await setStorage({ distractionsBlocked: distractionsBlocked + 1 });
}

/**
 * Retrieves all focus statistics.
 * @returns {Promise<Object>} An object containing totalFocusTime and distractionsBlocked.
 */
export async function getFocusStats() {
    const { totalFocusTime = 0, distractionsBlocked = 0 } = await getStorage(['totalFocusTime', 'distractionsBlocked']);
    return { totalFocusTime, distractionsBlocked };
}

/**
 * Resets all focus statistics to zero.
 */
export async function resetFocusStats() {
    await setStorage({ totalFocusTime: 0, distractionsBlocked: 0 });
    console.log("Focus stats have been reset.");
}
