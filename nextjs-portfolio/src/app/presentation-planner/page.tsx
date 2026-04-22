export default function Page() {
  return (
    <div 
      className="legacy-html-wrapper" 
      dangerouslySetInnerHTML={{ __html: "\n  <main class=\"wrap\">\n    <section class=\"card\"><h1>Presentation Planner</h1><p>Plan slides, key points, and flow before presenting.</p><p class=\"credit\">Created by Krishiv PB</p><p><a href=\"index.html#app-verse\">Back to Apps Galaxy</a></p></section>\n    <section class=\"card\">\n      <h2>Add Slide Plan</h2>\n      <div class=\"row\"><input id=\"slideTitle\" placeholder=\"Slide title\" maxlength=\"70\" /><button id=\"addSlide\" class=\"btn-primary\" type=\"button\">Add Slide</button></div>\n      <textarea id=\"slideNotes\" maxlength=\"500\" placeholder=\"Main point, visual idea, and what to speak.\"></textarea>\n      <p>Details: keep each slide focused on one message for cleaner storytelling.</p>\n    </section>\n    <section class=\"card\"><h2>Slide Sequence</h2><div id=\"slides\"></div></section>\n  </main>\n  \n  \n" }} 
      suppressHydrationWarning 
    />
  );
}
