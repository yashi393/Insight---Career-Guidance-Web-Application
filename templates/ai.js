// --------------------- QUESTIONS ---------------------
const questions = [
    {
        question: "What is supervised learning?",
        optionA: "Learning with labeled data",
        optionB: "Learning without any data",
        optionC: "Learning from mistakes only",
        optionD: "Learning with images only",
        correctOption: "optionA"
    },
    {
        question: "Which algorithm is used for clustering?",
        optionA: "K-Means",
        optionB: "Logistic Regression",
        optionC: "Decision Tree",
        optionD: "SVM",
        correctOption: "optionA"
    },
    {
        question: "What does ANN stand for?",
        optionA: "Advanced Neural Node",
        optionB: "Artificial Neural Network",
        optionC: "Applied Network Notation",
        optionD: "Artificial Node Network",
        correctOption: "optionB"
    },
    {
        question: "Which ML task predicts continuous values?",
        optionA: "Classification",
        optionB: "Clustering",
        optionC: "Regression",
        optionD: "Filtering",
        correctOption: "optionC"
    },
    {
        question: "Which activation function is commonly used in deep learning?",
        optionA: "ReLU",
        optionB: "Binary",
        optionC: "XOR",
        optionD: "AND",
        correctOption: "optionA"
    },
    {
        question: "Which algorithm is used for natural language processing?",
        optionA: "CNN",
        optionB: "RNN",
        optionC: "SVM",
        optionD: "KNN",
        correctOption: "optionB"
    },
    {
        question: "What is overfitting?",
        optionA: "Model fits training data too well but performs poorly on new data",
        optionB: "Model learns nothing",
        optionC: "Model trains too fast",
        optionD: "Model has too few layers",
        correctOption: "optionA"
    },
    {
        question: "Which library is commonly used for ML in Python?",
        optionA: "TensorFlow",
        optionB: "Flask",
        optionC: "OpenCV",
        optionD: "Selenium",
        correctOption: "optionA"
    },
    {
        question: "Which type of ML allows a model to explore and learn by rewards?",
        optionA: "Supervised Learning",
        optionB: "Unsupervised Learning",
        optionC: "Reinforcement Learning",
        optionD: "Semi-supervised Learning",
        correctOption: "optionC"
    },
    {
        question: "Which evaluation metric is used for classification?",
        optionA: "Accuracy",
        optionB: "RMSE",
        optionC: "MAE",
        optionD: "MSE",
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