const puppeteer = require('puppeteer-core');
const path = require('path');
(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/root/.cache/puppeteer/chrome/linux-131.0.6778.204/chrome-linux64/chrome',
    headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1100, height: 700, deviceScaleFactor: 1 });
  await page.goto('file://' + path.resolve(__dirname, 'art/forge.html'), { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: 'forge.png' });
  await browser.close();
  console.log('ok');
})().catch(e => { console.error(e); process.exit(1); });
