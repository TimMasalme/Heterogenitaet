const SESSION_ID = "s_" + Date.now().toString(36);

let fragen = [];
let antworten = {};

window.addEventListener("DOMContentLoaded", () => {
  fragen = getKursFragen();
  renderQuestions();
  updateProgress();
});

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

function selectAnswer(qIndex, answerIndex, el) {

  const parent = el.parentElement;

  const options = parent.querySelectorAll(".option");

  // 👉 Wenn diese Antwort schon gewählt ist → deselect
  if (antworten[qIndex] === answerIndex) {

    delete antworten[qIndex];

    options.forEach(o => o.classList.remove("selected"));

    updateProgress();
    return;
  }

  // 👉 sonst neue Auswahl setzen
  antworten[qIndex] = answerIndex;

  options.forEach(o => o.classList.remove("selected"));
  el.classList.add("selected");

  updateProgress();
}

function updateProgress() {

  const answered = Object.keys(antworten).length;
  const total = fragen.length;

  document.getElementById("progressText").textContent =
    `${answered} / ${total}`;

  document.getElementById("progressFill").style.height =
    `${(answered / total) * 100}%`;
}

async function submitAll() {

  const payload = {
    sessionId: SESSION_ID,
    timestamp: window._serverTimestamp(),
    antworten: fragen.map((f, i) => ({
      frageId: f.id,
      thema: f.thema,
      gewählt: antworten[i] ?? null,
      richtig: antworten[i] === f.richtig
    }))
  };

  try {

    await window._addDoc(
      window._collection(window._db, "ergebnisse"),
      payload
    );

    document
      .getElementById("doneOverlay")
      .classList.remove("hidden");

  } catch(err) {

    alert("Fehler beim Speichern.");

    console.error(err);
  }
}

function resetTest() {
  // Overlay ausblenden
  document.getElementById("doneOverlay").classList.add("hidden");

  // Antworten zurücksetzen
  antworten = {};

  // Alle selected-Klassen entfernen
  document.querySelectorAll(".option.selected")
    .forEach(o => o.classList.remove("selected"));

  // Fortschritt zurücksetzen
  updateProgress();

  // Seite nach oben scrollen
  window.scrollTo({ top: 0, behavior: "smooth" });
}