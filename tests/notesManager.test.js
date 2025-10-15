import { describe, it, expect, vi, beforeEach } from 'vitest';

// In-memory store for the mock storage
let mockStorage = {};

// Mock the Chrome API
global.chrome = {
  storage: {
    local: {
      get: vi.fn().mockImplementation(async (keys) => {
        const result = {};
        const keyList = Array.isArray(keys) ? keys : [keys];
        for (const key of keyList) {
          if (mockStorage[key] !== undefined) {
            result[key] = JSON.parse(JSON.stringify(mockStorage[key]));
          }
        }
        return result;
      }),
      set: vi.fn().mockImplementation(async (items) => {
        Object.assign(mockStorage, items);
      }),
    },
  },
};

import { saveNote, getNotes, clearAllNotes, deleteNote } from '../src/notesManager.js';

describe('notesManager', () => {
  // Reset the mock storage before each test
  beforeEach(() => {
    mockStorage = {};
    vi.clearAllMocks();
  });

  it('should save a new note', async () => {
    await saveNote('This is a test note.');
    const { notes } = mockStorage;
    expect(notes).toHaveLength(1);
    expect(notes[0].content).toBe('This is a test note.');
  });

  it('should retrieve all notes', async () => {
    mockStorage.notes = [{ id: '1', content: 'Note 1' }, { id: '2', content: 'Note 2' }];
    const notes = await getNotes();
    expect(notes).toHaveLength(2);
    expect(notes[0].content).toBe('Note 1');
  });

  it('should return an empty array if no notes exist', async () => {
    const notes = await getNotes();
    expect(notes).toEqual([]);
  });

  it('should delete a specific note', async () => {
    mockStorage.notes = [{ id: '1', content: 'Note 1' }, { id: '2', content: 'Note 2' }];
    await deleteNote('1');
    const { notes } = mockStorage;
    expect(notes).toHaveLength(1);
    expect(notes[0].id).toBe('2');
  });

  it('should clear all notes', async () => {
    mockStorage.notes = [{ id: '1', content: 'Note 1' }];
    await clearAllNotes();
    const { notes } = mockStorage;
    expect(notes).toEqual([]);
  });
});
