// =============================================
//  tabs/learn/learn.js  –  Lernmodus-Logik
//  Zufällige Fragen aus dem gesamten Pool
//  Sofort-Feedback nach jeder Antwort
//  Ergebnis-Auswertung am Ende
// =============================================

let fragen       = [];   // gemischter Fragenpool
let aktuell      = 0;    // Index der aktuellen Frage
let antworten    = [];   // { frageId, thema, gewählt, richtig }
let beantwortet  = false; // verhindert Doppelklick

// ─── Screens ─────────────────────────────────
function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function updateProgress(step, total) {
  const pct = total > 0 ? (step / total) * 100 : 0;
  document.getElementById("progressBar").style.width = pct + "%";
}

// ─── Start ────────────────────────────────────
function startLearn() {
  fragen      = getLernFragen();   // aus questions.js – gemischt
  aktuell     = 0;
  antworten   = [];
  beantwortet = false;

  showScreen("screenQuestion");
  renderFrage();
  updateProgress(0, fragen.length);
}

// ─── Frage rendern ────────────────────────────
function renderFrage() {
  const f = fragen[aktuell];
  beantwortet = false;

  // Fortschritt
  document.getElementById("qCounter").textContent =
    `Frage ${aktuell + 1} / ${fragen.length}`;
  updateProgress(aktuell, fragen.length);

  // Thema & Schwierigkeit
  document.getElementById("qTheme").textContent = f.thema;

  const diffEl = document.getElementById("qDiff");
  const diffMap = {
    leicht: { label: "Leicht",  cls: "diff-leicht" },
    mittel: { label: "Mittel",  cls: "diff-mittel"  },
    schwer: { label: "Schwer",  cls: "diff-schwer"  },
  };
  const diff = diffMap[f.schwierigkeit] || diffMap.mittel;
  diffEl.textContent  = diff.label;
  diffEl.className    = "q-diff " + diff.cls;

  // Fragetext
  document.getElementById("qText").textContent = f.frage;

  // Feedback ausblenden
  const fb = document.getElementById("feedbackBox");
  fb.className = "feedback-box hidden";
  fb.classList.remove("correct-fb", "wrong-fb");

  // Antwortbuttons
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

  // Weiter-Button
  const btnNext = document.getElementById("btnNext");
  btnNext.disabled    = true;
  btnNext.textContent = aktuell < fragen.length - 1 ? "Weiter →" : "Ergebnis sehen";
}

// ─── Antwort wählen ───────────────────────────
function selectOption(index) {
  if (beantwortet) return;
  beantwortet = true;

  const f     = fragen[aktuell];
  const btns  = document.querySelectorAll(".option-btn");
  const richtig = index === f.richtig;

  // Buttons deaktivieren + markieren
  btns.forEach((b, i) => {
    b.disabled = true;
    if (i === f.richtig) b.classList.add("correct");
    else if (i === index) b.classList.add("wrong");
  });

  // Antwort speichern
  antworten.push({
    frageId:       f.id,
    thema:         f.thema,
    schwierigkeit: f.schwierigkeit,
    gewählt:       index,
    richtig,
  });

  // Feedback anzeigen
  zeigeFeedback(richtig, f);

  // Weiter-Button aktivieren
  document.getElementById("btnNext").disabled = false;
}

// ─── Feedback-Box ─────────────────────────────
function zeigeFeedback(richtig, frage) {
  const fb      = document.getElementById("feedbackBox");
  const icon    = document.getElementById("feedbackIcon");
  const text    = document.getElementById("feedbackText");
  const correct = frage.antworten[frage.richtig];

  if (richtig) {
    fb.className    = "feedback-box correct-fb";
    icon.textContent = "✓";
    text.textContent = "Richtig! " + correct;
  } else {
    fb.className    = "feedback-box wrong-fb";
    icon.textContent = "✗";
    text.innerHTML  = `Nicht ganz. Die richtige Antwort: <strong>${correct}</strong>`;
  }
}

// ─── Nächste Frage / Ergebnis ─────────────────
function nextQuestion() {
  aktuell++;
  if (aktuell < fragen.length) {
    renderFrage();
  } else {
    updateProgress(fragen.length, fragen.length);
    zeigeErgebnis();
  }
}

// ─── Ergebnis-Screen ──────────────────────────
function zeigeErgebnis() {
  showScreen("screenResult");

  const total   = antworten.length;
  const richtig = antworten.filter(a => a.richtig).length;
  const pct     = total > 0 ? Math.round((richtig / total) * 100) : 0;

  // Icon + Titel
  const iconEl  = document.getElementById("resultIcon");
  const titleEl = document.getElementById("resultTitle");
  const subEl   = document.getElementById("resultSub");

  if (pct >= 80) {
    iconEl.className    = "result-icon great";
    iconEl.textContent  = "🎉";
    titleEl.textContent = "Ausgezeichnet!";
    subEl.textContent   = "Du hast das Thema sehr gut verstanden.";
  } else if (pct >= 50) {
    iconEl.className    = "result-icon ok";
    iconEl.textContent  = "👍";
    titleEl.textContent = "Solide Leistung!";
    subEl.textContent   = "Einige Bereiche kannst du noch vertiefen.";
  } else {
    iconEl.className    = "result-icon low";
    iconEl.textContent  = "📚";
    titleEl.textContent = "Noch etwas Übung nötig";
    subEl.textContent   = "Geh die Themen nochmal durch und probiere es erneut.";
  }

  // Score
  document.getElementById("scoreDisplay").innerHTML =
    `${richtig} <span>von ${total} richtig · ${pct}%</span>`;

  // Breakdown nach Themen
  const themen = {};
  antworten.forEach(a => {
    if (!themen[a.thema]) themen[a.thema] = { richtig: 0, gesamt: 0 };
    themen[a.thema].gesamt++;
    if (a.richtig) themen[a.thema].richtig++;
  });

  const breakdown = document.getElementById("resultBreakdown");
  breakdown.innerHTML = Object.entries(themen).map(([thema, s]) => {
    const t   = s.gesamt > 0 ? Math.round((s.richtig / s.gesamt) * 100) : 0;
    const cls = t >= 70 ? "bb-green" : t >= 50 ? "bb-amber" : "bb-red";
    return `
      <div class="breakdown-row">
        <span class="breakdown-theme">${thema}</span>
        <span class="breakdown-score">${s.richtig}/${s.gesamt}</span>
        <div class="breakdown-bar-wrap">
          <div class="breakdown-bar ${cls}" style="width:${t}%"></div>
        </div>
      </div>`;
  }).join("");
}
