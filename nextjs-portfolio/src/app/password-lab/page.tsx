export default function Page() {
  return (
    <div 
      className="legacy-html-wrapper" 
      dangerouslySetInnerHTML={{ __html: "\n  <main class=\"wrap\">\n    <section class=\"card\"><h1>Password Lab</h1><p class=\"meta\">Created by Krishiv PB</p><a href=\"index.html#projects\">Back to portfolio</a></section>\n    <section class=\"card\">\n      <div class=\"row\">\n        <label>Length <input id=\"len\" type=\"number\" min=\"6\" max=\"64\" value=\"16\" style=\"width:100px\"></label>\n        <label><input id=\"upper\" type=\"checkbox\" checked> Uppercase</label>\n        <label><input id=\"lower\" type=\"checkbox\" checked> Lowercase</label>\n        <label><input id=\"num\" type=\"checkbox\" checked> Numbers</label>\n        <label><input id=\"sym\" type=\"checkbox\" checked> Symbols</label>\n      </div>\n      <div class=\"row\" style=\"margin-top:10px\"><button class=\"btn primary\" id=\"genBtn\">Generate</button><button class=\"btn\" id=\"copyBtn\">Copy</button></div>\n      <p id=\"out\"></p><p id=\"strength\" class=\"meta\"></p>\n    </section>\n  </main>\n  \n\r\n  \r\n" }} 
      suppressHydrationWarning 
    />
  );
}
