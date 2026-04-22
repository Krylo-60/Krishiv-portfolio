export default function Page() {
  return (
    <div 
      className="legacy-html-wrapper" 
      dangerouslySetInnerHTML={{ __html: "\n  <main class=\"wrap\">\n    <section class=\"card\">\n      <h1>Meal Planner Pro</h1>\n      <p class=\"meta\">Plan weekly meals and auto-build your grocery list.</p>\n      <p class=\"meta\">Created by Krishiv PB</p>\n      <a href=\"index.html#app-verse\">Back to Apps Galaxy</a>\n    </section>\n    <section class=\"card grid\">\n      <article>\n        <h2>Add Meal</h2>\n        <input id=\"dayInput\" placeholder=\"Day (Mon, Tue...)\" style=\"margin-bottom:8px;\" />\n        <input id=\"mealInput\" placeholder=\"Meal name\" style=\"margin-bottom:8px;\" />\n        <textarea id=\"itemsInput\" placeholder=\"Ingredients (comma separated)\"></textarea>\n        <button id=\"addBtn\" class=\"btn-main\" type=\"button\" style=\"margin-top:8px;\">Add Meal</button>\n      </article>\n      <article>\n        <h2>Grocery List</h2>\n        <textarea id=\"groceryOutput\" readonly></textarea>\n        <div class=\"row\" style=\"margin-top:8px;\">\n          <button id=\"copyBtn\" type=\"button\">Copy</button>\n          <button id=\"clearBtn\" type=\"button\">Clear All</button>\n        </div>\n      </article>\n    </section>\n    <section class=\"card\">\n      <h2>Weekly Meals</h2>\n      <div id=\"meals\"></div>\n    </section>\n  </main>\n  \n  \n" }} 
      suppressHydrationWarning 
    />
  );
}
