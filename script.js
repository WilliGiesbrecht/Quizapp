let questions = [
    {
        "question": "Welche bekannte Band entwickelte sich aus (The Quarrymen)?",
        "answer_1": "The Beatles",
        "answer_2": "Aerosmith",
        "answer_3": "Queen",
        "answer_4": "The Rolling Stones",
        "right_answer": 1
    },
    {
        "question": "Was ist der griechische Begriff für Sechseck?",
        "answer_1": "Hexenbesen",
        "answer_2": "Hexenhaus",
        "answer_3": "Hexagon",
        "answer_4": "Hexagramm",
        "right_answer": 3
    },
    {
        "question": "Was müssen Automotorsportler tragen?",
        "answer_1": "Unterhosen",
        "answer_2": "Unterhemden",
        "answer_3": "einen Helm",
        "answer_4": "Lycra-Shirts",
        "right_answer": 3
    },
    {
        "question": "Welcher dieser Flüsse mündet nicht in den Rhein?",
        "answer_1": "Main",
        "answer_2": "Nahe",
        "answer_3": "Saar",
        "answer_4": "Mosel",
        "right_answer": 3
    },
    {
        "question": "Warum können wir eigenen schlechten Atem nicht riechen?",
        "answer_1": "weil die Zunge den Geruch filtert",
        "answer_2": "weil die Nase zu nah am Mund ist",
        "answer_3": "weil sich unsere Nase daran gewöhnt hat",
        "answer_4": "weil die Nase nicht im rechten Winkel riechen kann",
        "right_answer": 3
    },
    {
        "question": "Wie nennt der Volksmund eine Suppe mit vielen Zutaten?",
        "answer_1": "Restebrühe",
        "answer_2": "zusammengekehrte Abfälle",
        "answer_3": "quer durch den Garten",
        "answer_4": "alles vom Aldi",
        "right_answer": 3
    },
    {
        "question": "Was wird nicht im Herbst geerntet?",
        "answer_1": "Äpfel",
        "answer_2": "Hopfen",
        "answer_3": "Mais",
        "answer_4": "Kürbis",
        "right_answer": 2
    },
    {
        "question": "Welcher Krieg begann mit dem 1. Prager Fenstersturz?",
        "answer_1": "Hussitenkrieg",
        "answer_2": "100-jähriger Krieg",
        "answer_3": "30-jähriger Krieg",
        "answer_4": "7-jähriger Krieg",
        "right_answer": 1
    },
    {
        "question": "Wer ist Erwin Schrott?",
        "answer_1": "der König von Nepal",
        "answer_2": "ein Bassbariton und Lebensgefährte von A.Netrebko",
        "answer_3": "einer von Putins russlanddeutschen Leibwächtern",
        "answer_4": "der Außenminister von Kasachstan",
        "right_answer": 2
    },
    {
        "question": "Wie nennt man einen sturen Menschen?",
        "answer_1": "Betonsilo",
        "answer_2": "Betonkopf",
        "answer_3": "Betonmischer",
        "answer_4": "Betonbauer",
        "right_answer": 2
    },
];

let rightQestions = 0;
let currentQuestion = 0;
let AUDIO_SUCCESS = new Audio('sounds/success.mp3');
let AUDIO_WRONG = new Audio('sounds/wrong.mp3');

function init() {
    document.getElementById('questionsNumbers').innerHTML = questions.length;
    showQuestion()
}

function showQuestion() {
    if (gameIsOver()) {
        showEndScreen();
    } else {
        updateProgressBar();
        showNextQuestion();
    }
}

function gameIsOver() {
    return currentQuestion >= questions.length;
}

function showNextQuestion() {
    let question = questions[currentQuestion];

    document.getElementById('questionpage').innerHTML = currentQuestion + 1;
    document.getElementById('questiontext').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
}

function answer(selection) {
    let question = questions[currentQuestion];
    let selectetQuestNumber = selection.slice(-1);
    let rightId = `answer_${question['right_answer']}`;

    if (rightAnswerSelected(selectetQuestNumber, question)) {
        document.getElementById(selection).parentNode.classList.add('bg-success');
        AUDIO_SUCCESS.play();
        rightQestions++;
    } else {
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(rightId).parentNode.classList.add('bg-success');
        AUDIO_WRONG.play();
    }
    document.getElementById('next-button').disabled = false;
}

function rightAnswerSelected(selectetQuestNumber, question) {
    return selectetQuestNumber == question['right_answer'];
}

function nextQuestion() {
    currentQuestion++;//wird erhöht um 1
    document.getElementById('next-button').disabled = true;
    resetAnswerButtons();
    showQuestion();
}

function resetAnswerButtons() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
}

function restardGame() {
    document.getElementById('endImg').innerHTML = '<img src="./img/maze.png">';
    document.getElementById('questionBody').style = '';
    document.getElementById('endscreen').style = 'display: none';

    rightQestions = 0;
    currentQuestion = 0;
    init();
}

function showEndScreen() {
    document.getElementById('endscreen').style = '';
    document.getElementById('questionBody').style = 'display: none';
    document.getElementById('endImg').innerHTML = '<img src="./img/trophy.jpg">';
    document.getElementById('amount-of-questions').innerHTML = questions.length;
    document.getElementById('amount-of-right-questions').innerHTML = rightQestions;
}

function updateProgressBar() {
    let percent = (currentQuestion + 1) / questions.length;
    percent = Math.round(percent * 100);

    document.getElementById('progress-bar').innerHTML = `${percent} %`;
    document.getElementById('progress-bar').style = `width: ${percent}%`;

}