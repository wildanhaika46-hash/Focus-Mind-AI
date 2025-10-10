// Setup koneksi Chrome AI APIs
export function getAPIConfig() {
  return {
    prompt: 'chrome.ai.prompt',
    summarizer: 'chrome.ai.summarizer',
    rewriter: 'chrome.ai.rewriter',
    proofreader: 'chrome.ai.proofreader',
    translator: 'chrome.ai.translator'
  };
}
