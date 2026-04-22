export default function Page() {
  return (
    <div 
      className="legacy-html-wrapper" 
      dangerouslySetInnerHTML={{ __html: "\n  <main class=\"wrap\">\n    <section class=\"card\"><h1>Code Snippets Vault</h1><p>Save reusable code snippets with language labels.</p><p class=\"credit\">Created by Krishiv PB</p><p><a href=\"index.html#app-verse\">Back to Apps Galaxy</a></p></section>\n    <section class=\"card\">\n      <h2>Add Snippet</h2>\n      <div class=\"row\"><input id=\"name\" maxlength=\"60\" placeholder=\"Snippet name\" /><select id=\"lang\"><option>JavaScript</option><option>HTML</option><option>CSS</option><option>Python</option></select><button id=\"saveSnip\" class=\"btn-primary\" type=\"button\">Save</button></div>\n      <textarea id=\"code\" maxlength=\"3000\" placeholder=\"Paste code snippet here...\"></textarea>\n      <p>Details: snippets are local to your browser for fast personal reference.</p>\n    </section>\n    <section class=\"card\"><h2>Vault</h2><div id=\"vault\"></div></section>\n  </main>\n  \n  \n" }} 
      suppressHydrationWarning 
    />
  );
}
