export default function Page() {
  return (
    <div 
      className="legacy-html-wrapper" 
      dangerouslySetInnerHTML={{ __html: "\n  <main class=\"wrap\">\n    <section class=\"card\">\n      <h1>VoteStorm Arena</h1>\n      <p class=\"meta\">Create fast polls, vote instantly, and watch live percentage bars.</p>\n      <p class=\"meta\">Created by Krishiv PB</p>\n      <a href=\"index.html#app-verse\">Back to Apps Galaxy</a>\n    </section>\n\n    <section class=\"card\">\n      <h2>Create Poll</h2>\n      <input id=\"qInput\" placeholder=\"Poll question...\" style=\"width:100%; margin-bottom:8px;\" />\n      <textarea id=\"oInput\" placeholder=\"Options (one per line)&#10;Option A&#10;Option B&#10;Option C\"></textarea>\n      <div class=\"row\" style=\"margin-top:8px;\">\n        <button id=\"createBtn\" class=\"btn-main\" type=\"button\">Create Poll</button>\n        <button id=\"clearBtn\" type=\"button\">Clear All</button>\n      </div>\n    </section>\n\n    <section class=\"card\">\n      <h2>Active Polls</h2>\n      <div id=\"polls\"></div>\n    </section>\n  </main>\n\n  \n  \n" }} 
      suppressHydrationWarning 
    />
  );
}
