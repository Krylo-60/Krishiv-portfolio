export default function Page() {
  return (
    <div 
      className="legacy-html-wrapper" 
      dangerouslySetInnerHTML={{ __html: "\n  <main class=\"wrap\">\n    <section class=\"card\">\n      <h1>JavaScript Quiz Zone</h1>\n      <p>Practice logic with instant feedback and score tracking.</p>\n      <p>Created by Krishiv PB</p>\n      <a href=\"index.html#projects\">Back to portfolio</a>\n    </section>\n\n    <section class=\"card\">\n      <div class=\"row\" style=\"justify-content:space-between;align-items:center;\">\n        <h2 id=\"questionTitle\">Question</h2>\n        <strong id=\"scoreText\">Score: 0</strong>\n      </div>\n      <div class=\"meta\" id=\"questionMeta\">Question 1</div>\n      <div class=\"meta\">Time left: <strong id=\"timerText\">20s</strong> | Best score: <strong id=\"bestScoreText\">0</strong></div>\n      <div class=\"progress\"><span id=\"progressBar\"></span></div>\n      <p id=\"questionText\"></p>\n      <div id=\"optionsNode\"></div>\n      <p id=\"feedback\" class=\"meta\"></p>\n      <div class=\"row\">\n        <button id=\"nextBtn\" class=\"btn primary\" disabled>Next</button>\n        <button id=\"restartBtn\" class=\"btn\">Restart Quiz</button>\n      </div>\n    </section>\n  </main>\n\n  \n\r\n  \r\n" }} 
      suppressHydrationWarning 
    />
  );
}
