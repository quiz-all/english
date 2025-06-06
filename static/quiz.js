// ===========================
// Otázky + promíchání
// ===========================

const allQuestions = [
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
  { question: "Choose the right word: Birds ___ in the sky.", answers: ["fly", "run", "swim", "jump"], correct: 0 },
  { question: "Which word is an action?", answers: ["table", "run", "tree", "sun"], correct: 1 },
  { question: "Choose the correct sentence:", answers: ["They is happy.", "They are happy.", "They am happy.", "They be happy."], correct: 1 },
  { question: "Fill in the blank: The bird is ___ the tree.", answers: ["under", "in", "beside", "between"], correct: 1 },
  { question: "Which one is a season?", answers: ["morning", "winter", "night", "minute"], correct: 1 },
  { question: "How many letters are in the English alphabet?", answers: ["24", "25", "26", "27"], correct: 2 },
  { question: "What do we wear on our head?", answers: ["shoes", "hat", "gloves", "socks"], correct: 1 },
  { question: "Which word means 'fast'?", answers: ["slow", "quick", "late", "small"], correct: 1 },
  { question: "Choose the word that is a shape:", answers: ["circle", "jump", "red", "loud"], correct: 0 },
  { question: "What does a clock tell?", answers: ["temperature", "time", "music", "speed"], correct: 1 },
  { question: "Which is a vegetable?", answers: ["apple", "carrot", "cookie", "juice"], correct: 1 },
  { question: "Fill in the blank: He ___ a book every night.", answers: ["read", "reads", "reading", "is read"], correct: 1 },
  { question: "What is the plural of 'mouse'?", answers: ["mouses", "mice", "mousees", "mous"], correct: 1 },
  { question: "Which word is an adjective?", answers: ["run", "blue", "sing", "dog"], correct: 1 },
  { question: "Choose the right sentence:", answers: ["There are five cat.", "There are five cats.", "There is five cats.", "There be five cats."], correct: 1 }
];

function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const quizQuestions = shuffleArray(allQuestions);
let currentQuestion = 0;
let score = 0;

const quizDiv = document.getElementById("quiz");
const submitBtn = document.getElementById("submitBtn");
const feedbackDiv = document.getElementById("feedback");
const scoreDiv = document.getElementById("score");

function loadQuestion() {
  const q = quizQuestions[currentQuestion];
  quizDiv.innerHTML = `<p><strong>Question ${currentQuestion + 1}:</strong> ${q.question}</p>`;
  q.answers.forEach((answer, index) => {
    const label = document.createElement("label");
    label.innerHTML = `<input type="radio" name="answer" value="${index}" /> ${answer}<br>`;
    quizDiv.appendChild(label);
  });
  submitBtn.disabled = true;
  feedbackDiv.textContent = "";

  document.querySelectorAll("input[name=answer]").forEach(input => {
    input.addEventListener("change", () => {
      submitBtn.disabled = false;
    });
  });
}

submitBtn.addEventListener("click", () => {
  const selected = document.querySelector("input[name=answer]:checked");
  if (!selected) return;

  const answerIndex = parseInt(selected.value);
  const correctIndex = quizQuestions[currentQuestion].correct;

  if (answerIndex === correctIndex) {
    feedbackDiv.textContent = "✅ Correct!";
    score++;
  } else {
    const correctText = quizQuestions[currentQuestion].answers[correctIndex];
    feedbackDiv.textContent = `❌ Wrong. Correct answer: ${correctText}`;
  }

  currentQuestion++;
  if (currentQuestion < quizQuestions.length) {
    setTimeout(loadQuestion, 1500);
  } else {
    setTimeout(() => {
      quizDiv.innerHTML = "";
      submitBtn.style.display = "none";
      feedbackDiv.textContent = "";
      scoreDiv.innerHTML = `<h2>You got ${score} out of ${quizQuestions.length} correct.</h2>`;
    }, 1500);
  }
});

loadQuestion();
