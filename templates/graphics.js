// --------------------- QUESTIONS ---------------------
const questions = [
    {
        question: "Which algorithm is commonly used for edge detection?",
        optionA: "Sobel",
        optionB: "K-Means",
        optionC: "DFS",
        optionD: "Naive Bayes",
        correctOption: "optionA"
    },
    {
        question: "Which library is widely used for computer vision applications?",
        optionA: "OpenCV",
        optionB: "Pandas",
        optionC: "NumPy",
        optionD: "React",
        correctOption: "optionA"
    },
    {
        question: "What does FPS mean in graphics rendering?",
        optionA: "Frames Per Second",
        optionB: "File Positioning System",
        optionC: "Fast Processing Sequence",
        optionD: "Frame Parameter Set",
        correctOption: "optionA"
    },
    {
        question: "Which technique is used to identify objects in an image?",
        optionA: "Classification",
        optionB: "Segmentation",
        optionC: "Rendering",
        optionD: "Compilation",
        correctOption: "optionB"
    },
    {
        question: "Which feature detector is rotation-invariant?",
        optionA: "SIFT",
        optionB: "DFS",
        optionC: "Bubble Sort",
        optionD: "AES",
        correctOption: "optionA"
    },
    {
        question: "What is the smallest unit of a digital image?",
        optionA: "Frame",
        optionB: "Pixel",
        optionC: "Node",
        optionD: "Vertex",
        correctOption: "optionB"
    },
    {
        question: "Which format is commonly used for 3D models?",
        optionA: "MP4",
        optionB: "OBJ",
        optionC: "TXT",
        optionD: "CSV",
        correctOption: "optionB"
    },
    {
        question: "What is the process of generating photorealistic images?",
        optionA: "Parsing",
        optionB: "Rendering",
        optionC: "Hashing",
        optionD: "Serialization",
        correctOption: "optionB"
    },
    {
        question: "Which deep learning model is used for image recognition?",
        optionA: "CNN",
        optionB: "RNN",
        optionC: "LSTM",
        optionD: "GAN",
        correctOption: "optionA"
    },
    {
        question: "Which term describes smooth transitioning between two graphics objects?",
        optionA: "Morphing",
        optionB: "Filtering",
        optionC: "Capturing",
        optionD: "Encoding",
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