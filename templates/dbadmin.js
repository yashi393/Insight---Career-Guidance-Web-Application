// --------------------- QUESTIONS ---------------------
const questions = [
    {
        question: "What does SQL stand for?",
        optionA: "Structured Query Language",
        optionB: "Strong Question Locator",
        optionC: "System Query Logic",
        optionD: "Simple Query Level",
        correctOption: "optionA"
    },
    {
        question: "Which command is used to remove a table?",
        optionA: "DELETE TABLE",
        optionB: "DROP TABLE",
        optionC: "REMOVE",
        optionD: "CUT TABLE",
        correctOption: "optionB"
    },
    {
        question: "Which of the following is a NoSQL database?",
        optionA: "MySQL",
        optionB: "PostgreSQL",
        optionC: "MongoDB",
        optionD: "Oracle",
        correctOption: "optionC"
    },
    {
        question: "What is normalization?",
        optionA: "Encrypting database",
        optionB: "Structuring data to reduce redundancy",
        optionC: "Creating backups",
        optionD: "Testing SQL queries",
        correctOption: "optionB"
    },
    {
        question: "Which SQL clause filters records?",
        optionA: "ORDER BY",
        optionB: "WHERE",
        optionC: "JOIN",
        optionD: "GROUP BY",
        correctOption: "optionB"
    },
    {
        question: "Which backup type includes only changed data?",
        optionA: "Full backup",
        optionB: "Partial backup",
        optionC: "Differential backup",
        optionD: "Open backup",
        correctOption: "optionC"
    },
    {
        question: "What does ACID stand for in databases?",
        optionA: "Atomicity, Consistency, Isolation, Durability",
        optionB: "Automatic Control Input Data",
        optionC: "Array, Code, Index, Data",
        optionD: "Advanced Consistency Input Device",
        correctOption: "optionA"
    },
    {
        question: "Which SQL keyword is used to combine tables?",
        optionA: "UNION",
        optionB: "JOIN",
        optionC: "GROUP",
        optionD: "COMBINE",
        correctOption: "optionB"
    },
    {
        question: "Which indexing structure is most common?",
        optionA: "Hash tree",
        optionB: "Binary tree",
        optionC: "B-Tree",
        optionD: "Linked list",
        correctOption: "optionC"
    },
    {
        question: "Which role is responsible for managing access permissions?",
        optionA: "Developer",
        optionB: "DBA",
        optionC: "UI Designer",
        optionD: "Tester",
        correctOption: "optionB"
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