// =============================================
//  test.js  –  Kurstest
//  - Submit-Guard via sessionStorage (kein Doppel-Submit)
//  - "Nochmal mitmachen" entfernt aus Overlay
//  - resetTest() nur via ?demo=1 in der URL
// =============================================

const SESSION_KEY = "kurstest_submitted";
const SESSION_ID  = "s_" + Date.now().toString(36);

let fragen      = [];
let antworten   = {};
let submitting  = false;

window.addEventListener("DOMContentLoaded", () => {
  // Demo-Modus: ?demo=1 in URL → Guard aufheben (nur für Lehrer)
  if (new URLSearchParams(window.location.search).get("demo") === "1") {
    sessionStorage.removeItem(SESSION_KEY);
  }

  if (sessionStorage.getItem(SESSION_KEY)) {
    showAlreadySubmitted();
    return;
  }

  fragen = getKursFragen();
  renderQuestions();
  updateProgress();
});

// ── Bereits-abgeschickt-Screen ────────────────────────────
function showAlreadySubmitted() {
  const inner = document.querySelector(".content-inner");
  if (!inner) return;
  inner.innerHTML = `
    <div style="
      display:flex; flex-direction:column; align-items:center;
      justify-content:center; min-height:60vh; text-align:center; gap:16px;
    ">
      <div style="font-size:3rem;">✓</div>
      <h2 style="font-family:'DM Serif Display',serif; font-size:1.8rem; font-weight:400;">
        Bereits übermittelt
      </h2>
      <p style="color:#7b8794; max-width:340px; line-height:1.6;">
        Du hast den Test in dieser Sitzung bereits abgeschickt.<br>
        Warte auf die gemeinsame Auswertung.
      </p>
    </div>`;

  // Submit-Row ausblenden falls noch sichtbar
  const row = document.querySelector(".submit-row");
  if (row) row.style.display = "none";
}

// ── Fragen rendern ────────────────────────────────────────
function renderQuestions() {
  const container = document.getElementById("questionsContainer");

  fragen.forEach((f, qIndex) => {
    const block = document.createElement("div");
    block.className = "question-block";

    block.innerHTML = `
      <div class="question-theme">${f.thema}</div>
      <div class="question-text">
        ${qIndex + 1}. ${f.frage}
      </div>
      <div class="options">
        ${f.antworten.map((a, i) => `
          <div class="option"
               onclick="selectAnswer(${qIndex}, ${i}, this)">
            ${a}
          </div>
        `).join("")}
      </div>
    `;

    container.appendChild(block);
  });
}

// ── Antwort wählen ────────────────────────────────────────
function selectAnswer(qIndex, answerIndex, el) {
  const parent  = el.parentElement;
  const options = parent.querySelectorAll(".option");

  if (antworten[qIndex] === answerIndex) {
    delete antworten[qIndex];
    options.forEach(o => o.classList.remove("selected"));
    updateProgress();
    return;
  }

  antworten[qIndex] = answerIndex;
  options.forEach(o => o.classList.remove("selected"));
  el.classList.add("selected");
  updateProgress();
}

// ── Fortschritt ───────────────────────────────────────────
function updateProgress() {
  const answered = Object.keys(antworten).length;
  const total    = fragen.length;

  document.getElementById("progressText").textContent = `${answered} / ${total}`;
  document.getElementById("progressFill").style.height = `${(answered / total) * 100}%`;
}

// ── Submit ────────────────────────────────────────────────
async function submitAll() {
  if (submitting) return;
  if (sessionStorage.getItem(SESSION_KEY)) {
    showAlreadySubmitted();
    return;
  }

  if (!window._firebaseReady || !window._addDoc) {
    showToast("⚠ Keine Serververbindung. Bitte Seite neu laden.", "error");
    return;
  }

  submitting = true;
  const btn = document.querySelector(".submit-btn");
  if (btn) { btn.disabled = true; btn.textContent = "Wird gesendet…"; }

  const payload = {
    sessionId:  SESSION_ID,
    timestamp:  window._serverTimestamp(),
    antworten:  fragen.map((f, i) => ({
      frageId:  f.id,
      thema:    f.thema,
      gewählt:  antworten[i] ?? null,
      richtig:  antworten[i] === f.richtig
    }))
  };

  try {
    await window._addDoc(
      window._collection(window._db, "ergebnisse"),
      payload
    );

    // Guard setzen – ab jetzt permanent für diese Session
    sessionStorage.setItem(SESSION_KEY, "1");

    // Overlay zeigen, Formular und Submit-Row ausblenden
    document.getElementById("doneOverlay").classList.remove("hidden");
    document.getElementById("questionsContainer").style.display = "none";
    const row = document.querySelector(".submit-row");
    if (row) row.style.display = "none";

  } catch (err) {
    console.error(err);
    showToast("Fehler beim Speichern – bitte nochmal versuchen.", "error");
    submitting = false;
    if (btn) { btn.disabled = false; btn.textContent = "Antworten senden"; }
  }
}

// ── Toast-Utility ─────────────────────────────────────────
function showToast(msg, type = "info") {
  const toast = document.createElement("div");
  toast.textContent = msg;
  Object.assign(toast.style, {
    position:     "fixed",
    bottom:       "24px",
    left:         "50%",
    transform:    "translateX(-50%)",
    background:   type === "error" ? "#C1440E" : "#003560",
    color:        "#fff",
    padding:      "12px 24px",
    borderRadius: "10px",
    fontFamily:   "'DM Sans', sans-serif",
    fontSize:     ".9rem",
    zIndex:       "9999",
    boxShadow:    "0 4px 16px rgba(0,0,0,.25)",
    transition:   "opacity .3s",
  });
  document.body.appendChild(toast);
  setTimeout(() => { toast.style.opacity = "0"; setTimeout(() => toast.remove(), 400); }, 4000);
}
