export default function Page() {
  return (
    <div 
      className="legacy-html-wrapper" 
      dangerouslySetInnerHTML={{ __html: "\n  <main class=\"wrap\">\n    <section class=\"card\">\n      <h1>Resume Studio Lite</h1>\n      <p class=\"meta\">Build a quick resume summary and export as text.</p>\n      <p class=\"meta\">Created by Krishiv PB</p>\n      <a href=\"index.html#app-verse\">Back to Apps Galaxy</a>\n    </section>\n    <section class=\"card grid\">\n      <article>\n        <h2>Input</h2>\n        <input id=\"nameInput\" placeholder=\"Your name\" style=\"margin-bottom:8px;\" />\n        <input id=\"titleInput\" placeholder=\"Role (Student Developer, Creator...)\" style=\"margin-bottom:8px;\" />\n        <textarea id=\"skillsInput\" placeholder=\"Skills (comma separated)\"></textarea>\n        <textarea id=\"projectsInput\" placeholder=\"Projects highlights\"></textarea>\n        <textarea id=\"contactInput\" placeholder=\"Contact links / email\"></textarea>\n        <button id=\"generateBtn\" class=\"btn-main\" type=\"button\">Generate Resume</button>\n      </article>\n      <article>\n        <h2>Preview</h2>\n        <div id=\"preview\" class=\"card\" style=\"margin:0; min-height:220px;\"></div>\n        <div style=\"display:flex; gap:8px; margin-top:8px;\">\n          <button id=\"copyBtn\" type=\"button\">Copy</button>\n          <button id=\"downloadBtn\" type=\"button\">Download TXT</button>\n        </div>\n      </article>\n    </section>\n  </main>\n  \n  \n" }} 
      suppressHydrationWarning 
    />
  );
}
