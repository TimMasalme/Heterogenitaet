/* =============================================
   learn.js  –  Wissen + Üben
   ============================================= */

/* ──────────────────────────────────────────────
   WISSEN-INHALTE
────────────────────────────────────────────── */
const WISSEN = [
  {
    id: "begriffe",
    title: "Begriff & Dimensionen",
    sub: "Was bedeutet Heterogenität?",
    blocks: [
      { type: "def", term: "Definition", text: "Heterogenität im schulischen Kontext bezeichnet die Verschiedenheit von Lernenden hinsichtlich ihrer individuellen Voraussetzungen, Merkmale und Lebenshintergründe – z.B. Leistungsniveau, Herkunft, Sprache, Geschlecht oder sozioökonomischer Status." },
      { type: "text", text: "In der Schulpädagogik wird Heterogenität als normale Eigenschaft jeder Lerngruppe verstanden. Die Frage ist nicht ob Unterschiede existieren, sondern wie Schule und Lehrkräfte damit umgehen." },
      { type: "keypoints", items: [
        "Horizontale Heterogenität: Unterschiede auf gleichem Niveau (z.B. verschiedene Lernstile, Interessen)",
        "Vertikale Heterogenität: Unterschiede im Leistungsstand (z.B. Vorwissen, Arbeitsgeschwindigkeit)",
        "Mehrdimensionalität: Merkmale treten nie einzeln auf, sondern immer in Kombination"
      ]},
      { type: "merksatz", text: "Heterogenität ist keine Ausnahme, sondern der Normalfall – homogene Lerngruppen sind eine didaktische Fiktion." }
    ]
  },
  {
    id: "inklusion",
    title: "Inklusion & Sonderpädagogik",
    sub: "Vom Nebeneinander zum Miteinander",
    blocks: [
      { type: "text", text: "Die UN-Behindertenrechtskonvention (2006, in Deutschland 2009 ratifiziert) verpflichtet zu einem inklusiven Bildungssystem, das allen Schüler:innen – unabhängig von Beeinträchtigungen – gemeinsames Lernen ermöglicht." },
      { type: "compare",
        colA: { title: "Integration (alt)", items: ["Schüler:in passt sich dem System an", "Sonderpädagogischer Förderbedarf als Label", "Parallele Strukturen (Sonderklassen)", "Assimilation als Ziel"] },
        colB: { title: "Inklusion (neu)",   items: ["System passt sich der Person an", "Alle Lernenden im Blick", "Gemeinsames Lernen für alle", "Wertschätzung von Vielfalt"] }
      },
      { type: "highlight", label: "Wichtig", text: "Inklusion betrifft nicht nur Schüler:innen mit Behinderungen – der Begriff umfasst alle Dimensionen von Vielfalt: Sprache, soziale Herkunft, Geschlecht, Religionszugehörigkeit und mehr." }
    ]
  },
  {
    id: "sprache",
    title: "Sprachliche Heterogenität",
    sub: "Mehrsprachigkeit als Ressource",
    blocks: [
      { type: "def", term: "Deutsch als Zweitsprache (DaZ)", text: "DaZ bezeichnet den Erwerb des Deutschen nach oder neben der Erstsprache – nicht in einem gesteuerten Unterrichtskontext, sondern durch natürliche Exposition im Alltag und in der Schule." },
      { type: "text", text: "Sprachliche Heterogenität beschreibt die unterschiedlichen Sprachkompetenzen, Erstsprachen und kommunikativen Repertoires innerhalb einer Lerngruppe. Ca. 35 % der Schüler:innen in Deutschland haben einen Migrationshintergrund." },
      { type: "keypoints", items: [
        "Mehrsprachigkeit ist eine kognitive Ressource, kein Defizit",
        "Sprachsensibler Fachunterricht: Fachsprache explizit lehren, nicht voraussetzen",
        "Alltagssprache, Bildungssprache und Fachsprache sind klar zu unterscheiden",
        "Die Erstsprache zu wertschätzen stärkt Identität und Lernbereitschaft"
      ]},
      { type: "merksatz", text: "Wer die Erstsprache eines Kindes wertschätzt, stärkt seine Identität und öffnet Lernwege." }
    ]
  },
  {
    id: "differenzierung",
    title: "Differenzierung & Umgang",
    sub: "Vielfalt didaktisch begegnen",
    blocks: [
      { type: "def", term: "Innere Differenzierung", text: "Maßnahmen innerhalb derselben Lerngruppe, die auf unterschiedliche Lernstände und Bedürfnisse eingehen – z.B. gestufte Aufgaben, flexible Gruppenbildung, unterschiedliche Materialien." },
      { type: "keypoints", items: [
        "Aufgabenformate: Pflicht- und Küraufgaben, Kompetenzraster",
        "Methodenwahl: Stationenlernen, kooperatives Lernen, Lernbüro",
        "Materialien: Scaffolding, gestufte Hilfen, Visualisierungen",
        "Feedback: Lernentwicklungsgespräche statt reiner Notengebung"
      ]},
      { type: "highlight", label: "Universal Design for Learning (UDL)", text: "UDL plant Unterricht von Anfang an für alle: multiple Repräsentationsformen (wie wird gelernt?), multiple Handlungsmöglichkeiten (wie wird gezeigt was man kann?) und multiple Engagementformen (warum wird gelernt?)." },
      { type: "merksatz", text: "Differenzierung ist keine Schwächung von Ansprüchen – sie ist die Voraussetzung dafür, dass alle Schüler:innen wirklich gefordert werden." }
    ]
  },
  {
    id: "leistung",
    title: "Leistungsheterogenität",
    sub: "PISA, Pygmalion & Chancen",
    blocks: [
      { type: "text", text: "Deutschland zeigt im internationalen Vergleich (PISA, IGLU) eine besonders starke Kopplung von Schulerfolg und sozioökonomischem Hintergrund. Das gegliederte Schulsystem verstärkt diese Ungleichheit nachweislich." },
      { type: "def", term: "Pygmalion-Effekt", text: "Lehrererwartungen wirken sich messbar auf die Leistungsentwicklung von Schüler:innen aus. Hohe Erwartungen fördern Leistung – niedrige Erwartungen begrenzen sie, unabhängig vom tatsächlichen Potenzial." },
      { type: "keypoints", items: [
        "Tracking / Streaming: frühe Leistungsgruppierung verstärkt Ungleichheit",
        "Chancengleichheit (gleiche Ressourcen) vs. Chancengerechtigkeit (bedarfsorientierte Ressourcen)",
        "Förderdiagnostik: Lernstand als Ausgangspunkt, nicht als Urteil",
        "Ressourcenorientierung: Was kann das Kind – nicht: was fehlt?"
      ]}
    ]
  },
  {
    id: "haltung",
    title: "Lehrerhandeln & Haltung",
    sub: "Professioneller Umgang mit Vielfalt",
    blocks: [
      { type: "text", text: "Die Forschung zur Lehrerprofessionalität zeigt: Haltung ist entscheidender als Methode. Wer Heterogenität als Problem begreift, wird immer nach Wegen suchen sie zu reduzieren. Wer sie als Ressource begreift, gestaltet Lernen produktiver." },
      { type: "compare",
        colA: { title: "Defizitorientierung", items: ["Unterschiede als Problem", "Fokus: Was fehlt?", "Ziel: Angleichung", "Haltung: kompensatorisch"] },
        colB: { title: "Ressourcenorientierung", items: ["Unterschiede als Potenzial", "Fokus: Was ist da?", "Ziel: Entfaltung", "Haltung: anerkennend"] }
      },
      { type: "highlight", label: "Kernkompetenz", text: "Diagnostische Kompetenz ist die Fähigkeit, Lernstände präzise wahrzunehmen und daraus didaktische Entscheidungen abzuleiten – nicht als einmalige Beurteilung, sondern als fortlaufender Prozess im Unterricht." },
      { type: "merksatz", text: "Inklusive Haltung bedeutet nicht, Unterschiede zu ignorieren – sondern sie anzuerkennen und pädagogisch produktiv zu machen." }
    ]
  }
];

/* ──────────────────────────────────────────────
   TAB SWITCHING
────────────────────────────────────────────── */
function switchTab(tab) {
  document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));
  document.querySelectorAll(".topbar-tab").forEach(b => {
    b.classList.toggle("active", b.dataset.tab === tab);
  });
  const id = "tab" + tab.charAt(0).toUpperCase() + tab.slice(1);
  document.getElementById(id).classList.add("active");
  if (tab === "karten") initKartenIfNeeded();
}

/* ──────────────────────────────────────────────
   WISSEN – render on load
────────────────────────────────────────────── */
window.addEventListener("DOMContentLoaded", () => {
  renderWissen();
  setupScrollSpy();
});

function renderWissen() {
  // Sidebar nav
  const nav = document.getElementById("topicNav");
  nav.innerHTML =
    '<div class="sidebar-section-label">Themen</div>' +
    WISSEN.map(t => `
      <button class="nav-item" data-id="${t.id}" onclick="scrollToTopic('${t.id}')">${t.title}</button>
    `).join("");

  // Content
  const content = document.getElementById("wissenContent");
  content.innerHTML = WISSEN.map(t => `
    <section class="topic-section" id="topic-${t.id}">
      <h2 class="topic-section-title">${t.title}</h2>
      <div class="topic-section-sub">${t.sub}</div>
      <div class="topic-divider"></div>
      <div class="content-block">
        ${t.blocks.map(renderBlock).join("")}
      </div>
    </section>
  `).join("");
}

function renderBlock(block) {
  switch (block.type) {
    case "def":
      return `<div class="def-card"><div class="def-term">${block.term}</div><p class="def-text">${block.text}</p></div>`;
    case "text":
      return `<p>${block.text}</p>`;
    case "keypoints":
      return `<ul class="key-points">${block.items.map(i => `<li>${i}</li>`).join("")}</ul>`;
    case "highlight":
      return `<div class="highlight-box"><div class="hb-label">${block.label}</div><p>${block.text}</p></div>`;
    case "compare":
      return `
        <div class="compare-grid">
          <div class="compare-col col-a">
            <div class="compare-col-title">${block.colA.title}</div>
            <ul>${block.colA.items.map(i => `<li>${i}</li>`).join("")}</ul>
          </div>
          <div class="compare-col col-b">
            <div class="compare-col-title">${block.colB.title}</div>
            <ul>${block.colB.items.map(i => `<li>${i}</li>`).join("")}</ul>
          </div>
        </div>`;
    case "merksatz":
      return `<div class="merksatz"><p>${block.text}</p></div>`;
    default: return "";
  }
}

function scrollToTopic(id) {
  document.getElementById("topic-" + id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function setupScrollSpy() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id.replace("topic-", "");
        document.querySelectorAll(".nav-item[data-id]").forEach(l => {
          l.classList.toggle("active", l.dataset.id === id);
        });
      }
    });
  }, { rootMargin: "-20% 0px -70% 0px" });

  WISSEN.forEach(t => {
    const el = document.getElementById("topic-" + t.id);
    if (el) observer.observe(el);
  });
}

/* ──────────────────────────────────────────────
   ÜBEN – Quiz logic
────────────────────────────────────────────── */
let fragen      = [];
let aktuell     = 0;
let antworten   = [];
let beantwortet = false;

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function updateProgress() {
  const done  = aktuell;
  const total = fragen.length;
  document.getElementById("progressText").textContent = `${done} / ${total}`;
  document.getElementById("progressFill").style.height = `${(done / total) * 100}%`;
}

function startLearn() {
  fragen      = window.getLernFragen?.() || [];
  aktuell     = 0;
  antworten   = [];
  beantwortet = false;

  if (!fragen.length) { alert("Fragen konnten nicht geladen werden."); return; }

  showScreen("screenQuestion");
  renderFrage();
  updateProgress();
}

function renderFrage() {
  const f = fragen[aktuell];
  beantwortet = false;

  updateProgress();

  // Sidebar progress list
  const sidebar = document.getElementById("qProgressSidebar");
  sidebar.innerHTML = fragen.map((q, i) => {
    const cls = i < aktuell ? "done" : i === aktuell ? "current" : "";
    return `
      <div class="q-sidebar-item ${cls}">
        <div class="q-dot"></div>
        <span>Frage ${i + 1}</span>
      </div>`;
  }).join("");

  // Diff badge
  const diffMap = {
    leicht: { label: "Leicht", cls: "diff-leicht" },
    mittel: { label: "Mittel", cls: "diff-mittel" },
    schwer: { label: "Schwer", cls: "diff-schwer" },
  };
  const d = diffMap[f.schwierigkeit] || diffMap.mittel;

  // Question block
  const area = document.getElementById("questionArea");
  area.innerHTML = `
    <div class="question-block">
      <div class="question-theme">
        ${f.thema}
        <span class="diff-badge ${d.cls}">${d.label}</span>
      </div>
      <div class="question-text">${aktuell + 1}. ${f.frage}</div>
      <div class="options" id="optionsList"></div>
      <div class="feedback-box hidden" id="feedbackBox">
        <span class="fb-icon" id="fbIcon"></span>
        <span id="fbText"></span>
      </div>
      <div class="q-footer">
        <button class="btn-next" id="btnNext" onclick="nextQuestion()" disabled>
          ${aktuell < fragen.length - 1 ? "Weiter" : "Ergebnis ansehen"} &rarr;
        </button>
      </div>
    </div>`;

  // Options
  const letters = ["A", "B", "C", "D"];
  const list = document.getElementById("optionsList");
  f.antworten.forEach((text, i) => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.innerHTML = `<span class="option-letter">${letters[i]}</span><span>${text}</span>`;
    btn.onclick   = () => selectOption(i);
    list.appendChild(btn);
  });
}

function selectOption(index) {
  if (beantwortet) return;
  beantwortet = true;

  const f      = fragen[aktuell];
  const btns   = document.querySelectorAll(".option");
  const richtig = index === f.richtig;

  btns.forEach((b, i) => {
    b.disabled = true;
    if (i === f.richtig) b.classList.add("correct");
    else if (i === index) b.classList.add("wrong");
  });

  antworten.push({ frageId: f.id, thema: f.thema, schwierigkeit: f.schwierigkeit, gewählt: index, richtig });

  // Feedback
  const fb   = document.getElementById("feedbackBox");
  const icon = document.getElementById("fbIcon");
  const text = document.getElementById("fbText");
  const correct = f.antworten[f.richtig];

  if (richtig) {
    fb.className    = "feedback-box correct-fb";
    icon.textContent = "✓";
    text.textContent = "Richtig! " + correct;
  } else {
    fb.className    = "feedback-box wrong-fb";
    icon.textContent = "✗";
    text.innerHTML  = `Nicht ganz. Richtige Antwort: <strong>${correct}</strong>`;
  }

  document.getElementById("btnNext").disabled = false;
}

function nextQuestion() {
  aktuell++;
  if (aktuell < fragen.length) {
    renderFrage();
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    updateProgress();
    zeigeErgebnis();
  }
}

/* ── Ergebnis ─────────────────────────────────── */
function zeigeErgebnis() {
  showScreen("screenResult");

  const total   = antworten.length;
  const richtig = antworten.filter(a => a.richtig).length;
  const pct     = total > 0 ? Math.round((richtig / total) * 100) : 0;

  document.getElementById("resultTitle").textContent =
    pct >= 80 ? "Ausgezeichnet!" : pct >= 50 ? "Gut gemacht!" : "Weiter üben";

  document.getElementById("resultScoreBlock").innerHTML = `
    <div class="result-score-big">${pct}%</div>
    <div class="result-score-sub">${richtig} von ${total} richtig</div>`;

  // Theme breakdown
  const themen = {};
  antworten.forEach(a => {
    if (!themen[a.thema]) themen[a.thema] = { r: 0, g: 0 };
    themen[a.thema].g++;
    if (a.richtig) themen[a.thema].r++;
  });

  document.getElementById("resultThemes").innerHTML =
    Object.entries(themen).map(([thema, s]) => {
      const p   = s.g > 0 ? Math.round((s.r / s.g) * 100) : 0;
      const cls = p >= 70 ? "high" : p >= 45 ? "mid" : "low";
      return `
        <div class="rt-row">
          <span class="rt-name">${thema}</span>
          <span class="rt-score rt-${cls}">${s.r}/${s.g} richtig</span>
          <div class="rt-bar-track">
            <div class="rt-bar-fill rt-fill-${cls}" style="width:${p}%"></div>
          </div>
        </div>`;
    }).join("");
}
/* =============================================
   LERNKARTEN
   Baut Karteikarten aus dem WISSEN-Array:
   - Definitionen (def, merksatz, highlight)
   - Vorderseite: Begriff / Frage
   - Rückseite:   Erklärung / Text
   ============================================= */

let karten    = [];
let kartenIdx = 0;
let kartenFlipped = false;

function buildKarten() {
  const result = [];
  WISSEN.forEach(thema => {
    thema.blocks.forEach(block => {
      if (block.type === 'def') {
        result.push({
          thema:    thema.title,
          front:    block.term,
          back:     block.text,
          type:     'def'
        });
      } else if (block.type === 'merksatz') {
        result.push({
          thema:    thema.title,
          front:    'Merksatz: ' + thema.title,
          back:     block.text,
          type:     'merksatz'
        });
      } else if (block.type === 'highlight') {
        result.push({
          thema:    thema.title,
          front:    block.label,
          back:     block.text,
          type:     'highlight'
        });
      }
    });
  });
  // Mischen
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function initKartenIfNeeded() {
  // Nichts zu tun – Start-Screen wird angezeigt
}

function startKarten() {
  karten    = buildKarten();
  kartenIdx = 0;
  showKartenScreen('kartenScreenCard');
  renderKarte();
}

function showKartenScreen(id) {
  document.querySelectorAll('#tabKarten .screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function renderKarte() {
  if (!karten.length) return;
  const k    = karten[kartenIdx];
  kartenFlipped = false;

  document.getElementById('kartenProgress').textContent =
    `${kartenIdx + 1} / ${karten.length}`;

  const typeLabel = { def: 'Definition', merksatz: 'Merksatz', highlight: 'Konzept' };

  const stage = document.getElementById('kartenStage');
  stage.innerHTML = `
    <div class="karte" id="karte" onclick="flipKarte()">
      <div class="karte-inner" id="karteInner">
        <div class="karte-front">
          <div class="karte-badge">${typeLabel[k.type] || 'Begriff'} · ${k.thema}</div>
          <div class="karte-front-text">${k.front}</div>
          <div class="karte-hint">Tippen zum Umdrehen</div>
        </div>
        <div class="karte-back">
          <div class="karte-badge karte-badge-back">${typeLabel[k.type] || 'Begriff'} · ${k.thema}</div>
          <div class="karte-back-text">${k.back}</div>
        </div>
      </div>
    </div>`;

  // Prev/Next buttons
  const prev = document.getElementById('kartenBtnPrev');
  const next = document.getElementById('kartenBtnNext');
  if (prev) prev.style.visibility = kartenIdx > 0 ? 'visible' : 'hidden';
  if (next) next.textContent = kartenIdx < karten.length - 1 ? 'Weiter →' : 'Fertig';
}

function flipKarte() {
  kartenFlipped = !kartenFlipped;
  const inner = document.getElementById('karteInner');
  if (inner) inner.classList.toggle('flipped', kartenFlipped);
}

function kartenNext() {
  if (kartenIdx < karten.length - 1) {
    kartenIdx++;
    renderKarte();
  } else {
    showKartenScreen('kartenScreenDone');
  }
}

function kartenPrev() {
  if (kartenIdx > 0) {
    kartenIdx--;
    renderKarte();
  }
}

window.startKarten  = startKarten;
window.flipKarte    = flipKarte;
window.kartenNext   = kartenNext;
window.kartenPrev   = kartenPrev;
window.initKartenIfNeeded = initKartenIfNeeded;
