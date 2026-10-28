/* Optional browser smoke test. Supply playwright-core, @axe-core/playwright and a Chromium executable. */
const { chromium } = require('playwright-core');
const AxeBuilder = require('@axe-core/playwright').default;
const assert = require('node:assert/strict');
(async () => {
  const base = process.env.BASE_URL || 'http://127.0.0.1:5175';
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/tmp/chromium', args: ['--no-sandbox', '--no-zygote', '--disable-dev-shm-usage'] });
  const results = [], errors = [], failedRequests = [];
  for (const width of [320,375,390,430,768,1024,1280,1440]) {
    const page = await browser.newPage({viewport:{width,height:850}});
    page.on('pageerror', e => errors.push(`${width}: ${e.message}`));
    page.on('requestfailed', r => failedRequests.push(`${width}: ${r.url()} ${r.failure()?.errorText}`));
    await page.goto(base, {waitUntil:'domcontentloaded'});
    await page.waitForSelector('h1');
    const heroAnimation = await page.locator('.hero-heading').evaluate(e => getComputedStyle(e).animationName);
    await page.waitForTimeout(1000);
    const status = await page.evaluate(() => ({title:document.querySelector('h1')?.textContent?.trim(),overflow:document.documentElement.scrollWidth-innerWidth, heroOpacity:getComputedStyle(document.querySelector('.hero-heading')).opacity}));
    assert.equal(status.overflow, 0, `overflow at ${width}`); assert.equal(status.heroOpacity,'1'); assert.equal(heroAnimation,'motion-rise');
    for (let y=0; y < await page.evaluate(()=>document.documentElement.scrollHeight); y += 650) { await page.evaluate(v=>scrollTo(0,v),y); await page.waitForTimeout(35); }
    await page.waitForTimeout(700);
    status.revealed=await page.locator('[data-reveal].is-revealed').count(); assert.ok(status.revealed>0);
    status.brokenImages=await page.evaluate(()=>Array.from(document.images).filter(i=>i.complete&&!i.naturalWidth).map(i=>i.src)); assert.deepEqual(status.brokenImages,[]);
    if ([375,1440].includes(width)) { await page.evaluate(()=>scrollTo(0,0)); await page.waitForTimeout(500); await page.screenshot({path:`docs/screenshots/viewport-${width}.png`}); }
    results.push({width,heroAnimation,...status}); await page.close();
  }
  const mobile=await browser.newPage({viewport:{width:390,height:844}}); await mobile.goto(base); await mobile.getByRole('button',{name:'Menu',exact:true}).click();
  assert.equal(await mobile.getByRole('dialog',{name:'Site menu'}).isVisible(),true);
  await mobile.getByRole('button',{name:'Admissions',exact:true}).click(); assert.equal(await mobile.getByRole('link',{name:'Start Here',exact:true}).isVisible(),true);
  await mobile.keyboard.press('Escape'); assert.equal(await mobile.locator('.site-menu.is-closing .site-menu-body').evaluate(e => getComputedStyle(e).animationName),'site-menu-exit'); assert.equal(await mobile.getByRole('dialog',{name:'Site menu'}).count(),0); await mobile.waitForTimeout(300); assert.equal(await mobile.locator('.site-menu.is-closing').count(),0);
  assert.equal(await mobile.getByRole('button',{name:'Menu',exact:true}).evaluate(e=>document.activeElement===e),true);
  await mobile.getByRole('button',{name:'Open search'}).click(); await mobile.getByLabel('Search query').fill('admissions'); await mobile.getByRole('button',{name:'Search',exact:true}).click(); await mobile.waitForURL('**/#/search?q=admissions'); await mobile.waitForFunction(() => document.querySelector('h1')?.textContent?.trim() === 'Search'); assert.equal(await mobile.locator('h1').innerText(),'SEARCH');
  await mobile.goto(base+'/#/admissions/start-here'); await mobile.getByRole('button',{name:'Page Menu'}).click(); assert.equal(await mobile.getByRole('button',{name:'Page Menu'}).getAttribute('aria-expanded'),'true'); const date=mobile.locator('#process button[aria-expanded]').first(); assert.equal(await date.getAttribute('aria-expanded'),'true'); await date.click(); assert.equal(await date.getAttribute('aria-expanded'),'false'); await date.click(); assert.equal(await date.getAttribute('aria-expanded'),'true');
  await mobile.goto(base+'/#/admissions/how-to-apply'); assert.equal(await mobile.locator('h1').innerText(),'HOW TO APPLY');
  await mobile.goto(base); const next=mobile.getByRole('button',{name:'Next story'}); await next.scrollIntoViewIfNeeded(); await next.click(); await mobile.waitForTimeout(800); assert.equal(await mobile.locator('[aria-label="Story slides"] [aria-current="true"]').getAttribute('aria-label'),'Go to Character'); await mobile.locator('.story-track').screenshot({path:'docs/screenshots/carousel-390.png'}); await next.click(); await mobile.waitForTimeout(800); assert.equal(await mobile.locator('[aria-label="Story slides"] [aria-current="true"]').getAttribute('aria-label'),'Go to Community'); await next.click(); await mobile.waitForTimeout(800); assert.equal(await mobile.locator('[aria-label="Story slides"] [aria-current="true"]').getAttribute('aria-label'),'Go to Ambition'); await mobile.getByRole('button',{name:'Previous story'}).click(); await mobile.waitForTimeout(800); assert.equal(await mobile.locator('[aria-label="Story slides"] [aria-current="true"]').getAttribute('aria-label'),'Go to Community');
  const reduced=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});await reduced.goto(base);assert.equal(await reduced.locator('.hero-heading').evaluate(e=>getComputedStyle(e).animationName),'none');
  const motionPage=await browser.newPage({viewport:{width:1440,height:850}}); await motionPage.goto(base,{waitUntil:'domcontentloaded'}); const imageAnimation=await motionPage.locator('.hero-visual').evaluate(e => ({name:getComputedStyle(e).animationName, delay:getComputedStyle(e).animationDelay})); assert.equal(imageAnimation.name,'campus-reveal'); assert.equal(imageAnimation.delay,'0.2s'); await motionPage.waitForTimeout(1400); assert.equal(await motionPage.locator('.hero-visual').evaluate(e=>getComputedStyle(e).opacity),'1'); await motionPage.close();
  const desktopContext=await browser.newContext({viewport:{width:1600,height:900}}); const desktop=await desktopContext.newPage();await desktop.goto(base);await desktop.getByRole('button',{name:'Menu',exact:true}).click();await desktop.getByRole('dialog',{name:'Site menu'}).getByRole('button',{name:'Admissions',exact:true}).click();assert.equal(await desktop.getByRole('dialog',{name:'Site menu'}).getByRole('button',{name:'Admissions',exact:true}).getAttribute('aria-expanded'),'true');await desktop.keyboard.press('Escape');assert.equal(await desktop.getByRole('dialog',{name:'Site menu'}).count(),0);
  await desktop.getByRole('button',{name:'Next story'}).scrollIntoViewIfNeeded(); await desktop.getByRole('button',{name:'Next story'}).click(); await desktop.waitForTimeout(800); assert.equal(await desktop.locator('[aria-label="Story slides"] [aria-current="true"]').getAttribute('aria-label'),'Go to Character'); await desktop.locator('.story-track').focus(); await desktop.keyboard.press('ArrowRight'); await desktop.waitForTimeout(800); assert.equal(await desktop.locator('[aria-label="Story slides"] [aria-current="true"]').getAttribute('aria-label'),'Go to Community'); await desktop.locator('.story-track').screenshot({path:'docs/screenshots/carousel-1600.png'}); await desktop.waitForTimeout(1000); const axe=await new AxeBuilder({page:desktop}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']).analyze();
  assert.deepEqual(axe.violations.map(v=>v.id), [], 'homepage axe WCAG findings');
  console.log(JSON.stringify({results,interactions:'passed: drawer, nested menu, Escape, focus restore, search, page menu, direct hash route, carousel next, reduced motion, desktop menu', axe:axe.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.length})), errors,failedRequests:[...new Set(failedRequests)]},null,2));
  await browser.close(); if(errors.length) process.exitCode=1;
})().catch(e=>{console.error(e);process.exit(1)});
