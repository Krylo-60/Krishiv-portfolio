export default function Page() {
  return (
    <div 
      className="legacy-html-wrapper" 
      dangerouslySetInnerHTML={{ __html: "\n  <main class=\"wrap\">\n    <section class=\"card\"><h1>Random Picker</h1><p class=\"meta\">Created by Krishiv PB</p><a href=\"index.html#projects\">Back to portfolio</a></section>\n    <section class=\"card\">\n      <textarea id=\"items\" placeholder=\"Enter one item per line\"></textarea>\n      <button id=\"pick\" class=\"btn\">Pick Random Item</button>\n      <h2 id=\"out\">Winner: -</h2>\n      <p id=\"count\" class=\"meta\">Items: 0</p>\n    </section>\n  </main>\n  \n\r\n  \r\n" }} 
      suppressHydrationWarning 
    />
  );
}
