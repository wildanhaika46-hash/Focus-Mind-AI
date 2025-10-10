// Wrapper chrome.storage API
export function get(key) {
  return new Promise(resolve => {
    chrome.storage.local.get([key], res => resolve(res[key]));
  });
}
export function set(obj) {
  return new Promise(resolve => {
    chrome.storage.local.set(obj, () => resolve());
  });
}
