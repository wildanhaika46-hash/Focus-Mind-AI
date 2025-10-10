// Validasi input & sanitasi teks
export function sanitize(text) {
  return text.replace(/[<>]/g, '');
}
export function isValidNote(note) {
  return note && note.length > 0 && note.length < 1000;
}
