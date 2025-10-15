/**
 * @file notesManager.js
 * @description Handles saving, retrieving, and managing smart notes.
 */

import { getStorage, setStorage } from '../utils/storage.js';

/**
 * Saves a new note to local storage.
 * @param {string} content - The content of the note.
 * @returns {Promise<void>}
 */
export async function saveNote(content) {
    const { notes = [] } = await getStorage(['notes']);
    const newNote = {
        id: `note_${Date.now()}`,
        content,
        createdAt: new Date().toISOString(),
    };
    notes.unshift(newNote); // Add to the beginning
    await setStorage({ notes });
    console.log("Note saved:", newNote);
}

/**
 * Retrieves all notes from storage.
 * @returns {Promise<Array<Object>>} A promise that resolves to the array of notes.
 */
export async function getNotes() {
    const { notes = [] } = await getStorage(['notes']);
    return notes;
}

/**
 * Deletes a specific note by its ID.
 * @param {string} noteId - The ID of the note to delete.
 * @returns {Promise<void>}
 */
export async function deleteNote(noteId) {
    let { notes = [] } = await getStorage(['notes']);
    notes = notes.filter(note => note.id !== noteId);
    await setStorage({ notes });
    console.log("Note deleted:", noteId);
}

/**
 * Clears all saved notes.
 * @returns {Promise<void>}
 */
export async function clearAllNotes() {
    await setStorage({ notes: [] });
    console.log("All notes cleared.");
}
