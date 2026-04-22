export default function Page() {
  return (
    <div 
      className="legacy-html-wrapper" 
      dangerouslySetInnerHTML={{ __html: "\n  <main class=\"wrap\">\n    <section class=\"card\"><h1>Unit Converter</h1><p class=\"meta\">Created by Krishiv PB</p><a href=\"index.html#projects\">Back to portfolio</a></section>\n    <section class=\"card\">\n      <div class=\"row\">\n        <input id=\"value\" type=\"number\" placeholder=\"Value\" />\n        <select id=\"kind\">\n          <option value=\"km-miles\">KM to Miles</option><option value=\"miles-km\">Miles to KM</option>\n          <option value=\"c-f\">Celsius to Fahrenheit</option><option value=\"f-c\">Fahrenheit to Celsius</option>\n          <option value=\"kg-lb\">KG to LB</option><option value=\"lb-kg\">LB to KG</option>\n          <option value=\"cm-inch\">CM to Inch</option><option value=\"inch-cm\">Inch to CM</option>\n        </select>\n        <button class=\"btn\" id=\"swap\">Swap</button>\n        <button class=\"btn\" id=\"convert\">Convert</button>\n      </div>\n      <h2 id=\"out\">Result: -</h2>\n      <p id=\"formula\" class=\"meta\"></p>\n      <h3>Recent Conversions</h3>\n      <ul id=\"history\" class=\"history\"></ul>\n    </section>\n  </main>\n  \n  \n" }} 
      suppressHydrationWarning 
    />
  );
}
