// ==================
// prediction
// ==================

const apiQuestionsURL = 'backend/get_prediction_questions.php';
const saveURL = 'backend/save_prediction.php';

let questions = [];
let currentIndex = 0;
let answers = {}; // { qId: selectedOption }

// Master domain list (must match EXACT names returned in scoring)
const domains = [
  "AI/ML",
  "Cloud Computing",
  "Cyber Security",
  "Data Science & Analytics",
  "Database Administration",
  "Robotics",
  "Software Engineering",
  "Web Development",
  "Network & Information Security",
  "Computer Vision & Graphics"
];

// ----------------------
// perQuestionWeights (same structure you had, unchanged content)
// NOTE: keep this in sync with your intended scoring
// ----------------------
const perQuestionWeights = {
  1: {
    "Designing and building the front-end UI": { "Web Development": 3, "Computer Vision & Graphics": 1 },
    "Training ML models or analyzing large datasets": { "Data Science & Analytics": 3, "AI/ML": 2 },
    "Setting up cloud servers and deployment": { "Cloud Computing": 3, "Database Administration": 1 },
    "Securing systems, data, and networks": { "Cyber Security": 3, "Network & Information Security": 2 }
  },
  2: {
    "Programming the robot’s movements and sensors": { "Robotics": 3, "Software Engineering": 1 },
    "Building vision systems for the robot to recognize objects": { "Computer Vision & Graphics": 3, "AI/ML": 2 },
    "Creating the backend system to store robot data": { "Database Administration": 2, "Cloud Computing": 1, "Software Engineering": 1 },
    "Ensuring secure communication between robot and server": { "Network & Information Security": 2, "Cyber Security": 2 }
  },
  3: {
    "Designing scalable, normalized databases": { "Database Administration": 3, "Software Engineering": 1 },
    "Analyzing the data to find insights": { "Data Science & Analytics": 3, "AI/ML": 1 },
    "Building APIs that interact with the data": { "Software Engineering": 2, "Web Development": 1 },
    "Securing the database from breaches": { "Cyber Security": 2, "Database Administration": 1 }
  },
  4: {
    "Training ML models to detect cars": { "AI/ML": 3, "Data Science & Analytics": 2 },
    "Building the camera processing/vision pipeline": { "Computer Vision & Graphics": 3, "Software Engineering": 1 },
    "Building UI to display free parking slots": { "Web Development": 2, "Computer Vision & Graphics": 1 },
    "Deploying the system on cloud": { "Cloud Computing": 3, "Software Engineering": 1 }
  },
  5: {
    "Frontend design and animations": { "Web Development": 3, "Computer Vision & Graphics": 1 },
    "Backend programming and API design": { "Software Engineering": 3, "Database Administration": 1 },
    "Database planning & optimization": { "Database Administration": 3, "Cloud Computing": 1 },
    "Security implementation and testing": { "Cyber Security": 3, "Network & Information Security": 1 }
  },
  6: {
    "Analyzing threat logs and patterns": { "Cyber Security": 3, "Data Science & Analytics": 1 },
    "Developing tools for incident detection": { "Software Engineering": 2, "Cyber Security": 2 },
    "Managing secure network configurations": { "Network & Information Security": 3, "Cyber Security": 2 },
    "Maintaining cloud-based security systems": { "Cloud Computing": 2, "Cyber Security": 2 }
  },
  7: {
    "Creating 3D models and rendering": { "Computer Vision & Graphics": 3, "Web Development": 1 },
    "Creating front-end controls for movement": { "Web Development": 2, "Software Engineering": 1 },
    "Integrating backend/servers": { "Software Engineering": 2, "Cloud Computing": 1 },
    "Handling cloud hosting of assets": { "Cloud Computing": 3, "Database Administration": 1 }
  },
  8: {
    "Beginner – I can write simple programs": { "Software Engineering": 1, "Web Development": 1 },
    "Intermediate – I can build small projects": { "Software Engineering": 2, "Web Development": 1, "Data Science & Analytics": 1 },
    "Advanced – I can debug, optimize, and structure large codebases": { "Software Engineering": 3, "Cloud Computing": 1 },
    "No experience – I prefer non-coding tasks": { }
  },
  9: {
    "Beginner – I struggle with complex logic": { },
    "Intermediate – I can solve moderate problems": { "Software Engineering": 1, "Data Science & Analytics": 1 },
    "Advanced – I enjoy solving challenging problems": { "Software Engineering": 2, "AI/ML": 1, "Data Science & Analytics": 1 },
    "Expert – I solve problems quickly and creatively": { "Software Engineering": 3, "AI/ML": 2, "Data Science & Analytics": 2 }
  },
  10: {
    "Beginner – I know basic cloud concepts": { "Cloud Computing": 1 },
    "Intermediate – I can deploy basic apps": { "Cloud Computing": 2, "Software Engineering": 1 },
    "Advanced – I can manage servers, CI/CD, and scaling": { "Cloud Computing": 3, "DevOps": 1, "Database Administration": 1 },
    "No experience – I have never worked on cloud": { }
  },
  11: {
    "Beginner – I can fix minor issues": { "Software Engineering": 1 },
    "Intermediate – I can diagnose errors with guidance": { "Software Engineering": 2, "Data Science & Analytics": 1 },
    "Advanced – I can debug complex systems independently": { "Software Engineering": 3, "Cloud Computing": 1 },
    "No experience with debugging": { }
  },
  12: {
    "Beginner – I know only basics": { "Cyber Security": 1 },
    "Intermediate – I understand common threats": { "Cyber Security": 2, "Network & Information Security": 1 },
    "Advanced – I can analyze and secure systems": { "Cyber Security": 3, "Network & Information Security": 2 },
    "No experience in security": { }
  },
  13: {
    "Collecting & analyzing historical data": { "Data Science & Analytics": 3, "Database Administration": 1 },
    "Training ML prediction models": { "AI/ML": 3, "Data Science & Analytics": 2 },
    "Building the dashboard UI for results": { "Web Development": 2, "Computer Vision & Graphics": 1 },
    "Deploying the model securely on servers": { "Cloud Computing": 2, "Network & Information Security": 1 }
  },
  14: {
    "Designing game graphics and animations": { "Computer Vision & Graphics": 3, "Web Development": 1 },
    "Programming gameplay logic": { "Software Engineering": 3, "AI/ML": 1 },
    "Managing player data and backend": { "Database Administration": 2, "Cloud Computing": 1 },
    "Protecting players from security risks": { "Cyber Security": 3, "Network & Information Security": 2 }
  },
  15: {
    "Implementing face-recognition system": { "Computer Vision & Graphics": 3, "AI/ML": 2 },
    "Setting up database & backend": { "Database Administration": 3, "Software Engineering": 1 },
    "Developing mobile/web interface": { "Web Development": 3, "Software Engineering": 1 },
    "Ensuring data privacy & security": { "Cyber Security": 3, "Network & Information Security": 2 }
  }
};

// -----------------------
// Normalization utilities
// -----------------------
function normalizeText(s) {
  if (!s && s !== "") return "";
  // convert to string, trim, lowercase
  let t = String(s).trim().toLowerCase();
  // normalize common dash variants to hyphen
  t = t.replace(/[\u2012\u2013\u2014\u2015\u2212\u2010]/g, "-");
  // normalize smart quotes to plain quotes
  t = t.replace(/[\u2018\u2019\u201A\u201B\u2032]/g, "'").replace(/[\u201C\u201D\u201E\u201F\u2033]/g, '"');
  // collapse whitespace
  t = t.replace(/\s+/g, " ");
  return t;
}

// Build a normalized-per-question weights lookup for faster/robust lookup
const normalizedWeights = {};
for (const [qid, mapping] of Object.entries(perQuestionWeights)) {
  normalizedWeights[qid] = {};
  for (const [optText, weightSet] of Object.entries(mapping)) {
    const k = normalizeText(optText);
    normalizedWeights[qid][k] = weightSet;
  }
}

// -----------------------
// LOAD QUESTIONS
// -----------------------
async function loadQuestions() {
  try {
    const res = await fetch(apiQuestionsURL);
    const data = await res.json();

    // If your backend returns an object with key 'prediction_test', adapt:
    // example backend might return { prediction_test: [ ... ] }
    if (Array.isArray(data)) {
      questions = data;
    } else if (Array.isArray(data.prediction_test)) {
      questions = data.prediction_test;
    } else {
      // unknown structure — show friendly message
      document.getElementById('card-area').innerHTML =
        `<div class="loader">Error: unexpected response structure from server.</div>`;
      console.error("Unexpected questions response:", data);
      return;
    }

    if (!questions.length) {
      document.getElementById('card-area').innerHTML = `<div class="loader">No questions found.</div>`;
      return;
    }

    renderCard(currentIndex);
    document.getElementById('controls').style.display = 'flex';
    updateControls();
  } catch (err) {
    document.getElementById('card-area').innerHTML =
      `<div class="loader">Error loading questions: ${err.message}</div>`;
    console.error(err);
  }
}

// -----------------------
// RENDER QUESTION CARD
// -----------------------
function renderCard(index) {
  const area = document.getElementById('card-area');
  area.innerHTML = '';

  const template = document.getElementById('card-template');
  const card = template.content.cloneNode(true);
  const cardEl = card.querySelector('.card');

  const q = questions[index];

  cardEl.querySelector('.q-number').textContent = `${index + 1}/${questions.length}`;
  cardEl.querySelector('.q-title').textContent = q.scenario || q.question || "Question";

  const select = cardEl.querySelector('.q-select');
  select.innerHTML = '<option value="">-- Select an option --</option>';

  (q.options || []).forEach(opt => {
    const o = document.createElement('option');
    o.value = opt;
    o.textContent = opt;
    select.appendChild(o);
  });

  if (answers[q.id]) {
    select.value = answers[q.id];
  }

  select.addEventListener("change", e => {
    answers[q.id] = e.target.value;
  });

  area.appendChild(cardEl);
  document.getElementById('progressText').textContent =
    `Question ${index + 1} of ${questions.length}`;
}

function updateControls() {
  document.getElementById('prevBtn').disabled = currentIndex === 0;
  document.getElementById('nextBtn').textContent =
    currentIndex === questions.length - 1 ? "Submit" : "Next";
}

// -----------------------
// DOM EVENTS
// -----------------------
document.addEventListener("DOMContentLoaded", () => {

  document.getElementById("prevBtn").addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      renderCard(currentIndex);
      updateControls();
    }
  });

  document.getElementById("nextBtn").addEventListener("click", async () => {
    const q = questions[currentIndex];
    const qId = q.id;

    if (!answers[qId]) {
      alert("Please select an option to continue.");
      return;
    }

    if (currentIndex < questions.length - 1) {
      currentIndex++;
      renderCard(currentIndex);
      updateControls();
      return;
    }

    // On final submit
    const result = computePrediction();
    showResult(result.domain, result.message);

    try {
      await sendResult(result);
    } catch (e) {
      console.error("Save error:", e);
    }
  });

  // Redirect to user's domain page (you told me it's domain_test.html)
  document.getElementById("doneBtn").addEventListener("click", () => {
    window.location.href = "dashboard.html";
  });

  loadQuestions();
});

// --------------------------------
// CALCULATE PREDICTION
// --------------------------------
function computePrediction() {
  const scores = {};
  domains.forEach(d => scores[d] = 0);

  for (const q of questions) {
    const ans = answers[q.id];
    if (!ans) continue;

    const qid = q.id;
    const normAns = normalizeText(ans);

    const weightMap = normalizedWeights[qid] || {};
    let weightSet = weightMap[normAns];

    // If no direct normalized match, attempt fallback:
    if (!weightSet) {
      // 1) Try to find by including match (looser)
      for (const [k, v] of Object.entries(weightMap)) {
        if (k.includes(normAns) || normAns.includes(k)) {
          weightSet = v;
          break;
        }
      }
    }

    // 2) Final fallback: if weightMap has same number of keys as options,
    //    assume order matches and choose the set by selected option index.
    if (!weightSet) {
      const weightKeys = Object.keys(perQuestionWeights[qid] || {});
      if (weightKeys.length && q.options && weightKeys.length === q.options.length) {
        const ansIndex = q.options.findIndex(o => normalizeText(o) === normAns);
        if (ansIndex >= 0 && weightKeys[ansIndex]) {
          const key = weightKeys[ansIndex];
          weightSet = perQuestionWeights[qid][key];
          console.warn(`Fallback by index for q${qid}: choosing weight key "${key}"`);
        }
      }
    }

    if (!weightSet) {
      console.warn(`No weight mapping found for question ${qid} answer "${ans}". Skipping.`);
      continue;
    }

    // apply weights but only for domains present in `domains` list
    for (const [domain, pts] of Object.entries(weightSet)) {
      if (!scores.hasOwnProperty(domain)) {
        console.warn(`Unknown domain "${domain}" referenced in weights for q${qid}. Ignoring.`);
        continue;
      }
      scores[domain] += pts;
    }
  }

  // Choose top domain (highest score). If tie, picks the one with highest score first encountered.
  let topDomain = null;
  let maxScore = -Infinity;
  for (const [domain, sc] of Object.entries(scores)) {
    if (sc > maxScore) {
      maxScore = sc;
      topDomain = domain;
    }
  }

  // If still no domain (all zeros), fall back to "Software Engineering" or first domain
  if (topDomain === null) {
    topDomain = domains[0];
    maxScore = scores[topDomain] || 0;
  }

  const msg = `We recommend exploring: ${topDomain}. (Score ${maxScore})`;

  console.info("Prediction raw scores:", scores);

  return {
    domain: topDomain,
    score: maxScore,
    rawScores: scores,
    message: msg
  };
}

// -----------------------
// SAVE RESULT TO BACKEND
// -----------------------
async function sendResult(result) {
  const payload = {
    answers: answers,
    domain: result.domain,
    score: result.score,
    rawScores: result.rawScores
  };

  const res = await fetch(saveURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Save failed: ${res.status} ${txt}`);
  }
  return res.json();
}

// -----------------------
// SHOW RESULT
// -----------------------
function showResult(domain, message) {
  document.getElementById("resultDomain").textContent = domain || "—";
  document.getElementById("resultMsg").textContent = message || "";
  document.getElementById("resultModal").style.display = "flex";
}
