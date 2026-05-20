// =============================================
//  tabs/test/test.js  –  Logik für test.html
// =============================================

const SESSION_ID = "s_" + Date.now().toString(36);
let fragen        = [];
let aktuell       = 0;
let antworten     = [];   // { frageId, gewählt, richtig, thema }
let selectedIndex = null;
let pendingSubmit = null;

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function updateProgress(step, total) {
  document.getElementById("progressBar").style.width =
    ((step / total) * 100) + "%";
}

// ─── Start ────────────────────────────────────
function startTest() {
  fragen    = getKursFragen();
  aktuell   = 0;
  antworten = [];
  showScreen("screenQuestion");
  renderFrage();
}

// ─── Render current question ──────────────────
function renderFrage() {
  const f = fragen[aktuell];
  selectedIndex = null;

  document.getElementById("qCounter").textContent =
    `Frage ${aktuell + 1} / ${fragen.length}`;
  document.getElementById("qTheme").textContent = f.thema;
  document.getElementById("qText").textContent  = f.frage;

  const grid    = document.getElementById("optionsGrid");
  grid.innerHTML = "";

  const letters = ["A", "B", "C", "D"];
  f.antworten.forEach((text, i) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.innerHTML = `<span class="option-letter">${letters[i]}</span><span>${text}</span>`;
    btn.onclick   = () => selectOption(i);
    grid.appendChild(btn);
  });

  const btnNext     = document.getElementById("btnNext");
  btnNext.disabled  = true;
  btnNext.textContent = aktuell < fragen.length - 1 ? "Weiter →" : "Abschicken ✓";

  updateProgress(aktuell, fragen.length);
}

// ─── Select an option ─────────────────────────
function selectOption(index) {
  const f    = fragen[aktuell];
  selectedIndex = index;

  const btns = document.querySelectorAll(".option-btn");
  btns.forEach(b => {
    b.classList.remove("selected", "correct", "wrong");
    b.disabled = true;
  });

  btns[f.richtig].classList.add("correct");
  if (index !== f.richtig) btns[index].classList.add("wrong");

  antworten.push({
    frageId:       f.id,
    thema:         f.thema,
    schwierigkeit: f.schwierigkeit,
    gewählt:       index,
    richtig:       index === f.richtig
  });

  document.getElementById("btnNext").disabled = false;
}

// ─── Next question or submit ──────────────────
function nextQuestion() {
  aktuell++;
  if (aktuell < fragen.length) {
    renderFrage();
  } else {
    updateProgress(fragen.length, fragen.length);
    submitErgebnisse();
  }
}

// ─── Submit to Firestore ──────────────────────
async function submitErgebnisse() {
  showScreen("screenDone");

  const payload = {
    sessionId: SESSION_ID,
    timestamp: window._serverTimestamp(),
    antworten,
    total:   fragen.length,
    richtig: antworten.filter(a => a.richtig).length
  };

  pendingSubmit = payload;

  try {
    await window._addDoc(window._collection(window._db, "ergebnisse"), payload);
    pendingSubmit = null;
  } catch (err) {
    console.error("Firestore error:", err);
    document.getElementById("errorMsg").textContent =
      "Fehler: " + (err.message || "Unbekannter Fehler");
    showScreen("screenError");
  }
}

// ─── Retry on error ───────────────────────────
async function retrySubmit() {
  if (!pendingSubmit) return;
  try {
    await window._addDoc(window._collection(window._db, "ergebnisse"), pendingSubmit);
    pendingSubmit = null;
    showScreen("screenDone");
  } catch (err) {
    document.getElementById("errorMsg").textContent =
      "Erneuter Fehler: " + (err.message || "Bitte Verbindung prüfen.");
  }
}

// ─── Auto Start ───────────────────────────────
window.addEventListener("DOMContentLoaded", () => {
  startTest();
});
