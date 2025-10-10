// Fungsi bantu umum
export function showSection(id) {
  document.querySelectorAll('main > section').forEach(s => s.style.display = 'none');
  const el = document.getElementById(id);
  if (el) el.style.display = 'block';
}
