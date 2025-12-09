// --------------------- QUESTIONS ---------------------
const questions = [
    {
        question: "What is the main goal of data analysis?",
        optionA: "Delete data",
        optionB: "Interpret and extract insights",
        optionC: "Encrypt data",
        optionD: "Compress data",
        correctOption: "optionB"
    },
    {
        question: "Which library is commonly used for data manipulation in Python?",
        optionA: "Pandas",
        optionB: "TensorFlow",
        optionC: "Flask",
        optionD: "NumPy",
        correctOption: "optionA"
    },
    {
        question: "What does CSV stand for?",
        optionA: "Comma Separated Values",
        optionB: "Central Storage Variable",
        optionC: "Column Structured Vector",
        optionD: "Character Separated Values",
        correctOption: "optionA"
    },
    {
        question: "Which algorithm is used for classification?",
        optionA: "KNN",
        optionB: "K-Means",
        optionC: "Apriori",
        optionD: "PCA",
        correctOption: "optionA"
    },
    {
        question: "Which graph shows the distribution of a dataset?",
        optionA: "Pie chart",
        optionB: "Histogram",
        optionC: "Line chart",
        optionD: "Scatter plot",
        correctOption: "optionB"
    },
    {
        question: "Which term refers to reducing features in data?",
        optionA: "Aggregation",
        optionB: "Dimensionality Reduction",
        optionC: "Filtering",
        optionD: "Sampling",
        correctOption: "optionB"
    },
    {
        question: "Which evaluation metric is used for regression?",
        optionA: "Accuracy",
        optionB: "F1 Score",
        optionC: "Mean Squared Error",
        optionD: "Recall",
        correctOption: "optionC"
    },
    {
        question: "Which type of data has no numeric meaning?",
        optionA: "Nominal",
        optionB: "Interval",
        optionC: "Ratio",
        optionD: "Continuous",
        correctOption: "optionA"
    },
    {
        question: "Which model is used to forecast future values?",
        optionA: "ARIMA",
        optionB: "Naive Bayes",
        optionC: "SVM",
        optionD: "CNN",
        correctOption: "optionA"
    },
    {
        question: "What is the process of cleaning and transforming raw data?",
        optionA: "EDA",
        optionB: "ETL",
        optionC: "Modeling",
        optionD: "Sampling",
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