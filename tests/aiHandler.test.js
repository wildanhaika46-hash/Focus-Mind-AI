// Unit test untuk aiHandler.js
import { getAIMotivation, summarizeActiveTab, rewriteText, proofreadText, translateText } from '../src/aiHandler.js';

(async () => {
  console.assert(typeof (await getAIMotivation()) === 'string', 'Motivation should be string');
  const bullets = await summarizeActiveTab('Chrome adalah browser web.');
  console.assert(Array.isArray(bullets), 'Summary should be array');
  const rewritten = await rewriteText('Ini paragraf sulit.');
  console.assert(typeof rewritten === 'string', 'Rewrite should be string');
  const proof = await proofreadText('Saya belajar.');
  console.assert(Array.isArray(proof), 'Proofread should be array');
  const translated = await translateText('Hello', 'id');
  console.assert(typeof translated === 'string', 'Translate should be string');
  console.log('aiHandler tests passed');
})();
