// --------------------- QUESTIONS ---------------------
const questions = [
    {
        question: "What does IaaS stand for?",
        optionA: "Internet as a Service",
        optionB: "Infrastructure as a Service",
        optionC: "Information as a System",
        optionD: "Instance as a Service",
        correctOption: "optionB"
    },
    {
        question: "Which company provides AWS?",
        optionA: "Google",
        optionB: "Microsoft",
        optionC: "Amazon",
        optionD: "IBM",
        correctOption: "optionC"
    },
    {
        question: "Which cloud model gives full control over virtual machines?",
        optionA: "PaaS",
        optionB: "SaaS",
        optionC: "IaaS",
        optionD: "FaaS",
        correctOption: "optionC"
    },
    {
        question: "Which service is used for scalable cloud storage?",
        optionA: "AWS S3",
        optionB: "Google Maps",
        optionC: "Firebase Auth",
        optionD: "MySQL Shell",
        correctOption: "optionA"
    },
    {
        question: "What is cloud elasticity?",
        optionA: "Stretching files",
        optionB: "Scaling resources up or down automatically",
        optionC: "Encrypting data",
        optionD: "Compressing resources",
        correctOption: "optionB"
    },
    {
        question: "Which is an example of SaaS?",
        optionA: "Google Docs",
        optionB: "Amazon EC2",
        optionC: "Microsoft Azure VM",
        optionD: "Kubernetes",
        correctOption: "optionA"
    },
    {
        question: "What is containerization?",
        optionA: "Packing hardware",
        optionB: "Running apps in isolated lightweight environments",
        optionC: "Sending files to cloud",
        optionD: "Testing microchips",
        correctOption: "optionB"
    },
    {
        question: "Which tool orchestrates containers?",
        optionA: "Kubernetes",
        optionB: "Photoshop",
        optionC: "Hadoop",
        optionD: "Unity",
        correctOption: "optionA"
    },
    {
        question: "Which cloud type is shared among multiple organizations?",
        optionA: "Private Cloud",
        optionB: "Public Cloud",
        optionC: "Hybrid Cloud",
        optionD: "Community Cloud",
        correctOption: "optionD"
    },
    {
        question: "What does SLA define?",
        optionA: "Server logs",
        optionB: "Service performance guarantees",
        optionC: "Software licenses",
        optionD: "Log aggregation",
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