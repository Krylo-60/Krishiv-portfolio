export default function Page() {
  return (
    <div 
      className="legacy-html-wrapper" 
      dangerouslySetInnerHTML={{ __html: "\n  <main class=\"wrap\">\n    <section class=\"card\"><h1>Mind Map Board</h1><p>Capture and organize idea nodes for projects and content.</p><p class=\"credit\">Created by Krishiv PB</p><p><a href=\"index.html#app-verse\">Back to Apps Galaxy</a></p></section>\n    <section class=\"card\">\n      <h2>Add Idea Node</h2>\n      <div class=\"row\"><input id=\"nodeText\" maxlength=\"90\" placeholder=\"Node title (Feature idea)\" /><select id=\"nodeType\"><option>Core Idea</option><option>Feature</option><option>Task</option><option>Risk</option></select><button id=\"addNode\" class=\"btn-primary\" type=\"button\">Add Node</button></div>\n      <p>Details: use different node types to see priorities and structure clearly.</p>\n    </section>\n    <section class=\"card\"><h2>Mind Map Nodes</h2><div id=\"nodes\" class=\"nodes\"></div></section>\n  </main>\n  \n  \n" }} 
      suppressHydrationWarning 
    />
  );
}
