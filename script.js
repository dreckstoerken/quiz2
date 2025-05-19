
let quizPlayed = false;

// Quiz-Daten
const quizzes = [
    {
        title: "Mathematik-Quiz",
        questions: [
            { question: "Was ist die Ableitung von x²?", options: ["x", "2x", "x²", "2"], answer: "2x" },
            { question: "Was ist der Grenzwert von sin(x)/x bei x → 0?", options: ["0", "1", "∞", "nicht definiert"], answer: "1" },
            { question: "Was ist die Stammfunktion von 1/x?", options: ["ln(x)", "x", "1/x²", "x²/2"], answer: "ln(x)" },
            { question: "Wie lautet die Kettenregel?", options: ["f'(x)g'(x)", "f(g(x))' = f'(g(x))g'(x)", "f(x) + g(x)", "f(x)/g(x)"], answer: "f(g(x))' = f'(g(x))g'(x)" },
            { question: "Was ist die Ableitung von cos(x)?", options: ["-sin(x)", "cos(x)", "sin(x)", "-cos(x)"], answer: "-sin(x)" }
        ]
    },
    {
        title: "Bulgarien-Quiz",
        questions: [
            { question: "Was ist die Hauptstadt Bulgariens?", options: ["Sofia", "Plowdiw", "Varna", "Burgas"], answer: "Sofia" },
            { question: "Welche Währung verwendet Bulgarien?", options: ["Euro", "Lew", "Dollar", "Lira"], answer: "Lew" },
            { question: "Welches Gebirge verläuft durch Bulgarien?", options: ["Balkan", "Alpen", "Anden", "Himalaya"], answer: "Balkan" },
            { question: "Welche ist die größte Stadt nach Sofia?", options: ["Plowdiw", "Varna", "Russe", "Burgas"], answer: "Plowdiw" },
            { question: "Welches Meer grenzt an Bulgarien?", options: ["Schwarzes Meer", "Mittelmeer", "Ostsee", "Adria"], answer: "Schwarzes Meer" }
        ]
    },
    {
        title: "Rumänien-Quiz",
        questions: [
            { question: "Was ist die Hauptstadt Rumäniens?", options: ["Bukarest", "Cluj", "Iași", "Timișoara"], answer: "Bukarest" },
            { question: "Welches berühmte Schloss liegt in Rumänien?", options: ["Dracula-Schloss", "Neuschwanstein", "Windsor", "Schönbrunn"], answer: "Dracula-Schloss" },
            { question: "Welche Währung hat Rumänien?", options: ["Leu", "Euro", "Forint", "Zloty"], answer: "Leu" },
            { question: "Welcher Fluss bildet die Grenze zu Bulgarien?", options: ["Donau", "Theiß", "Rhein", "Elbe"], answer: "Donau" },
            { question: "Welches Gebirge verläuft durch Rumänien?", options: ["Karpaten", "Alpen", "Kaukasus", "Anden"], answer: "Karpaten" }
        ]
    }
,
    {
        title: "Griechenland-Quiz",
        questions: [
            { question: "Was ist die Hauptstadt Griechenlands?", options: ["Athen", "Thessaloniki", "Patras", "Korfu"], answer: "Athen" },
            { question: "Welche Währung hat Griechenland?", options: ["Euro", "Drachme", "Lira", "Dollar"], answer: "Euro" },
            { question: "Welches Meer umgibt Griechenland?", options: ["Ägäisches Meer", "Nordsee", "Ostsee", "Rotes Meer"], answer: "Ägäisches Meer" },
            { question: "Welcher berühmte Philosoph stammt aus Griechenland?", options: ["Platon", "Kant", "Descartes", "Nietzsche"], answer: "Platon" },
            { question: "Wie heißt der höchste Berg Griechenlands?", options: ["Olymp", "Parnass", "Athos", "Ida"], answer: "Olymp" }
        ]
    },
    {
        title: "Österreich-Quiz",
        questions: [
            { question: "Was ist die Hauptstadt Österreichs?", options: ["Wien", "Graz", "Salzburg", "Linz"], answer: "Wien" },
            { question: "Welche Währung wird in Österreich verwendet?", options: ["Euro", "Schilling", "Franken", "Krone"], answer: "Euro" },
            { question: "Welche Sprache wird in Österreich gesprochen?", options: ["Deutsch", "Französisch", "Italienisch", "Ungarisch"], answer: "Deutsch" },
            { question: "Welches Gebirge ist typisch für Österreich?", options: ["Alpen", "Karpaten", "Pyrenäen", "Appalachen"], answer: "Alpen" },
            { question: "Welcher Fluss fließt durch Wien?", options: ["Donau", "Rhein", "Elbe", "Oder"], answer: "Donau" }
        ]
    },

];

// Direkt bei Seitenaufruf ein zufälliges Quiz laden
window.onload = function() {
    const randomIndex = Math.floor(Math.random() * quizzes.length);
    const selectedQuiz = quizzes[randomIndex];
    displayQuiz(selectedQuiz);
};

function loadQuiz() {
    const fileInput = document.getElementById('quizFileInput');
    const file = fileInput.files[0];

    if (!file) {
        alert("Bitte eine Quiz-Datei im JSON-Format hochladen.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        if (quizPlayed) {
            alert("Das Quiz wurde bereits gespielt.");
            return;
        }

        const quizData = JSON.parse(event.target.result);
        displayQuiz(quizData);
    };
    reader.readAsText(file);
}

function displayQuiz(quiz) {
    const container = document.getElementById("quiz-container");
    container.innerHTML = "";

    const title = document.createElement("h2");
    title.textContent = quiz.title;
    container.appendChild(title);

    quiz.questions.forEach((q, index) => {
        const div = document.createElement("div");
        div.className = "question";
        div.innerHTML = `<p>${index + 1}. ${q.question}</p>` +
            q.options.map(opt => `
                <label>
                    <input type="radio" name="q${index}" value="${opt}">
                    ${opt}
                </label><br>`).join("");
        container.appendChild(div);
    });

    const submitButton = document.createElement("button");
    submitButton.textContent = "Abschicken";
    submitButton.onclick = () => checkAnswers(quiz);
    container.appendChild(submitButton);
}

function checkAnswers(quiz) {
    if (quizPlayed) {
        alert("Du hast dieses Quiz bereits gespielt.");
        return;
    }

    let score = 0;
    quiz.questions.forEach((q, i) => {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        if (selected && selected.value === q.answer) {
            score++;
        }
    });

    document.getElementById("result").textContent =
        `Ergebnis: ${score} von ${quiz.questions.length} korrekt.`;

    document.querySelectorAll("input[type='radio']").forEach(el => el.disabled = true);
    quizPlayed = true;
}
