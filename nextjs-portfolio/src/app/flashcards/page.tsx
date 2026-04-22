export default function Page() {
  return (
    <div 
      className="legacy-html-wrapper" 
      dangerouslySetInnerHTML={{ __html: "\n  <main class=\"wrap\">\n    <section class=\"card\"><h1>Flashcards Trainer</h1><p class=\"meta\">Created by Krishiv PB</p><a href=\"index.html#projects\">Back to portfolio</a></section>\n    <section class=\"card\">\n      <div class=\"row\"><input id=\"q\" placeholder=\"Question\" maxlength=\"120\"><input id=\"a\" placeholder=\"Answer\" maxlength=\"120\"></div>\n      <div class=\"row\" style=\"margin-top:8px\"><input id=\"deck\" placeholder=\"Deck name (example: Science)\"><button class=\"btn primary\" id=\"addBtn\">Add Card</button></div>\n      <div class=\"row\" style=\"margin-top:8px\"><select id=\"deckFilter\"></select><button class=\"btn\" id=\"shuffleBtn\">Shuffle</button><button class=\"btn\" id=\"nextBtn\">Next</button><button class=\"btn\" id=\"delBtn\">Delete</button></div>\n    </section>\n    <section class=\"card\"><div id=\"flash\" class=\"flash\">No cards yet. Add one.</div><p id=\"pos\" class=\"meta\"></p><p id=\"stats\" class=\"meta\"></p></section>\n  </main>\n  \n  \n" }} 
      suppressHydrationWarning 
    />
  );
}
