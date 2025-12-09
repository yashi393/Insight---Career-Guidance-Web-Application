// --------------------- QUESTIONS ---------------------
const questions = [
    {
        question: "What is phishing?",
        optionA: "Scanning networks",
        optionB: "Tricking users into revealing sensitive information",
        optionC: "Encrypting data",
        optionD: "Blocking ports",
        correctOption: "optionB"
    },
    {
        question: "Which attack involves injecting malicious SQL code?",
        optionA: "Brute force",
        optionB: "SQL Injection",
        optionC: "XSS",
        optionD: "DNS attack",
        correctOption: "optionB"
    },
    {
        question: "What is an IDS?",
        optionA: "Intrusion Detection System",
        optionB: "Internal Database System",
        optionC: "Internet Download Service",
        optionD: "Identity Data Storage",
        correctOption: "optionA"
    },
    {
        question: "Which is a strong authentication factor?",
        optionA: "Your birthday",
        optionB: "OTP",
        optionC: "Your name",
        optionD: "4-digit PIN",
        correctOption: "optionB"
    },
    {
        question: "What does hashing do?",
        optionA: "Scrambles data into a fixed-length output",
        optionB: "Creates backups",
        optionC: "Compresses images",
        optionD: "Uploads data",
        correctOption: "optionA"
    },
    {
        question: "Which cybersecurity framework is widely used?",
        optionA: "NIST",
        optionB: "FIFO",
        optionC: "JDK",
        optionD: "MVC",
        correctOption: "optionA"
    },
    {
        question: "Which malware spreads without human interaction?",
        optionA: "Trojan",
        optionB: "Worm",
        optionC: "Ransomware",
        optionD: "Rootkit",
        correctOption: "optionB"
    },
    {
        question: "What is a zero-day vulnerability?",
        optionA: "A bug discovered on a holiday",
        optionB: "A flaw unknown to the vendor",
        optionC: "A broken update",
        optionD: "A firewall error",
        correctOption: "optionB"
    },
    {
        question: "Which protocol secures data over networks?",
        optionA: "SSH",
        optionB: "FTP",
        optionC: "Telnet",
        optionD: "SNMP",
        correctOption: "optionA"
    },
    {
        question: "What does a digital certificate verify?",
        optionA: "Network speed",
        optionB: "User identity",
        optionC: "Battery level",
        optionD: "RAM usage",
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