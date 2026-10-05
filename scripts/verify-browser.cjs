const assert=require('node:assert/strict');
const fs=require('node:fs/promises');
const {chromium}=require('playwright');
const {AxeBuilder}=require('@axe-core/playwright');
const base=process.env.PORTFOLIO_BASE_URL||'http://127.0.0.1:4173';
let browser;
async function at(page,id,local=.55){
 await page.evaluate(({id,local})=>{const el=document.querySelector('#journey'),ids=el.dataset.path.split(','),index=ids.indexOf(id);if(index<0)throw new Error(`Missing scene ${id}`);window.scrollTo({top:el.getBoundingClientRect().top+scrollY+(index+local)*(el.offsetHeight-innerHeight)/ids.length,behavior:'instant'});},{id,local});
 await page.waitForTimeout(750);
}
async function current(page,id){await page.waitForFunction(id=>document.querySelector('#journey').dataset.current===id,id);await page.waitForTimeout(850);}
async function pose(page,selector){return page.locator(selector).evaluate(el=>{const m=new DOMMatrix(getComputedStyle(el).transform);return{x:m.m41,y:m.m42,a:m.m11,d:m.m22,opacity:Number(getComputedStyle(el).opacity)};});}
async function state(page){return page.evaluate(()=>({scroll:scrollY,path:document.querySelector('#journey').dataset.path,current:document.querySelector('#journey').dataset.current}));}
async function audit(page,label){const r=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();assert.deepEqual(r.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),[],label);}
(async()=>{
 browser=await chromium.launch({channel:'chrome',headless:true});
 const context=await browser.newContext({viewport:{width:1440,height:900},locale:'en-US'});
 const page=await context.newPage();const errors=[],results=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base,{waitUntil:'networkidle'});
 const defaultPath='approach,dfriend,pilot,research,idea,notebook';
 assert.equal(await page.locator('#journey').getAttribute('data-path'),defaultPath);
 await at(page,'approach');
 assert.equal(await page.locator('#journey').getAttribute('data-current'),'approach');
 assert.match(await page.locator('[data-scene="approach"] .scene-reading-copy').innerText(),/Eric.*Nguyễn Khánh Trình.*computer science.*Vietnam/);
 assert.match(await page.locator('[data-scene="approach"] .scene-reading-copy').innerText(),/betting more on myself/);
 assert.equal(await page.locator('[data-scene="dfriend"]').getAttribute('aria-hidden'),'true');
 results.push('First scroll identifies Eric/Trinh and how he works before D-Friend');

 await at(page,'approach',.03);const hidden=await pose(page,'[data-action="reveal-question"]');
 await at(page,'approach',.56);const visible=await pose(page,'[data-action="reveal-question"]');
 assert.ok(hidden.opacity<.1&&visible.opacity>.95);
 await at(page,'dfriend',.05);const closed=await pose(page,'.study-cover');
 await at(page,'dfriend',.55);const opened=await pose(page,'.study-cover');
 assert.ok(closed.a>.95&&opened.a<-.25,'Folder opens to reveal learning environment');
 await at(page,'pilot',.08);const untrimmed=await pose(page,'.scope-extra.extra-0');
 await at(page,'pilot',.58);const trimmed=await pose(page,'.scope-extra.extra-0');
 assert.ok(Math.abs(trimmed.x-untrimmed.x)>60&&trimmed.opacity<.3);
 assert.equal((await pose(page,'.scope-keep')).opacity,1);
 await at(page,'research',.07);const together=await pose(page,'.condition-0');
 await at(page,'research',.55);const separated=await pose(page,'.condition-0');
 assert.ok(Math.abs(separated.x-together.x)>80);
 assert.ok((await pose(page,'.condition-2')).x>80);
 results.push('Workspace objects reveal, folder opens, pilot scope is trimmed, research paths separate');

 for(const id of defaultPath.split(',')){await at(page,id);assert.equal(await page.locator('#journey').getAttribute('data-current'),id);}
 await at(page,'research',.87);
 const camera=await pose(page,'[data-scene="research"]');
 assert.ok(Math.abs(camera.x)<60&&camera.opacity<1&&camera.opacity>0,'Camera transition replaces full-width horizontal slides');
 await at(page,'pilot');assert.equal(await page.locator('#journey').getAttribute('data-current'),'pilot');
 results.push('Scroll-only route, contextual camera transitions and reverse scrolling');

 await at(page,'dfriend',.3);const detail=page.locator('[data-scene="dfriend"] [data-detail]');
 const before=await state(page);await detail.click();
 assert.equal(await page.evaluate(()=>document.body.style.overflow),'hidden');
 await page.keyboard.press('Escape');await page.waitForFunction(()=>!document.querySelector('dialog').open);
 await page.waitForTimeout(200);assert.deepEqual(await state(page),before);
 assert.equal(await detail.evaluate(el=>document.activeElement===el),true);
 await detail.focus();await page.mouse.wheel(0,500);await page.waitForTimeout(45);await page.keyboard.press('Enter');
 await page.waitForFunction(()=>document.querySelector('dialog').open);
 const frozen=await pose(page,'.study-cover');await page.waitForTimeout(400);
 const still=await pose(page,'.study-cover');assert.ok(Math.abs(still.a-frozen.a)<.001,'Popup freezes ongoing illustration');
 await page.keyboard.press('Escape');await page.waitForFunction(()=>!document.querySelector('dialog').open);
 results.push('Popup restores exact scroll/path/focus and freezes ongoing object animation');

 await at(page,'dfriend');await page.locator('[data-scene="dfriend"] [data-branch="seventeen"]').focus();await page.keyboard.press('Enter');
 await current(page,'seventeen');
 const branch='approach,dfriend,seventeen,scores,pilot,research,idea,notebook';
 assert.equal(await page.locator('#journey').getAttribute('data-path'),branch);
 assert.equal(await page.locator('[data-scene="seventeen"] .scene-title').evaluate(el=>document.activeElement===el),true);
 await at(page,'scores');await at(page,'pilot');
 await at(page,'seventeen');await page.locator('[data-scene="seventeen"] [data-branch="dfriend"]').click();await current(page,'dfriend');
 assert.equal(await page.locator('#journey').getAttribute('data-path'),branch);
 await page.locator('.journey-navigation button').last().click();await current(page,'seventeen');
 await page.locator('.journey-navigation button').first().click();await current(page,'dfriend');
 results.push('Keyboard branching preserves identity prefix, rejoins pilot, returns without loops, next/previous work');

 for(const id of ['dfriend','research','idea','notebook','seventeen','scores','pilot']){
  await page.goto(`${base}/#open/${id}`,{waitUntil:'networkidle'});
  assert.equal(await page.locator('dialog').evaluate(el=>el.open),true);
  await page.keyboard.press('Escape');await page.waitForFunction(()=>!document.querySelector('dialog').open);
 }
 await page.goto(base,{waitUntil:'networkidle'});await page.locator('.research-paper').click();await current(page,'research');
 assert.equal(await page.locator('#journey').getAttribute('data-path'),'research,idea,notebook');
 await page.locator('[data-scene="research"] [data-detail]').click();
 assert.match(await page.locator('.reader-intro').innerText(),/first time.*no demo or result/);
 await page.locator('.reader .language-toggle button').filter({hasText:'VI'}).click();
 assert.equal(new URL(page.url()).hash,'#open/research');
 await audit(page,'Vietnamese reader');await page.keyboard.press('Escape');
 await page.waitForFunction(()=>!document.querySelector('dialog').open);
 await page.locator('.theme-toggle').click();await page.reload({waitUntil:'networkidle'});
 assert.equal(await page.locator('html').getAttribute('lang'),'vi');assert.equal(await page.locator('html').getAttribute('data-theme'),'light');
 results.push('Seven direct hashes, desk shortcuts, bilingual detailed readers and saved preferences');

 for(const theme of ['light','dark']){await page.evaluate(theme=>document.documentElement.dataset.theme=theme,theme);await at(page,'approach');await audit(page,`Identity ${theme}`);await at(page,'dfriend');await audit(page,`D-Friend ${theme}`);}
 for(const width of [320,390,600,768,900,1024,1440]){
  await page.setViewportSize({width,height:width<600?844:800});await page.goto(base,{waitUntil:'networkidle'});
  for(const id of defaultPath.split(',')){
   await at(page,id,.6);
   const layout=await page.locator(`[data-scene="${id}"]`).evaluate(el=>{const r=el.querySelector('.scene-reading-window'),action=el.querySelector('.scene-full').getBoundingClientRect();return{reading:r.clientHeight,bottom:action.bottom,overflow:document.documentElement.scrollWidth>innerWidth,height:innerHeight};});
   assert.ok(!layout.overflow,`Overflow ${width}/${id}`);assert.ok(layout.reading>65,`Reading space ${width}/${id}: ${layout.reading}`);assert.ok(layout.bottom<=layout.height,`Action clipped ${width}/${id}`);
  }
 }
 results.push('Both themes pass Axe; six scenes fit seven widths with visible reading/action areas');

 const reducedContext=await browser.newContext({reducedMotion:'reduce',viewport:{width:1440,height:900}});
 const reduced=await reducedContext.newPage();await reduced.goto(base,{waitUntil:'networkidle'});
 assert.equal(await reduced.locator('.journey-frame').evaluate(el=>getComputedStyle(el).position),'relative');
 assert.equal(await reduced.locator('.journey-scene[aria-hidden="false"]').count(),6);
 await reduced.locator('[data-scene="approach"] [data-branch="seventeen"]').click();await current(reduced,'seventeen');
 assert.equal(await reduced.locator('.journey-scene[aria-hidden="false"]').count(),7);
 await audit(reduced,'Reduced motion');results.push('Reduced motion static content, semantic end states, branches and accessibility');
 const vi=await(await browser.newContext({locale:'vi-VN'})).newPage();await vi.goto(base,{waitUntil:'networkidle'});assert.equal(await vi.locator('html').getAttribute('lang'),'en');
 assert.equal(await page.locator('.scene-site').getAttribute('href'),'https://www.dfriend.online/');
 assert.equal(await page.locator('.email-link').getAttribute('href'),'mailto:trinhkhanh15082007@gmail.com');
 assert.deepEqual(errors,[]);
 results.push('English default and exact product/contact links; no runtime errors');
 await fs.writeFile('artifacts/browser-verification.json',JSON.stringify({passed:true,base,executedAt:new Date().toISOString(),results,errors},null,2));
 console.log(JSON.stringify({passed:true,results,errors},null,2));
})().catch(e=>{console.error(e);process.exitCode=1;}).finally(async()=>{await browser?.close();});
