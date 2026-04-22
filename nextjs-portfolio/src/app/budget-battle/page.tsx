export default function Page() {
  return (
    <div 
      className="legacy-html-wrapper" 
      dangerouslySetInnerHTML={{ __html: "\n  <main class=\"wrap\">\n    <section class=\"card\">\n      <h1>Budget Battle Sim</h1>\n      <p class=\"meta\">Simulate money decisions and train better budgeting habits.</p>\n      <p class=\"meta\">Created by Krishiv PB</p>\n      <a href=\"index.html#app-verse\">Back to Apps Galaxy</a>\n    </section>\n    <section class=\"card grid\">\n      <article>\n        <h2>Add Transaction</h2>\n        <input id=\"labelInput\" placeholder=\"Label (Groceries, Gaming, Salary...)\" style=\"margin-bottom:8px;\" />\n        <select id=\"typeSelect\" style=\"margin-bottom:8px;\">\n          <option value=\"income\">Income (+)</option>\n          <option value=\"expense\">Expense (-)</option>\n        </select>\n        <input id=\"amountInput\" type=\"number\" min=\"1\" step=\"1\" placeholder=\"Amount\" />\n        <button id=\"addBtn\" class=\"btn-main\" type=\"button\" style=\"margin-top:8px;\">Add</button>\n      </article>\n      <article>\n        <h2>Scoreboard</h2>\n        <p>Balance: <strong id=\"balance\" class=\"good\">Rs 0</strong></p>\n        <p>Income: <strong id=\"income\">Rs 0</strong></p>\n        <p>Expense: <strong id=\"expense\" class=\"bad\">Rs 0</strong></p>\n        <p>Budget Health: <strong id=\"health\">0%</strong></p>\n        <button id=\"resetBtn\" type=\"button\">Reset</button>\n      </article>\n    </section>\n    <section class=\"card\">\n      <h2>Battle Log</h2>\n      <div id=\"log\"></div>\n    </section>\n  </main>\n  \n  \n" }} 
      suppressHydrationWarning 
    />
  );
}
