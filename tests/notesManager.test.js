// Test fitur catatan
import { getNotes, saveNote, deleteNote, editNote } from '../src/notesManager.js';

(async () => {
  await saveNote('Test note');
  let notes = await getNotes();
  console.assert(notes.includes('Test note'), 'Note harus tersimpan');
  await editNote(notes.indexOf('Test note'), 'Updated note');
  notes = await getNotes();
  console.assert(notes.includes('Updated note'), 'Note harus terupdate');
  await deleteNote(notes.indexOf('Updated note'));
  notes = await getNotes();
  console.assert(!notes.includes('Updated note'), 'Note harus terhapus');
  console.log('NotesManager tests passed');
})();
