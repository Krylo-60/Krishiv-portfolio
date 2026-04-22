export default function Page() {
  return (
    <div 
      className="legacy-html-wrapper" 
      dangerouslySetInnerHTML={{ __html: "\n  <main class=\"wrap\">\n    <section class=\"card\"><h1>Task Kanban</h1><p class=\"meta\">Created by Krishiv PB</p><a href=\"index.html#projects\">Back to portfolio</a></section>\n    <section class=\"card\">\n      <div class=\"row\">\n        <input id=\"taskInput\" placeholder=\"New task title\">\n        <select id=\"priority\"><option value=\"High\">High</option><option value=\"Medium\" selected>Medium</option><option value=\"Low\">Low</option></select>\n        <input id=\"dueDate\" type=\"date\">\n        <button id=\"addBtn\" class=\"btn\">Add Task</button>\n      </div>\n      <div class=\"row\" style=\"margin-top:8px;\">\n        <input id=\"search\" placeholder=\"Search tasks...\" />\n        <select id=\"priorityFilter\"><option value=\"all\">All Priorities</option><option>High</option><option>Medium</option><option>Low</option></select>\n      </div>\n      <p id=\"stats\" class=\"meta\"></p>\n    </section>\n    <section class=\"board\">\n      <article class=\"col\"><h2>Todo</h2><div id=\"todo\"></div></article>\n      <article class=\"col\"><h2>Doing</h2><div id=\"doing\"></div></article>\n      <article class=\"col\"><h2>Done</h2><div id=\"done\"></div></article>\n    </section>\n  </main>\n  \n  \n" }} 
      suppressHydrationWarning 
    />
  );
}
