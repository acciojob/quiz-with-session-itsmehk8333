// Select DOM elements
const questionsElement = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// Retrieve progress (sessionStorage) and score (localStorage) if available
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || [];
let savedScore = localStorage.getItem("score");

// Render questions dynamically
function renderQuestions() {
  questionsElement.innerHTML = ""; // clear first
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionDiv = document.createElement("div");

    // Question text
    const qText = document.createElement("p");
    qText.textContent = question.question;
    questionDiv.appendChild(qText);

    // Choices
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const label = document.createElement("label");
      label.style.display = "block";

      const choiceElement = document.createElement("input");
      choiceElement.type = "radio";
      choiceElement.name = `question-${i}`;
      choiceElement.value = choice;

      // Restore previous selection from sessionStorage
      if (userAnswers[i] === choice) {
        choiceElement.checked = true;
      }

      // Save progress on change
      choiceElement.addEventListener("change", () => {
        userAnswers[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      label.appendChild(choiceElement);
      label.appendChild(document.createTextNode(choice));
      questionDiv.appendChild(label);
    }

    questionsElement.appendChild(questionDiv);
  }
}

// Handle quiz submission
submitBtn.addEventListener("click", () => {
  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }

  const result = `Your score is ${score} out of ${questions.length}.`;
  scoreElement.textContent = result;

  // Save final score in localStorage
  localStorage.setItem("score", score);

  // Optional: clear progress after submission
  // sessionStorage.removeItem("progress");
});

// Render questions on page load
renderQuestions();

// If a score exists in localStorage, display it on reload
if (savedScore !== null) {
  scoreElement.textContent = `Your score is ${savedScore} out of ${questions.length}.`;
}
