const quizQuestions = [
  { question: "What word shows what happened yesterday? 'I ___ to school.'", answers: ["go", "went", "going", "goes"], correct: 1 },
  { question: "Which word is a thing you can touch?", answers: ["happy", "book", "run", "quick"], correct: 1 },
  { question: "Choose the right sentence:", answers: ["She no like apples.", "She does not like apples.", "She no likes apple.", "She don't like apples."], correct: 1 },
  { question: "How do we say more than one 'child'?", answers: ["childs", "childes", "children", "childrens"], correct: 2 },
  { question: "Fill in the blank: The cat is ___ the table.", answers: ["in", "on", "under", "by"], correct: 1 },

  { question: "Which word means a big animal that lives in water?", answers: ["dog", "whale", "bird", "cat"], correct: 1 },
  { question: "What do you wear on your feet?", answers: ["hat", "shoes", "gloves", "scarf"], correct: 1 },
  { question: "Choose the word that is a color:", answers: ["run", "blue", "happy", "jump"], correct: 1 },
  { question: "Which is a fruit?", answers: ["carrot", "banana", "bread", "milk"], correct: 1 },
  { question: "How many days are in a week?", answers: ["5", "6", "7", "8"], correct: 2 },

  { question: "What do you call the place where you live?", answers: ["school", "house", "park", "shop"], correct: 1 },
  { question: "Which word means 'not old'?", answers: ["young", "big", "slow", "fast"], correct: 0 },
  { question: "Choose the correct sentence:", answers: ["He can sings well.", "He can sing well.", "He can singing well.", "He can sang well."], correct: 1 },
  { question: "What do you do when you are tired?", answers: ["sleep", "run", "eat", "jump"], correct: 0 },
  { question: "Which one is a tool?", answers: ["hammer", "apple", "dog", "car"], correct: 0 },

  { question: "What is the opposite of 'hot'?", answers: ["cold", "wet", "dry", "dark"], correct: 0 },
  { question: "Choose the right word: The sun is ___ the sky.", answers: ["in", "on", "under", "behind"], correct: 0 },
  { question: "How many legs does a spider have?", answers: ["4", "6", "8", "10"], correct: 2 },
  { question: "Pick the word that is a number:", answers: ["seven", "happy", "big", "fast"], correct: 0 },
  { question: "Which one is a job?", answers: ["teacher", "apple", "jump", "run"], correct: 0 },

  { question: "What do you use to write?", answers: ["pen", "car", "shoe", "ball"], correct: 0 },
  { question: "What do birds do?", answers: ["fly", "run", "swim", "climb"], correct: 0 },
  { question: "Choose the sentence that is true:", answers: ["Cats can fly.", "Dogs can swim.", "Fish can fly.", "Birds can swim."], correct: 1 },
  { question: "Fill in the blank: I ___ my homework.", answers: ["do", "does", "did", "doing"], correct: 0 },
  { question: "Which word means 'very big'?", answers: ["small", "huge", "fast", "slow"], correct: 1 },

  { question: "Choose the right word: The apple is ___.", answers: ["red", "run", "blue", "sing"], correct: 0 },
  { question: "How many months are in a year?", answers: ["10", "11", "12", "13"], correct: 2 },
  { question: "What is the opposite of 'day'?", answers: ["night", "light", "sun", "moon"], correct: 0 },
  { question: "Which one is a pet?", answers: ["elephant", "dog", "lion", "tiger"], correct: 1 },
  { question: "Choose the right word: Birds ___ in the sky.", answers: ["fly", "run", "swim", "jump"], correct: 0 }
];

const quizDiv = document.getElementById("quiz");
const submitBtn = document.getElementById("submitBtn");
const feedbackDiv = document.getElementById("feedback");
const scoreDiv = document.getElementById("score");

let currentQuestion = 0;
let score = 0;

function loadQuestion(index) {
  feedbackDiv.textContent = "";
  submitBtn.disabled = true;

  const q = quizQuestions[index];
  quizDiv.innerHTML = `
    <div class="question" id="question">${index + 1}. ${q.question}</div>
    <ul class="answers" role="radiogroup" aria-labelledby="question">
      ${q.answers.map((ans, i) => `
        <li>
          <input type="radio" id="answer${i}" name="answer" value="${i}" />
          <label for="answer${i}">${ans}</label>
        </li>
      `).join('')}
    </ul>
  `;

  const radios = quizDiv.querySelectorAll('input[name="answer"]');
  radios.forEach(radio => {
    radio.addEventListener('change', () => {
      submitBtn.disabled = false;
      feedbackDiv.textContent = "";
    });
  });
}

function showFeedback(isCorrect, correctAnswerText) {
  if (isCorrect) {
    feedbackDiv.textContent = "Good job! That is correct! 🎉";
    feedbackDiv.className = "feedback correct";
  } else {
    feedbackDiv.textContent = `Oops! The right answer is: "${correctAnswerText}".`;
    feedbackDiv.className = "feedback wrong";
  }
}

function showScore() {
  quizDiv.innerHTML = "";
  submitBtn.style.display = "none";
  feedbackDiv.textContent = "";
  scoreDiv.textContent = `Your final score: ${score} / ${quizQuestions.length}`;
}

submitBtn.addEventListener('click', () => {
  const selected = document.querySelector('input[name="answer"]:checked');
  if (!selected) return;

  const answerIndex = Number(selected.value);
  const correctIndex = quizQuestions[currentQuestion].correct;

  const isCorrect = answerIndex === correctIndex;
  if (isCorrect) score++;

  showFeedback(isCorrect, quizQuestions[currentQuestion].answers[correctIndex]);

  submitBtn.disabled = true;

  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < quizQuestions.length) {
      loadQuestion(currentQuestion);
    } else {
      showScore();
    }
  }, 2500);
});

loadQuestion(currentQuestion);
