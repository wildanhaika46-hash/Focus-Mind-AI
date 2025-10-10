// Test mode fokus & blokir situs
import { startFocus, stopFocus } from '../src/focusManager.js';

console.assert(typeof startFocus === 'function', 'startFocus harus fungsi');
console.assert(typeof stopFocus === 'function', 'stopFocus harus fungsi');
console.log('Focus mode test loaded');
