// Focus Mode logic: timer, block distractions, fetch AI motivation
import { getAIMotivation } from './aiHandler.js';
import { saveFocusSession } from './analytics.js';

const blockList = [
  '*://www.tiktok.com/*',
  '*://www.instagram.com/*',
  '*://www.youtube.com/shorts/*'
];

let timer = null;
let seconds = 1500; // default 25 min

function updateTimerDisplay() {
  const el = document.getElementById('timerDisplay');
  if (el) {
    const min = String(Math.floor(seconds / 60)).padStart(2, '0');
    const sec = String(seconds % 60).padStart(2, '0');
    el.textContent = `${min}:${sec}`;
  }
}

function startFocus() {
  if (timer) return;
  timer = setInterval(() => {
    if (seconds > 0) {
      seconds--;
      updateTimerDisplay();
    } else {
      clearInterval(timer);
      timer = null;
      saveFocusSession(25 * 60);
      alert('Sesi fokus selesai!');
    }
  }, 1000);
}

function stopFocus() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('startFocus').onclick = startFocus;
  document.getElementById('stopFocus').onclick = stopFocus;
  updateTimerDisplay();
  getAIMotivation().then(motiv => {
    document.getElementById('motivationText').textContent = motiv;
  });
});

// Block distractions using declarativeNetRequest
chrome.declarativeNetRequest.updateDynamicRules({
  addRules: blockList.map((url, i) => ({
    id: 1000 + i,
    priority: 1,
    action: { type: 'block' },
    condition: { urlFilter: url, resourceTypes: ['main_frame'] }
  })),
  removeRuleIds: blockList.map((_, i) => 1000 + i)
});
