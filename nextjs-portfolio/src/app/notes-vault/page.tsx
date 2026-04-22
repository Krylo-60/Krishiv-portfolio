export default function Page() {
  return (
    <div 
      className="legacy-html-wrapper" 
      dangerouslySetInnerHTML={{ __html: "\n  <main class=\"wrap\">\n    <section class=\"card\"><h1>Notes Vault</h1><p class=\"meta\">Created by Krishiv PB</p><a href=\"index.html#projects\">Back to portfolio</a></section>\n    <section class=\"card\">\n      <input id=\"title\" placeholder=\"Note title\" maxlength=\"80\" />\n      <textarea id=\"body\" placeholder=\"Write your note...\"></textarea>\n      <div class=\"row\">\n        <input id=\"tag\" placeholder=\"Tag (example: school, ideas, coding)\" />\n        <button class=\"btn primary\" id=\"saveBtn\">Save Note</button>\n        <button class=\"btn\" id=\"clearDraftBtn\">Clear Draft</button>\n      </div>\n      <div class=\"row\" style=\"margin-top:8px;\">\n        <input id=\"search\" placeholder=\"Search notes\" />\n        <button id=\"exportBtn\" class=\"btn\">Export</button>\n      </div>\n    </section>\n    <section class=\"card\"><div id=\"list\"></div></section>\n  </main>\n  \n\n  \n" }} 
      suppressHydrationWarning 
    />
  );
}
