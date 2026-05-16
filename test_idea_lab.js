const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('CONSOLE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
  
  const fileUrl = 'file://' + path.resolve('idea-lab-ai.html').replace(/\\/g, '/');
  await page.goto(fileUrl);
  await page.waitForTimeout(1000);
  await browser.close();
})();
