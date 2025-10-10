// UI logic for popup and dashboard navigation
import { showSection } from '../utils/helper.js';
import { getNotes, saveNote, deleteNote } from './notesManager.js';
import { getFocusStats } from './analytics.js';

document.addEventListener('DOMContentLoaded', () => {
  const navBtns = [
    'focusBtn', 'summarizeBtn', 'rewriteBtn', 'proofBtn', 'translateBtn', 'notesBtn', 'analyticsBtn'
  ];
  navBtns.forEach(id => {
    const btn = document.getElementById(id);
    if (btn) btn.addEventListener('click', () => handleNav(id));
  });
});

function handleNav(id) {
  switch(id) {
    case 'focusBtn':
      window.location.href = 'focus.html';
      break;
    case 'summarizeBtn':
      showSection('summarizer');
      break;
    case 'rewriteBtn':
      showSection('rewriter');
      break;
    case 'proofBtn':
      showSection('proofreader');
      break;
    case 'translateBtn':
      showSection('translator');
      break;
    case 'notesBtn':
      showSection('notes');
      break;
    case 'analyticsBtn':
      showSection('analytics');
      break;
    default:
      showSection('dashboard');
  }
}
