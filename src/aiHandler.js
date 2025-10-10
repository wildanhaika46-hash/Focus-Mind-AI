// Integrasi Chrome Built-in AI APIs: Prompt, Summarizer, Rewriter, Proofreader, Translator
import { getAPIConfig } from '../utils/apiConfig.js';

export async function getAIMotivation() {
  const { prompt } = getAPIConfig();
  const res = await chrome.ai.prompt({
    prompt: 'Buatkan motivasi belajar/kerja singkat, positif, dan relevan untuk hari ini.',
    model: 'gemini-nano',
    max_tokens: 60
  });
  return res.text || 'Tetap semangat, kamu pasti bisa!';
}

export async function summarizeActiveTab(text) {
  const { summarizer } = getAPIConfig();
  const res = await chrome.ai.summarizer({
    text,
    model: 'gemini-nano',
    format: 'bullets',
    max_points: 6
  });
  return res.bullets || [];
}

export async function rewriteText(text) {
  const { rewriter } = getAPIConfig();
  const res = await chrome.ai.rewriter({
    text,
    model: 'gemini-nano',
    instruction: 'Tulis ulang agar mudah dipahami pelajar.'
  });
  return res.text || text;
}

export async function proofreadText(text) {
  const { proofreader } = getAPIConfig();
  const res = await chrome.ai.proofreader({
    text,
    model: 'gemini-nano'
  });
  return res.suggestions || [];
}

export async function translateText(text, targetLang) {
  const { translator } = getAPIConfig();
  const res = await chrome.ai.translator({
    text,
    target_language: targetLang,
    model: 'gemini-nano'
  });
  return res.text || text;
}
