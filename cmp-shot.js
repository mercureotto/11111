const puppeteer=require('puppeteer-core');const path=require('path');
(async()=>{const b=await puppeteer.launch({executablePath:'/root/.cache/puppeteer/chrome/linux-131.0.6778.204/chrome-linux64/chrome',headless:'new',args:['--no-sandbox','--disable-setuid-sandbox']});
const p=await b.newPage();await p.setViewport({width:900,height:1150,deviceScaleFactor:1});
await p.goto('file://'+path.resolve(__dirname,'art/cmp.html'),{waitUntil:'networkidle2'});
await new Promise(r=>setTimeout(r,500));await p.screenshot({path:'cmp.png',fullPage:true});await b.close();console.log('ok');})();
