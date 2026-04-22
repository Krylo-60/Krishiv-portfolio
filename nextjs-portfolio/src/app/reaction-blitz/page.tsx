export default function Page() {
  return (
    <div 
      className="legacy-html-wrapper" 
      dangerouslySetInnerHTML={{ __html: "\n  <main class=\"wrap\">\n    <section class=\"card hero\">\n      <div>\n        <p class=\"eyebrow\">Krishiv Game Studio</p>\n        <h1>Reaction Blitz</h1>\n        <p>Wait for the arena to turn green, then hit the orb as fast as you can. The point is clean reflexes, not random spam.</p>\n        <p class=\"meta\">Original mini-game by Krishiv PB</p>\n        <div class=\"controls\">\n          <button id=\"startBtn\" type=\"button\">Start Round</button>\n          <button id=\"resetBtn\" class=\"ghost\" type=\"button\">Reset Session</button>\n          <a href=\"games.html#games-apps-gateway\">Back to Games Hub</a>\n        </div>\n      </div>\n      <div class=\"hero-display\" id=\"arena\">\n        <button class=\"orb\" id=\"orbBtn\" type=\"button\" aria-label=\"Reaction orb\"></button>\n        <div class=\"display-text\" id=\"statusText\">Press start, stay calm, and wait for the green signal.</div>\n      </div>\n    </section>\n\n    <section class=\"card stack\">\n      <div class=\"stats\">\n        <article class=\"stat\"><span class=\"meta\">Best</span><strong id=\"bestTime\">--</strong></article>\n        <article class=\"stat\"><span class=\"meta\">Latest</span><strong id=\"latestTime\">--</strong></article>\n        <article class=\"stat\"><span class=\"meta\">Rounds</span><strong id=\"roundCount\">0</strong></article>\n      </div>\n      <div class=\"timeline\" id=\"historyList\">\n        <div class=\"run\"><span>Session log</span><span>No completed rounds yet.</span></div>\n      </div>\n    </section>\n  </main>\n  \n  \n" }} 
      suppressHydrationWarning 
    />
  );
}
