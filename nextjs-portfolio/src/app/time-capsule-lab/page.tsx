export default function Page() {
  return (
    <div 
      className="legacy-html-wrapper" 
      dangerouslySetInnerHTML={{ __html: "\n  <main class=\"wrap\">\n    <section class=\"card\">\n      <h1>Time Capsule Lab</h1>\n      <p class=\"meta\">Write future messages and unlock them on selected dates.</p>\n      <p class=\"meta\">Created by Krishiv PB</p>\n      <a href=\"index.html#app-verse\">Back to Apps Galaxy</a>\n    </section>\n\n    <section class=\"card grid\">\n      <article>\n        <h2>Create Capsule</h2>\n        <input id=\"titleInput\" placeholder=\"Capsule title\" style=\"margin-bottom:8px;\" />\n        <textarea id=\"msgInput\" placeholder=\"Message for your future self...\"></textarea>\n        <input id=\"dateInput\" type=\"date\" style=\"margin:8px 0;\" />\n        <button id=\"saveBtn\" class=\"btn-main\" type=\"button\">Save Capsule</button>\n      </article>\n      <article>\n        <h2>Capsules</h2>\n        <div id=\"capsules\"></div>\n      </article>\n    </section>\n  </main>\n\n  \n  \n" }} 
      suppressHydrationWarning 
    />
  );
}
