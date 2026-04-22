export default function Page() {
  return (
    <div 
      className="legacy-html-wrapper" 
      dangerouslySetInnerHTML={{ __html: "\n  <main class=\"wrap\">\n    <section class=\"card\"><h1>Daily Journal</h1><p>Track your day, mood, and learning wins.</p><p class=\"credit\">Created by Krishiv PB</p><p><a href=\"index.html#app-verse\">Back to Apps Galaxy</a></p></section>\n    <section class=\"card\">\n      <h2>Write Entry</h2>\n      <div class=\"row\">\n        <input id=\"title\" placeholder=\"Entry title\" maxlength=\"60\" />\n        <select id=\"mood\"><option>Happy</option><option>Focused</option><option>Excited</option><option>Tired</option><option>Neutral</option></select>\n        <button id=\"saveBtn\" class=\"btn btn-primary\" type=\"button\">Save Entry</button>\n      </div>\n      <textarea id=\"content\" maxlength=\"600\" placeholder=\"What happened today? What did you learn?\"></textarea>\n      <p>Details: journal entries are stored in your browser to help build consistency.</p>\n    </section>\n    <section class=\"card\"><h2>Journal Timeline</h2><div id=\"entries\"></div></section>\n  </main>\n  \n  \n" }} 
      suppressHydrationWarning 
    />
  );
}
