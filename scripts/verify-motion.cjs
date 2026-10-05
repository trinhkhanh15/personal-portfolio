const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const { chromium } = require('playwright');
const base = process.env.PORTFOLIO_BASE_URL || 'http://127.0.0.1:4173';
let browser;
(async () => {
  browser = await chromium.launch({channel:'chrome',headless:true});
  const results = [];
  for (const width of [1440, 390]) {
    const page = await browser.newPage({viewport:{width,height:width<600?844:900},locale:'en-US'});
    await page.goto(base,{waitUntil:'networkidle'});
    const at = async local => {
      await page.evaluate(value => {
        const el=document.querySelector('#journey');
        window.scrollTo({top:el.getBoundingClientRect().top+scrollY+(el.dataset.path.split(',').indexOf('dfriend')+value)*(el.offsetHeight-innerHeight)/el.dataset.path.split(',').length,behavior:'instant'});
      },local);
      await page.waitForTimeout(700);
    };
    const snapshot = () => page.evaluate(() => ({scroll:scrollY,path:document.querySelector('#journey').dataset.path,y:new DOMMatrix(getComputedStyle(document.querySelector('[data-scene="dfriend"]')).transform).m42,cover:new DOMMatrix(getComputedStyle(document.querySelector('.study-cover')).transform).m11}));
    for (const local of [.85, .92]) {
      await at(local);
      const fade = await page.evaluate(() => ['dfriend', 'pilot'].map(id => Number(getComputedStyle(document.querySelector(`[data-scene="${id}"]`)).opacity)));
      assert.ok(Math.min(...fade) < .01, 'Outgoing text clears before incoming text appears');
      assert.ok(Math.max(...fade) > .05, 'A page remains visible outside the brief midpoint');
    }
    await at(.35);
    await page.locator('[data-scene="dfriend"] [data-detail]').focus();
    await page.mouse.wheel(0,500);
    await page.waitForTimeout(45);
    await page.keyboard.press('Enter');
    await page.waitForFunction(()=>document.querySelector('dialog').open);
    const paused=await snapshot();
    await page.waitForTimeout(400);
    const after=await snapshot();
    assert.ok(Math.abs(after.y-paused.y)<1 && Math.abs(after.cover-paused.cover)<.001,'Settling animation stays frozen during popup');
    assert.equal(after.scroll,paused.scroll);
    assert.equal(after.path,paused.path);
    await page.keyboard.press('Escape');
    await page.waitForFunction(()=>!document.querySelector('dialog').open);
    await page.waitForTimeout(700);
    assert.equal((await snapshot()).scroll,paused.scroll);
    await at(.8);
    await page.mouse.wheel(0,-500);
    await page.waitForTimeout(700);
    assert.equal(await page.locator('#journey').getAttribute('data-current'),'dfriend');
    assert.ok(Math.abs((await snapshot()).y)<1,'Reversing wheel returns cleanly to reading phase');
    await page.locator('[data-scene="dfriend"] [data-branch="seventeen"]').click();
    await page.waitForFunction(()=>document.querySelector('#journey').dataset.current==='seventeen');
    await page.waitForTimeout(800);
    assert.equal(await page.locator('#journey').getAttribute('data-path'),'dfriend,seventeen,scores,pilot,research,idea,notebook');
    results.push(`${width}px: text clears between scenes; popup freezes moving scene; same-scroll resume, reverse wheel and branch settle correctly`);
    await page.close();
  }
  await fs.writeFile('artifacts/motion-verification.json',JSON.stringify({passed:true,base,executedAt:new Date().toISOString(),results},null,2));
  console.log(JSON.stringify({passed:true,results},null,2));
})().catch(e=>{console.error(e);process.exitCode=1;}).finally(async()=>{await browser?.close();});
