/* =============================================
   fragen.js  –  Anonyme Fragen einreichen
   ============================================= */

const input   = document.getElementById('frageInput');
const counter = document.getElementById('charCount');
const btn     = document.getElementById('submitBtn');

/* ── Zeichenzähler ─────────────────────────── */
input?.addEventListener('input', () => {
  const len = input.value.length;
  counter.textContent = `${len} / 400`;
  btn.disabled = len === 0;
});

/* ── Init: Button disabled bis etwas getippt ─ */
window.addEventListener('DOMContentLoaded', () => {
  btn.disabled = true;
});

/* ── Absenden ──────────────────────────────── */
async function submitFrage() {
  const text = input?.value?.trim();
  if (!text) return;

  btn.disabled = true;
  btn.textContent = 'Wird gesendet …';

  const payload = {
    text,
    timestamp: window._serverTimestamp ? window._serverTimestamp() : new Date().toISOString(),
  };

  try {
    await window._addDoc(
      window._collection(window._db, 'fragen'),
      payload
    );
    document.getElementById('frageForm').classList.add('hidden');
    document.getElementById('frageDone').classList.remove('hidden');
  } catch (err) {
    alert('Fehler beim Senden. Bitte nochmal versuchen.');
    console.error(err);
    btn.disabled = false;
    btn.textContent = 'Anonym senden';
  }
}

/* ── Reset ─────────────────────────────────── */
function resetFrage() {
  input.value = '';
  counter.textContent = '0 / 400';
  btn.disabled = true;
  btn.textContent = 'Anonym senden';
  document.getElementById('frageDone').classList.add('hidden');
  document.getElementById('frageForm').classList.remove('hidden');
}

window.submitFrage = submitFrage;
window.resetFrage  = resetFrage;
