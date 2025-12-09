// --------------------- QUESTIONS ---------------------
const questions = [
    {
        question: "Which of the following is the first phase of the Software Development Life Cycle (SDLC)?",
        optionA: "Testing",
        optionB: "Requirement Analysis",
        optionC: "Maintenance",
        optionD: "Deployment",
        correctOption: "optionB"
    },

    {
        question: "Which SDLC model is also known as the ‘Linear Sequential Model’?",
        optionA: "Spiral Model",
        optionB: "V-Model",
        optionC: "Waterfall Model",
        optionD: "Prototype Model",
        correctOption: "optionC"
    },

    {
        question: "Which document defines the functional and non-functional requirements of software?",
        optionA: "SRS",
        optionB: "ER Diagram",
        optionC: "Test Plan",
        optionD: "User Manual",
        correctOption: "optionA"
    },

    {
        question: "Which testing ensures individual units or components of a software are tested?",
        optionA: "Unit Testing",
        optionB: "System Testing",
        optionC: "Integration Testing",
        optionD: "Acceptance Testing",
        correctOption: "optionA"
    },

    {
        question: "Which one is an Agile methodology?",
        optionA: "Scrum",
        optionB: "Waterfall",
        optionC: "RAD",
        optionD: "Spiral",
        correctOption: "optionA"
    },

    {
        question: "In Scrum, the short development cycle is known as:",
        optionA: "Phase",
        optionB: "Iteration",
        optionC: "Sprint",
        optionD: "Module",
        correctOption: "optionC"
    },

    {
        question: "Which diagram in UML represents the flow of control or data?",
        optionA: "Use Case Diagram",
        optionB: "Class Diagram",
        optionC: "Activity Diagram",
        optionD: "Deployment Diagram",
        correctOption: "optionC"
    },

    {
        question: "Which of the following refers to the process of finding and fixing defects?",
        optionA: "Testing",
        optionB: "Debugging",
        optionC: "Refactoring",
        optionD: "Compilation",
        correctOption: "optionB"
    },

    {
        question: "The process of improving internal code structure without changing external behavior is called:",
        optionA: "Refactoring",
        optionB: "Deployment",
        optionC: "Coding",
        optionD: "Modeling",
        correctOption: "optionA"
    },

    {
        question: "Which metric measures the complexity of a program’s control flow?",
        optionA: "Cyclomatic Complexity",
        optionB: "Code Coverage",
        optionC: "Load Factor",
        optionD: "Mutation Score",
        correctOption: "optionA"
    }
];

/************ INITIAL SETUP ************/
let shuffled = [];
let qIndex = 0;
let score = 0;

document.addEventListener("DOMContentLoaded", () => {
    shuffleQuestions();
    loadQuestion();
});

/************ SHUFFLE ************/
function shuffleQuestions(){
    shuffled = [...questions]
        .sort(() => 0.5 - Math.random())
        .slice(0,10);
}

/************ LOAD QUESTION ************/
function loadQuestion(){

    const q = shuffled[qIndex];

    document.getElementById("question-number").textContent = qIndex+1;
    document.getElementById("display-question").textContent = q.question;

    document.getElementById("optionA-label").textContent = q.optionA;
    document.getElementById("optionB-label").textContent = q.optionB;
    document.getElementById("optionC-label").textContent = q.optionC;
    document.getElementById("optionD-label").textContent = q.optionD;

    document.querySelectorAll("input[name='option']").forEach(o => {
        o.checked = false;
        o.disabled = false;
    });

    resetColours();
    document.getElementById("options-container").classList.remove("disabled");
}


/************ CHECK ANSWER ************/
function checkAnswer() {

    const selected = document.querySelector("input[name='option']:checked");
    if (!selected) {
        alert("Please choose an option");
        return false;
    }

    const correct = shuffled[qIndex].correctOption;

    const selectedLabel = document.getElementById(selected.value + "-label");
    const correctLabel = document.getElementById(correct + "-label");

    document.querySelectorAll("input[name='option']").forEach(o => o.disabled = true);
    document.getElementById("options-container").classList.add("disabled");

    if (selected.value === correct) {
        selectedLabel.classList.add("correct");
        score++;
    } else {
        selectedLabel.classList.add("wrong");
        correctLabel.classList.add("correct");
    }

    return true;
}


/************ NEXT QUESTION ************/
document.getElementById("nextBtn").addEventListener("click", () => {

    if(!checkAnswer()) return;

    setTimeout(() => {
        qIndex++;

        if(qIndex >= 10){
            showResults();
        } else {
            loadQuestion();
        }

    }, 600);
});

function resetColours(){
    ["A","B","C","D"].forEach(letter => {
        document.getElementById("option"+letter+"-label").classList.remove("correct", "wrong");
    });
}


/************ RESULTS ************/
function showResults(){

    const percent = Math.round((score/10)*100);

    let remark = "";
    if(score <= 4) remark = "Bad Luck! Keep practicing!";
    else if(score <= 6) remark = "Average Score! You can improve!";
    else remark = "Excellent Score! Great job!";

    const html = `
  <div class="result-card glass">

      <div class="result-left">
          <h2>Your Result</h2>

          <p><strong>Score:</strong> ${score} / 10</p>
          <p><strong>Percentage:</strong> ${percent}%</p>
          <p class="result-msg"><strong>${remark}</strong></p>

          <button onclick="location.href='../templates/domain_test.html'" class="btn-action">
              Back to Domains
          </button>

          <button onclick="location.reload()" class="btn-action outline">
              Retry
          </button>
      </div>

      <div class="result-right">
          <img src="../static/icons/sucess.gif" alt="Result GIF">
      </div>

  </div>
`;


    // Update result card
    document.getElementById("final-score").textContent = `${score} / 10`;
    document.getElementById("final-percent").textContent = `${percent}%`;
    document.getElementById("final-message").textContent = remark;

    // Show result, hide quiz area & top info
    document.getElementById("quiz-area").style.display = "none";
    document.getElementById("top-info").style.display = "none";
    document.getElementById("result-area").style.display = "block";

    // Buttons
    document.getElementById("retry-btn").onclick = () => location.reload();
    document.getElementById("back-btn").onclick = () => location.href="../templates/domain_test.html";
}