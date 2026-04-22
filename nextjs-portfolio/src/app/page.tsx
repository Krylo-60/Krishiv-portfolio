import Image from "next/image";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
  <div className="scroll-progress" aria-hidden="true">
    <span id="scrollProgressBar"></span>
  </div>
  <div className="page-loader" id="pageLoader" aria-hidden="true">
    <div className="loader-core">
      <div className="loader-ring"></div>
      <p className="loader-title">KRISHIV VELOCITY</p>
      <p className="loader-sub">Loading portfolio systems...</p>
      <span className="loader-line" aria-hidden="true"></span>
    </div>
  </div>
  <div className="aurora aurora-one" aria-hidden="true"></div>
  <div className="aurora aurora-two" aria-hidden="true"></div>
  <div className="spotlight" id="spotlight" aria-hidden="true"></div>

  <header className="site-header">
    <div className="container nav-wrap">
      <a className="brand" href="#home">
        <img className="site-logo" src="logo.svg" alt="Krishiv Velocity website logo" decoding="async" width="32" height="32" />
        <span>Krishiv Velocity</span>
      </a>
      <button type="button" className="nav-menu-btn" id="navMenuBtn" aria-expanded="false" aria-controls="mainNav">Menu</button>
      <nav id="mainNav" aria-label="Main navigation">
        <ul className="nav-links">
          <li><a className="active" href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#app-verse">Apps</a></li>
          <li><a href="#signature">Signature</a></li>
          <li><a href="#creator">Creator</a></li>
          <li><a href="#wins">Wins</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="games.html">Games</a></li>
          <li><a href="all-links.html">All Links</a></li>
        </ul>
        <div className="nav-utility">
          <form className="nav-search-form" id="navSearchForm">
            <label className="sr-only" htmlFor="navSearchInput">Search pages or sections</label>
            <input
              id="navSearchInput"
              name="nav-search"
              type="search"
              list="navSearchOptions"
              placeholder="Search pages or sections..."
              autoComplete="off"
            />
            <button type="submit" className="nav-search-btn">Go</button>
            <datalist id="navSearchOptions"></datalist>
          </form>
          <button type="button" id="installAppBtn" className="nav-theme-btn" style="display:none;">Install App</button>
          <button type="button" id="themeToggleBtn" className="nav-theme-btn">Theme: Aurora</button>
        </div>
      </nav>
    </div>
  </header>

  <main id="main-content">
    <section id="home" className="hero section-pad">
      <div className="container hero-layout">
        <div className="hero-copy">
          <p className="eyebrow">Hi, I am Krishiv and I make stuff on the internet</p>
          <h1>I am 11 and this is my website.</h1>
          <p className="lead hero-lead">
            I like making websites, random apps, game pages, and new ideas when I get excited. Some parts are neat, some parts are experimental, but all of it is really mine and I keep upgrading it.
          </p>
          <div className="hero-ribbon" aria-label="Portfolio highlights">
            <span>best version so far</span>
            <span>I love coding</span>
            <span>I also love games</span>
            <span>made by a real kid</span>
          </div>
          <div className="hero-actions">
            <a className="btn primary" href="#projects">See What I Made</a>
            <a className="btn secondary" href="https://www.youtube.com/@KryloBlox60" target="_blank" rel="noopener noreferrer">My YouTube</a>
          </div>
          <div className="hero-quick-launch">
            <p className="mini-label">Instant App Launch</p>
            <div className="hero-quick-row">
              <select id="heroQuickApp" aria-label="Choose app to launch">
                <option value="study-planner.html">Study Planner</option>
                <option value="quiz-zone.html">Quiz Zone</option>
                <option value="review-app.html">Review App</option>
                <option value="focus-timer.html">Focus Timer</option>
                <option value="habit-tracker.html">Habit Tracker</option>
                <option value="idea-lab-ai.html">Idea Lab AI</option>
                <option value="expense-tracker.html">Expense Tracker</option>
                <option value="notes-vault.html">Notes Vault</option>
                <option value="flashcards.html">Flashcards</option>
                <option value="typing-test.html">Typing Test</option>
                <option value="task-kanban.html">Task Kanban</option>
                <option value="unit-converter.html">Unit Converter</option>
                <option value="games.html">Games Hub</option>
                <option value="projects.html">Projects Page</option>
                <option value="contact.html">Contact Page</option>
                <option value="password-lab.html">Password Lab</option>
                <option value="bmi-health.html">BMI Health</option>
                <option value="random-picker.html">Random Picker</option>
                <option value="krylo-blox-master-nexus.html">Master Nexus</option>
                <option value="aether-core-v110.html">Aether v110</option>
                <option value="aether-core-v104.html">Aether v104</option>
                <option value="aether-core-v55.html">Aether v55</option>
                <option value="aether-core-v25.html">Aether v2.5</option>
                <option value="grade-calculator.html">Grade Calculator</option>
                <option value="daily-journal.html">Daily Journal</option>
                <option value="goal-planner.html">Goal Planner</option>
                <option value="reading-tracker.html">Reading Tracker</option>
                <option value="water-reminder.html">Water Reminder</option>
                <option value="presentation-planner.html">Presentation Planner</option>
                <option value="code-snippets-vault.html">Code Snippets Vault</option>
                <option value="mind-map-board.html">Mind Map Board</option>
                <option value="bazaar-blitz.html">BazaarBlitz Prime</option>
                <option value="votestorm-arena.html">VoteStorm Arena</option>
                <option value="time-capsule-lab.html">Time Capsule Lab</option>
                <option value="storyforge-studio.html">StoryForge Studio</option>
                <option value="meal-planner.html">Meal Planner Pro</option>
                <option value="color-palette-lab.html">Color Palette Lab</option>
                <option value="resume-studio.html">Resume Studio Lite</option>
                <option value="budget-battle.html">Budget Battle Sim</option>
              </select>
              <button className="btn secondary" type="button" id="heroQuickGo">Open App</button>
              <button className="btn secondary" type="button" id="heroRandomGo">Random App</button>
            </div>
          </div>
          <div className="hero-links">
            <a href="games.html">Games I Play</a>
            <a href="all-links.html">All My Links</a>
            <a href="#about">More About Me</a>
          </div>
          <div className="hero-stats">
            <article className="hero-stat">
              <strong><span className="stat-number" data-target="6">0</span>+</strong>
              <span>projects I keep working on</span>
            </article>
            <article className="hero-stat">
              <strong><span className="stat-number" data-target="20">0</span>+</strong>
              <span>videos made or planned</span>
            </article>
            <article className="hero-stat">
              <strong id="heroAppsStat">0</strong>
              <span>apps on this site</span>
            </article>
            <article className="hero-stat">
              <strong id="heroBackendStat">checking...</strong>
              <span>site brain status</span>
            </article>
          </div>
        </div>

        <div className="hero-showcase">
          <article className="profile-panel">
            <div className="profile-top">
              <div className="hero-photo-frame">
                <img
                  className="profile-image"
                  src="myimage-560.jpg"
                  srcset="myimage-280.jpg 280w, myimage-560.jpg 560w, myimage-928.jpg 928w"
                  sizes="(max-width: 760px) 72vw, 280px"
                  alt="Krishiv PB portrait"
                  width="280"
                  height="280"
                  decoding="async"
                  fetchpriority="high"
                />
              </div>
              <div>
                <p className="mini-label">What I am making right now</p>
                <h2>cool pages, quiz apps, weird ideas, and whatever I want to test next</h2>
              </div>
            </div>
            <div className="signal-grid">
              <div className="signal-card">
                <span className="signal-title">What I like</span>
                <p>Making fun layouts, learning JavaScript, and building around the games I play a lot.</p>
              </div>
              <div className="signal-card">
                <span className="signal-title">How I work</span>
                <p>I try ideas fast, fix stuff, then come back and make it better later.</p>
              </div>
              <div className="signal-card wide compact-callout">
                <span className="signal-title">Goal</span>
                <p>Keep turning my ideas into real things instead of just thinking about them.</p>
              </div>
            </div>
          </article>

          <article className="preview-panel hero-note kid-note">
            <div className="preview-screen">
              <div className="preview-badge kid-note-badge">little note</div>
              <h3>This site is supposed to feel like me.</h3>
              <p>I did not want this to look like a company website. I wanted it to feel like a kid built it, kept learning, and kept adding new stuff.</p>
              <ul className="kid-note-list" aria-label="Personal notes">
                <li>favorite thing: making new pages</li>
                <li>hardest thing: fixing bugs that appear from nowhere</li>
                <li>next idea: even more fun projects</li>
              </ul>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section id="major-update" className="section-pad mega-shell">
      <div className="container">
        <div className="section-heading mega-heading">
          <p className="eyebrow">Major Update v5.0.0</p>
          <h2>This is the biggest version of my website I have made yet.</h2>
          <p className="lead">
            I wanted this update to feel huge, personal, and impossible to confuse with a normal template.
            It is brighter, more alive, more me, and way more like a giant kid project.
          </p>
          <div className="hero-actions">
            <a className="btn primary" href="release-notes.html">Read the full release notes</a>
            <a className="btn secondary" href="#projects">Jump into the best projects</a>
          </div>
        </div>

        <div className="mega-grid">
          <article className="mega-card mega-card-featured">
            <span className="mega-stamp">v5.0.0</span>
            <h3>What changed in this giant update</h3>
            <ul className="mega-list">
              <li>The homepage feels more like my personality and less like a robot wrote it.</li>
              <li>I added playful details so the site feels hand-built instead of over-polished.</li>
              <li>The release notes now treat this like a real major launch, not a tiny patch.</li>
              <li>The whole site feels more like a kid's dream project than a fake company page.</li>
            </ul>
          </article>

          <article className="mega-card mega-card-note">
            <span className="card-kicker">Notebook Mode</span>
            <h3>I wanted people to think:</h3>
            <p className="mega-quote">"Wait... an actual kid made this?"</p>
            <p>
              Not because it looks messy, but because it feels full of ideas, energy, experiments,
              and real imagination instead of safe boring design.
            </p>
          </article>

          <article className="mega-card">
            <span className="card-kicker">Why it matters</span>
            <h3>This is not just a portfolio anymore.</h3>
            <p>
              It is turning into my own internet world with projects, games, release history,
              experiments, and proof that I keep shipping new things.
            </p>
            <div className="mega-mini-stats" aria-label="Major update highlights">
              <div><strong>Huge</strong><span>design jump</span></div>
              <div><strong>More Me</strong><span>real voice</span></div>
              <div><strong>v5</strong><span>major release</span></div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section id="about" className="section-pad">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">About Me</p>
          <h2>I am just a kid who really likes building things.</h2>
          <p className="lead">
            I started making things because it was fun, and then I kept going because I liked seeing my ideas turn into real pages. Every project teaches me something new, even when it breaks first.
          </p>
        </div>

        <div className="story-grid">
          <article className="story-card emphasis">
            <span className="card-kicker">Why I stand out</span>
            <h3>I mix coding energy with creator energy.</h3>
            <p>
              I do not just learn code. I package my ideas, present them well, and keep building in public through content, experiments, and portfolio upgrades.
            </p>
          </article>
          <article className="story-card">
            <span className="card-kicker">Strength</span>
            <h3>Fast learner with real curiosity</h3>
            <p>I enjoy trying new features, improving UI, and understanding how websites become smoother, sharper, and more interactive.</p>
          </article>
          <article className="story-card">
            <span className="card-kicker">Vision</span>
            <h3>Big ambitions, early start</h3>
            <p>I am working toward becoming a full-stack developer who can build useful products, strong brands, and exciting user experiences.</p>
          </article>
        </div>
      </div>
    </section>

    <section id="journey" className="section-pad">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Growth Journey</p>
          <h2>Every project is one more step toward becoming a serious builder.</h2>
          <p className="lead">
            I am still early in my journey, but that is also my advantage. I have time, energy, and curiosity to keep improving fast and build a strong future in tech.
          </p>
        </div>

        <div className="journey-grid">
          <article className="timeline-card">
            <span className="card-kicker">Milestones</span>
            <div className="timeline-list">
              <div className="timeline-item">
                <span className="timeline-dot"></span>
                <div>
                  <h3>Started learning by building</h3>
                  <p>I began exploring websites by making projects, changing layouts, and learning how design and code work together.</p>
                </div>
              </div>
              <div className="timeline-item">
                <span className="timeline-dot"></span>
                <div>
                  <h3>Turned practice into portfolio work</h3>
                  <p>Instead of keeping ideas hidden, I started shaping them into visible projects that show progress and ambition.</p>
                </div>
              </div>
              <div className="timeline-item">
                <span className="timeline-dot"></span>
                <div>
                  <h3>Connected coding with content creation</h3>
                  <p>I built a creator identity around gaming and tech, especially Roblox, Valorant, Free Fire, and Clash Royale, so my projects feel part of a real personal brand.</p>
                </div>
              </div>
            </div>
          </article>

          <article className="growth-panel">
            <span className="card-kicker">What I am improving now</span>
            <div className="growth-grid">
              <div className="growth-card">
                <strong>Stronger interfaces</strong>
                <p>Designing websites with better contrast, spacing, layout, and visual storytelling.</p>
              </div>
              <div className="growth-card">
                <strong>Smarter interactions</strong>
                <p>Adding JavaScript features that make projects more dynamic and more useful to real people.</p>
              </div>
              <div className="growth-card">
                <strong>Better presentation</strong>
                <p>Explaining projects clearly so visitors understand the idea, the purpose, and the value quickly.</p>
              </div>
              <div className="growth-card">
                <strong>Bigger ambition</strong>
                <p>Thinking beyond simple pages and moving toward apps, AI tools, and full-stack goals.</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section id="builder-timeline" className="section-pad">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Growth Timeline</p>
          <h2>My portfolio journey is turning into a real builder story.</h2>
          <p className="lead">This timeline makes the progress easier to see: first experiments, stronger JavaScript, backend features, and a more confident creator identity.</p>
        </div>
        <div className="milestone-grid">
          <article className="milestone-card">
            <span className="card-kicker">Start</span>
            <h3>First web experiments</h3>
            <p>I started by editing layouts, learning structure, and understanding how design and code work together on real pages.</p>
          </article>
          <article className="milestone-card">
            <span className="card-kicker">Next</span>
            <h3>Interactive JavaScript apps</h3>
            <p>I moved from simple pages to quizzes, planners, trackers, and tools that react to the user and store useful data.</p>
          </article>
          <article className="milestone-card">
            <span className="card-kicker">Upgrade</span>
            <h3>Backend and AI features</h3>
            <p>Projects like Review App and Idea Lab AI pushed my work into APIs, storage, and smarter app flows instead of only static UI.</p>
          </article>
          <article className="milestone-card">
            <span className="card-kicker">Now</span>
            <h3>Brand + product ecosystem</h3>
            <p>This site is becoming a full showcase for apps, growth, creator work, and bigger ideas that feel more like products than practice files.</p>
          </article>
        </div>
      </div>
    </section>

    <section id="proof" className="section-pad proof-shell">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Why This Portfolio Wins</p>
          <h2>Built to feel more complete, more polished, and more memorable.</h2>
          <p className="lead">
            This website is more than a basic profile page. I use it to show my growth, creativity, and progress in a clear and personal way.
          </p>
        </div>

        <div className="proof-grid">
          <article className="proof-card">
            <span className="card-kicker">Design</span>
            <h3>Clear visual direction</h3>
            <p>Bright gradients, layered effects, and readable typography make the page feel original and easy to explore.</p>
          </article>
          <article className="proof-card">
            <span className="card-kicker">Content</span>
            <h3>More than a short intro</h3>
            <p>Visitors can now see your story, projects, skill growth, creator side, journey, and future direction in one full experience.</p>
          </article>
          <article className="proof-card">
            <span className="card-kicker">Brand</span>
            <h3>Stronger identity</h3>
            <p>The website now feels like a real digital brand, not only a student homework page or a simple template.</p>
          </article>
          <article className="proof-card">
            <span className="card-kicker">Impact</span>
            <h3>Better first impression</h3>
            <p>It quickly shows that I care about quality, learning, and improving every release.</p>
          </article>
        </div>
      </div>
    </section>

    <section id="build-proof" className="section-pad">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Proof Of Work</p>
          <h2>Clear numbers make the work feel more real.</h2>
          <p className="lead">These live counters show how much of the site is already built, connected, and growing.</p>
        </div>
        <div className="proof-metric-grid">
          <article className="proof-metric-card">
            <strong id="proofProjectCount">0</strong>
            <span>projects featured on this homepage</span>
          </article>
          <article className="proof-metric-card">
            <strong id="proofLiveCount">0</strong>
            <span>projects marked live or active</span>
          </article>
          <article className="proof-metric-card">
            <strong id="proofAppCount">0</strong>
            <span>launchable apps in the app galaxy</span>
          </article>
          <article className="proof-metric-card">
            <strong id="proofSectionCount">0</strong>
            <span>major sections shaping the portfolio story</span>
          </article>
        </div>
      </div>
    </section>

    <section id="projects" className="section-pad projects-shell">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Featured Projects</p>
          <h2>Projects designed to show creativity, skill, and clear purpose.</h2>
          <p className="lead">Each project solves a problem, improves an experience, or supports my creator journey in a practical way.</p>
        </div>

        <div className="project-filters" role="toolbar" aria-label="Project filters">
          <button className="filter-btn is-active" type="button" data-filter="all" aria-pressed="true">All</button>
          <button className="filter-btn" type="button" data-filter="web" aria-pressed="false">Web</button>
          <button className="filter-btn" type="button" data-filter="javascript" aria-pressed="false">JavaScript</button>
          <button className="filter-btn" type="button" data-filter="creator" aria-pressed="false">Creator</button>
        </div>

        <article className="command-center project-command">
          <p className="eyebrow">Project Command Center</p>
          <h3>Find the best build in seconds.</h3>
          <p className="lead">Use search, smart sort, and live mode to quickly highlight my strongest work.</p>
          <div className="command-controls">
            <div className="search-wrap">
              <label className="search-label" htmlFor="projectSearch">Search projects</label>
              <input
                id="projectSearch"
                className="command-input"
                type="search"
                placeholder="Try: review app, AI, YouTube, portfolio..."
                autoComplete="off"
              />
            </div>
            <div className="search-wrap">
              <label className="search-label" htmlFor="projectSort">Sort</label>
              <select id="projectSort" className="command-input">
                <option value="featured">Featured order</option>
                <option value="alphabetical">A to Z</option>
                <option value="status">By status</option>
              </select>
            </div>
          </div>
          <p className="command-status" id="projectSearchStatus" role="status" aria-live="polite">
            Showing all projects.
          </p>
          <div className="hero-actions command-actions">
            <button className="btn secondary" type="button" id="showLiveProjectsBtn">Show Live Projects</button>
            <button className="btn secondary" type="button" id="resetProjectViewBtn">Reset View</button>
          </div>
        </article>

        <div className="project-grid">
          <article className="project-card featured" data-tags="web javascript">
            <div className="project-visual gradient-one">
              <img src="project-study-planner.svg" alt="Study Planner App preview" loading="lazy" decoding="async" width="1200" height="675" sizes="(max-width: 760px) 94vw, (max-width: 1080px) 45vw, 30vw" />
            </div>
            <div className="project-body">
              <div className="project-topline">
                <span className="project-type">Student productivity</span>
                <span className="project-state">Live now</span>
              </div>
              <h3>Study Planner App</h3>
              <p>A dashboard for students to organize homework, exams, and daily priorities without stress or confusion.</p>
              <ul className="project-points">
                <li>Built around clear planning and simple task flow</li>
                <li>Strong use case for forms, layout, and UI structure</li>
                <li>Designed to make student life feel more organized</li>
              </ul>
              <div className="badge-list">
                <span>Dashboard</span>
                <span>Planning</span>
                <span>Frontend UI</span>
              </div>
              <div className="project-links">
                <a href="study-planner.html">Open Study Planner</a>
              </div>
            </div>
          </article>

          <article className="project-card" data-tags="web javascript">
            <div className="project-visual gradient-two">
              <img src="project-quiz-zone.svg" alt="JavaScript Quiz Zone preview" loading="lazy" decoding="async" width="1200" height="675" sizes="(max-width: 760px) 94vw, (max-width: 1080px) 45vw, 30vw" />
            </div>
            <div className="project-body">
              <div className="project-topline">
                <span className="project-type">Interactive learning</span>
                <span className="project-state">Live now</span>
              </div>
              <h3>JavaScript Quiz Zone</h3>
              <p>A quiz experience with scores, instant feedback, and fun interaction that makes practice more exciting.</p>
              <ul className="project-points">
                <li>Shows my JavaScript logic and UI state thinking</li>
                <li>Turns revision into a game-like challenge</li>
                <li>Built for engagement instead of boring worksheets</li>
              </ul>
              <div className="badge-list">
                <span>Quiz Logic</span>
                <span>Scoring</span>
                <span>UX</span>
              </div>
              <div className="project-links">
                <a href="quiz-zone.html">Open Quiz Zone</a>
              </div>
            </div>
          </article>

          <article className="project-card" data-tags="web javascript">
            <div className="project-visual gradient-three">
              <img src="project-aether-core-suite.svg" alt="Aether Core Suite preview built from v104, v55, and v2.5 files" loading="lazy" decoding="async" width="1200" height="675" sizes="(max-width: 760px) 94vw, (max-width: 1080px) 45vw, 30vw" />
            </div>
            <div className="project-body">
              <div className="project-topline">
                <span className="project-type">AI product suite</span>
                <span className="project-state">Multi-version</span>
              </div>
              <h3>Aether Core Suite</h3>
              <p>A real multi-version assistant project with custom UI systems, node dashboards, and advanced chat experience design.</p>
              <ul className="project-points">
                <li>Includes the new v110 Fusion build alongside v104 OMNI-SPEC, v55 KR, and v2.5 Omni-Synth</li>
                <li>Shows strong frontend architecture and experimentation</li>
                <li>Moves from concept-level AI ideas to real working interfaces</li>
              </ul>
              <div className="badge-list">
                <span>AI</span>
                <span>UI</span>
                <span>Product Build</span>
              </div>
              <div className="project-links">
                <a href="aether-core-v110.html">v110 Build</a>
                <a href="aether-core-v104.html">v104 Build</a>
                <a href="aether-core-v55.html">v55 Build</a>
                <a href="aether-core-v25.html">v2.5 Build</a>
              </div>
            </div>
          </article>

          <article className="project-card" data-tags="creator">
            <div className="project-visual gradient-four">
              <img src="my yt.png" alt="YouTube channel profile photo preview" loading="lazy" decoding="async" width="1200" height="675" sizes="(max-width: 760px) 94vw, (max-width: 1080px) 45vw, 30vw" />
            </div>
            <div className="project-body">
              <div className="project-topline">
                <span className="project-type">Creator system</span>
                <span className="project-state">Active</span>
              </div>
              <h3>Gaming and Tech Content Workflow</h3>
              <p>A repeatable system for planning, recording, editing, and posting videos around Roblox, Valorant, Free Fire, Clash Royale, and tech ideas with more consistency.</p>
              <ul className="project-points">
                <li>Improves discipline and content quality over time</li>
                <li>Supports both gaming and coding-focused ideas</li>
                <li>Builds a stronger creator brand around my work</li>
              </ul>
              <div className="badge-list">
                <span>Content</span>
                <span>Editing</span>
                <span>Branding</span>
              </div>
              <div className="project-links">
                <a href="games.html">Open Creator Games Hub</a>
                <a href="https://www.youtube.com/@KryloBlox60" target="_blank" rel="noopener noreferrer">Open YouTube Channel</a>
              </div>
            </div>
          </article>

          <article className="project-card" data-tags="web creator">
            <div className="project-visual gradient-five">
              <img src="project-youtube-sites.svg" alt="YouTube Support Websites preview" loading="lazy" decoding="async" width="1200" height="675" sizes="(max-width: 760px) 94vw, (max-width: 1080px) 45vw, 30vw" />
            </div>
            <div className="project-body">
              <div className="project-topline">
                <span className="project-type">Channel support</span>
                <span className="project-state">Expanding</span>
              </div>
              <h3>YouTube Support Websites</h3>
              <p>Mini pages and supporting websites that help viewers find updates, links, and community content more easily.</p>
              <ul className="project-points">
                <li>Connects web design with creator growth</li>
                <li>Keeps channel information in one clean place</li>
                <li>Shows practical branding through websites</li>
              </ul>
              <div className="badge-list">
                <span>Community</span>
                <span>Landing Pages</span>
                <span>Channel Growth</span>
              </div>
              <div className="project-links">
                <a href="krylo-blox-master-nexus.html">Open Live Build</a>
              </div>
            </div>
          </article>

          <article className="project-card" data-tags="web javascript">
            <div className="project-visual gradient-three">
              <img src="project-review-app.svg" alt="Review App preview with ratings and user feedback cards" loading="lazy" decoding="async" width="1200" height="675" sizes="(max-width: 760px) 94vw, (max-width: 1080px) 45vw, 30vw" />
            </div>
            <div className="project-body">
              <div className="project-topline">
                <span className="project-type">Feedback tool</span>
                <span className="project-state">Live now</span>
              </div>
              <h3>Review App</h3>
              <p>A clean app to add reviews with star ratings, save them in your browser, and track quality with quick stats.</p>
              <ul className="project-points">
                <li>Capture review text, name, category, and rating in one flow</li>
                <li>Stores reviews using local storage for fast use offline</li>
                <li>Includes filters and summary stats for better feedback reading</li>
              </ul>
              <div className="badge-list">
                <span>LocalStorage</span>
                <span>Rating UI</span>
                <span>Filtering</span>
              </div>
              <div className="project-links">
                <a href="review-app.html">Open Review App</a>
              </div>
            </div>
          </article>

          <article className="project-card" data-tags="web javascript">
            <div className="project-visual gradient-one">
              <img src="project-focus-sprint-timer.svg" alt="Focus Sprint Timer app preview" loading="lazy" decoding="async" width="1200" height="675" sizes="(max-width: 760px) 94vw, (max-width: 1080px) 45vw, 30vw" />
            </div>
            <div className="project-body">
              <div className="project-topline">
                <span className="project-type">Productivity tool</span>
                <span className="project-state">Live now</span>
              </div>
              <h3>Focus Sprint Timer</h3>
              <p>A Pomodoro-style focus timer with break cycles and session tracking to help students stay consistent.</p>
              <ul className="project-points">
                <li>Start, pause, reset, and auto-switch between focus and break</li>
                <li>Counts finished sessions in the browser</li>
                <li>Useful for study, coding, and revision blocks</li>
              </ul>
              <div className="badge-list">
                <span>Timer</span>
                <span>Pomodoro</span>
                <span>Focus</span>
              </div>
              <div className="project-links">
                <a href="focus-timer.html">Open Focus Timer</a>
              </div>
            </div>
          </article>

          <article className="project-card" data-tags="web javascript">
            <div className="project-visual gradient-two">
              <img src="project-habit-tracker.svg" alt="Habit Streak Tracker app preview" loading="lazy" decoding="async" width="1200" height="675" sizes="(max-width: 760px) 94vw, (max-width: 1080px) 45vw, 30vw" />
            </div>
            <div className="project-body">
              <div className="project-topline">
                <span className="project-type">Discipline system</span>
                <span className="project-state">Live now</span>
              </div>
              <h3>Habit Streak Tracker</h3>
              <p>A simple tracker to mark daily habits, keep streak count, and build consistency with visible progress.</p>
              <ul className="project-points">
                <li>Create custom habits and mark them done</li>
                <li>Tracks completed days and current streak</li>
                <li>Stores progress locally for instant loading</li>
              </ul>
              <div className="badge-list">
                <span>Habits</span>
                <span>Streaks</span>
                <span>Discipline</span>
              </div>
              <div className="project-links">
                <a href="habit-tracker.html">Open Habit Tracker</a>
              </div>
            </div>
          </article>

          <article className="project-card" data-tags="web javascript">
            <div className="project-visual gradient-five">
              <img src="project-idea-lab-ai.svg" alt="Idea Lab AI app preview with generation and database saving" loading="lazy" decoding="async" width="1200" height="675" sizes="(max-width: 760px) 94vw, (max-width: 1080px) 45vw, 30vw" />
            </div>
            <div className="project-body">
              <div className="project-topline">
                <span className="project-type">AI + database app</span>
                <span className="project-state">Live now</span>
              </div>
              <h3>Idea Lab AI</h3>
              <p>Generate practical app concepts with AI and save the strongest ideas in a backend-powered idea database.</p>
              <ul className="project-points">
                <li>AI endpoint generates app ideas from goals and constraints</li>
                <li>Backend APIs persist ideas so they survive reloads</li>
                <li>Supports delete and review flow for idea refinement</li>
              </ul>
              <div className="badge-list">
                <span>AI</span>
                <span>Backend API</span>
                <span>Database</span>
              </div>
              <div className="project-links">
                <a href="idea-lab-ai.html">Open Idea Lab AI</a>
              </div>
            </div>
          </article>

          <article className="project-card" data-tags="web">
            <div className="project-visual gradient-six">
              <img src="project-portfolio.svg" alt="Portfolio Website preview" loading="lazy" decoding="async" width="1200" height="675" sizes="(max-width: 760px) 94vw, (max-width: 1080px) 45vw, 30vw" />
            </div>
            <div className="project-body">
              <div className="project-topline">
                <span className="project-type">Personal brand</span>
                <span className="project-state">Live now</span>
              </div>
              <h3>This Portfolio Website</h3>
              <p>A bold single-page website that presents my identity, ambition, skills, and work with stronger design direction.</p>
              <ul className="project-points">
                <li>Built to feel premium and memorable</li>
                <li>Shows stronger storytelling than basic portfolios</li>
                <li>Acts as my online base for future growth</li>
              </ul>
              <div className="badge-list">
                <span>Portfolio</span>
                <span>Responsive</span>
                <span>Presentation</span>
              </div>
              <div className="project-links">
                <a href="index.html#top">Open Portfolio Home</a>
              </div>
            </div>
          </article>
        </div>

        <article className="project-super-panel">
          <div className="project-super-head">
            <p className="eyebrow">Merged Command Build</p>
            <h3>I built this site by improving it little by little.</h3>
            <p className="lead">This hub shows my progress: better design, stronger apps, AI tools, and cleaner user experience. I keep learning and shipping updates.</p>
          </div>
          <div className="project-super-grid">
            <div className="project-super-card">
              <span className="card-kicker">Core stack</span>
              <ul className="project-points">
                <li>Clean visual style with smoother CSS interactions</li>
                <li>Quick launcher with keyboard shortcut (`Ctrl/Cmd + K`)</li>
                <li>Live app leaderboard and launch tracking</li>
                <li>Backend status check and API-connected app workflows</li>
              </ul>
            </div>
            <div className="project-super-card">
              <span className="card-kicker">App index</span>
              <div className="super-app-links">
                <a href="study-planner.html">Study Planner</a>
                <a href="quiz-zone.html">Quiz Zone</a>
                <a href="review-app.html">Review App</a>
                <a href="focus-timer.html">Focus Timer</a>
                <a href="habit-tracker.html">Habit Tracker</a>
                <a href="idea-lab-ai.html">Idea Lab AI</a>
                <a href="expense-tracker.html">Expense Tracker</a>
                <a href="notes-vault.html">Notes Vault</a>
                <a href="flashcards.html">Flashcards</a>
                <a href="typing-test.html">Typing Test</a>
                <a href="task-kanban.html">Task Kanban</a>
                <a href="unit-converter.html">Unit Converter</a>
              </div>
            </div>
          </div>
          <p className="dna-credit">Built and maintained by Krishiv PB</p>
        </article>
      </div>
    </section>

    <section id="case-studies" className="section-pad">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Case Studies</p>
          <h2>Three builds that show how I solve problems, not only how I design screens.</h2>
          <p className="lead">Each case study explains the problem, the solution, and the lesson that made my next projects stronger.</p>
        </div>
        <div className="case-study-grid">
          <article className="case-study-card">
            <div className="case-study-head">
              <span className="card-kicker">Review App</span>
              <h3>Turning feedback into a real product flow</h3>
            </div>
            <div className="case-study-list">
              <div>
                <strong>Problem</strong>
                <p>I wanted a place where people could leave feedback in a way that felt clean, organized, and easy to manage.</p>
              </div>
              <div>
                <strong>Solution</strong>
                <p>I built a ratings app with shared review storage, filtering, stats, and creator controls so the feedback feels structured instead of messy.</p>
              </div>
              <div>
                <strong>What I learned</strong>
                <p>Good apps need both frontend polish and backend thinking. The interface matters, but the data flow matters too.</p>
              </div>
            </div>
            <div className="project-links">
              <a href="review-app.html">Open Review App</a>
              <a href="#feedback-loop">See feedback section</a>
            </div>
          </article>
          <article className="case-study-card">
            <div className="case-study-head">
              <span className="card-kicker">Idea Lab AI</span>
              <h3>Moving from random ideas to saved product concepts</h3>
            </div>
            <div className="case-study-list">
              <div>
                <strong>Problem</strong>
                <p>App ideas can disappear fast if they only stay in your head or in messy notes.</p>
              </div>
              <div>
                <strong>Solution</strong>
                <p>I combined AI generation with backend saving so ideas can be created, reviewed, and kept for later improvement.</p>
              </div>
              <div>
                <strong>What I learned</strong>
                <p>AI feels most useful when it is connected to a real workflow. Generating ideas is good, but saving and refining them is better.</p>
              </div>
            </div>
            <div className="project-links">
              <a href="idea-lab-ai.html">Open Idea Lab AI</a>
              <a href="#strategy">See strategy</a>
            </div>
          </article>
          <article className="case-study-card">
            <div className="case-study-head">
              <span className="card-kicker">Portfolio</span>
              <h3>Making a personal site feel like a full brand system</h3>
            </div>
            <div className="case-study-list">
              <div>
                <strong>Problem</strong>
                <p>A normal portfolio can feel flat if it only lists projects without story, energy, or direction.</p>
              </div>
              <div>
                <strong>Solution</strong>
                <p>I turned the homepage into a bigger experience with sections for growth, apps, creator work, roadmap, and live interaction.</p>
              </div>
              <div>
                <strong>What I learned</strong>
                <p>Presentation changes how people judge the work. Strong storytelling can make the same projects feel much more impressive.</p>
              </div>
            </div>
            <div className="project-links">
              <a href="#top">Back to top</a>
              <a href="projects.html">Open Projects Hub</a>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section id="command-center" className="section-pad command-center-shell">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Command Center</p>
          <h2>Live site status and random nerdy stats.</h2>
          <p className="lead">I like keeping this stuff visible because it makes the site feel active and real.</p>
        </div>
        <div className="command-center-grid">
          <article className="process-card command-center-card">
            <h3>Runtime Status</h3>
            <p>Backend mode: <strong id="ccBackendMode">checking...</strong></p>
            <p>YouTube sync source: <strong id="ccSyncSource">checking...</strong></p>
            <p>Last sync: <strong id="ccSyncTime">checking...</strong></p>
            <p>Local time: <strong id="ccClock">checking...</strong></p>
            <p>Quality score: <strong id="ccQualityScore">checking...</strong></p>
          </article>
          <article className="process-card command-center-card">
            <h3>Channel Snapshot</h3>
            <div className="command-center-stats">
              <div><span className="mini-label">Subs</span><strong id="ccSubs">0</strong></div>
              <div><span className="mini-label">Views</span><strong id="ccViews">0</strong></div>
              <div><span className="mini-label">Videos</span><strong id="ccVideos">0</strong></div>
            </div>
          </article>
          <article className="process-card command-center-card">
            <h3>Broadcast Message</h3>
            <p id="ccMessage">Loading live message...</p>
            <div className="hero-actions">
              <a className="btn secondary" href="krylo-blox-master-nexus.html">Open Master Nexus</a>
              <a className="btn secondary" href="review-app.html">Open Review App</a>
            </div>
          </article>
          <article className="process-card command-center-card">
            <h3>AI Mesh</h3>
            <div className="command-center-stats compact">
              <div><span className="mini-label">Loaded Keys</span><strong id="ccAiLoaded">0</strong></div>
              <div><span className="mini-label">Ready Keys</span><strong id="ccAiReady">0</strong></div>
              <div><span className="mini-label">Cooling</span><strong id="ccAiCooling">0</strong></div>
              <div><span className="mini-label">Successes</span><strong id="ccAiSuccesses">0</strong></div>
            </div>
            <p className="meta" id="ccAiStatus">AI pool metrics loading...</p>
          </article>
          <article className="process-card command-center-card">
            <h3>Launch Radar</h3>
            <div className="command-center-stats compact">
              <div><span className="mini-label">Public Apps</span><strong id="ccPublicApps">0</strong></div>
              <div><span className="mini-label">Reviews</span><strong id="ccReviewCount">0</strong></div>
              <div><span className="mini-label">Ideas</span><strong id="ccIdeaCount">0</strong></div>
              <div><span className="mini-label">Sessions</span><strong id="ccSessionCount">0</strong></div>
            </div>
            <div className="command-center-list" id="ccTopApps">
              <p className="meta">Top apps are loading...</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section id="signature" className="section-pad signature-shell">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Krishiv Signature</p>
          <h2>A bold portfolio style built to stand out early.</h2>
          <p className="lead">This is focused execution that makes people remember the builder behind the screen: Krishiv PB.</p>
        </div>
        <div className="signature-grid">
          <article className="signature-card">
            <span className="card-kicker">Build Quality</span>
            <h3>Clear design system</h3>
            <p>Unified spacing, typography, motion, and reusable components across sections and app pages.</p>
          </article>
          <article className="signature-card">
            <span className="card-kicker">Creator Identity</span>
            <h3>Not a template portfolio</h3>
            <p>Gaming + coding + live app ecosystem in one integrated personal brand experience.</p>
          </article>
          <article className="signature-card">
            <span className="card-kicker">Execution</span>
            <h3>Shipped and improving</h3>
            <p>Real deployments, live sync flows, admin control, and continuous upgrades with clear owner credit.</p>
          </article>
        </div>
      </div>
    </section>

    <section id="app-verse" className="section-pad proof-shell">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Apps Galaxy</p>
          <h2>Best work first, then featured builds, then working apps ready to open.</h2>
          <p className="lead">
            This gallery is now easier to scan: featured launches show the strongest work, and working apps show what people can open and use right now. Press <strong>Ctrl/Cmd + K</strong> to open quick launcher.
          </p>
        </div>
        <article className="app-verse-controls" aria-label="Apps Galaxy controls">
          <div className="search-wrap">
            <label className="search-label" htmlFor="appVerseSearch">Find app</label>
            <input
              id="appVerseSearch"
              className="command-input"
              type="search"
              placeholder="Search app name or use case..."
              autoComplete="off"
            />
          </div>
          <div className="search-wrap">
            <label className="search-label" htmlFor="appVerseCategory">Category</label>
            <select id="appVerseCategory" className="command-input">
              <option value="all">All categories</option>
            </select>
          </div>
        </article>
        <div className="app-tier-filters" aria-label="Filter app tiers">
          <button type="button" className="app-tier-btn is-active" data-tier-filter="all">All</button>
          <button type="button" className="app-tier-btn" data-tier-filter="featured">Featured</button>
          <button type="button" className="app-tier-btn" data-tier-filter="live">Apps</button>
        </div>
        <p id="appVerseStatus" className="command-status" role="status" aria-live="polite">Showing all apps across featured and working app tiers.</p>
        <article className="app-verse-core-links" aria-label="Core live pages">
          <div className="app-verse-head">
            <span className="card-kicker">Core Live Pages</span>
          </div>
          <h3>Master Nexus and Aether Core builds</h3>
          <div className="live-core-grid">
            <a href="krylo-blox-master-nexus.html">
              <img className="live-core-icon" src="core-icon-master-nexus.svg" alt="" loading="lazy" decoding="async" width="24" height="24" />
              <span>Open Master Nexus</span>
            </a>
            <a href="aether-core-v110.html">
              <img className="live-core-icon" src="core-icon-aether-v110.svg" alt="" loading="lazy" decoding="async" width="24" height="24" />
              <span>Open Aether v110</span>
            </a>
            <a href="aether-core-v104.html">
              <img className="live-core-icon" src="core-icon-aether-v104.svg" alt="" loading="lazy" decoding="async" width="24" height="24" />
              <span>Open Aether v104</span>
            </a>
            <a href="aether-core-v55.html">
              <img className="live-core-icon" src="core-icon-aether-v55.svg" alt="" loading="lazy" decoding="async" width="24" height="24" />
              <span>Open Aether v55</span>
            </a>
            <a href="aether-core-v25.html">
              <img className="live-core-icon" src="core-icon-aether-v25.svg" alt="" loading="lazy" decoding="async" width="24" height="24" />
              <span>Open Aether v2.5</span>
            </a>
          </div>
        </article>
        <div className="app-verse-meta">
          <article className="app-verse-stat">
            <strong id="appCountStat">0</strong>
            <span>Apps in galaxy</span>
          </article>
          <article className="app-verse-stat">
            <strong id="categoryCountStat">0</strong>
            <span>Featured launches</span>
          </article>
          <article className="app-verse-stat">
            <strong id="totalLaunchesStat">0</strong>
            <span>Working apps</span>
          </article>
          <article className="app-verse-stat">
            <strong id="backendModeStat">checking...</strong>
            <span>Live backend mode</span>
          </article>
        </div>
        <div className="app-verse-grid">
          <a className="app-verse-card" href="study-planner.html" data-launch-name="Study Planner" data-launch-tags="study planner tasks" data-tier="featured">
            <div className="app-verse-head">
              <img className="app-mini-logo-img" src="app-icon-study-planner.svg" alt="" loading="lazy" decoding="async" width="32" height="32" />
              <span className="card-kicker">Productivity</span>
            </div>
            <h3>Study Planner</h3>
            <p>Plan homework, priorities, and deadlines with clean task tracking.</p>
          </a>
          <a className="app-verse-card" href="quiz-zone.html" data-launch-name="Quiz Zone" data-launch-tags="quiz javascript learning">
            <div className="app-verse-head">
              <img className="app-mini-logo-img" src="app-icon-quiz-zone.svg" alt="" loading="lazy" decoding="async" width="32" height="32" />
              <span className="card-kicker">Learning</span>
            </div>
            <h3>Quiz Zone</h3>
            <p>Practice with instant feedback and score flow.</p>
          </a>
          <a className="app-verse-card" href="review-app.html" data-launch-name="Review App" data-launch-tags="review rating feedback" data-tier="featured">
            <div className="app-verse-head">
              <img className="app-mini-logo-img" src="app-icon-review-app.svg" alt="" loading="lazy" decoding="async" width="32" height="32" />
              <span className="card-kicker">Feedback</span>
            </div>
            <h3>Review App</h3>
            <p>Collect ratings and review quality with backend storage.</p>
          </a>
          <a className="app-verse-card" href="focus-timer.html" data-launch-name="Focus Timer" data-launch-tags="pomodoro timer focus">
            <div className="app-verse-head">
              <img className="app-mini-logo-img" src="app-icon-focus-timer.svg" alt="" loading="lazy" decoding="async" width="32" height="32" />
              <span className="card-kicker">Focus</span>
            </div>
            <h3>Focus Sprint Timer</h3>
            <p>Run focus-break cycles and track completed sessions.</p>
          </a>
          <a className="app-verse-card" href="habit-tracker.html" data-launch-name="Habit Tracker" data-launch-tags="habit streak discipline">
            <div className="app-verse-head">
              <img className="app-mini-logo-img" src="app-icon-habit-tracker.svg" alt="" loading="lazy" decoding="async" width="32" height="32" />
              <span className="card-kicker">Discipline</span>
            </div>
            <h3>Habit Tracker</h3>
            <p>Build consistency with daily streak tracking.</p>
          </a>
          <a className="app-verse-card" href="idea-lab-ai.html" data-launch-name="Idea Lab AI" data-launch-tags="ai ideas database" data-tier="featured">
            <div className="app-verse-head">
              <img className="app-mini-logo-img" src="app-icon-idea-lab-ai.svg" alt="" loading="lazy" decoding="async" width="32" height="32" />
              <span className="card-kicker">AI + Database</span>
            </div>
            <h3>Idea Lab AI</h3>
            <p>Generate app ideas with AI and save them in backend storage.</p>
          </a>
          <a className="app-verse-card" href="expense-tracker.html" data-launch-name="Expense Tracker" data-launch-tags="money finance expense">
            <div className="app-verse-head">
              <img className="app-mini-logo-img" src="app-icon-expense-tracker.svg" alt="" loading="lazy" decoding="async" width="32" height="32" />
              <span className="card-kicker">Finance</span>
            </div>
            <h3>Expense Tracker</h3>
            <p>Track income and expenses with quick balance summaries.</p>
          </a>
          <a className="app-verse-card" href="notes-vault.html" data-launch-name="Notes Vault" data-launch-tags="notes writing vault">
            <div className="app-verse-head">
              <img className="app-mini-logo-img" src="app-icon-notes-vault.svg" alt="" loading="lazy" decoding="async" width="32" height="32" />
              <span className="card-kicker">Writing</span>
            </div>
            <h3>Notes Vault</h3>
            <p>Save searchable notes for ideas and planning.</p>
          </a>
          <a className="app-verse-card" href="flashcards.html" data-launch-name="Flashcards" data-launch-tags="flashcards memory revision">
            <div className="app-verse-head">
              <img className="app-mini-logo-img" src="app-icon-flashcards.svg" alt="" loading="lazy" decoding="async" width="32" height="32" />
              <span className="card-kicker">Memory</span>
            </div>
            <h3>Flashcards Trainer</h3>
            <p>Create and review question-answer cards quickly.</p>
          </a>
          <a className="app-verse-card" href="typing-test.html" data-launch-name="Typing Test" data-launch-tags="typing speed practice">
            <div className="app-verse-head">
              <img className="app-mini-logo-img" src="app-icon-typing-test.svg" alt="" loading="lazy" decoding="async" width="32" height="32" />
              <span className="card-kicker">Speed</span>
            </div>
            <h3>Typing Speed Test</h3>
            <p>Measure speed and accuracy with timed samples.</p>
          </a>
          <a className="app-verse-card" href="task-kanban.html" data-launch-name="Task Kanban" data-launch-tags="kanban board todo">
            <div className="app-verse-head">
              <img className="app-mini-logo-img" src="app-icon-task-kanban.svg" alt="" loading="lazy" decoding="async" width="32" height="32" />
              <span className="card-kicker">Workflow</span>
            </div>
            <h3>Task Kanban</h3>
            <p>Move tasks across Todo, Doing, and Done columns.</p>
          </a>
          <a className="app-verse-card" href="unit-converter.html" data-launch-name="Unit Converter" data-launch-tags="converter units tools">
            <div className="app-verse-head">
              <img className="app-mini-logo-img" src="app-icon-unit-converter.svg" alt="" loading="lazy" decoding="async" width="32" height="32" />
              <span className="card-kicker">Utility</span>
            </div>
            <h3>Unit Converter</h3>
            <p>Convert distance and temperature values fast.</p>
          </a>
          <a className="app-verse-card" href="games.html" data-launch-name="Games Hub" data-launch-tags="games roblox valorant freefire clash royale">
            <div className="app-verse-head">
              <img className="app-mini-logo-img" src="app-icon-games-hub.svg" alt="" loading="lazy" decoding="async" width="32" height="32" />
              <span className="card-kicker">Gaming</span>
            </div>
            <h3>Games Hub</h3>
            <p>Explore all game profiles, IDs, and links in one dedicated page.</p>
          </a>
          <a className="app-verse-card" href="reaction-blitz.html" data-launch-name="Reaction Blitz" data-launch-tags="gaming reaction reflex krishiv original">
            <div className="app-verse-head">
              <img className="app-mini-logo-img" src="app-icon-reaction-blitz.svg" alt="" loading="lazy" decoding="async" width="32" height="32" />
              <span className="card-kicker">Gaming</span>
            </div>
            <h3>Reaction Blitz</h3>
            <p>Original reflex mini-game built by Krishiv PB.</p>
          </a>
          <a className="app-verse-card" href="memory-matrix.html" data-launch-name="Memory Matrix" data-launch-tags="gaming memory cards matrix krishiv original">
            <div className="app-verse-head">
              <img className="app-mini-logo-img" src="app-icon-memory-matrix.svg" alt="" loading="lazy" decoding="async" width="32" height="32" />
              <span className="card-kicker">Gaming</span>
            </div>
            <h3>Memory Matrix</h3>
            <p>Handmade matching game with a polished board feel.</p>
          </a>
          <a className="app-verse-card" href="color-switch-rush.html" data-launch-name="Color Switch Rush" data-launch-tags="gaming color reflex rush krishiv original">
            <div className="app-verse-head">
              <img className="app-mini-logo-img" src="app-icon-color-switch-rush.svg" alt="" loading="lazy" decoding="async" width="32" height="32" />
              <span className="card-kicker">Gaming</span>
            </div>
            <h3>Color Switch Rush</h3>
            <p>Arcade color-calling challenge made by Krishiv PB.</p>
          </a>
          <a className="app-verse-card" href="projects.html" data-launch-name="Projects Page" data-launch-tags="projects portfolio page">
            <div className="app-verse-head">
              <img className="app-mini-logo-img" src="app-icon-projects-page.svg" alt="" loading="lazy" decoding="async" width="32" height="32" />
              <span className="card-kicker">Navigation</span>
            </div>
            <h3>Projects Page</h3>
            <p>Direct page for project navigation in the public web.</p>
          </a>
          <a className="app-verse-card" href="contact.html" data-launch-name="Contact Page" data-launch-tags="contact links email discord">
            <div className="app-verse-head">
              <img className="app-mini-logo-img" src="app-icon-contact-page.svg" alt="" loading="lazy" decoding="async" width="32" height="32" />
              <span className="card-kicker">Navigation</span>
            </div>
            <h3>Contact Page</h3>
            <p>Public contact links and communication routes.</p>
          </a>
          <a className="app-verse-card" href="all-links.html" data-launch-name="All Links Directory" data-launch-tags="directory all links web map navigation" data-tier="featured">
            <div className="app-verse-head">
              <img className="app-mini-logo-img" src="app-icon-all-links.svg" alt="" loading="lazy" decoding="async" width="32" height="32" />
              <span className="card-kicker">Navigation</span>
            </div>
            <h3>All Links Directory</h3>
            <p>The full public map of the website with every important live route.</p>
          </a>
          <a className="app-verse-card" href="password-lab.html" data-launch-name="Password Lab" data-launch-tags="security password generator">
            <div className="app-verse-head">
              <img className="app-mini-logo-img" src="app-icon-password-lab.svg" alt="" loading="lazy" decoding="async" width="32" height="32" />
              <span className="card-kicker">Security</span>
            </div>
            <h3>Password Lab</h3>
            <p>Create stronger passwords with quick controls.</p>
          </a>
          <a className="app-verse-card" href="bmi-health.html" data-launch-name="BMI Health" data-launch-tags="health bmi calculator">
            <div className="app-verse-head">
              <img className="app-mini-logo-img" src="app-icon-bmi-health.svg" alt="" loading="lazy" decoding="async" width="32" height="32" />
              <span className="card-kicker">Health</span>
            </div>
            <h3>BMI Health</h3>
            <p>Simple body mass index check with instant result.</p>
          </a>
          <a className="app-verse-card" href="random-picker.html" data-launch-name="Random Picker" data-launch-tags="random picker utility">
            <div className="app-verse-head">
              <img className="app-mini-logo-img" src="app-icon-random-picker.svg" alt="" loading="lazy" decoding="async" width="32" height="32" />
              <span className="card-kicker">Utility</span>
            </div>
            <h3>Random Picker</h3>
            <p>Pick random options quickly for games and decisions.</p>
          </a>
          <a className="app-verse-card" href="krylo-blox-master-nexus.html" data-launch-name="Master Nexus" data-launch-tags="nexus yt portfolio" data-tier="featured">
            <div className="app-verse-head">
              <img className="app-mini-logo-img" src="core-icon-master-nexus.svg" alt="" loading="lazy" decoding="async" width="32" height="32" />
              <span className="card-kicker">Core</span>
            </div>
            <h3>Master Nexus</h3>
            <p>Live YouTube sync page with creator command vibe.</p>
          </a>
          <a className="app-verse-card" href="aether-core-v110.html" data-launch-name="Aether v110" data-launch-tags="aether ai core v110 fusion" data-tier="featured">
            <div className="app-verse-head">
              <img className="app-mini-logo-img" src="core-icon-aether-v110.svg" alt="" loading="lazy" decoding="async" width="32" height="32" />
              <span className="card-kicker">Core</span>
            </div>
            <h3>Aether v110</h3>
            <p>Fusion command build that combines the strongest Aether features in one AI page.</p>
          </a>
          <a className="app-verse-card" href="aether-core-v104.html" data-launch-name="Aether v104" data-launch-tags="aether ai core v104">
            <div className="app-verse-head">
              <img className="app-mini-logo-img" src="core-icon-aether-v104.svg" alt="" loading="lazy" decoding="async" width="32" height="32" />
              <span className="card-kicker">Core</span>
            </div>
            <h3>Aether v104</h3>
            <p>Advanced Aether core build v104 public page.</p>
          </a>
          <a className="app-verse-card" href="aether-core-v55.html" data-launch-name="Aether v55" data-launch-tags="aether ai core v55">
            <div className="app-verse-head">
              <img className="app-mini-logo-img" src="core-icon-aether-v55.svg" alt="" loading="lazy" decoding="async" width="32" height="32" />
              <span className="card-kicker">Core</span>
            </div>
            <h3>Aether v55</h3>
            <p>Focused Aether core build v55 public page.</p>
          </a>
          <a className="app-verse-card" href="aether-core-v25.html" data-launch-name="Aether v2.5" data-launch-tags="aether ai core v2.5">
            <div className="app-verse-head">
              <img className="app-mini-logo-img" src="core-icon-aether-v25.svg" alt="" loading="lazy" decoding="async" width="32" height="32" />
              <span className="card-kicker">Core</span>
            </div>
            <h3>Aether v2.5</h3>
            <p>Classic Aether core build v2.5 public page.</p>
          </a>
          <a className="app-verse-card" href="grade-calculator.html" data-launch-name="Grade Calculator" data-launch-tags="grades school calculator weighted">
            <div className="app-verse-head">
              <img className="app-mini-logo-img" src="app-icon-grade-calculator.svg" alt="" loading="lazy" decoding="async" width="32" height="32" />
              <span className="card-kicker">Education</span>
            </div>
            <h3>Grade Calculator</h3>
            <p>Calculate weighted scores and estimate grade bands.</p>
          </a>
          <a className="app-verse-card" href="daily-journal.html" data-launch-name="Daily Journal" data-launch-tags="journal mood writing daily">
            <div className="app-verse-head">
              <img className="app-mini-logo-img" src="app-icon-daily-journal.svg" alt="" loading="lazy" decoding="async" width="32" height="32" />
              <span className="card-kicker">Reflection</span>
            </div>
            <h3>Daily Journal</h3>
            <p>Record daily progress, mood, and key learnings.</p>
          </a>
          <a className="app-verse-card" href="goal-planner.html" data-launch-name="Goal Planner" data-launch-tags="goal planner weekly monthly">
            <div className="app-verse-head">
              <img className="app-mini-logo-img" src="app-icon-goal-planner.svg" alt="" loading="lazy" decoding="async" width="32" height="32" />
              <span className="card-kicker">Planning</span>
            </div>
            <h3>Goal Planner</h3>
            <p>Track weekly and monthly goals with clear status.</p>
          </a>
          <a className="app-verse-card" href="reading-tracker.html" data-launch-name="Reading Tracker" data-launch-tags="reading books tracker progress">
            <div className="app-verse-head">
              <img className="app-mini-logo-img" src="app-icon-reading-tracker.svg" alt="" loading="lazy" decoding="async" width="32" height="32" />
              <span className="card-kicker">Learning</span>
            </div>
            <h3>Reading Tracker</h3>
            <p>Track books, progress, and completion percentage.</p>
          </a>
          <a className="app-verse-card" href="water-reminder.html" data-launch-name="Water Reminder" data-launch-tags="water reminder health tracker">
            <div className="app-verse-head">
              <img className="app-mini-logo-img" src="app-icon-water-reminder.svg" alt="" loading="lazy" decoding="async" width="32" height="32" />
              <span className="card-kicker">Health</span>
            </div>
            <h3>Water Reminder</h3>
            <p>Track hydration goals with quick intake actions.</p>
          </a>
          <a className="app-verse-card" href="presentation-planner.html" data-launch-name="Presentation Planner" data-launch-tags="presentation planner slides school">
            <div className="app-verse-head">
              <img className="app-mini-logo-img" src="app-icon-presentation-planner.svg" alt="" loading="lazy" decoding="async" width="32" height="32" />
              <span className="card-kicker">School</span>
            </div>
            <h3>Presentation Planner</h3>
            <p>Plan slide flow and speaking points effectively.</p>
          </a>
          <a className="app-verse-card" href="code-snippets-vault.html" data-launch-name="Code Snippets Vault" data-launch-tags="code snippets vault dev">
            <div className="app-verse-head">
              <img className="app-mini-logo-img" src="app-icon-code-snippets.svg" alt="" loading="lazy" decoding="async" width="32" height="32" />
              <span className="card-kicker">Developer</span>
            </div>
            <h3>Code Snippets Vault</h3>
            <p>Store reusable code snippets with language labels.</p>
          </a>
          <a className="app-verse-card" href="mind-map-board.html" data-launch-name="Mind Map Board" data-launch-tags="mind map ideas planning nodes">
            <div className="app-verse-head">
              <img className="app-mini-logo-img" src="app-icon-mind-map.svg" alt="" loading="lazy" decoding="async" width="32" height="32" />
              <span className="card-kicker">Ideas</span>
            </div>
            <h3>Mind Map Board</h3>
            <p>Build connected idea nodes for projects and content.</p>
          </a>
          <a className="app-verse-card" href="bazaar-blitz.html" data-launch-name="BazaarBlitz Prime" data-launch-tags="marketplace shopping cart amazon style products" data-tier="featured" data-status="New">
            <div className="app-verse-head">
              <img className="app-mini-logo-img" src="app-icon-bazaar-blitz.svg" alt="" loading="lazy" decoding="async" width="32" height="32" />
              <span className="card-kicker">Marketplace</span>
            </div>
            <h3>BazaarBlitz Prime</h3>
            <p>Amazon-style shopping experience with search, filters, cart, coupons, and checkout simulation.</p>
          </a>
          <a className="app-verse-card" href="votestorm-arena.html" data-launch-name="VoteStorm Arena" data-launch-tags="poll voting community live chart" data-tier="featured" data-status="New">
            <div className="app-verse-head">
              <img className="app-mini-logo-img" src="app-icon-votestorm.svg" alt="" loading="lazy" decoding="async" width="32" height="32" />
              <span className="card-kicker">Community</span>
            </div>
            <h3>VoteStorm Arena</h3>
            <p>Create polls, vote instantly, and watch dynamic result bars update live.</p>
          </a>
          <a className="app-verse-card" href="time-capsule-lab.html" data-launch-name="Time Capsule Lab" data-launch-tags="future message unlock date memory">
            <div className="app-verse-head">
              <img className="app-mini-logo-img" src="app-icon-time-capsule.svg" alt="" loading="lazy" decoding="async" width="32" height="32" />
              <span className="card-kicker">Animation</span>
            </div>
            <h3>Time Capsule Lab</h3>
            <p>Write messages to your future self and unlock them on selected dates.</p>
          </a>
          <a className="app-verse-card" href="storyforge-studio.html" data-launch-name="StoryForge Studio" data-launch-tags="story writing creative generator">
            <div className="app-verse-head">
              <img className="app-mini-logo-img" src="app-icon-storyforge.svg" alt="" loading="lazy" decoding="async" width="32" height="32" />
              <span className="card-kicker">Creative</span>
            </div>
            <h3>StoryForge Studio</h3>
            <p>Generate fun stories with genre twists and save your favorite creations.</p>
          </a>
          <a className="app-verse-card" href="meal-planner.html" data-launch-name="Meal Planner Pro" data-launch-tags="meal planning grocery list food">
            <div className="app-verse-head">
              <img className="app-mini-logo-img" src="app-icon-meal-planner.svg" alt="" loading="lazy" decoding="async" width="32" height="32" />
              <span className="card-kicker">Lifestyle</span>
            </div>
            <h3>Meal Planner Pro</h3>
            <p>Plan your week’s meals and auto-build a smart grocery checklist.</p>
          </a>
          <a className="app-verse-card" href="color-palette-lab.html" data-launch-name="Color Palette Lab" data-launch-tags="design palette colors hex generator">
            <div className="app-verse-head">
              <img className="app-mini-logo-img" src="app-icon-color-palette-lab.svg" alt="" loading="lazy" decoding="async" width="32" height="32" />
              <span className="card-kicker">Design</span>
            </div>
            <h3>Color Palette Lab</h3>
            <p>Create beautiful color sets and copy HEX codes instantly.</p>
          </a>
          <a className="app-verse-card" href="resume-studio.html" data-launch-name="Resume Studio Lite" data-launch-tags="resume builder profile career text export">
            <div className="app-verse-head">
              <img className="app-mini-logo-img" src="app-icon-resume-studio.svg" alt="" loading="lazy" decoding="async" width="32" height="32" />
              <span className="card-kicker">Career</span>
            </div>
            <h3>Resume Studio Lite</h3>
            <p>Create a quick resume summary and export it instantly.</p>
          </a>
          <a className="app-verse-card" href="budget-battle.html" data-launch-name="Budget Battle Sim" data-launch-tags="budget finance money simulation tracker">
            <div className="app-verse-head">
              <img className="app-mini-logo-img" src="app-icon-budget-battle.svg" alt="" loading="lazy" decoding="async" width="32" height="32" />
              <span className="card-kicker">Finance</span>
            </div>
            <h3>Budget Battle Sim</h3>
            <p>Simulate money decisions and improve budgeting with a live score.</p>
          </a>
          <a className="app-verse-card" href="homework-hub.html" data-launch-name="Homework Hub" data-launch-tags="school homework planner assignments concept" aria-label="Open Homework Hub">
            <div className="app-verse-head">
              <img className="app-mini-logo-img" src="app-icon-homework-hub.svg" alt="" loading="lazy" decoding="async" width="32" height="32" />
              <span className="card-kicker">App</span>
            </div>
            <h3>Homework Hub</h3>
            <span className="app-status-chip">Working App</span>
            <p>One dashboard for homework tasks, due dates, and progress streaks.</p>
          </a>
          <a className="app-verse-card" href="attendance-tracker.html" data-launch-name="Attendance Tracker" data-launch-tags="school attendance tracker concept" aria-label="Open Attendance Tracker">
            <div className="app-verse-head">
              <img className="app-mini-logo-img" src="app-icon-attendance-tracker.svg" alt="" loading="lazy" decoding="async" width="32" height="32" />
              <span className="card-kicker">App</span>
            </div>
            <h3>Attendance Tracker</h3>
            <span className="app-status-chip">Working App</span>
            <p>Track school attendance, missed days, and monthly consistency at a glance.</p>
          </a>
          <a className="app-verse-card" href="link-locker.html" data-launch-name="Link Locker" data-launch-tags="creator links bookmarks organizer concept" aria-label="Open Link Locker">
            <div className="app-verse-head">
              <img className="app-mini-logo-img" src="app-icon-link-locker.svg" alt="" loading="lazy" decoding="async" width="32" height="32" />
              <span className="card-kicker">App</span>
            </div>
            <h3>Link Locker</h3>
            <span className="app-status-chip">Working App</span>
            <p>Save creator links, tools, and references inside a clean searchable vault.</p>
          </a>
          <a className="app-verse-card" href="habit-heatmap.html" data-launch-name="Habit Heatmap" data-launch-tags="habit tracker heatmap consistency concept" aria-label="Open Habit Heatmap">
            <div className="app-verse-head">
              <img className="app-mini-logo-img" src="app-icon-habit-heatmap.svg" alt="" loading="lazy" decoding="async" width="32" height="32" />
              <span className="card-kicker">App</span>
            </div>
            <h3>Habit Heatmap</h3>
            <span className="app-status-chip">Working App</span>
            <p>Visualize daily habits in a heatmap grid to spot momentum and weak zones.</p>
          </a>
          <a className="app-verse-card" href="focus-music-deck.html" data-launch-name="Focus Music Deck" data-launch-tags="focus music productivity concept" aria-label="Open Focus Music Deck">
            <div className="app-verse-head">
              <img className="app-mini-logo-img" src="app-icon-focus-music-deck.svg" alt="" loading="lazy" decoding="async" width="32" height="32" />
              <span className="card-kicker">App</span>
            </div>
            <h3>Focus Music Deck</h3>
            <span className="app-status-chip">Working App</span>
            <p>Pair study sessions with themed music decks and smart timer presets.</p>
          </a>
          <a className="app-verse-card" href="thumbnail-idea-board.html" data-launch-name="Thumbnail Idea Board" data-launch-tags="youtube thumbnail ideas creator concept" aria-label="Open Thumbnail Idea Board">
            <div className="app-verse-head">
              <img className="app-mini-logo-img" src="app-icon-thumbnail-idea-board.svg" alt="" loading="lazy" decoding="async" width="32" height="32" />
              <span className="card-kicker">App</span>
            </div>
            <h3>Thumbnail Idea Board</h3>
            <span className="app-status-chip">Working App</span>
            <p>Collect thumbnail titles, color notes, and hook ideas for future uploads.</p>
          </a>
          <a className="app-verse-card" href="script-planner.html" data-launch-name="Script Planner" data-launch-tags="youtube script planner writing creator concept" aria-label="Open Script Planner">
            <div className="app-verse-head">
              <img className="app-mini-logo-img" src="app-icon-script-planner.svg" alt="" loading="lazy" decoding="async" width="32" height="32" />
              <span className="card-kicker">App</span>
            </div>
            <h3>Script Planner</h3>
            <span className="app-status-chip">Working App</span>
            <p>Outline intros, scenes, and call-to-action lines for stronger creator scripts.</p>
          </a>
          <a className="app-verse-card" href="upload-calendar.html" data-launch-name="Upload Calendar" data-launch-tags="creator calendar planning uploads concept" aria-label="Open Upload Calendar">
            <div className="app-verse-head">
              <img className="app-mini-logo-img" src="app-icon-upload-calendar.svg" alt="" loading="lazy" decoding="async" width="32" height="32" />
              <span className="card-kicker">App</span>
            </div>
            <h3>Upload Calendar</h3>
            <span className="app-status-chip">Working App</span>
            <p>Plan videos, shorts, and community posts on a visual weekly content map.</p>
          </a>
          <a className="app-verse-card" href="stream-overlay-kit.html" data-launch-name="Stream Overlay Kit" data-launch-tags="gaming stream overlay creator concept" aria-label="Open Stream Overlay Kit">
            <div className="app-verse-head">
              <img className="app-mini-logo-img" src="app-icon-stream-overlay-kit.svg" alt="" loading="lazy" decoding="async" width="32" height="32" />
              <span className="card-kicker">App</span>
            </div>
            <h3>Stream Overlay Kit</h3>
            <span className="app-status-chip">Working App</span>
            <p>Build scenes, alerts, and quick branding panels for gaming livestreams.</p>
          </a>
          <a className="app-verse-card" href="qr-generator-pro.html" data-launch-name="QR Generator Pro" data-launch-tags="qr generator tool utility concept" aria-label="Open QR Generator Pro">
            <div className="app-verse-head">
              <img className="app-mini-logo-img" src="app-icon-qr-generator-pro.svg" alt="" loading="lazy" decoding="async" width="32" height="32" />
              <span className="card-kicker">App</span>
            </div>
            <h3>QR Generator Pro</h3>
            <span className="app-status-chip">Working App</span>
            <p>Create shareable QR codes for links, profiles, and quick event access.</p>
          </a>
          <a className="app-verse-card" href="pomodoro-duel.html" data-launch-name="Pomodoro Duel" data-launch-tags="pomodoro focus duel game concept" aria-label="Open Pomodoro Duel">
            <div className="app-verse-head">
              <img className="app-mini-logo-img" src="app-icon-pomodoro-duel.svg" alt="" loading="lazy" decoding="async" width="32" height="32" />
              <span className="card-kicker">App</span>
            </div>
            <h3>Pomodoro Duel</h3>
            <span className="app-status-chip">Working App</span>
            <p>Turn focus sessions into friendly score battles with streak bonuses.</p>
          </a>
          <a className="app-verse-card" href="revision-race.html" data-launch-name="Revision Race" data-launch-tags="study quiz revision race concept" aria-label="Open Revision Race">
            <div className="app-verse-head">
              <img className="app-mini-logo-img" src="app-icon-revision-race.svg" alt="" loading="lazy" decoding="async" width="32" height="32" />
              <span className="card-kicker">App</span>
            </div>
            <h3>Revision Race</h3>
            <span className="app-status-chip">Working App</span>
            <p>Gamify exam revision with checkpoints, timed rounds, and score bursts.</p>
          </a>
          <a className="app-verse-card" href="scholarship-finder.html" data-launch-name="Scholarship Finder" data-launch-tags="school scholarship finder career concept" aria-label="Open Scholarship Finder">
            <div className="app-verse-head">
              <img className="app-mini-logo-img" src="app-icon-scholarship-finder.svg" alt="" loading="lazy" decoding="async" width="32" height="32" />
              <span className="card-kicker">App</span>
            </div>
            <h3>Scholarship Finder</h3>
            <span className="app-status-chip">Working App</span>
            <p>Collect scholarship options, deadlines, and application checklists in one place.</p>
          </a>
          <a className="app-verse-card" href="portfolio-asset-vault.html" data-launch-name="Portfolio Asset Vault" data-launch-tags="portfolio design assets vault concept" aria-label="Open Portfolio Asset Vault">
            <div className="app-verse-head">
              <img className="app-mini-logo-img" src="app-icon-portfolio-asset-vault.svg" alt="" loading="lazy" decoding="async" width="32" height="32" />
              <span className="card-kicker">App</span>
            </div>
            <h3>Portfolio Asset Vault</h3>
            <span className="app-status-chip">Working App</span>
            <p>Store screenshots, icons, and preview images for faster portfolio updates.</p>
          </a>
          <a className="app-verse-card" href="poll-party.html" data-launch-name="Poll Party" data-launch-tags="poll party social voting concept" aria-label="Open Poll Party">
            <div className="app-verse-head">
              <img className="app-mini-logo-img" src="app-icon-poll-party.svg" alt="" loading="lazy" decoding="async" width="32" height="32" />
              <span className="card-kicker">App</span>
            </div>
            <h3>Poll Party</h3>
            <span className="app-status-chip">Working App</span>
            <p>Create fun daily polls for friends, viewers, and community engagement.</p>
          </a>
          <a className="app-verse-card" href="emoji-story-maker.html" data-launch-name="Emoji Story Maker" data-launch-tags="emoji story maker creative concept" aria-label="Open Emoji Story Maker">
            <div className="app-verse-head">
              <img className="app-mini-logo-img" src="app-icon-emoji-story-maker.svg" alt="" loading="lazy" decoding="async" width="32" height="32" />
              <span className="card-kicker">App</span>
            </div>
            <h3>Emoji Story Maker</h3>
            <span className="app-status-chip">Working App</span>
            <p>Generate mini stories from emoji prompts and remix them into creative challenges.</p>
          </a>
          <a className="app-verse-card" href="team-splitter.html" data-launch-name="Team Splitter" data-launch-tags="teams random groups school concept" aria-label="Open Team Splitter">
            <div className="app-verse-head">
              <img className="app-mini-logo-img" src="app-icon-team-splitter.svg" alt="" loading="lazy" decoding="async" width="32" height="32" />
              <span className="card-kicker">App</span>
            </div>
            <h3>Team Splitter</h3>
            <span className="app-status-chip">Working App</span>
            <p>Divide people into fair groups fast for games, class tasks, or challenges.</p>
          </a>
          <a className="app-verse-card" href="exam-countdown.html" data-launch-name="Exam Countdown" data-launch-tags="exam countdown school planner concept" aria-label="Open Exam Countdown">
            <div className="app-verse-head">
              <img className="app-mini-logo-img" src="app-icon-exam-countdown.svg" alt="" loading="lazy" decoding="async" width="32" height="32" />
              <span className="card-kicker">App</span>
            </div>
            <h3>Exam Countdown</h3>
            <span className="app-status-chip">Working App</span>
            <p>Track important exam dates with countdown widgets and revision reminders.</p>
          </a>
          <a className="app-verse-card" href="screenshot-annotator.html" data-launch-name="Screenshot Annotator" data-launch-tags="screenshots annotate design concept" aria-label="Open Screenshot Annotator">
            <div className="app-verse-head">
              <img className="app-mini-logo-img" src="app-icon-screenshot-annotator.svg" alt="" loading="lazy" decoding="async" width="32" height="32" />
              <span className="card-kicker">App</span>
            </div>
            <h3>Screenshot Annotator</h3>
            <span className="app-status-chip">Working App</span>
            <p>Add arrows, notes, and highlight boxes to UI screenshots for feedback.</p>
          </a>
        </div>
        <div className="app-leaderboard-shell">
          <h3>Top Apps (Live Engagement)</h3>
          <p className="meta">These rankings update from real clicks in this browser session history.</p>
          <div id="appLeaderboard" className="app-leaderboard"></div>
          <h3 style="margin-top:14px;">Recent Launches</h3>
          <div id="recentAppTray" className="app-leaderboard"></div>
          <p id="dailyBuilderTip" className="meta"></p>
        </div>
      </div>
    </section>

    <section id="power-lab" className="section-pad">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Power Lab</p>
          <h2>High-impact features that level up your web every day.</h2>
          <p className="lead">Track daily missions, run fast actions, and keep quality high without deleting anything.</p>
        </div>
        <div className="power-lab-grid">
          <article className="power-card">
            <h3>Daily Mission Board</h3>
            <p className="meta">Your checklist is saved in this browser.</p>
            <div className="mission-list">
              <label className="mission-item"><input type="checkbox" data-mission="m1" />Open one app and improve it</label>
              <label className="mission-item"><input type="checkbox" data-mission="m2" />Publish one visual polish update</label>
              <label className="mission-item"><input type="checkbox" data-mission="m3" />Test core pages for bugs</label>
            </div>
            <p id="missionProgress" className="meta"></p>
          </article>
          <article className="power-card">
            <h3>Quick Upgrade Actions</h3>
            <div className="power-actions">
              <button type="button" id="openTopAppBtn">Open Most-Launched App</button>
              <button type="button" id="shuffleAppsBtn">Shuffle Featured Apps</button>
              <button type="button" id="scanImagesBtn">Run Image Quality Scan</button>
            </div>
            <p id="imageScanStatus" className="meta"></p>
          </article>
        </div>
      </div>
    </section>

    <section id="design-dna" className="section-pad">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Design DNA</p>
          <h2>My own style, built by me.</h2>
          <p className="lead">
            I want this portfolio to feel clear, modern, and energetic while still looking like my own work.
          </p>
        </div>
        <div className="dna-grid">
          <article className="dna-card">
            <span className="card-kicker">Clear Layout</span>
            <h3>Fast to scan, easy to understand</h3>
            <p>Clear hierarchy, clean spacing, and immediate information flow so users understand value in seconds.</p>
          </article>
          <article className="dna-card">
            <span className="card-kicker">Smart Features</span>
            <h3>AI features with useful output</h3>
            <p>Practical AI workflows like Idea Lab AI with backend persistence and productive next-step suggestions.</p>
          </article>
          <article className="dna-card">
            <span className="card-kicker">Bold Visuals</span>
            <h3>Bold display and motion atmosphere</h3>
            <p>Layered gradients, cinematic glow, and strong contrast tuned for high-impact screens and modern devices.</p>
          </article>
          <article className="dna-card">
            <span className="card-kicker">Polish</span>
            <h3>Small details that make it complete</h3>
            <p>Controlled transitions, refined interaction states, and consistent component craft across the full experience.</p>
          </article>
        </div>
        <p className="dna-credit">Creative direction and execution: Krishiv PB</p>
      </div>
    </section>

    <section id="skills" className="section-pad">
      <div className="container skills-layout">
        <div className="section-heading compact">
          <p className="eyebrow">Skills</p>
          <h2>Core skills getting sharper through constant building.</h2>
          <p className="lead">I practice through projects, experiments, redesigns, and creator work that keeps my learning active.</p>
        </div>

        <div className="skills-grid">
          <article className="skill-card">
            <div className="skill-head">
              <span>HTML</span>
              <span>92%</span>
            </div>
            <div className="meter"><span style="width: 92%"></span></div>
            <p>Strong structure, semantic layout, and organized page sections.</p>
          </article>
          <article className="skill-card">
            <div className="skill-head">
              <span>CSS</span>
              <span>88%</span>
            </div>
            <div className="meter"><span style="width: 88%"></span></div>
            <p>Visual styling, spacing, gradients, hover effects, and responsive design.</p>
          </article>
          <article className="skill-card">
            <div className="skill-head">
              <span>JavaScript</span>
              <span>79%</span>
            </div>
            <div className="meter"><span style="width: 79%"></span></div>
            <p>Interactivity, filtering, counters, and growing confidence with logic.</p>
          </article>
          <article className="skill-card">
            <div className="skill-head">
              <span>Creative Direction</span>
              <span>86%</span>
            </div>
            <div className="meter"><span style="width: 86%"></span></div>
            <p>Combining design, content, and energy so projects feel more exciting.</p>
          </article>
        </div>
      </div>
    </section>

    <section id="skill-map" className="section-pad">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Skill Levels</p>
          <h2>What feels strong now, what is growing fast, and what I want to learn next.</h2>
          <p className="lead">This makes my skill journey easier to read than a long list of tools.</p>
        </div>
        <div className="skill-level-grid">
          <article className="skill-level-card">
            <span className="card-kicker">Strong Now</span>
            <h3>Design and frontend structure</h3>
            <ul className="project-points">
              <li>HTML page structure and section planning</li>
              <li>CSS styling, gradients, spacing, and stronger page presentation</li>
              <li>Turning ideas into clear layouts that feel alive</li>
            </ul>
          </article>
          <article className="skill-level-card">
            <span className="card-kicker">Growing Fast</span>
            <h3>JavaScript logic and app flow</h3>
            <ul className="project-points">
              <li>Local storage, filters, counters, and interactive states</li>
              <li>Building student tools, planners, quizzes, and utility apps</li>
              <li>Connecting UI to practical actions and user feedback</li>
            </ul>
          </article>
          <article className="skill-level-card">
            <span className="card-kicker">Learning Next</span>
            <h3>Backend systems and full-stack depth</h3>
            <ul className="project-points">
              <li>APIs, shared storage, and stronger data handling</li>
              <li>More advanced product thinking beyond static pages</li>
              <li>Turning polished frontend projects into complete platforms</li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <section id="process" className="section-pad">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">How I Build</p>
          <h2>My process turns ideas into cleaner and more impressive projects.</h2>
          <p className="lead">
            I try to improve every project not only by adding features, but also by making it easier to use, better to look at, and stronger to present.
          </p>
        </div>

        <div className="process-grid">
          <article className="process-card">
            <span className="process-number">01</span>
            <h3>Start with the idea</h3>
            <p>I think about the problem first so the project has a clear purpose instead of random sections.</p>
          </article>
          <article className="process-card">
            <span className="process-number">02</span>
            <h3>Shape the layout</h3>
            <p>I organize the page structure so the experience feels clean, smooth, and easy to understand.</p>
          </article>
          <article className="process-card">
            <span className="process-number">03</span>
            <h3>Add design energy</h3>
            <p>I use color, spacing, cards, and motion to make the project feel alive and more memorable.</p>
          </article>
          <article className="process-card">
            <span className="process-number">04</span>
            <h3>Keep improving</h3>
            <p>I review the result, upgrade weak parts, and turn each version into something stronger than the last one.</p>
          </article>
        </div>
      </div>
    </section>

    <section id="creator" className="section-pad">
      <div className="container creator-grid">
        <article className="creator-panel">
          <p className="eyebrow">Creator Side</p>
          <h2>I build my brand while I build my code.</h2>
          <p className="lead">
            My YouTube journey helps me practice confidence, editing, presentation, and community building. I create around Roblox, Valorant, Free Fire, Clash Royale, and tech content, and that creator mindset also improves how I design and showcase my projects.
          </p>
          <div className="creator-highlights">
            <div className="creator-item">
              <strong>Gaming content</strong>
              <span>High-energy videos around Roblox, Valorant, Free Fire, and Clash Royale</span>
            </div>
            <div className="creator-item">
              <strong>Tech content</strong>
              <span>Sharing coding progress and digital creativity</span>
            </div>
            <div className="creator-item">
              <strong>Consistency</strong>
              <span>Systems that help me keep creating and improving</span>
            </div>
          </div>
        </article>

        <article className="creator-card">
          <span className="card-kicker">Channel identity</span>
          <h3>@KryloBlox60</h3>
          <p>Roblox, Valorant, Free Fire, Clash Royale, tech energy, and student ambition in one creator brand.</p>
          <div className="hero-actions creator-actions">
            <a className="btn primary creator-btn" href="https://www.youtube.com/@KryloBlox60" target="_blank" rel="noopener noreferrer">Open Channel</a>
            <a className="btn secondary creator-btn" href="games.html">Open Games Page</a>
          </div>
        </article>
      </div>
    </section>

    <section id="spotify" className="section-pad">
      <div className="container creator-grid">
        <article className="creator-panel">
          <p className="eyebrow">Music Zone</p>
          <h2>My Spotify playlist for coding and gaming sessions.</h2>
          <p className="lead">
            This playlist keeps my focus high when I am building websites, practicing JavaScript, editing videos, or gaming with friends.
          </p>
          <div className="creator-highlights">
            <div className="creator-item">
              <strong>Build mode</strong>
              <span>Tracks that help me stay consistent while coding and designing.</span>
            </div>
            <div className="creator-item">
              <strong>Creator vibe</strong>
              <span>Energy for recording, editing, and planning YouTube content.</span>
            </div>
            <div className="creator-item">
              <strong>Gaming sessions</strong>
              <span>Background music for Roblox, Valorant, Free Fire, and Clash Royale.</span>
            </div>
            <div className="creator-item">
              <strong>Spotify profile</strong>
              <span>Follow my full Spotify profile for everything I listen to beyond this playlist.</span>
            </div>
          </div>
        </article>

        <article className="creator-card spotify-card">
          <span className="card-kicker">Spotify Playlist</span>
          <h3>Krylo Blox Picks</h3>
          <p>Open my playlist and listen to the tracks that power my work and creator flow.</p>
          <iframe
            className="spotify-embed"
            src="https://open.spotify.com/embed/playlist/1j5V3fLPnYmwMBYSvGYgXe?utm_source=generator"
            title="Krylo Blox Spotify playlist"
            loading="lazy"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          ></iframe>
          <div className="hero-actions creator-actions">
            <a className="btn primary creator-btn" href="https://open.spotify.com/playlist/1j5V3fLPnYmwMBYSvGYgXe?si=SiJvDFMSRdSId8KexhF_zA" target="_blank" rel="noopener noreferrer">Open Playlist</a>
            <a className="btn secondary creator-btn" href="https://open.spotify.com/user/31it63nvqnzgzothby5zrfck76bu?si=4fe56b39bc144b32" target="_blank" rel="noopener noreferrer">Open Spotify Profile</a>
          </div>
        </article>
      </div>
    </section>

    <section id="codebase" className="section-pad">
      <div className="container codebase-grid">
        <article className="codebase-panel">
          <div className="section-heading compact">
            <p className="eyebrow">Code Signals</p>
            <h2>My GitHub and live builds show the coding side behind the visuals.</h2>
            <p className="lead">This section gives visitors a faster way to understand that the portfolio is built on real code, experiments, and shipping habits.</p>
          </div>
          <div className="codebase-points">
            <div className="codebase-point">
              <strong>GitHub profile</strong>
              <p>Use my profile to track experiments, code direction, and the technical side of my builder journey.</p>
            </div>
            <div className="codebase-point">
              <strong>Live product examples</strong>
              <p>Projects like Review App, Idea Lab AI, and Aether show that I am building interfaces, logic, and connected workflows.</p>
            </div>
            <div className="codebase-point">
              <strong>Work style</strong>
              <p>I learn by building, revising, and upgrading. Every release makes the next project easier to plan and stronger to present.</p>
            </div>
          </div>
          <div className="hero-actions">
            <a className="btn primary" href="https://github.com/Krylo-60" target="_blank" rel="noopener noreferrer">Open GitHub</a>
            <a className="btn secondary" href="projects.html">Browse Project Pages</a>
          </div>
        </article>
        <article className="codebase-card">
          <span className="card-kicker">Focus Areas</span>
          <div className="codebase-focus-list">
            <div>
              <strong>UI Craft</strong>
              <p>Visual polish, responsive layout, and stronger page storytelling.</p>
            </div>
            <div>
              <strong>JavaScript</strong>
              <p>Search, filters, counters, timers, storage, and interactive flows.</p>
            </div>
            <div>
              <strong>Connected Apps</strong>
              <p>Review data, AI ideas, backend health checks, and creator dashboards.</p>
            </div>
            <div>
              <strong>Shipping Mindset</strong>
              <p>Build, test, improve, and keep the portfolio moving every release.</p>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section id="future" className="section-pad">
      <div className="container future-grid">
        <article className="future-panel">
          <p className="eyebrow">What Comes Next</p>
          <h2>I am aiming for bigger projects, smarter apps, and stronger results.</h2>
          <p className="lead">
            My next steps are about building more advanced experiences and showing even more proof of growth through real work.
          </p>
          <div className="future-list">
            <div className="future-item">
              <strong>More interactive apps</strong>
              <span>Projects with stronger JavaScript logic and smoother user actions.</span>
            </div>
            <div className="future-item">
              <strong>Better AI experiments</strong>
              <span>Student-friendly tools and assistant ideas with useful features.</span>
            </div>
            <div className="future-item">
              <strong>Creator expansion</strong>
              <span>More polished YouTube content connected with portfolio growth.</span>
            </div>
          </div>
        </article>

        <article className="future-card">
          <span className="card-kicker">Animation goals</span>
          <h3>From student creator to standout full-stack developer</h3>
          <p>I want this portfolio to keep evolving as I improve, so every new version shows a higher level of skill, style, and confidence.</p>
        </article>
      </div>
    </section>

    <section id="now-building" className="section-pad">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Now Building</p>
          <h2>The next wave of upgrades is already in motion.</h2>
          <p className="lead">This section shows what I am focusing on right now so the site feels active, not frozen.</p>
        </div>
        <div className="now-building-grid">
          <article className="now-building-card">
            <span className="card-kicker">Portfolio</span>
            <h3>Sharper case studies and better proof</h3>
            <p>I am making the homepage show stronger evidence of skill, progress, and product thinking instead of only listing pages.</p>
          </article>
          <article className="now-building-card">
            <span className="card-kicker">Apps</span>
            <h3>More useful student and creator tools</h3>
            <p>I want the app galaxy to keep growing with tools that solve real problems for school, ideas, and content planning.</p>
          </article>
          <article className="now-building-card">
            <span className="card-kicker">Full Stack</span>
            <h3>More backend-powered experiences</h3>
            <p>I am pushing toward stronger shared data, smarter AI flows, and systems that feel like real products, not only demos.</p>
          </article>
        </div>
      </div>
    </section>

    <section id="strategy" className="section-pad strategy-shell">
      <div className="container strategy-grid">
        <article className="future-panel">
          <p className="eyebrow">Krishiv Build Strategy</p>
          <h2>I focus on consistency, depth, and visible progress.</h2>
          <p className="lead">
            My ideas improve when I keep shipping, learn from feedback, and make each update more useful than the last one.
          </p>
          <div className="strategy-list">
            <div className="future-item">
              <strong>Ship Weekly</strong>
              <span>Release one visible upgrade every 7 days so momentum stays strong.</span>
            </div>
            <div className="future-item">
              <strong>Build Real Value</strong>
              <span>Keep improving backend logic, data workflows, and app quality where it matters.</span>
            </div>
            <div className="future-item">
              <strong>Show Progress</strong>
              <span>Track updates with changelogs and visible releases so growth is easy to see.</span>
            </div>
            <div className="future-item">
              <strong>Keep My Style</strong>
              <span>Use my own voice, visuals, and creator story so the site always feels personal.</span>
            </div>
          </div>
        </article>

        <article className="future-card strategy-card">
          <span className="card-kicker">7-Day Build Plan</span>
          <h3>Weekly roadmap to improve every version</h3>
          <div className="timeline-list strategy-roadmap">
            <div className="timeline-item">
              <span className="timeline-dot"></span>
              <div>
                <h4>Day 1: Benchmark</h4>
                <p>List your current strengths and one upgrade target with clear success criteria.</p>
              </div>
            </div>
            <div className="timeline-item">
              <span className="timeline-dot"></span>
              <div>
                <h4>Day 2-3: Build</h4>
                <p>Implement one meaningful feature that improves user experience or app quality.</p>
              </div>
            </div>
            <div className="timeline-item">
              <span className="timeline-dot"></span>
              <div>
                <h4>Day 4: Polish</h4>
                <p>Improve design, speed, and reliability so your version feels clearly superior.</p>
              </div>
            </div>
            <div className="timeline-item">
              <span className="timeline-dot"></span>
              <div>
                <h4>Day 5: Publish</h4>
                <p>Ship to production and post your update with screenshots and release notes.</p>
              </div>
            </div>
            <div className="timeline-item">
              <span className="timeline-dot"></span>
              <div>
                <h4>Day 6-7: Review</h4>
                <p>Collect feedback, fix weak points, and define next week’s lead feature.</p>
              </div>
            </div>
          </div>
          <div className="hero-actions">
            <a className="btn primary" href="#projects">Apply It to My Projects</a>
            <a className="btn secondary" href="#contact">Work With Me</a>
          </div>
        </article>
      </div>
    </section>

    <section id="devlog" className="section-pad">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Mini Devlog</p>
          <h2>Short posts that explain what I am learning while I build.</h2>
          <p className="lead">A small devlog makes the portfolio feel more alive and helps visitors understand the thinking behind the projects.</p>
        </div>
        <div className="devlog-grid">
          <article className="devlog-card">
            <span className="card-kicker">Post 01</span>
            <h3>What Review App taught me about real user flows</h3>
            <p>I learned that collecting feedback is not only about forms. It is about storing data well, showing summaries clearly, and making the whole experience feel trusted.</p>
          </article>
          <article className="devlog-card">
            <span className="card-kicker">Post 02</span>
            <h3>Why stronger presentation changed this portfolio</h3>
            <p>Better visuals, better structure, and better storytelling made the same projects feel more serious and more memorable.</p>
          </article>
          <article className="devlog-card">
            <span className="card-kicker">Post 03</span>
            <h3>Where I want my JavaScript skills to go next</h3>
            <p>I want to keep moving from simple interactions into stronger app state, data systems, and full-stack projects that feel complete.</p>
          </article>
        </div>
      </div>
    </section>

    <section id="changelog" className="section-pad proof-shell">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Version History</p>
          <h2>Stuff I changed while making this site better.</h2>
          <p className="lead">
            This is here so people can see I actually keep updating things instead of leaving the site frozen forever.
          </p>
          <div className="hero-actions">
            <a className="btn secondary" href="release-notes.html">Open Full Release Notes</a>
            <a className="btn secondary" href="all-links.html">Open All Links Directory</a>
          </div>
        </div>

        <div className="changelog-grid">
          <article className="proof-card">
            <span className="card-kicker">v5.0.0 · April 2026</span>
            <h3>Kid-Made Masterpiece Major Update</h3>
            <p>Rebuilt the portfolio voice, added a giant major-update layer, and made the whole site feel more personal, playful, and unforgettable.</p>
          </article>
          <article className="proof-card">
            <span className="card-kicker">v4.4.0 · April 2026</span>
            <h3>Aether Core v110 Fusion Launch</h3>
            <p>Launched the strongest Aether public build yet with richer tools, multiple modes, and better integration across the site.</p>
          </article>
          <article className="proof-card">
            <span className="card-kicker">v4.3.0 · April 2026</span>
            <h3>AI Prompt History Recall</h3>
            <p>Added keyboard recall for previous prompts on the core AI pages so repeated commands are much faster to reuse.</p>
          </article>
          <article className="proof-card">
            <span className="card-kicker">v4.2.0 · April 2026</span>
            <h3>Concept Apps Promoted to Working Apps</h3>
            <p>Promoted former concept cards into the working app lineup so the gallery now shows them as usable apps.</p>
          </article>
        </div>
      </div>
    </section>

    <section id="wins" className="section-pad proof-shell">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Wins & Impact</p>
          <h2>Things I think I am getting better at.</h2>
          <p className="lead">
            I am still learning, but these are the parts I feel proud of right now.
          </p>
        </div>

        <div className="wins-grid">
          <article className="proof-card">
            <span className="card-kicker">Execution</span>
            <h3>Weekly shipping mindset</h3>
            <p>I treat progress like a system and push upgrades regularly, not randomly.</p>
          </article>
          <article className="proof-card">
            <span className="card-kicker">Architecture</span>
            <h3>Backend-powered features</h3>
            <p>Critical logic runs on secure APIs and storage, so clones cannot copy full capability easily.</p>
          </article>
          <article className="proof-card">
            <span className="card-kicker">Brand</span>
            <h3>Distinct creator identity</h3>
            <p>I combine coding, visuals, and creator energy so the product feels like my signature.</p>
          </article>
          <article className="proof-card">
            <span className="card-kicker">Resilience</span>
            <h3>Rapid fix-and-upgrade loop</h3>
            <p>When issues appear, I patch fast and improve the full system instead of doing temporary fixes.</p>
          </article>
          <article className="proof-card">
            <span className="card-kicker">Communication</span>
            <h3>Public proof of originality</h3>
            <p>Version history and visible updates make ownership and progress transparent.</p>
          </article>
          <article className="proof-card">
            <span className="card-kicker">Growth</span>
            <h3>Animation-ready roadmap</h3>
            <p>I build each release as a step toward larger full-stack products and stronger leadership.</p>
          </article>
        </div>
      </div>
    </section>

    <section id="feedback-loop" className="section-pad">
      <div className="container feedback-loop-grid">
        <article className="feedback-panel">
          <div className="section-heading compact">
            <p className="eyebrow">Feedback Loop</p>
            <h2>Real feedback can make this portfolio stronger with every update.</h2>
            <p className="lead">This area is connected to my review system. If reviews exist, they show here. If not, visitors can be the first to share what stands out.</p>
          </div>
          <div className="feedback-actions">
            <a className="btn primary" href="review-app.html">Leave A Review</a>
            <a className="btn secondary" href="#contact">Send Direct Feedback</a>
          </div>
          <p className="command-status" id="feedbackSummary" role="status" aria-live="polite">Loading review preview...</p>
        </article>
        <div className="feedback-preview-grid" id="feedbackPreviewGrid">
          <article className="feedback-card">
            <span className="card-kicker">Review Preview</span>
            <h3>Waiting for the first public review</h3>
            <p>When feedback is added through the Review App, this section can highlight what people enjoy most about the portfolio.</p>
          </article>
        </div>
      </div>
    </section>

    <section id="faq" className="section-pad">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Quick FAQ</p>
          <h2>Fast answers about my work, systems, and direction.</h2>
          <p className="lead">This section helps visitors quickly understand how I build, improve, and keep learning.</p>
        </div>

        <div className="faq-grid">
          <article className="process-card">
            <h3>How do you keep improving your projects?</h3>
            <p>I ship regular updates, test what works, and keep improving both design and logic.</p>
          </article>
          <article className="process-card">
            <h3>What makes this portfolio different?</h3>
            <p>It combines design polish, creator storytelling, and secure app features in one ecosystem.</p>
          </article>
          <article className="process-card">
            <h3>Can people use your review system publicly?</h3>
            <p>Yes. Anyone can post reviews, and moderation stays controlled with creator permissions.</p>
          </article>
          <article className="process-card">
            <h3>What is your next major goal?</h3>
            <p>Launch stronger full-stack products with production-grade UX, AI systems, and performance quality.</p>
          </article>
        </div>
      </div>
    </section>

    <section id="contact" className="section-pad contact-shell">
      <div className="container contact-grid">
        <div className="section-heading compact">
          <p className="eyebrow">Contact</p>
          <h2>Want to connect, collaborate, or follow my work?</h2>
          <p className="lead">You can reach me through my creator pages and email for opportunities, feedback, or project discussions.</p>
        </div>
        <div className="contact-stack">
          <div className="contact-list">
            <a className="contact-item" href="https://discord.gg/QZ3KfPsH4Y" target="_blank" rel="noopener noreferrer">
              <img className="contact-icon" src="https://img.icons8.com/color/96/discord-logo.png" alt="Discord icon" loading="lazy" decoding="async" width="96" height="96" />
              <span className="contact-text">
                <span className="contact-label">Discord Server</span>
                <span className="contact-value">Join the community</span>
              </span>
            </a>
            <a className="contact-item" href="https://www.youtube.com/@KryloBlox60" target="_blank" rel="noopener noreferrer">
              <img className="contact-icon" src="https://img.icons8.com/color/96/youtube-play.png" alt="YouTube icon" loading="lazy" decoding="async" width="96" height="96" />
              <span className="contact-text">
                <span className="contact-label">YouTube</span>
                <span className="contact-value">@KryloBlox60</span>
              </span>
            </a>
            <a className="contact-item" href="https://github.com/Krylo-60" target="_blank" rel="noopener noreferrer">
              <img className="contact-icon" src="https://img.icons8.com/color/96/github--v1.png" alt="GitHub icon" loading="lazy" decoding="async" width="96" height="96" />
              <span className="contact-text">
                <span className="contact-label">GitHub</span>
                <span className="contact-value">github.com/Krylo-60</span>
              </span>
            </a>
            <a className="contact-item" href="mailto:krylobloxyt@gmail.com">
              <img className="contact-icon" src="https://img.icons8.com/color/96/gmail-new.png" alt="Gmail icon" loading="lazy" decoding="async" width="96" height="96" />
              <span className="contact-text">
                <span className="contact-label">Email</span>
                <span className="contact-value">krylobloxyt@gmail.com</span>
              </span>
            </a>
          </div>
          <div className="contact-quick-actions">
            <p className="meta">Best for collabs, feedback, app ideas, and creator updates.</p>
            <button className="btn secondary" type="button" id="copyEmailBtn">Copy Email Address</button>
            <p id="copyEmailStatus" className="command-status" role="status" aria-live="polite"></p>
          </div>
        </div>
      </div>
    </section>

    <section id="future-lab" className="section-pad">
      <div className="container">
        <article className="future-portal reveal-item" data-searchable="true" data-search-text="future lab quantum interface live pulse telemetry command matrix quality score">
          <div className="future-shell">
            <div className="future-head">
              <div>
                <p className="eyebrow">Animation Lab</p>
                <h2>A live interface layer from tomorrow, built by Krishiv PB.</h2>
              </div>
              <div className="future-badge">Animation Engine Active</div>
              <div id="futureClock" className="future-clock">syncing time...</div>
            </div>
            <div className="future-grid">
              <article className="future-panel">
                <h3>Neural Control Grid</h3>
                <p className="lead">This panel tracks ecosystem energy in real time using app launches, live backend state, and interaction pulse.</p>
                <div className="future-list">
                  <div className="future-item">
                    <strong>Launch Energy</strong>
                    <span id="futureLaunches">0 events</span>
                  </div>
                  <div className="future-item">
                    <strong>Quality Signal</strong>
                    <span id="futureQuality">0/100</span>
                  </div>
                  <div className="future-item">
                    <strong>Core Pulse</strong>
                    <span id="futurePulse" className="future-pulse">stable</span>
                  </div>
                </div>
              </article>
              <article className="future-panel">
                <h3>Portal Dock</h3>
                <p>Quick jump to high-impact modules from one futuristic launcher strip.</p>
                <div className="future-dock">
                  <a href="study-planner.html">Study Core</a>
                  <a href="idea-lab-ai.html">AI Core</a>
                  <a href="review-app.html">Review Core</a>
                  <a href="games.html">Games Core</a>
                  <a href="krylo-blox-master-nexus.html">Master Nexus</a>
                  <a href="aether-core-v110.html">Aether v110</a>
                  <a href="aether-core-v104.html">Aether v104</a>
                </div>
              </article>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section className="section-pad final-cta-shell">
      <div className="container">
        <article className="final-cta">
          <p className="eyebrow">Final Message</p>
          <h2>This is only the beginning of what I can build.</h2>
          <p className="lead">
            I am learning early, building consistently, and pushing my portfolio to look stronger with every upgrade. If you want to follow my journey, projects, and creator growth, this website is just the start.
          </p>
          <div className="hero-actions">
            <a className="btn primary" href="#contact">Connect With Me</a>
            <a className="btn secondary" href="#projects">Explore Projects</a>
          </div>
        </article>
      </div>
    </section>
  </main>

  <footer className="site-footer">
    <div className="container footer-row">
      <p>&copy; 2026 Krishiv PB. I made this website and I am still upgrading it.</p>
      <a href="#top">Back to top</a>
    </div>
    <div className="container">
      <p className="secret-aura" title="Hidden stat log">Aura: Maximum | Haki: Conqueror's</p>
    </div>
  </footer>
  <button className="quick-top-btn" type="button" id="quickTopBtn" aria-label="Scroll back to top">Top</button>
  <button className="games-hub-btn" type="button" id="gamesHubBtn" aria-label="Open games hub">Games</button>
  <button className="launcher-btn" type="button" id="launcherBtn" aria-label="Open quick launcher">Launch</button>
  <div className="command-palette" id="commandPalette" aria-hidden="true">
    <div className="command-palette-panel" role="dialog" aria-modal="true" aria-label="Quick launcher">
      <div className="command-palette-head">
        <strong>Quick Launcher</strong>
        <button type="button" id="paletteCloseBtn" className="palette-close">Close</button>
      </div>
      <input id="paletteSearch" type="search" placeholder="Search apps or sections..." />
      <div id="paletteList" className="palette-list"></div>
    </div>
  </div>

  
  
  
  

    </>
  );
}
