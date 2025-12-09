<?php
session_start(); 
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="style.css?=v3">
  <title>Careerguidance</title>
</head>

<body>
  <!-- Header -->
  <section id="header">
    <div class="header container">
      <div class="nav-bar">
        <div class="brand">
          <a href="#hero">
            <h1><span>I</span>nsight</h1>
          </a>
        </div>
        <div class="nav-list">
          <div class="hamburger">
            <div class="bar"></div>
          </div>
          <ul>
            <li><a href="index.php" data-after="Home">Home</a></li>
            <li><a href="#about" data-after="About_Us">About Us</a></li>
            <li><a href="#services" data-after="Get_Started">Get Started</a></li>

            <!-- PHP LOGIN STATUS -->
            <?php if (isset($_SESSION['username'])): ?>
                <li>
                  <a href="#" class="welcome-user">
                    Welcome, <?= htmlspecialchars($_SESSION['username']); ?>!
                  </a>
                </li>

                <li><a href="backend/logout.php" data-after="Logout">Logout</a></li>
            <?php else: ?>
                <li><a href="login.html" data-after="Sign_In">Sign In</a></li>
            <?php endif; ?>

          </ul>
        </div>
      </div>
    </div>
  </section>
  <!-- End Header -->


  <!-- Hero Section -->
  <section id="hero">
    <div class="hero container">
      <div>
        <h1>INSIGHT <span></span></h1>
        <h1>Clutter to <span></span></h1>
        <h1>clarity <span></span></h1>
        <a href="#projects" type="button" class="cta">Get Started</a>
      </div>
      <div class="right">
        <img src="static/images/Career progress-amico.png" alt="">
      </div>
    </div>
  </section>
  <!-- End Hero Section -->

  <!-- Services Section -->
  <section id="services">
    <div class="services container">
      <div class="service-top">
        <h1 class="section-title">Wh<span>y</span>Us</h1>
        <p>Discover which field you will enjoy and begin your career journey on the right note</p>
      </div>

      <div class="service-bottom">
        <div class="service-item">
          <div class="icon"><img src="static\icons\knowledge.png" /></div>
          <h2>Self-knowledge</h2>
          <p>It helps you to know yourself — strengths, weaknesses, aptitudes, passions...</p>
        </div>

        <div class="service-item">
          <div class="icon"><img src="static\icons\goals.png" /></div>
          <h2>Accomplish goals</h2>
          <p>Growth prospects improve as you choose a field you truly enjoy.</p>
        </div>

        <div class="service-item">
          <div class="icon"><img src="static\icons\awareness.png" /></div>
          <h2>Awareness</h2>
          <p>Career assessment gives you clarity and proper understanding of fields.</p>
        </div>

        <div class="service-item">
          <div class="icon"><img src="static\icons\clarity.png" /></div>
          <h2>Clarity</h2>
          <p>Once you're clear about your career choice, your path becomes simple.</p>
        </div>
      </div>
    </div>
  </section>
  <!-- End Services Section -->


  <!-- Projects Section -->
  <section id="projects">
    <div class="projects container">
      <div class="projects-header">
        <h1 class="section-title">Get<span>Started</span></h1>
      </div>

      <div class="all-projects">
        <div class="project-item">
          <div class="project-info">
            <h1>Take a test</h1>
            <p>Discover yourself and your ideal careers</p>
            <a href="dashboard.html" class="cta">Let's begin</a>
          </div>
          <div class="project-img">
            <img src="static/images/Online test-amico.png" alt="">
          </div>
        </div>

        <div class="project-item">
          <div class="project-info">
            <h1>Research fields</h1>
            <p>Everything about different career fields</p>
            <a href="domain_info.html" class="cta">Get to know</a>
          </div>
          <div class="project-img">
            <img src="static/images/Bookmarks-amico.png" alt="">
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- End Projects Section -->


  <!-- Contact Section -->
  <section id="contact">
    <div class="contact container">
      <h1 class="section-title">How it <span>works</span></h1>

      <div class="contact-items">
        <div class="contact-item">
          <div class="icon"><img src="static\icons\test.png" /></div>
          <div class="contact-info">
            <h1>Take a free test</h1>
            <h2>Test your knowledge with your tech interests</h2>
          </div>
        </div>

        <div class="contact-item">
          <div class="icon"><img src="static\icons\results.png" /></div>
          <div class="contact-info">
            <h1>Get result</h1>
            <h2>See your best career field</h2>
          </div>
        </div>

        <div class="contact-item">
          <div class="icon"><img src="static\icons\gain knowledge.png" /></div>
          <div class="contact-info">
            <h1>Gain knowledge</h1>
            <h2>Learn in-depth about your recommended field</h2>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- End Contact Section -->



  <!-- About Section -->
  <section id="about">
    <div class="about container">
      <div class="col-left">
        <div class="about-img">
          <img src="static/images/About us page-amico.png" alt="">
        </div>
      </div>

      <div class="col-right">
        <h1 class="section-title">About <span>Us</span></h1>
        <h2>We Aim</h2>
        <p>To make students aware of the increasing number of career options.</p>
        <p>To provide right guidance by recommending appropriate career fields.</p>
        <p>To offer insights about the recommended career option.</p>
        <a href="#" class="cta">Home</a>
      </div>
    </div>
  </section>
  <!-- End About Section -->


  <!-- Footer -->
  <section id="footer">
    <div class="footer container">
      <div class="brand">
        <h1><span>I</span>nsight</h1>
      </div>
      <h2>Clutter to clarity</h2>

      <p>Copyright © 2025 Insight. All rights reserved</p>
    </div>
  </section>
  <!-- End Footer -->

  <script src="app.js"></script>
  <script src="https://unpkg.com/scrollreveal"></script>

</body>
</html>
