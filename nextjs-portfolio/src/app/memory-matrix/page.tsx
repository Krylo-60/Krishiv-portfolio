export default function Page() {
  return (
    <div 
      className="legacy-html-wrapper" 
      dangerouslySetInnerHTML={{ __html: "\n  <main class=\"wrap\">\n    <section class=\"card hero\">\n      <div>\n        <p class=\"eyebrow\">Krishiv Game Studio</p>\n        <h1>Memory Matrix</h1>\n        <p>Flip the board, remember the glyphs, and clear every pair in as few moves as possible. It is calm, clean, and a little competitive.</p>\n        <p class=\"meta\">Handmade by Krishiv PB</p>\n      </div>\n      <div class=\"controls\">\n        <button id=\"restartBtn\" type=\"button\">Shuffle Board</button>\n        <a class=\"button-link ghost\" href=\"games.html#games-apps-gateway\">Back to Games Hub</a>\n      </div>\n    </section>\n\n    <section class=\"card\">\n      <div class=\"stats\">\n        <div class=\"chip\">Moves: <strong id=\"moveCount\">0</strong></div>\n        <div class=\"chip\">Matches: <strong id=\"matchCount\">0</strong> / 6</div>\n        <div class=\"chip\">Best: <strong id=\"bestScore\">--</strong></div>\n      </div>\n    </section>\n\n    <section class=\"card\">\n      <div class=\"board\" id=\"board\"></div>\n    </section>\n\n    <section class=\"aside-grid\">\n      <article class=\"card panel-note\">\n        <h2>How to play</h2>\n        <p>Pick two cards. If they match, they stay open. If not, the board closes them after a short beat.</p>\n      </article>\n      <article class=\"card panel-note\">\n        <h2>Studio note</h2>\n        <p>This one is built to feel polished and readable, with a simple layout that still feels like it belongs inside Krishiv Velocity.</p>\n      </article>\n    </section>\n  </main>\n  \n  \n" }} 
      suppressHydrationWarning 
    />
  );
}
