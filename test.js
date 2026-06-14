const puppeteer = require('puppeteer-core');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/root/.cache/puppeteer/chrome/linux-131.0.6778.204/chrome-linux64/chrome',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--force-color-profile=srgb'],
  });
  const page = await browser.newPage();
  const errors = [];
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', e => errors.push('PAGEERROR: ' + e.message));
  await page.setViewport({ width: 1600, height: 860, deviceScaleFactor: 1.5 });
  await page.goto('file://' + path.resolve(__dirname, 'index.html'), { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 800));

  // open region dropdown
  await page.click('#regionBtn');
  await new Promise(r => setTimeout(r, 300));
  const menuOpen = await page.$eval('#regionMenu', el => !el.hidden);

  // pick a region
  await page.click('#regionMenu li:nth-child(5)');
  await new Promise(r => setTimeout(r, 200));
  const code = await page.$eval('.region__code', el => el.textContent);

  // trigger a sign-in toast
  await page.click('.btn--cta');
  await new Promise(r => setTimeout(r, 250));
  const toasts = await page.$$eval('.toast', els => els.length);

  // rubble + dust counts
  const rubble = await page.$$eval('.rubble span', e => e.length);
  const dust = await page.$$eval('.bg__dust span', e => e.length);

  await page.screenshot({ path: 'interact.png' });
  await browser.close();

  console.log(JSON.stringify({ errors, menuOpen, code, toasts, rubble, dust }, null, 2));
})().catch(e => { console.error(e); process.exit(1); });
