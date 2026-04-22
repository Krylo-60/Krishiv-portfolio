export default function Page() {
  return (
    <div 
      className="legacy-html-wrapper" 
      dangerouslySetInnerHTML={{ __html: "\n  <main class=\"panel\">\n    <h1>Private Nexus Admin</h1>\n    <p>Authorized route only. Updates are written via backend and then pushed to Firebase.</p>\n    <p class=\"mono\">Route: <code>/admin?token=YOUR_TOKEN</code></p>\n\n    <label for=\"msg\">Live wall message</label>\n    <textarea id=\"msg\" placeholder=\"Enter broadcast message...\">Subscribe to Krylo-Blox</textarea>\n\n    <div class=\"grid\">\n      <div>\n        <label for=\"subs\">Subs</label>\n        <input id=\"subs\" type=\"number\" min=\"0\" value=\"7\" />\n      </div>\n      <div>\n        <label for=\"views\">Views</label>\n        <input id=\"views\" type=\"number\" min=\"0\" value=\"7\" />\n      </div>\n      <div>\n        <label for=\"uploads\">Videos</label>\n        <input id=\"uploads\" type=\"number\" min=\"0\" value=\"0\" />\n      </div>\n    </div>\n\n    <div class=\"actions\">\n      <button id=\"refreshBtn\" class=\"btn-secondary\" type=\"button\">Load Current</button>\n      <button id=\"publishBtn\" class=\"btn-primary\" type=\"button\">Publish Sync</button>\n    </div>\n\n    <div id=\"status\" aria-live=\"polite\">Ready.</div>\n    <p class=\"mono\" id=\"syncMeta\">Sync source: unknown | Last sync: unknown</p>\n    <p class=\"mono\">Auto sync works when <code>YOUTUBE_API_KEY</code> is set. Otherwise use Publish Sync manually.</p>\n  </main>\n\n  \n" }} 
      suppressHydrationWarning 
    />
  );
}
