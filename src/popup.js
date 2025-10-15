/**
 * @file popup.js
 * @description Handles the logic for the popup UI (index.html).
 */

document.addEventListener('DOMContentLoaded', () => {
    const toggleFocusModeBtn = document.getElementById('toggleFocusMode');
    const summarizePageBtn = document.getElementById('summarizePage');
    const openSmartNotesBtn = document.getElementById('openSmartNotes');
    const copyOutputBtn = document.getElementById('copyOutput');
    
    const outputArea = document.getElementById('output');
    const outputText = document.getElementById('outputText');
    const loader = document.getElementById('loader');

    /**
     * Shows the loader and hides the text.
     */
    function showLoader() {
        loader.classList.remove('hidden');
        outputText.classList.add('hidden');
        outputArea.classList.remove('hidden');
    }

    /**
     * Hides the loader and shows the text.
     */
    function hideLoader() {
        loader.classList.add('hidden');
        outputText.classList.remove('hidden');
    }

    /**
     * Displays the result in the output area.
     * @param {string} text - The text to display.
     */
    function displayResult(text) {
        outputText.textContent = text;
        outputArea.classList.remove('hidden');
        hideLoader();
    }

    // Event Listeners
    toggleFocusModeBtn.addEventListener('click', () => {
        chrome.runtime.sendMessage({ action: 'toggleFocusMode' }, (response) => {
            if (response.success) {
                // You might want to update the button text or style here
                console.log('Focus mode toggled.');
            }
        });
    });

    summarizePageBtn.addEventListener('click', () => {
        showLoader();
        chrome.runtime.sendMessage({ action: 'summarizePage' }, (response) => {
            if (response.error) {
                displayResult(`Error: ${response.error}`);
            } else {
                displayResult(response.summary);
                // Also save as a smart note
                chrome.runtime.sendMessage({ action: 'saveNote', content: `Summary:\n${response.summary}` });
            }
        });
    });

    openSmartNotesBtn.addEventListener('click', () => {
        chrome.runtime.sendMessage({ action: 'openOptionsPage', section: 'notes' });
    });



    copyOutputBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(outputText.textContent)
            .then(() => {
                copyOutputBtn.textContent = 'Copied!';
                setTimeout(() => {
                    copyOutputBtn.textContent = 'Copy';
                }, 2000);
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
            });
    });
});
