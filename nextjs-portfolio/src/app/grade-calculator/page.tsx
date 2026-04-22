export default function Page() {
  return (
    <div 
      className="legacy-html-wrapper" 
      dangerouslySetInnerHTML={{ __html: "\n  <main class=\"wrap\">\n    <section class=\"card\">\n      <h1>Grade Calculator</h1>\n      <p>Calculate weighted percentage and estimate grade bands quickly.</p>\n      <p class=\"credit\">Created by Krishiv PB</p>\n      <p><a href=\"index.html#app-verse\">Back to Apps Galaxy</a></p>\n    </section>\n    <section class=\"card\">\n      <h2>Add Subject Score</h2>\n      <div class=\"grid\">\n        <input id=\"subject\" placeholder=\"Subject (Math)\" maxlength=\"40\" />\n        <input id=\"score\" type=\"number\" min=\"0\" max=\"100\" placeholder=\"Score %\" />\n        <input id=\"weight\" type=\"number\" min=\"1\" max=\"100\" placeholder=\"Weight %\" />\n        <button id=\"addBtn\" class=\"btn-primary\" type=\"button\">Add</button>\n      </div>\n      <table>\n        <thead><tr><th>Subject</th><th>Score</th><th>Weight</th><th>Action</th></tr></thead>\n        <tbody id=\"rows\"></tbody>\n      </table>\n    </section>\n    <section class=\"card\">\n      <h2>Results</h2>\n      <div class=\"meta\">\n        <div class=\"pill\"><strong id=\"weighted\">0.00%</strong><div>Weighted Score</div></div>\n        <div class=\"pill\"><strong id=\"grade\">N/A</strong><div>Estimated Grade</div></div>\n        <div class=\"pill\"><strong id=\"subjects\">0</strong><div>Subjects Added</div></div>\n      </div>\n      <p>Details: use realistic weights that add up to your school pattern for better estimates.</p>\n    </section>\n  </main>\n  \n  \n" }} 
      suppressHydrationWarning 
    />
  );
}
