/************ QUESTIONS ************/
const questions = [
    {
        question: "What is the most popular web technology?",
        optionA: "Meteor JS",
        optionB: "Django",
        optionC: "Blockchain",
        optionD: "All of the above",
        correctOption: "optionD"
    },
    {
        question: "______ create a rough sketch of what the website will look like.",
        optionA: "Webflows",
        optionB: "Wirefalls",
        optionC: "Wireframes",
        optionD: "Webframes",
        correctOption: "optionC"
    },
    {
        question: "Which of the following best describes the main goal of Web 3.0?",
        optionA: "To replace HTML and CSS with AI-generated code",
        optionB: "To decentralize the web using blockchain and empower users over their own data",
        optionC: "To improve only the UI experience of websites using 3D graphics",
        optionD: "To make all websites run only on mobile devices",
        correctOption: "optionB"
    },
    {
        question: "Which of the following can JavaScript NOT do?",
        optionA: "React to events",
        optionB: "Manipulate HTML elements",
        optionC: "Validate data",
        optionD: "None (it can do all above)",
        correctOption: "optionD"
    },
    {
        question: "Which of the following is true about links by default?",
        optionA: "An unvisited link is blue and underlined",
        optionB: "A visited link is red and underlined",
        optionC: "An active link is purple",
        optionD: "None",
        correctOption: "optionA"
    },
    {
        question: "Which of the following is a JavaScript frontend framework?",
        optionA: "Laravel",
        optionB: "React",
        optionC: "Django",
        optionD: "Flask",
        correctOption: "optionB"
    },
    {
        question: "What does API stand for in web development?",
        optionA: "Application Programming Interface",
        optionB: "Automated Programming Instruction",
        optionC: "Applied Program Interaction",
        optionD: "Advanced Processing Internet",
        correctOption: "optionA"
    },
    {
        question: "Which database is commonly used with web applications?",
        optionA: "MySQL",
        optionB: "TensorFlow",
        optionC: "Firebase ML",
        optionD: "Blender DB",
        correctOption: "optionA"
    },
    {
        question: "Git is mainly used for:",
        optionA: "Deploying websites",
        optionB: "Version control",
        optionC: "Creating UI components",
        optionD: "Database management",
        correctOption: "optionB"
    },
    {
        question: "Which of the following is a backend technology?",
        optionA: "Node.js",
        optionB: "Bootstrap",
        optionC: "Tailwind CSS",
        optionD: "Figma",
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
