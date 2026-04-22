export default function Page() {
  return (
    <div 
      className="legacy-html-wrapper" 
      dangerouslySetInnerHTML={{ __html: "\n  <main class=\"wrap\">\n    <section class=\"card\"><h1>Water Reminder</h1><p>Track daily water intake and keep hydration goals on point.</p><p class=\"credit\">Created by Krishiv PB</p><p><a href=\"index.html#app-verse\">Back to Apps Galaxy</a></p></section>\n    <section class=\"card\">\n      <h2>Daily Hydration</h2>\n      <p>Goal (ml)</p><input id=\"goal\" type=\"number\" min=\"500\" step=\"100\" value=\"2000\" />\n      <div class=\"row\" style=\"margin-top:8px;\">\n        <button class=\"btn-primary\" data-add=\"200\" type=\"button\">+200 ml</button>\n        <button class=\"btn-primary\" data-add=\"300\" type=\"button\">+300 ml</button>\n        <button class=\"btn-primary\" data-add=\"500\" type=\"button\">+500 ml</button>\n        <button id=\"reset\" type=\"button\">Reset Day</button>\n      </div>\n      <p id=\"summary\" style=\"margin-top:10px;\"></p>\n      <div class=\"meter\"><span id=\"fill\" style=\"width:0%\"></span></div>\n      <p>Details: intake auto-resets each day and saves in your browser.</p>\n    </section>\n  </main>\n  \n  \n" }} 
      suppressHydrationWarning 
    />
  );
}
