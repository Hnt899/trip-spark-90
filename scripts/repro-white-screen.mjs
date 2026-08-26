import { chromium } from 'playwright-core';
import fs from 'fs';

const BASE = process.env.BASE_URL || 'http://localhost:8080';
const OUT = '/tmp/shots-before-fix';
fs.mkdirSync(OUT, { recursive: true });
const paths = process.argv.slice(2).length ? process.argv.slice(2) : ['/blog', '/reference', '/guide'];

const browser = await chromium.launch({ args: ['--no-sandbox'] });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();

page.on('pageerror', (err) => console.log(`[pageerror] ${err.message.slice(0, 400)}`));
page.on('console', (m) => { if (m.type() === 'error') console.log(`[console] ${m.text().slice(0, 300)}`); });

for (const path of paths) {
  console.log(`\n=== ${path} ===`);
  await page.goto(BASE + path, { waitUntil: 'domcontentloaded' });
  for (const ms of [300, 1000, 2500]) {
    await page.waitForTimeout(ms);
    const name = `${path.replace(/\//g, '_')}-${ms}.png`;
    await page.screenshot({ path: `${OUT}/${name}` });
    // What element is on top at viewport center?
    const topEl = await page.evaluate(() => {
      const el = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2);
      if (!el) return '(nothing)';
      let chain = [];
      let cur = el;
      while (cur && cur !== document.body && chain.length < 4) {
        chain.push(`${cur.tagName.toLowerCase()}${cur.id ? '#' + cur.id : ''}${cur.className && typeof cur.className === 'string' ? '.' + cur.className.split(' ').slice(0, 4).join('.') : ''}`);
        cur = cur.parentElement;
      }
      return chain.join(' > ');
    });
    const scrollH = await page.evaluate(() => ({ sh: document.documentElement.scrollHeight, ih: innerHeight }));
    console.log(`t=${ms} topElementAtCenter: ${topEl} | scrollHeight=${scrollH.sh} innerHeight=${scrollH.ih}`);
  }
}

await browser.close();
console.log('\nDONE');
