    /* quiz data (unchanged mapping logic) */
    const quizData = [
        { question: "which of the following describes you the most?", a: "Emphathetic", b: "Skeptical", c: "Leader", d: "problem solver", DESIGN: "a", DBA:"c", DATASCIENCE:"b", DEVELOPER:"d", },
        { question: "In which way you usually think?", a: "Analytical", b: "Logical", c: "Creative", d: "Concrete", DESIGN: "c", DBA:"d", DATASCIENCE:"a", DEVELOPER:"b", },
        { question: "Creating a new product as a team, would you...?", a: "make sure the team have everything they need to develop it ", b: "design the look of the product", c: "build a working model of the product", d: "maintaining records for memebers as well as product", DESIGN: "b", DBA:"d", DATASCIENCE:"a", DEVELOPER:"c", },
        { question: "Are you an introvert or extrovert?", a: "Introvert", b: "Extrovert", c: "Ambivert", DESIGN: "c", DBA:"b", DATASCIENCE:"a", DEVELOPER:"b", },
        { question: "What are your strengths? ", a: "statistics and analysis", b: "designing", c: "Problem solving", d: "trouble shooting", DESIGN: "b", DBA:"d", DATASCIENCE:"a", DEVELOPER:"c", },
        { question: "How do you make an important decision?", a: "after carefully every option and then predicted results", b: "come up with the simplest possibke solution", c: "gut instinct", d: "i make a executve decision and everyone follows along", DESIGN: "c", DBA:"d", DATASCIENCE:"a", DEVELOPER:"b", },
        { question: "What does success mean for you?", a: "earning a high income", b: "ability to balance work and life", c: "creative control of my projects", d: "autonomy to make high-level decision", DESIGN: "c", DBA:"d", DATASCIENCE:"a", DEVELOPER:"b", },
        { question: "When you picture your ideal job, what are you doing?", a: "Getting creative and coming up with new ideas", b: "Thinking big-picture and solving problems", c:"Figuring out how a company operates,finding ways to do it better", d: "Working in a fast-paced role that pushes me to produce results", DESIGN: "a", DBA:"c", DATASCIENCE:"b", DEVELOPER:"d", },
        { question: "How do you feel about working in groups?", a: "I can adapt to any situation", b: "I prefer to work by myself most of the time", c:"I like working with a group, as long as i can take the lead", d: "I love working in groups", DESIGN: "a", DBA:"c", DATASCIENCE:"b", DEVELOPER:"d", },
        { question: "Which of these is your soft skills?", a: "visual communication", b: "Critical thinking", c: "Time management", d: "Problem solving", DESIGN: "a", DBA:"c", DATASCIENCE:"b", DEVELOPER:"d", },
        { question: "Which of the following technical skills interests you?", a: "Prototyping", b: "Data modelling", c: "Maintain database", d: "Data structure and algorithms", DESIGN: "a", DBA:"c", DATASCIENCE:"b", DEVELOPER:"d", },
        { question: "which programming language you prefer?", a: "Javascript", b: "Python", c: "SQL", d: "C/C++", DESIGN: "a", DBA:"c", DATASCIENCE:"b", DEVELOPER:"d", },
        { question: "What level of challenge do you like?", a: "I'm at my best when im thinking creatively", b: "i perform best when under pressure", c: "I work on something untill its perfect", d: "If i cant solve it quickly, I get bored and move on", DESIGN: "a", DBA:"c", DATASCIENCE:"b", DEVELOPER:"d", },
        { question: "How do you like to pass time?", a: "Art/ Crafting", b: "Reading", c: "Hanging out with friends", d: "Playing video games", DESIGN: "a", DBA:"c", DATASCIENCE:"b", DEVELOPER:"d", },
        { question: "Which domain would you like work in?", a: "Web designing", b: "Data science", c: "Database Administrator", d: "Developer", DESIGN: "a", DBA:"c", DATASCIENCE:"b", DEVELOPER:"d", },
    ];

    // DOM refs
    const questionEl = document.getElementById('question');
    const a_text = document.getElementById('a_text');
    const b_text = document.getElementById('b_text');
    const c_text = document.getElementById('c_text');
    const d_text = document.getElementById('d_text');
    const answerEls = Array.from(document.querySelectorAll('.answer'));
    const optionsList = document.getElementById('optionsList');
    const qNumber = document.getElementById('qNumber');
    const progressFill = document.getElementById('progressFill');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const submitBtn = document.getElementById('submitBtn');
    const toast = document.getElementById('toast');
    const titleBox = document.getElementById('titleBox');

    // GIF column
    const gifCol = document.getElementById("gifCol");
    const resultGif = document.getElementById("resultGif");

    // state
    let currentQuiz = 0;
    const total = quizData.length;
    let userAnswers = new Array(total).fill(null); // store 'a'/'b'/'c'/'d' or null

    // reveal title animation on load
    window.addEventListener('load', () => {
      setTimeout(()=> titleBox.classList.add('revealed'), 120);
    });

    // initialize
    loadQuiz();

    function loadQuiz(){
      // populate question & options
      const data = quizData[currentQuiz];
      questionEl.innerText = data.question;
      a_text.innerText = data.a;
      b_text.innerText = data.b;
      c_text.innerText = data.c;
      d_text.innerText = data.d;

      // update question number
      qNumber.innerText = `Question ${currentQuiz+1} of ${total}`;

      // update progress bar
      const pct = Math.round((currentQuiz/total)*100);
      progressFill.style.width = `${pct}%`;

      // set previously selected if exists
      deselectAnswers();
      if(userAnswers[currentQuiz]){
        const prev = userAnswers[currentQuiz];
        const radio = document.getElementById(prev);
        if(radio) radio.checked = true;
      }

      // mark option visuals
      refreshOptionSelection();

      // prev button visibility
      prevBtn.disabled = (currentQuiz === 0);

      // show/hide next & submit
      if(currentQuiz === total - 1){
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'inline-block';
      } else {
        nextBtn.style.display = 'inline-block';
        submitBtn.style.display = 'none';
      }
    }

    function deselectAnswers(){
      answerEls.forEach(el => el.checked = false);
    }

    // option click uses label+li so add event listeners to each option list item to toggle radio
    Array.from(optionsList.querySelectorAll('.option')).forEach(li => {
      li.addEventListener('click', (e) => {
        const input = li.querySelector('input[type="radio"]');
        if(!input) return;
        // if already selected clicking the li should not uncheck — it will keep selected
        input.checked = true;
        // store selection immediately (so nav works)
        userAnswers[currentQuiz] = input.id;
        refreshOptionSelection();
      });
    });

    // Also handle direct radio clicks
    answerEls.forEach(r => r.addEventListener('change', () => {
      userAnswers[currentQuiz] = r.id;
      refreshOptionSelection();
    }));

    function refreshOptionSelection(){
      // highlight selected option visually
      Array.from(optionsList.querySelectorAll('.option')).forEach(li => {
        const input = li.querySelector('input');
        if (input && input.checked) li.classList.add('selected');
        else li.classList.remove('selected');
      });
    }

    // show toast
    let toastTimer = null;
    function showToast(msg = 'Please select an option before continuing.'){
      toast.innerText = msg;
      toast.style.display = 'block';
      clearTimeout(toastTimer);
      toastTimer = setTimeout(()=> { toast.style.display='none'; }, 2500);
    }

    // Next button
    nextBtn.addEventListener('click', () => {
      const selected = userAnswers[currentQuiz];
      if(!selected){
        showToast();
        return;
      }
      // move forward
      if(currentQuiz < total - 1){
        currentQuiz++;
        loadQuiz();
      }
    });

    // Previous button
    prevBtn.addEventListener('click', () => {
      if(currentQuiz === 0) return;
      currentQuiz--;
      loadQuiz();
    });

// Submit button: validate and compute scores
submitBtn.addEventListener('click', () => {
  // ensure last question answered
  if (!userAnswers[currentQuiz]) {
    showToast();
    return;
  }

  // ensure all answered
  for (let i = 0; i < total; i++) {
    if (!userAnswers[i]) {
      showToast('Please answer all questions before submitting.');
      currentQuiz = i;
      loadQuiz();
      return;
    }
  }

  // compute scores
  let scoreDesign = 0, scoreDba = 0, scoreDataScience = 0, scoreDeveloper = 0;
  for (let i = 0; i < total; i++) {
    const user = userAnswers[i];
    const q = quizData[i];
    if (user === q.DESIGN) scoreDesign++;
    if (user === q.DBA) scoreDba++;
    if (user === q.DATASCIENCE) scoreDataScience++;
    if (user === q.DEVELOPER) scoreDeveloper++;
  }

  // display results
  const percent = (v) => Math.round((v / total) * 100);
  const out = `
    <div class="result">
      <h2>Your Result: Compatibility scores</h2>
      <div class="scores">
        <div class="score-item">Web design: ${percent(scoreDesign)}%</div>
        <div class="score-item">DBA: ${percent(scoreDba)}%</div>
        <div class="score-item">Data Science: ${percent(scoreDataScience)}%</div>
        <div class="score-item">Developer: ${percent(scoreDeveloper)}%</div>
      </div>
      <div style="margin-top:20px">
        <button class="btn-main" onclick="window.location.href='../dashboard.html'">Back to Dashboard</button>
      </div>
    </div>
  `;

  // INSERT RESULTS INTO LEFT COLUMN
  document.querySelector('.quiz-col').innerHTML = out;

  // SWITCH TO RESULT MODE (for layout)
  document.querySelector('.quiz-card').classList.add('result-mode');

  // HIDE THE PREVIOUS BUTTON IN RESULTS
  prevBtn.style.display = "none";

  // SHOW GIF
  gifCol.style.display = "flex";
  resultGif.src = "../static/icons/sucess.gif";

  // FULL PROGRESS
  progressFill.style.width = '100%';

});

// keyboard: enter to go next
document.addEventListener('keydown', (e) => {
  if(e.key === 'Enter'){
    if(nextBtn.style.display !== 'none') nextBtn.click();
    else if(submitBtn.style.display !== 'none') submitBtn.click();
  }
});

    // keyboard: Enter to Next (avoid accidental submits)
    document.addEventListener('keydown', (e) => {
      if(e.key === 'Enter'){
        if(nextBtn.style.display !== 'none') nextBtn.click();
        else if(submitBtn.style.display !== 'none') submitBtn.click();
      }
    });