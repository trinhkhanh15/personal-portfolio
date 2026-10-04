const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const { chromium } = require('playwright');
const { AxeBuilder } = require('@axe-core/playwright');
const base = process.env.PORTFOLIO_BASE_URL || 'http://127.0.0.1:5173';
let browser;

async function at(page, position) {
  await page.evaluate(value => {
    const root = document.querySelector('#journey');
    window.scrollTo({ top: root.getBoundingClientRect().top + scrollY + value * (root.offsetHeight - innerHeight) / root.dataset.path.split(',').length, behavior: 'instant' });
  }, position);
  await page.waitForTimeout(700);
}
async function current(page, id) {
  await page.waitForFunction(value => document.querySelector('#journey').dataset.current === value, id);
  await page.waitForTimeout(800);
}
async function transform(page, selector) {
  return page.locator(selector).evaluate(el => { const m = new DOMMatrix(getComputedStyle(el).transform); return { x: m.m41, y: m.m42 }; });
}
async function snapshot(page) {
  return page.evaluate(() => ({ scroll: scrollY, path: document.querySelector('#journey').dataset.path, current: document.querySelector('#journey').dataset.current }));
}
async function audit(page, name) {
  const report = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  assert.deepEqual(report.violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.map(n => n.target) })), [], name);
}

(async () => {
  browser = await chromium.launch({ headless: true, channel: 'chrome' });
  const errors = [], results = [];
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US' });
  const page = await context.newPage();
  page.on('pageerror', error => errors.push(error.message));
  page.on('requestfailed', request => errors.push(`${request.url()}: ${request.failure()?.errorText}`));
  await page.goto(base, { waitUntil: 'networkidle' });
  assert.match(await page.locator('h1').innerText(), /Eric\s*Nguyen/);
  assert.equal(await page.locator('#journey').getAttribute('data-path'), 'dfriend,pilot,research,idea,notebook');

  await at(page, .15);
  const start = await transform(page, '[data-scene="dfriend"] .scene-reading-copy');
  await at(page, .6);
  const end = await transform(page, '[data-scene="dfriend"] .scene-reading-copy');
  assert.ok(end.y < start.y - 5, 'Reading moves upward with forward document scrolling');
  assert.ok(Math.abs((await transform(page, '[data-scene="dfriend"]')).x) < 1, 'Paper stays still in its reading phase');
  await at(page, .85);
  assert.ok((await transform(page, '[data-scene="dfriend"]')).x < -200, 'Outgoing scene slides left');
  assert.ok((await transform(page, '[data-scene="pilot"]')).x > 200, 'Incoming scene arrives from the right');
  for (const [index, id] of ['dfriend', 'pilot', 'research', 'idea', 'notebook'].entries()) {
    await at(page, index + .35);
    assert.equal(await page.locator('#journey').getAttribute('data-current'), id);
  }
  await at(page, 1.35);
  assert.equal(await page.locator('#journey').getAttribute('data-current'), 'pilot');
  results.push('Scroll-only default route, vertical reading, horizontal transitions, reverse scroll');

  const before = await snapshot(page);
  const detail = page.locator('[data-scene="pilot"] [data-detail]');
  await detail.click();
  assert.equal(new URL(page.url()).hash, '#open/pilot');
  assert.equal(await page.evaluate(() => document.body.style.overflow), 'hidden');
  await page.mouse.wheel(0, 800);
  await page.waitForTimeout(100);
  assert.equal((await snapshot(page)).scroll, before.scroll);
  for (let index = 0; index < 12; index++) {
    await page.keyboard.press('Tab');
    assert.equal(await page.evaluate(() => document.querySelector('dialog').contains(document.activeElement) || document.activeElement === document.body), true);
  }
  assert.equal(await page.evaluate(() => { document.querySelector('.theme-toggle').focus(); return document.activeElement === document.querySelector('.theme-toggle'); }), false);
  await page.keyboard.press('Escape');
  await page.waitForFunction(() => !document.querySelector('dialog')?.open);
  await page.waitForTimeout(150);
  const after = await snapshot(page);
  assert.equal(after.path, before.path);
  assert.equal(after.current, before.current);
  assert.ok(Math.abs(after.scroll - before.scroll) <= 1);
  assert.equal(await detail.evaluate(el => document.activeElement === el), true);
  results.push('Detailed popup pauses scroll; Escape restores route, exact scroll position, and focus');

  await at(page, .35);
  await page.locator('[data-scene="dfriend"] [data-detail]').focus();
  await page.mouse.wheel(0, 500);
  await page.waitForTimeout(45);
  await page.keyboard.press('Enter');
  await page.waitForFunction(() => document.querySelector('dialog')?.open);
  const frozen = await transform(page, '[data-scene="dfriend"]');
  await page.waitForTimeout(350);
  assert.ok(Math.abs((await transform(page, '[data-scene="dfriend"]')).x - frozen.x) <= 1, 'Popup freezes a still-settling scene');
  await page.keyboard.press('Escape');
  await page.waitForFunction(() => !document.querySelector('dialog')?.open);
  results.push('Opening a popup during motion freezes the animation until it closes');

  await at(page, .35);
  await page.locator('[data-scene="dfriend"] [data-branch="seventeen"]').focus();
  await page.keyboard.press('Enter');
  await current(page, 'seventeen');
  assert.equal(await page.locator('#journey').getAttribute('data-path'), 'dfriend,seventeen,scores,pilot,research,idea,notebook');
  assert.equal(await page.locator('[data-scene="seventeen"] .scene-title').evaluate(el => document.activeElement === el), true);
  await at(page, 2.35);
  assert.equal(await page.locator('#journey').getAttribute('data-current'), 'scores');
  await at(page, 3.35);
  assert.equal(await page.locator('#journey').getAttribute('data-current'), 'pilot');
  await at(page, 1.35);
  assert.equal(await page.locator('#journey').getAttribute('data-current'), 'seventeen');
  await page.locator('[data-scene="seventeen"] [data-branch="dfriend"]').click();
  await current(page, 'dfriend');
  assert.equal(await page.locator('#journey').getAttribute('data-path'), 'dfriend,seventeen,scores,pilot,research,idea,notebook');
  await page.locator('.journey-navigation button').last().focus();
  await page.keyboard.press('Enter');
  await current(page, 'seventeen');
  await page.locator('.journey-navigation button').first().click();
  await current(page, 'dfriend');
  await at(page, 3.35);
  await page.locator('[data-scene="pilot"] [data-branch="scores"]').click();
  await current(page, 'scores');
  assert.equal(await page.locator('#journey').getAttribute('data-path'), 'dfriend,seventeen,scores,pilot,research,idea,notebook');
  results.push('Keyboard branch choice, inserted 17/scores path, rejoin, visited-node return, next/previous navigation');

  await page.goto(base, { waitUntil: 'networkidle' });
  await at(page, 1.35);
  await page.locator('[data-scene="pilot"] [data-branch="scores"]').click();
  await current(page, 'scores');
  assert.equal(await page.locator('#journey').getAttribute('data-path'), 'dfriend,pilot,scores,research,idea,notebook');
  results.push('Branch preserves travelled prefix and removes duplicate nodes from its continuation');

  await page.goto(base, { waitUntil: 'networkidle' });
  await page.locator('.research-paper').click();
  await current(page, 'research');
  assert.equal(await page.locator('#journey').getAttribute('data-path'), 'research,idea,notebook');
  await page.locator('[data-scene="research"] [data-detail]').click();
  assert.match(await page.locator('.reader-intro').innerText(), /first time.*no demo or result/);
  await page.locator('.reader .language-toggle button').filter({ hasText: 'VI' }).click();
  assert.equal(await page.locator('html').getAttribute('lang'), 'vi');
  assert.match(await page.locator('.reader-intro').innerText(), /lần đầu.*chưa có demo hay kết quả/);
  assert.equal(new URL(page.url()).hash, '#open/research');
  await audit(page, 'Vietnamese detailed reader');
  await page.keyboard.press('Escape');
  await page.waitForFunction(() => !document.querySelector('dialog')?.open);
  await page.locator('.theme-toggle').click();
  await page.reload({ waitUntil: 'networkidle' });
  assert.equal(await page.locator('html').getAttribute('lang'), 'vi');
  assert.equal(await page.locator('html').getAttribute('data-theme'), 'light');
  results.push('Desk entries enter their own route; bilingual reader and persisted language/appearance');

  for (const id of ['dfriend', 'research', 'idea', 'notebook', 'seventeen', 'scores', 'pilot']) {
    await page.goto(`${base}/#open/${id}`, { waitUntil: 'networkidle' });
    assert.equal(await page.locator('dialog').evaluate(el => el.open), true);
    assert.ok((await page.locator('#reader-title').innerText()).length > 4);
    await page.locator('.close-button').click();
    await page.waitForFunction(() => !document.querySelector('dialog')?.open);
  }
  await page.goto(`${base}/#open/dfriend`, { waitUntil: 'networkidle' });
  await page.locator('.related-entries button').last().click();
  assert.equal(new URL(page.url()).hash, '#open/pilot');
  await page.keyboard.press('Escape');
  results.push('All seven direct popup hashes and detailed related-entry navigation');

  await at(page, .35);
  for (const theme of ['light', 'dark']) {
    await page.evaluate(value => { document.documentElement.dataset.theme = value; }, theme);
    await page.waitForTimeout(350);
    await audit(page, `Journey accessibility: ${theme}`);
  }
  results.push('Axe WCAG 2 / 2.1 AA: active journey in both themes and Vietnamese reader');

  for (const width of [320, 390, 600, 768, 900, 1024, 1440]) {
    await page.setViewportSize({ width, height: width < 600 ? 844 : 800 });
    await page.goto(base, { waitUntil: 'networkidle' });
    for (const [index, id] of ['dfriend', 'pilot', 'research', 'idea', 'notebook'].entries()) {
      await at(page, index + .65);
      const layout = await page.evaluate(value => {
        const scene = document.querySelector(`[data-scene="${value}"]`);
        const detail = scene.querySelector('[data-detail]').getBoundingClientRect();
        const reading = scene.querySelector('.scene-reading-window');
        return { width: document.documentElement.scrollWidth, viewport: innerWidth, detailBottom: detail.bottom, height: innerHeight, reading: reading.clientHeight };
      }, id);
      assert.ok(layout.width <= layout.viewport, `Horizontal overflow: ${width} / ${id}`);
      assert.ok(layout.detailBottom <= layout.height, `Detail action clipped: ${width} / ${id}`);
      assert.ok(layout.reading > 65, `Reading area too small: ${width} / ${id}: ${layout.reading}`);
    }
    if (width === 390) {
      await page.goto(base, { waitUntil: 'networkidle' });
      for (const [selector, id] of [['.folder','dfriend'],['.research-paper','research'],['.idea-note','idea'],['.notebook','notebook']]) {
        await page.locator(selector).click();
        await current(page, id);
        await page.locator(`[data-scene="${id}"] [data-detail]`).click();
        assert.equal(await page.locator('dialog').evaluate(el => el.open), true);
        await page.keyboard.press('Escape');
        await page.waitForFunction(() => !document.querySelector('dialog')?.open);
        await page.locator('.journey-back').click();
        await page.waitForTimeout(800);
      }
    }
  }
  results.push('All five default scenes fit seven widths; four desk routes and detailed popups work on mobile');

  const reduced = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce', locale: 'en-US' });
  const reducedPage = await reduced.newPage();
  await reducedPage.goto(base, { waitUntil: 'networkidle' });
  assert.equal(await reducedPage.locator('.journey-frame').evaluate(el => getComputedStyle(el).position), 'relative');
  assert.equal(await reducedPage.locator('.journey-scene[aria-hidden="false"]').count(), 5);
  assert.equal(await reducedPage.locator('.scene-reading-window').first().evaluate(el => getComputedStyle(el).overflow), 'visible');
  await reducedPage.locator('[data-scene="dfriend"] [data-branch="seventeen"]').click();
  await current(reducedPage, 'seventeen');
  assert.equal(await reducedPage.locator('.journey-scene[aria-hidden="false"]').count(), 7);
  await reducedPage.locator('[data-scene="seventeen"] [data-detail]').click();
  assert.equal(await reducedPage.locator('dialog').evaluate(el => el.open), true);
  await reducedPage.keyboard.press('Escape');
  await audit(reducedPage, 'Reduced motion static route');
  results.push('Reduced motion: static vertical pages, complete reading content, branch insertion, popup, accessibility');

  const viPage = await (await browser.newContext({ locale: 'vi-VN' })).newPage();
  await viPage.goto(base, { waitUntil: 'networkidle' });
  assert.equal(await viPage.locator('html').getAttribute('lang'), 'en');
  assert.equal(await page.locator('.email-link').getAttribute('href'), 'mailto:trinhkhanh15082007@gmail.com');
  assert.deepEqual(await page.locator('.social-links a').evaluateAll(els => els.map(el => el.getAttribute('href'))), ['https://github.com/trinhkhanh15', 'https://www.linkedin.com/in/etnguyen1508/', 'https://www.instagram.com/ericnguyen_in/']);
  assert.deepEqual(errors, []);
  results.push('English default regardless of browser locale, exact public contacts, no runtime errors or failed requests');

  await fs.mkdir('artifacts', { recursive: true });
  await fs.writeFile('artifacts/browser-verification.json', JSON.stringify({ passed: true, results, errors, executedAt: new Date().toISOString(), base }, null, 2));
  console.log(JSON.stringify({ passed: true, results, errors }, null, 2));
})().catch(error => { console.error(error); process.exitCode = 1; }).finally(async () => { await browser?.close(); });
