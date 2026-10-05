const fs = require('node:fs/promises');
const { chromium } = require('playwright');
const base = process.env.PORTFOLIO_BASE_URL || 'http://127.0.0.1:4173';
let browser;
(async () => {
  await fs.mkdir('artifacts',{recursive:true});
  browser=await chromium.launch({channel:'chrome',headless:true});
  const context=await browser.newContext({viewport:{width:1440,height:900},locale:'en-US'});
  const page=await context.newPage();
  await page.goto(base,{waitUntil:'networkidle'});
  const at=async(id,local=.55)=>{
    await page.evaluate(({id,local})=>{const root=document.querySelector('#journey'),index=root.dataset.path.split(',').indexOf(id);window.scrollTo({top:root.getBoundingClientRect().top+scrollY+(index+local)*(root.offsetHeight-innerHeight)/root.dataset.path.split(',').length,behavior:'instant'});},{id,local});
    await page.waitForTimeout(750);
  };
  for(const id of ['approach','dfriend','pilot','research','idea','notebook']){
    await at(id);
    await page.screenshot({path:`artifacts/${id}-desktop.png`});
  }
  await at('approach',.92);
  await page.screenshot({path:'artifacts/new-transition.png'});
  await page.setViewportSize({width:390,height:844});
  await page.locator('.header-tools .language-toggle button').filter({hasText:'VI'}).click();
  for(const id of ['approach','dfriend','research']){
    await at(id);
    await page.screenshot({path:`artifacts/${id}-mobile.png`});
  }
  await page.locator('.theme-toggle').click();
  await at('approach');
  await page.screenshot({path:'artifacts/approach-mobile-light.png'});
  console.log('Captured identity opening, all six scenes, transition, mobile, and light theme.');
})().catch(e=>{console.error(e);process.exitCode=1;}).finally(async()=>{await browser?.close();});
