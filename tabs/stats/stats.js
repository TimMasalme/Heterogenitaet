/* =============================================
   stats.js  –  vollständig neu
   Bugfixes:
   - Balkendiagramm: 3 echte nebeneinander-Balken
   - Keine Dopplung zwischen Sektionen
   - Themengebiete korrekt gerendert
   ============================================= */

let unsubscribe = null;
let alleErgebnisse = [];

window.addEventListener("load", () => {
  setTimeout(initStats, 250);
});

/* ─── INIT ──────────────────────────────────── */
function initStats() {
  const db         = window._db;
  const collection = window._collection;
  const onSnapshot = window._onSnapshot;
  const query      = window._query;

  if (!db) { showError("Firebase nicht verfügbar"); return; }

  const q = query(collection(db, "ergebnisse"));

  unsubscribe = onSnapshot(q, (snapshot) => {
    alleErgebnisse = snapshot.docs.map(d => d.data());
    renderAlles(alleErgebnisse);
  }, (err) => {
    showError(err.message);
  });
}

/* ─── ORCHESTRATE ───────────────────────────── */
function renderAlles(ergebnisse) {
  const loading = document.getElementById("loadingState");
  const content = document.getElementById("statsContent");
  if (loading) loading.style.display = "none";
  if (content) content.classList.remove("hidden");

  const kursFragen = window.getKursFragen?.();
  if (!kursFragen?.length) { showError("Fragen nicht geladen"); return; }

  const stats = aggregiere(ergebnisse, kursFragen);

  renderKPIs(ergebnisse, stats, kursFragen);
  renderBigChart(stats, kursFragen);
  renderQBreakdown(stats, kursFragen);
  renderThemen(stats, kursFragen);
  renderDistrib(stats, kursFragen);
  renderOffeneFragen(ergebnisse);
}

/* ─── AGGREGATION ───────────────────────────── */
function aggregiere(ergebnisse, kursFragen) {
  const stats = {};

  kursFragen.forEach(f => {
    stats[f.id] = {
      richtig:       0,
      gesamt:        0,
      antwortCounts: new Array(f.antworten.length).fill(0)
    };
  });

  ergebnisse.forEach(session => {
    if (!session.antworten) return;
    session.antworten.forEach(a => {
      const s = stats[a.frageId];
      if (!s) return;
      s.gesamt++;
      if (a.richtig) s.richtig++;
      if (typeof a.gewählt === "number" && a.gewählt >= 0) {
        s.antwortCounts[a.gewählt]++;
      }
    });
  });

  return stats;
}

/* ─── KPIs ──────────────────────────────────── */
function renderKPIs(ergebnisse, stats, fragen) {
  let richtigGesamt = 0, frageGesamt = 0;
  fragen.forEach(f => {
    richtigGesamt += stats[f.id].richtig;
    frageGesamt   += stats[f.id].gesamt;
  });

  const pct   = frageGesamt ? Math.round((richtigGesamt / frageGesamt) * 100) : 0;
  const users = ergebnisse.length;

  // Beste & schwächste Frage
  let besteIdx = 0, schwächsteIdx = 0, besteP = -1, schwächsteP = 101;
  fragen.forEach((f, i) => {
    const s = stats[f.id];
    const p = s.gesamt ? (s.richtig / s.gesamt) * 100 : 0;
    if (p > besteP)        { besteP = p;        besteIdx = i; }
    if (p < schwächsteP)   { schwächsteP = p;   schwächsteIdx = i; }
  });

  document.getElementById("kpiRow").innerHTML = `
    <div class="kpi-card">
      <div class="kpi-value">${users}</div>
      <div class="kpi-label">Teilnehmende</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-value">${pct}%</div>
      <div class="kpi-label">Gesamt richtig</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-value" style="color:#2D7A4F">${Math.round(besteP)}%</div>
      <div class="kpi-label">Beste Frage · F${besteIdx + 1}</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-value" style="color:#C1440E">${Math.round(schwächsteP)}%</div>
      <div class="kpi-label">Schwächste Frage · F${schwächsteIdx + 1}</div>
    </div>
  `;
}

/* ─── BALKENDIAGRAMM (FIX) ──────────────────── */
/*
   Bug vorher: bar-total, bar-correct, bar-wrong waren
   gestapelt in einem einzigen 14px Stack (overflow hidden)
   → nur ein Balken sichtbar, nie volle Höhe.

   Fix: 3 echte nebeneinander-Balken (.bar-trio mit flex row).
   Höhe berechnet sich relativ zum Maximum aller Werte.
*/
function renderBigChart(stats, fragen) {
  const el = document.getElementById("bigChart");
  if (!el) return;

  // Maximumwert für Skalierung
  let max = 0;
  fragen.forEach(f => {
    max = Math.max(max, stats[f.id].gesamt);
  });
  const scale = Math.max(max, 1);
  const H = 180; // px Diagrammhöhe

  el.innerHTML = fragen.map((f, i) => {
    const s   = stats[f.id];
    const tot = s.gesamt;
    const cor = s.richtig;
    const wro = tot - cor;
    const pct = tot ? Math.round((cor / tot) * 100) : 0;

    // Balkenhöhen in px
    const hT = Math.round((tot / scale) * H);
    const hC = Math.round((cor / scale) * H);
    const hW = Math.round((wro / scale) * H);

    return `
      <div class="chart-group">
        <div class="bar-trio">
          <div class="bar bar-t" style="height:${hT}px" title="Gesamt: ${tot}">
            ${tot > 0 ? `<span class="bar-val">${tot}</span>` : ''}
          </div>
          <div class="bar bar-c" style="height:${hC}px" title="Richtig: ${cor}">
            ${cor > 0 ? `<span class="bar-val">${cor}</span>` : ''}
          </div>
          <div class="bar bar-w" style="height:${hW}px" title="Falsch: ${wro}">
            ${wro > 0 ? `<span class="bar-val">${wro}</span>` : ''}
          </div>
        </div>
        <div class="chart-label">F${i + 1}</div>
        <div class="chart-pct">${tot ? pct + '%' : '–'}</div>
      </div>
    `;
  }).join('');
}

/* ─── FRAGEN DETAIL ─────────────────────────── */
function renderQBreakdown(stats, fragen) {
  const el = document.getElementById("qBreakdown");
  if (!el) return;

  el.innerHTML = fragen.map((f, i) => {
    const s   = stats[f.id];
    const pct = s.gesamt ? Math.round((s.richtig / s.gesamt) * 100) : 0;

    const cls = pct >= 70 ? 'high' : pct >= 40 ? 'mid' : 'low';

    return `
      <div class="q-row">
        <div class="q-num">${i + 1}</div>
        <div>
          <div class="q-text">${f.frage}</div>
          <div class="q-thema">${f.thema} · ${f.schwierigkeit ?? ''}</div>
        </div>
        <div class="q-pct-block">
          <div class="q-pct-num pct-${cls}">${pct}%</div>
          <div class="q-pct-label">${s.richtig}/${s.gesamt} richtig</div>
        </div>
        <div class="q-bar-track">
          <div class="q-bar-fill fill-${cls}" style="width:${pct}%"></div>
        </div>
      </div>
    `;
  }).join('');
}

/* ─── THEMENGEBIETE ─────────────────────────── */
function renderThemen(stats, fragen) {
  const el = document.getElementById("themeGrid");
  if (!el) return;

  // Gruppieren nach thema
  const themen = {};
  fragen.forEach(f => {
    if (!themen[f.thema]) themen[f.thema] = { richtig: 0, gesamt: 0 };
    themen[f.thema].richtig += stats[f.id].richtig;
    themen[f.thema].gesamt  += stats[f.id].gesamt;
  });

  el.innerHTML = Object.entries(themen).map(([name, t]) => {
    const pct = t.gesamt ? Math.round((t.richtig / t.gesamt) * 100) : 0;
    const cls = pct >= 70 ? 'high' : pct >= 40 ? 'mid' : 'low';
    const fillColor = cls === 'high' ? '#2D7A4F' : cls === 'mid' ? '#B8860B' : '#C1440E';

    return `
      <div class="theme-card">
        <div class="theme-name">${name}</div>
        <div class="theme-bar-track">
          <div class="theme-bar-fill" style="width:${pct}%; background:${fillColor}"></div>
        </div>
        <div class="theme-stat">
          <span>${t.richtig}/${t.gesamt} richtig</span>
          <span class="pct-${cls}" style="font-weight:600">${pct}%</span>
        </div>
      </div>
    `;
  }).join('');
}

/* ─── ANTWORTVERTEILUNG ─────────────────────── */
function renderDistrib(stats, fragen) {
  const el = document.getElementById("distribList");
  if (!el) return;

  el.innerHTML = fragen.map((f, i) => {
    const s     = stats[f.id];
    const total = Math.max(s.gesamt, 1);
    const pct   = s.gesamt ? Math.round((s.richtig / s.gesamt) * 100) : 0;
    const cls   = pct >= 70 ? 'high' : pct >= 40 ? 'mid' : 'low';

    const opts = s.antwortCounts.map((c, idx) => {
      const p       = Math.round((c / total) * 100);
      const isRight = idx === f.richtig;
      const barCls  = isRight ? 'correct-bar' : (c > 0 ? 'wrong-bar' : '');
      const letCls  = isRight ? 'correct-answer' : '';

      return `
        <div class="distrib-opt">
          <div class="distrib-letter ${letCls}" data-tooltip="${f.antworten[idx]}">
            ${String.fromCharCode(65 + idx)}
          </div>
          <div class="distrib-bar-wrap">
            <div class="distrib-bar-fill ${barCls}" style="width:${p}%"></div>
          </div>
          <div class="distrib-n">${c}</div>
        </div>
      `;
    }).join('');

    return `
      <div class="distrib-row">
        <div class="distrib-header">
          <div class="distrib-q">F${i + 1}: ${f.frage}</div>
          <div class="distrib-badge badge-${cls}">${pct}% richtig</div>
        </div>
        ${opts}
      </div>
    `;
  }).join('');
}

/* ─── RESET ─────────────────────────────────── */
// PIN für "Ergebnisse löschen" – verhindert versehentliches Löschen durch Schüler
const RESET_PIN = "270503";

window.confirmResetWithPin = async function () {
  const eingabe = prompt("PIN eingeben:");
  if (eingabe === null) return; // Abbrechen
  if (eingabe !== RESET_PIN) {
    alert("Falscher PIN.");
    return;
  }
  if (!confirm("Alle Testergebnisse wirklich löschen? (Für neue Kursrunde)")) return;

  const db         = window._db;
  const collection = window._collection;
  const getDocs    = window._getDocs;
  const deleteDoc  = window._deleteDoc;
  const doc        = window._doc;

  try {
    const snap = await getDocs(collection(db, "ergebnisse"));
    const dels = snap.docs.map(d => deleteDoc(doc(db, "ergebnisse", d.id)));
    await Promise.all(dels);
    alert("Ergebnisse gelöscht.");
  } catch (e) {
    alert("Fehler beim Löschen: " + e.message);
  }
};

/* ─── ERROR ─────────────────────────────────── */
function showError(msg) {
  const el = document.getElementById("loadingState");
  if (el) el.innerHTML = `<p style="color:#C1440E;font-weight:600">⚠ ${msg}</p>`;
}

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

/* ─── OFFENE FRAGEN (aus ergebnisse) ────────── */
function renderOffeneFragen(ergebnisse) {
  const list = document.getElementById('fragenList');
  const actions = document.getElementById('fragenActions');
  if (!list) return;

  const mitFrage = ergebnisse.filter(e => e.offeneFrage?.trim());

  if (!mitFrage.length) {
    list.innerHTML = '<div class="fragen-empty">Keine offenen Fragen eingereicht.</div>';
    if (actions) actions.style.display = 'none';
    return;
  }

  if (actions) actions.style.display = 'none'; // Löschen nicht nötig – wird mit Ergebnissen gelöscht

  list.innerHTML = '<div class="fragen-list">' +
    mitFrage.map(e => {
      const ts  = e.timestamp?.toDate?.();
      const zeit = ts ? ts.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }) : '';
      return `
        <div class="frage-item">
          ${escapeHtml(e.offeneFrage)}
          ${zeit ? `<div class="frage-time">${zeit} Uhr</div>` : ''}
        </div>`;
    }).join('') +
  '</div>';
}
