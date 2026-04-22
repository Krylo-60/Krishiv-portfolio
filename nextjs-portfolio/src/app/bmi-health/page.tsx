export default function Page() {
  return (
    <div 
      className="legacy-html-wrapper" 
      dangerouslySetInnerHTML={{ __html: "\n  <main class=\"wrap\">\n    <section class=\"card\"><h1>BMI Health Checker</h1><p class=\"meta\">Created by Krishiv PB</p><a href=\"index.html#projects\">Back to portfolio</a></section>\n    <section class=\"card\">\n      <div class=\"row\"><input id=\"h\" type=\"number\" placeholder=\"Height (cm)\"><input id=\"w\" type=\"number\" placeholder=\"Weight (kg)\"><button class=\"btn\" id=\"calc\">Calculate</button></div>\n      <h2 id=\"bmi\">BMI: -</h2><p id=\"cat\" class=\"meta\">Enter values to calculate.</p>\n    </section>\n  </main>\n  \n\r\n  \r\n" }} 
      suppressHydrationWarning 
    />
  );
}
