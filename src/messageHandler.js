// Komunikasi antar komponen (content, popup, background)
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  // Handle AI, notes, analytics messages
  // ...to be implemented as needed
  sendResponse({ status: 'ok' });
  return true;
});
