// Modul penerjemah: wrapper translateText dari aiHandler
import { translateText } from './aiHandler.js';

export async function translateSummary(text, lang) {
  return await translateText(text, lang);
}
