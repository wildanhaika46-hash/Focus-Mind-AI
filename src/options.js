/**
 * @file options.js
 * @description Handles the logic for the options page (options.html).
 */

import { sanitizeDomainList } from '../utils/validation.js';
import { formatTime } from '../utils/helper.js';

document.addEventListener('DOMContentLoaded', () => {
    const blockedSitesTextarea = document.getElementById('blockedSitesTextarea');
    const saveBlockedSitesBtn = document.getElementById('saveBlockedSites');
    const notesList = document.getElementById('notesList');
    const clearAllNotesBtn = document.getElementById('clearAllNotes');
    const totalFocusTimeEl = document.getElementById('totalFocusTime');
    const distractionsBlockedEl = document.getElementById('distractionsBlocked');
    const resetStatsBtn = document.getElementById('resetStats');

    // Load initial data
    loadBlockedSites();
    loadNotes();
    loadStats();

    // Event Listeners
    saveBlockedSitesBtn.addEventListener('click', () => {
        const sites = sanitizeDomainList(blockedSitesTextarea.value);
        chrome.runtime.sendMessage({ action: 'updateBlockedSites', sites }, () => {
            alert('Block list saved!');
            loadBlockedSites(); // Reload to show sanitized list
        });
    });

    clearAllNotesBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete all notes? This cannot be undone.')) {
            chrome.runtime.sendMessage({ action: 'clearAllNotes' }, () => {
                loadNotes();
            });
        }
    });

    resetStatsBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to reset your focus stats?')) {
            chrome.runtime.sendMessage({ action: 'resetFocusStats' }, () => {
                loadStats();
            });
        }
    });

    /**
     * Loads the blocked sites list from storage and displays it.
     */
    function loadBlockedSites() {
        chrome.storage.local.get(['blockedSites'], (result) => {
            if (result.blockedSites) {
                blockedSitesTextarea.value = result.blockedSites.join('\n');
            }
        });
    }

    /**
     * Loads all notes from storage and renders them.
     */
    function loadNotes() {
        chrome.runtime.sendMessage({ action: 'getNotes' }, (response) => {
            notesList.innerHTML = '';
            if (response.notes && response.notes.length > 0) {
                response.notes.forEach(note => {
                    const noteEl = document.createElement('div');
                    noteEl.className = 'note-item';
                    noteEl.textContent = note.content.substring(0, 150) + '...';
                    notesList.appendChild(noteEl);
                });
            } else {
                notesList.innerHTML = '<p>No notes saved yet.</p>';
            }
        });
    }

    /**
     * Loads focus stats from storage and displays them.
     */
    function loadStats() {
        chrome.runtime.sendMessage({ action: 'getFocusStats' }, (response) => {
            if (response.stats) {
                totalFocusTimeEl.textContent = formatTime(response.stats.totalFocusTime);
                distractionsBlockedEl.textContent = response.stats.distractionsBlocked;
            }
        });
    }
});
