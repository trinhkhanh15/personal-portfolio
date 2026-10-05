const fs = require('node:fs/promises');
const { chromium } = require('playwright');
const base = process.env.PORTFOLIO_BASE_URL || 'http://127.0.0.1:4173';
const label = process.env.PORTFOLIO_MOTION_LABEL || 'after';
let browser;
(async () => {
  browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, locale: 'en-US' });
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.evaluate(() => {
    const root = document.querySelector('#journey');
    window.scrollTo({ top: root.getBoundingClientRect().top + scrollY + .8 * (root.offsetHeight - innerHeight) / root.dataset.path.split(',').length, behavior: 'instant' });
  });
  await page.waitForTimeout(700);
  await page.evaluate(() => {
    window.motionTrace = new Promise(resolve => {
      const frames = [], start = performance.now();
      const sample = now => {
        frames.push({ ms: now - start, scroll: scrollY, x: new DOMMatrix(getComputedStyle(document.querySelector('[data-scene="dfriend"]')).transform).m41 });
        if (now - start < 950) requestAnimationFrame(sample); else resolve(frames);
      };
      requestAnimationFrame(sample);
    });
  });
  await page.mouse.move(700, 450);
  await page.mouse.wheel(0, 180);
  const frames = await page.evaluate(() => window.motionTrace);
  const deltas = frames.slice(1).map((frame, i) => Math.abs(frame.x - frames[i].x));
  const interval = frames.slice(1).map((frame, i) => frame.ms - frames[i].ms).sort((a,b) => a-b);
  const report = {
    label, base, at: new Date().toISOString(),
    sceneScrollDistance: await page.locator('#journey').evaluate(el => (el.offsetHeight-innerHeight)/el.dataset.path.split(',').length),
    wheelPixels: 180, maxHorizontalPixelsPerFrame: Math.max(...deltas), movingFrames: deltas.filter(d=>d>.5).length,
    totalHorizontalTravel: Math.abs(frames.at(-1).x-frames[0].x), p95FrameIntervalMs: interval[Math.floor(interval.length*.95)], frames,
  };
  await fs.mkdir('artifacts', { recursive: true });
  await fs.writeFile(`artifacts/motion-${label}.json`, JSON.stringify(report, null, 2));
  console.log(JSON.stringify({...report, frames:undefined}, null, 2));
})().catch(e => {console.error(e);process.exitCode=1;}).finally(async()=>{await browser?.close();});
