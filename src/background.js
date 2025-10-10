// Service worker utama: komunikasi, event, AI API relay
chrome.runtime.onInstalled.addListener(() => {
  // Inisialisasi storage jika perlu
  chrome.storage.local.set({ notes: [], focusStats: [] });
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  // Relay pesan ke AI handler atau notes manager
  if (msg.type === 'summarize') {
    // ...call aiHandler, return summary
  }
  // ...handle other message types
  sendResponse({ status: 'ok' });
  return true;
});
