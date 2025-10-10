// Analisis produktivitas: waktu fokus & grafik CSS
export async function saveFocusSession(duration) {
  const stats = await getFocusStats();
  const today = new Date().toISOString().slice(0, 10);
  let found = stats.find(s => s.date === today);
  if (found) found.seconds += duration;
  else stats.push({ date: today, seconds: duration });
  chrome.storage.local.set({ focusStats: stats });
}

export async function getFocusStats() {
  return new Promise(resolve => {
    chrome.storage.local.get(['focusStats'], res => {
      resolve(res.focusStats || []);
    });
  });
}

export function renderFocusGraph(stats) {
  // Render bar graph CSS only
  const max = Math.max(...stats.map(s => s.seconds), 1);
  return `<div class='focus-graph'>${stats.map(s => {
    const h = Math.round((s.seconds / max) * 80);
    return `<div class='bar' style='height:${h}px' title='${s.date}: ${Math.round(s.seconds/60)}m'></div>`;
  }).join('')}</div>`;
}
