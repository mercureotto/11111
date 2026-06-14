const puppeteer = require('puppeteer-core');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/root/.cache/puppeteer/chrome/linux-131.0.6778.204/chrome-linux64/chrome',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--force-color-profile=srgb'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 860, deviceScaleFactor: 2 });
  await page.goto('file://' + path.resolve(__dirname, 'index.html'), {
    waitUntil: 'networkidle2',
    timeout: 30000,
  });
  await new Promise(r => setTimeout(r, 2200));
  await page.screenshot({ path: 'preview.png' });
  // crop center character area
  const stage = await page.$('#stage');
  const box = await stage.boundingBox();
  await page.screenshot({
    path: 'crop.png',
    clip: { x: box.x + box.width*0.30, y: box.y + box.height*0.18, width: box.width*0.55, height: box.height*0.72 },
  });
  await browser.close();
  console.log('saved');
})().catch(e => { console.error(e); process.exit(1); });
