// =============================================
//  meta/questions.js  –  Fragenpool
//  "Heterogenität an Schulen"
//
//  pool: "kurs"  → Kurstest (feste Reihenfolge)
//  pool: "extra" → Lernmodus (zufällig gemischt)
//
//  thema:          LdL-Gruppe / Präsentation
//  schwierigkeit:  "leicht" | "mittel" | "schwer"
// =============================================

const FRAGEN = [
  // ── KURS-FRAGENPOOL ──────────────────────────
  {
    id: "q1",
    pool: "kurs",
    thema: "Begriff & Dimensionen",
    schwierigkeit: "leicht",
    frage: "Welche der folgenden Aussagen beschreibt den erziehungswissenschaftlichen Begriff „Heterogenität" am treffendsten?",
    antworten: [
      "Die Unterschiede zwischen Schüler:innen sind ein didaktisches Problem, das minimiert werden sollte.",
      "Heterogenität beschreibt die Vielfalt von Lernenden hinsichtlich Leistung, Herkunft, Sprache und weiterer Merkmale.",
      "Heterogenität bezieht sich ausschließlich auf Unterschiede im Leistungsniveau.",
      "In homogenen Lerngruppen treten keine Unterschiede zwischen Schüler:innen auf."
    ],
    richtig: 1
  },
  {
    id: "q2",
    pool: "kurs",
    thema: "Begriff & Dimensionen",
    schwierigkeit: "mittel",
    frage: "Welche zwei Dimensionen von Heterogenität werden in der Schulpädagogik besonders häufig unterschieden?",
    antworten: [
      "Horizontale und vertikale Heterogenität",
      "Formale und informelle Heterogenität",
      "Statische und dynamische Heterogenität",
      "Kognitive und soziale Heterogenität"
    ],
    richtig: 0
  },
  {
    id: "q3",
    pool: "kurs",
    thema: "Inklusion & Sonderpädagogik",
    schwierigkeit: "mittel",
    frage: "Die UN-Behindertenrechtskonvention (2006/2009) verpflichtet Deutschland zu …",
    antworten: [
      "… der vollständigen Abschaffung aller Förderschulen bis 2020.",
      "… einem inklusiven Bildungssystem, das Schüler:innen mit Behinderungen gemeinsames Lernen ermöglicht.",
      "… der Einrichtung separater Klassen für Schüler:innen mit sonderpädagogischem Förderbedarf.",
      "… einem einheitlichen Curriculum für alle Schulformen."
    ],
    richtig: 1
  },
  {
    id: "q4",
    pool: "kurs",
    thema: "Sprachliche Heterogenität",
    schwierigkeit: "mittel",
    frage: "Was versteht man unter „Deutsch als Zweitsprache" (DaZ) im schulischen Kontext?",
    antworten: [
      "Unterricht für Schüler:innen, die bereits eine andere Fremdsprache gelernt haben.",
      "Förderung von Schüler:innen, die Deutsch nicht als Erstsprache erworben haben und es im schulischen Alltag als Unterrichtssprache nutzen.",
      "Ein Fach, das ausschließlich in Vorbereitungsklassen unterrichtet wird.",
      "Das Erlernen von Dialekten neben dem Hochdeutschen."
    ],
    richtig: 1
  },
  {
    id: "q5",
    pool: "kurs",
    thema: "Differenzierung & Umgang",
    schwierigkeit: "mittel",
    frage: "Welche Maßnahme ist ein Beispiel für „innere Differenzierung" im Unterricht?",
    antworten: [
      "Aufteilung der Klasse nach Leistungsniveau in verschiedene Schulzweige",
      "Bereitstellung von Aufgaben unterschiedlicher Schwierigkeitsgrade innerhalb derselben Klasse",
      "Einrichtung von Förderschulen für Kinder mit besonderem Bedarf",
      "Einführung von Jahrgangsübergreifendem Unterricht"
    ],
    richtig: 1
  },
  {
    id: "q6",
    pool: "kurs",
    thema: "Soziale & kulturelle Heterogenität",
    schwierigkeit: "mittel",
    frage: "Was beschreibt der Begriff „Kulturelle Responsivität" (culturally responsive teaching)?",
    antworten: [
      "Den Austausch von Schüler:innen zwischen verschiedenen Kulturen im Auslandsjahr",
      "Eine Unterrichtsgestaltung, die kulturelle Hintergründe und Erfahrungen der Schüler:innen aktiv einbezieht und wertschätzt",
      "Die ausschließliche Vermittlung der Mehrheitskultur im Unterricht",
      "Ein standardisiertes Bewertungsverfahren für Schüler:innen mit Migrationshintergrund"
    ],
    richtig: 1
  },
  {
    id: "q7",
    pool: "kurs",
    thema: "Leistungsheterogenität",
    schwierigkeit: "schwer",
    frage: "Die IGLU- und PISA-Studien zeigen in Deutschland im internationalen Vergleich eine besonders starke …",
    antworten: [
      "… Korrelation zwischen Schulleistungen und dem sozioökonomischen Hintergrund der Familie.",
      "… Unabhängigkeit der Schulleistungen vom Migrationsstatus.",
      "… Angleichung der Leistungsunterschiede durch inklusive Maßnahmen.",
      "… Reduzierung von Heterogenität durch das gegliederte Schulsystem."
    ],
    richtig: 0
  },
  {
    id: "q8",
    pool: "kurs",
    thema: "Lehrerhandeln",
    schwierigkeit: "mittel",
    frage: "Welche Haltung ist laut aktueller Professionalisierungsforschung zentral für den produktiven Umgang mit Heterogenität?",
    antworten: [
      "Defizitorientierung: Unterschiede als Rückstand wahrnehmen und kompensieren",
      "Ressourcenorientierung: Unterschiede als Potenziale und Lernchancen für die Gruppe wahrnehmen",
      "Neutralisierung: Unterschiede im Unterricht vollständig ausblenden",
      "Standardisierung: Alle Schüler:innen nach einheitlichen Kriterien bewerten"
    ],
    richtig: 1
  },

  // ── EXTRA-POOL (Lernmodus) ───────────────────
  {
    id: "e1",
    pool: "extra",
    thema: "Begriff & Dimensionen",
    schwierigkeit: "leicht",
    frage: "Welcher Begriff beschreibt die Einteilung von Schüler:innen in leistungshomogene Gruppen?",
    antworten: ["Inklusion", "Tracking / Streaming", "Scaffolding", "Koproduktion"],
    richtig: 1
  },
  {
    id: "e2",
    pool: "extra",
    thema: "Inklusion & Sonderpädagogik",
    schwierigkeit: "mittel",
    frage: "Was unterscheidet „Integration" von „Inklusion" im schulpädagogischen Sinne?",
    antworten: [
      "Integration und Inklusion sind bedeutungsgleich.",
      "Integration passt Einzelne an das bestehende System an; Inklusion gestaltet das System für alle um.",
      "Inklusion bezieht sich nur auf Schüler:innen mit körperlichen Behinderungen.",
      "Integration bedeutet vollständige Abschaffung von Förderschulen."
    ],
    richtig: 1
  },
  {
    id: "e3",
    pool: "extra",
    thema: "Differenzierung & Umgang",
    schwierigkeit: "schwer",
    frage: "Was versteht man unter „Universal Design for Learning" (UDL)?",
    antworten: [
      "Ein barrierefreies Schulgebäude-Konzept",
      "Ein Unterrichtsrahmen, der von Anfang an multiple Zugangs-, Ausdrucks- und Beteiligungswege für alle Lernenden vorsieht",
      "Ein standardisiertes Testverfahren für heterogene Klassen",
      "Ein Lehrplan für den Sonderpädagogik-Studiengang"
    ],
    richtig: 1
  },
  {
    id: "e4",
    pool: "extra",
    thema: "Leistungsheterogenität",
    schwierigkeit: "mittel",
    frage: "Was bedeutet „Pygmalion-Effekt" im schulischen Kontext?",
    antworten: [
      "Schüler:innen lernen besser, wenn sie in kleinen Gruppen arbeiten.",
      "Lehrererwartungen beeinflussen die tatsächliche Leistungsentwicklung von Schüler:innen.",
      "Leistungsstarke Schüler:innen helfen automatisch schwächeren.",
      "Benotung motiviert alle Schüler:innen gleichermaßen."
    ],
    richtig: 1
  }
];

// Gibt nur den Kurspool zurück (feste Reihenfolge)
function getKursFragen() {
  return FRAGEN.filter(f => f.pool === "kurs");
}

// Gibt alle Fragen gemischt zurück (für Lernmodus)
function getLernFragen() {
  const all = [...FRAGEN];
  for (let i = all.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [all[i], all[j]] = [all[j], all[i]];
  }
  return all;
}
