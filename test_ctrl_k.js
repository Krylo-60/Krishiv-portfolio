const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('CONSOLE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
  
  const fileUrl = 'file://' + path.resolve('index.html').replace(/\\/g, '/');
  await page.goto(fileUrl);
  await page.waitForTimeout(1000);
  
  // Test if commandPalette was actually grabbed by main-logic.js
  const isPaletteNullInJS = await page.evaluate(() => {
    return document.getElementById('commandPalette') === null;
  });
  console.log('Is commandPalette null in the DOM?', isPaletteNullInJS);
  
  const commandPalette = await page.$('#commandPalette');
  console.log('commandPalette initially open?', await commandPalette.evaluate(n => n.classList.contains('is-open')));
  
  // Press Ctrl+K
  console.log('Pressing Ctrl+K...');
  await page.keyboard.press('Control+K');
  await page.waitForTimeout(500);
  
  console.log('commandPalette after Ctrl+K open?', await commandPalette.evaluate(n => n.classList.contains('is-open')));
  
  await browser.close();
})();
