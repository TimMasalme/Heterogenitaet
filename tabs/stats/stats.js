// =============================================
//  tabs/stats/stats.js  –  Auswertungslogik
//  Liest alle Ergebnisse aus Firestore (live)
//  und rendert KPIs, Q-Breakdown, Themen,
//  Antwortverteilung.
// =============================================

let unsubscribe = null;
let alleErgebnisse = [];

// Warte bis Firebase-Skript fertig geladen ist
window.addEventListener("load", () => {
  // Kleiner Delay damit firebase.js (module) initialisiert ist
  setTimeout(initStats, 300);
});

function initStats() {
  const db         = window._db;
  const collection = window._collection;
  const onSnapshot = window._onSnapshot;
  const query      = window._query;

  if (!db) {
    showError("Firebase nicht verfügbar. Bitte Seite neu laden.");
    return;
  }

  const q = query(collection(db, "ergebnisse"));

  unsubscribe = onSnapshot(q, (snapshot) => {
    alleErgebnisse = [];
    snapshot.forEach(docSnap => {
      alleErgebnisse.push(docSnap.data());
    });
    renderAlles(alleErgebnisse);
  }, (err) => {
    console.error("Firestore Fehler:", err);
    showError("Verbindung zu Firebase fehlgeschlagen: " + err.message);
  });
}

// ─── Hauptrender ──────────────────────────────
function renderAlles(ergebnisse) {
  document.getElementById("loadingState").classList.add("hidden");
  document.getElementById("statsContent").classList.remove("hidden");

  const kursFragen = getKursFragen();

  // Aggregiere pro Frage
  const fragenStats = aggregiereFragen(ergebnisse, kursFragen);

  renderKPIs(ergebnisse, fragenStats, kursFragen);
  renderQBreakdown(fragenStats, kursFragen);
  renderThemeGrid(fragenStats, kursFragen);
  renderDistribList(fragenStats, kursFragen);
}

// ─── Aggregation ──────────────────────────────
function aggregiereFragen(ergebnisse, kursFragen) {
  // Map: frageId → { richtig: n, gesamt: n, antwortCounts: [0,0,0,0] }
  const stats = {};

  kursFragen.forEach(f => {
    stats[f.id] = {
      richtig: 0,
      gesamt:  0,
      antwortCounts: new Array(f.antworten.length).fill(0)
    };
  });

  ergebnisse.forEach(session => {
    if (!session.antworten) return;
    session.antworten.forEach(a => {
      if (!stats[a.frageId]) return;
      stats[a.frageId].gesamt++;
      if (a.richtig) stats[a.frageId].richtig++;
      if (typeof a.gewählt === "number") {
        stats[a.frageId].antwortCounts[a.gewählt]++;
      }
    });
  });

  return stats;
}

// ─── KPI Row ──────────────────────────────────
function renderKPIs(ergebnisse, fragenStats, kursFragen) {
  const teilnehmer = ergebnisse.length;

  let gesamtRichtig = 0, gesamtGesamt = 0;
  kursFragen.forEach(f => {
    const s = fragenStats[f.id];
    gesamtRichtig += s.richtig;
    gesamtGesamt  += s.gesamt;
  });

  const gesamtPct = gesamtGesamt > 0
    ? Math.round((gesamtRichtig / gesamtGesamt) * 100)
    : 0;

  // Schwächste Frage
  let minPct = 100, minFrage = null;
  kursFragen.forEach(f => {
    const s = fragenStats[f.id];
    if (s.gesamt === 0) return;
    const pct = Math.round((s.richtig / s.gesamt) * 100);
    if (pct < minPct) { minPct = pct; minFrage = f; }
  });

  const kpis = [
    { value: teilnehmer,       label: "Teilnehmende",      highlight: false },
    { value: gesamtPct + "%",  label: "Gesamtergebnis",    highlight: true  },
    { value: kursFragen.length, label: "Fragen im Test",   highlight: false },
    { value: minFrage ? (minPct + "%") : "–", label: minFrage ? "Schwächste Frage" : "Noch keine Daten", highlight: false }
  ];

  const row = document.getElementById("kpiRow");
  row.innerHTML = kpis.map(k => `
    <div class="kpi-card ${k.highlight ? "kpi-highlight" : ""}">
      <span class="kpi-value">${k.value}</span>
      <span class="kpi-label">${k.label}</span>
    </div>
  `).join("");
}

// ─── Q Breakdown ──────────────────────────────
function renderQBreakdown(fragenStats, kursFragen) {
  const container = document.getElementById("qBreakdown");

  container.innerHTML = kursFragen.map((f, i) => {
    const s   = fragenStats[f.id];
    const pct = s.gesamt > 0 ? Math.round((s.richtig / s.gesamt) * 100) : null;

    const pctClass  = pct === null ? "" : pct >= 70 ? "pct-good" : pct >= 50 ? "pct-ok" : "pct-bad";
    const barClass  = pct === null ? "bar-green" : pct >= 70 ? "bar-green" : pct >= 50 ? "bar-amber" : "bar-red";
    const tagText   = pct === null ? "Keine Daten" : pct >= 70 ? "✓ Gut verstanden" : pct >= 50 ? "Noch unsicher" : "Nachsteuerung nötig";
    const tagClass  = pct !== null && pct >= 70 ? "ok-tag" : "";
    const pctStr    = pct !== null ? pct + "%" : "–";
    const barWidth  = pct !== null ? pct : 0;

    return `
      <div class="q-row">
        <div class="q-row-header">
          <span class="q-num">F${i + 1}</span>
          <span class="q-label">${f.frage}</span>
          <span class="q-pct ${pctClass}">${pctStr}</span>
        </div>
        <div class="bar-track">
          <div class="bar-fill ${barClass}" style="width: ${barWidth}%"></div>
        </div>
        <span class="q-tag ${tagClass}">${tagText}</span>
        <span style="font-size:.75rem;color:var(--ink-light);margin-left:8px">${s.gesamt} Antwort${s.gesamt !== 1 ? "en" : ""}</span>
      </div>
    `;
  }).join("");
}

// ─── Theme Grid ───────────────────────────────
function renderThemeGrid(fragenStats, kursFragen) {
  // Gruppiere nach Thema
  const themen = {};
  kursFragen.forEach(f => {
    if (!themen[f.thema]) themen[f.thema] = { richtig: 0, gesamt: 0 };
    themen[f.thema].richtig += fragenStats[f.id].richtig;
    themen[f.thema].gesamt  += fragenStats[f.id].gesamt;
  });

  const grid = document.getElementById("themeGrid");
  grid.innerHTML = Object.entries(themen).map(([thema, s]) => {
    const pct = s.gesamt > 0 ? Math.round((s.richtig / s.gesamt) * 100) : null;
    const pctClass = pct === null ? "" : pct >= 70 ? "pct-good" : pct >= 50 ? "pct-ok" : "pct-bad";
    return `
      <div class="theme-card">
        <div class="theme-name">${thema}</div>
        <div class="theme-pct-big ${pctClass}">${pct !== null ? pct + "%" : "–"}</div>
        <div class="theme-sub">${s.richtig} / ${s.gesamt} richtig</div>
      </div>
    `;
  }).join("");
}

// ─── Antwortverteilung ────────────────────────
function renderDistribList(fragenStats, kursFragen) {
  const container = document.getElementById("distribList");
  const letters   = ["A", "B", "C", "D"];

  container.innerHTML = kursFragen.map((f, qi) => {
    const s      = fragenStats[f.id];
    const total  = s.gesamt;

    // Welche falsche Antwort ist am häufigsten?
    let topWrong = -1, topWrongCount = 0;
    s.antwortCounts.forEach((cnt, idx) => {
      if (idx !== f.richtig && cnt > topWrongCount) {
        topWrongCount = cnt;
        topWrong = idx;
      }
    });

    const opts = f.antworten.map((text, idx) => {
      const cnt      = s.antwortCounts[idx];
      const pct      = total > 0 ? Math.round((cnt / total) * 100) : 0;
      const isRight  = idx === f.richtig;
      const isTop    = idx === topWrong && topWrongCount > 0;
      const barClass = isRight ? "is-correct" : isTop ? "is-top-wrong" : "is-wrong";
      const letClass = isRight ? "correct-letter" : "";

      return `
        <div class="distrib-opt">
          <span class="distrib-letter ${letClass}">${letters[idx]}</span>
          <div class="distrib-bar-wrap">
            <div class="distrib-bar ${barClass}" style="width:${pct}%"></div>
          </div>
          <span class="distrib-n">${cnt}×</span>
        </div>
      `;
    }).join("");

    return `
      <div class="distrib-row">
        <div class="distrib-q"><strong>F${qi+1}:</strong> ${f.frage}</div>
        <div class="distrib-answers">${opts}</div>
      </div>
    `;
  }).join("");
}

// ─── Reset ────────────────────────────────────
async function confirmReset() {
  if (!confirm("Wirklich alle Ergebnisse löschen? Das kann nicht rückgängig gemacht werden.")) return;

  const db         = window._db;
  const collection = window._collection;
  const getDocs    = window._getDocs;
  const deleteDoc  = window._deleteDoc;
  const doc        = window._doc;

  try {
    const snap = await getDocs(collection(db, "ergebnisse"));
    const promises = [];
    snap.forEach(d => promises.push(deleteDoc(doc(db, "ergebnisse", d.id))));
    await Promise.all(promises);
    alert("Alle Ergebnisse gelöscht.");
  } catch (err) {
    alert("Fehler beim Löschen: " + err.message);
  }
}

// ─── Error ────────────────────────────────────
function showError(msg) {
  document.getElementById("loadingState").innerHTML = `
    <div style="text-align:center;color:var(--accent)">
      <p style="font-size:1.5rem">⚠</p>
      <p>${msg}</p>
    </div>
  `;
}
