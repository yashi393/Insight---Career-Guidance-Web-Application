// --------------------- QUESTIONS ---------------------
const questions = [
    {
        question: "What is the main purpose of a robot’s actuator?",
        optionA: "To store data",
        optionB: "To convert energy into motion",
        optionC: "To process instructions",
        optionD: "To sense the environment",
        correctOption: "optionB"
    },

    {
        question: "Which programming language is most commonly used in industrial robotics?",
        optionA: "R",
        optionB: "Python",
        optionC: "Ladder Logic",
        optionD: "Swift",
        correctOption: "optionC"
    },

    {
        question: "What does ROS stand for in robotics?",
        optionA: "Robot Operating System",
        optionB: "Robotic Output Source",
        optionC: "Remote Operating Service",
        optionD: "Robot Optimization System",
        correctOption: "optionA"
    },

    {
        question: "Which sensor helps robots measure distance using reflected laser light?",
        optionA: "Ultrasonic Sensor",
        optionB: "Infrared Sensor",
        optionC: "LIDAR",
        optionD: "Gyroscope",
        correctOption: "optionC"
    },

    {
        question: "What is the technique where a robot learns by observing human actions?",
        optionA: "Reinforcement Learning",
        optionB: "Supervised Learning",
        optionC: "Imitation Learning",
        optionD: "Evolutionary Algorithms",
        correctOption: "optionC"
    },

    {
        question: "Which type of robot is commonly used in manufacturing assembly lines?",
        optionA: "Humanoid Robot",
        optionB: "SCARA Robot",
        optionC: "Exploration Rover",
        optionD: "Autonomous Drone",
        correctOption: "optionB"
    },

    {
        question: "What is inverse kinematics used for in robotics?",
        optionA: "To determine the robot’s battery usage",
        optionB: "To calculate joint angles for a desired end position",
        optionC: "To control robot speed",
        optionD: "To detect obstacles",
        correctOption: "optionB"
    },

    {
        question: "Which component helps a robot maintain balance and detect orientation?",
        optionA: "Camera Module",
        optionB: "Gyroscope",
        optionC: "Actuator",
        optionD: "Microcontroller",
        correctOption: "optionB"
    },

    {
        question: "Which AI technique is essential for autonomous robot navigation?",
        optionA: "Natural Language Processing",
        optionB: "Speech Recognition",
        optionC: "SLAM (Simultaneous Localization and Mapping)",
        optionD: "Image Compression",
        correctOption: "optionC"
    },

    {
        question: "What is an end effector in robotics?",
        optionA: "The robot’s energy storage unit",
        optionB: "A device at the end of a robotic arm that interacts with objects",
        optionC: "The robot’s main controller",
        optionD: "A sensor that detects pressure",
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