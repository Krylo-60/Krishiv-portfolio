export default function Page() {
  return (
    <div 
      className="legacy-html-wrapper" 
      dangerouslySetInnerHTML={{ __html: "\n  <main class=\"wrap\">\n    <section class=\"card\"><h1>Goal Planner</h1><p>Set weekly and monthly goals with clear status tracking.</p><p class=\"credit\">Created by Krishiv PB</p><p><a href=\"index.html#app-verse\">Back to Apps Galaxy</a></p></section>\n    <section class=\"card\">\n      <h2>Add Goal</h2>\n      <div class=\"row\"><input id=\"goalText\" maxlength=\"100\" placeholder=\"Goal (Upload 2 videos this week)\" /><select id=\"goalType\"><option>Weekly</option><option>Monthly</option><option>Project</option></select><button id=\"addGoal\" class=\"btn-primary\" type=\"button\">Add Goal</button></div>\n      <p>Details: break big ambitions into trackable goals to build momentum.</p>\n    </section>\n    <section class=\"card\"><h2>Goals Board</h2><div id=\"goalList\"></div></section>\n  </main>\n  \n  \n" }} 
      suppressHydrationWarning 
    />
  );
}
