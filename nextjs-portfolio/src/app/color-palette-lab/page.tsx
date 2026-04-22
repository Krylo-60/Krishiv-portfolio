export default function Page() {
  return (
    <div 
      className="legacy-html-wrapper" 
      dangerouslySetInnerHTML={{ __html: "\n  <main class=\"wrap\">\n    <section class=\"card\">\n      <h1>Color Palette Lab</h1>\n      <p class=\"meta\">Generate beautiful palettes and copy HEX codes instantly.</p>\n      <p class=\"meta\">Created by Krishiv PB</p>\n      <a href=\"index.html#app-verse\">Back to Apps Galaxy</a>\n    </section>\n    <section class=\"card\" style=\"display:flex; gap:8px; flex-wrap:wrap;\">\n      <button id=\"generateBtn\" class=\"btn-main\" type=\"button\">Generate Palette</button>\n      <button id=\"copyAllBtn\" type=\"button\">Copy All</button>\n      <input id=\"seedInput\" placeholder=\"Seed keyword (optional)\" style=\"min-width:240px; flex:1;\" />\n    </section>\n    <section class=\"card\">\n      <h2>Palette</h2>\n      <div id=\"palette\" class=\"palette\"></div>\n    </section>\n  </main>\n  \n  \n" }} 
      suppressHydrationWarning 
    />
  );
}
