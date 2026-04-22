export default function Page() {
  return (
    <div 
      className="legacy-html-wrapper" 
      dangerouslySetInnerHTML={{ __html: "\n  <main class=\"wrap\">\n    <section class=\"card\"><h1>Reading Tracker</h1><p>Track reading progress and finish books with consistency.</p><p class=\"credit\">Created by Krishiv PB</p><p><a href=\"index.html#app-verse\">Back to Apps Galaxy</a></p></section>\n    <section class=\"card\">\n      <h2>Add Book</h2>\n      <div class=\"row\"><input id=\"book\" placeholder=\"Book title\" maxlength=\"80\" /><input id=\"pages\" type=\"number\" min=\"1\" placeholder=\"Total pages\" /><input id=\"read\" type=\"number\" min=\"0\" placeholder=\"Pages read\" /><button id=\"addBook\" class=\"btn-primary\" type=\"button\">Add</button></div>\n      <p>Details: update pages-read over time to keep your reading streak visible.</p>\n    </section>\n    <section class=\"card\"><h2>Reading List</h2><div id=\"books\"></div></section>\n  </main>\n  \n  \n" }} 
      suppressHydrationWarning 
    />
  );
}
