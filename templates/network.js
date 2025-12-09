// --------------------- QUESTIONS ---------------------
const questions = [
    {
        question: "What is the primary purpose of a firewall?",
        optionA: "To encrypt email data",
        optionB: "To prevent unauthorized access to or from a network",
        optionC: "To generate IP addresses",
        optionD: "To store login credentials",
        correctOption: "optionB"
    },
    {
        question: "Which protocol is used to securely browse websites?",
        optionA: "FTP",
        optionB: "HTTP",
        optionC: "HTTPS",
        optionD: "SMTP",
        correctOption: "optionC"
    },
    {
        question: "What does VPN stand for?",
        optionA: "Virtual Privacy Network",
        optionB: "Virtual Private Network",
        optionC: "Verified Personal Node",
        optionD: "Virtual Protected Network",
        correctOption: "optionB"
    },
    {
        question: "Which attack attempts to overload a server with traffic?",
        optionA: "Phishing",
        optionB: "DoS/DDoS",
        optionC: "SQL Injection",
        optionD: "MITM",
        correctOption: "optionB"
    },
    {
        question: "Which tool is commonly used for network packet analysis?",
        optionA: "Wireshark",
        optionB: "TensorFlow",
        optionC: "Unity",
        optionD: "MongoDB",
        correctOption: "optionA"
    },
    {
        question: "What is the process of converting plaintext into unreadable text?",
        optionA: "Decryption",
        optionB: "Authentication",
        optionC: "Encryption",
        optionD: "Filtering",
        correctOption: "optionC"
    },
    {
        question: "Which of these is a strong password practice?",
        optionA: "Using your name",
        optionB: "Using only numbers",
        optionC: "Using mixed characters and symbols",
        optionD: "Using the same password everywhere",
        correctOption: "optionC"
    },
    {
        question: "Which security model follows 'least privilege' principle?",
        optionA: "Role-based access control",
        optionB: "Bus network model",
        optionC: "OSI model",
        optionD: "Waterfall model",
        correctOption: "optionA"
    },
    {
        question: "What type of malware demands money from the victim?",
        optionA: "Worm",
        optionB: "Ransomware",
        optionC: "Spyware",
        optionD: "Adware",
        correctOption: "optionB"
    },
    {
        question: "What is two-factor authentication (2FA)?",
        optionA: "Using two browsers",
        optionB: "Using two passwords",
        optionC: "Using two types of verification",
        optionD: "Logging in twice",
        correctOption: "optionC"
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