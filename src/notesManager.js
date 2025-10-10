// Catatan: simpan, edit, hapus, ambil dari chrome.storage.local
export async function getNotes() {
  return new Promise(resolve => {
    chrome.storage.local.get(['notes'], res => {
      resolve(res.notes || []);
    });
  });
}

export async function saveNote(note) {
  const notes = await getNotes();
  notes.push(note);
  chrome.storage.local.set({ notes });
}

export async function deleteNote(index) {
  const notes = await getNotes();
  notes.splice(index, 1);
  chrome.storage.local.set({ notes });
}

export async function editNote(index, newNote) {
  const notes = await getNotes();
  notes[index] = newNote;
  chrome.storage.local.set({ notes });
}
