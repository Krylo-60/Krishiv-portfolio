export default function Page() {
  return (
    <div 
      className="legacy-html-wrapper" 
      dangerouslySetInnerHTML={{ __html: "\n  <main class=\"wrap\">\n    <section class=\"card\"><h1>Typing Speed Test</h1><p class=\"meta\">Created by Krishiv PB</p><a href=\"index.html#projects\">Back to portfolio</a></section>\n    <section class=\"card\">\n      <div class=\"row\">\n        <select id=\"duration\"><option value=\"30\">30s</option><option value=\"60\" selected>60s</option><option value=\"120\">120s</option></select>\n        <button id=\"newText\" class=\"btn\">New Text</button>\n        <button id=\"reset\" class=\"btn\">Reset</button>\n      </div>\n      <p id=\"target\">JavaScript helps me build interactive websites faster every week.</p>\n      <textarea id=\"input\" placeholder=\"Start typing the line above...\"></textarea>\n      <p id=\"result\" class=\"meta\">Type to start the timer.</p>\n      <p id=\"best\" class=\"meta\"></p>\n    </section>\n  </main>\n  \n  \n" }} 
      suppressHydrationWarning 
    />
  );
}
