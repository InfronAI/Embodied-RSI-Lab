import {test,expect} from '@playwright/test';

async function watchWrites(page) {
  const writes=[],errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  await page.route('**/api/**',route=>{
    if(['GET','HEAD'].includes(route.request().method())) return route.continue();
    writes.push(route.request().url());
    return route.abort();
  });
  return {writes,errors};
}

async function remainingChinese(page) {
  return page.evaluate(()=>{
    const found=new Set(),skip='script,style,pre,code,textarea,[data-no-i18n],[data-i18n-literal],[translate="no"]';
    function scan(root) {
      const walker=document.createTreeWalker(root,NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_TEXT);
      while(walker.nextNode()) {
        const node=walker.currentNode;
        if(node.nodeType===1) {
          if(node.shadowRoot) scan(node.shadowRoot);
          if(!node.closest(skip)) for(const attr of ['title','aria-label','alt','placeholder','label']) {
            const text=node.getAttribute(attr);
            if(/[\u4e00-\u9fff]/.test(text||'')) found.add(text);
          }
        } else if(node.parentElement&&!node.parentElement.closest(skip)&&/[\u4e00-\u9fff]/.test(node.data)) found.add(node.data.trim());
      }
    }
    scan(document);return [...found].filter(Boolean);
  });
}

test('English default covers every workspace and report; language persists across reloads',async({page})=>{
  const activity=await watchWrites(page);
  await page.goto('/simulation');
  await expect(page.locator('html')).toHaveAttribute('lang','en');
  await expect(page.locator('.lab-tabs [role=tab]')).toHaveText(['Models','Model Test','Compare','Self-Evolving Training','Doc']);
  await expect(page.locator('#sim-control-mode')).toBeEnabled();
  for(const view of ['connections','experiment','comparison','docs','simulation']) {
    await page.locator(`.lab-tabs [data-lab-view="${view}"]`).click();
    await expect(page.locator('#lab-view-loading')).toBeHidden();
    if(view==='connections') await expect(page.locator('#lab-workbench #ext-search')).toBeVisible();
    await expect.poll(()=>remainingChinese(page)).toEqual([]);
  }
  await page.locator('[data-open-report]').click();
  await expect(page.locator('#lab-report #tv-status')).toContainText('Waiting');
  await expect.poll(()=>remainingChinese(page)).toEqual([]);
  await page.locator('#lab-language').selectOption('zh');
  await expect(page.locator('html')).toHaveAttribute('lang','zh-CN');
  await expect(page.locator('.lab-tabs [data-lab-view="simulation"]')).toHaveText('自主训练');
  await expect(page.locator('#lab-report .report-heading h2')).toHaveText('训练报告');
  await page.reload();
  await expect(page.locator('#lab-language')).toHaveValue('zh');
  await expect(page.locator('#lab-report #report-back')).toHaveText('回到实时画面 ↑');
  await page.locator('#lab-language').selectOption('en');
  await expect(page.locator('#lab-report #report-back')).toHaveText('Back to live view ↑');
  expect(activity).toEqual({writes:[],errors:[]});
});

test('language changes preserve entered values, model IDs, raw evidence, and selected controls',async({page})=>{
  const activity=await watchWrites(page);
  let sceneRequests=0;
  const backgroundRequests=[];
  page.on('request',request=>{
    const path=new URL(request.url()).pathname;
    if(['/api/simulation','/api/overview','/api/rounds','/api/lab/logs'].includes(path))backgroundRequests.push(path);
  });
  await page.route('**/workbench/api/scene',route=>{sceneRequests++;return route.continue();});
  // Model configuration must work before the 3D scene and experiment state are ready.
  let releaseState;
  const stateReady=new Promise(resolve=>{releaseState=resolve;});
  await page.route('**/workbench/api/state',async route=>{await stateReady;await route.continue();});
  await page.goto('/simulation#connections');
  const root=page.locator('#lab-workbench');
  await expect(root.locator('#ext-search')).toBeVisible();
  await root.locator('#ext-new-profile').click();
  await root.locator('#profile-name').fill('模型配置');
  await root.locator('#api-model').fill('custom/模型配置-v1');
  await root.locator('#api-key').fill('translation-test-placeholder');
  releaseState();
  const before=await root.locator('#api-provider').inputValue();
  await page.evaluate(()=>{
    const shadow=document.getElementById('lab-workbench').shadowRoot;
    const box=document.createElement('div');box.id='locale-fixture';
    box.innerHTML='<pre id="original-evidence">{"name":"模型配置"}</pre><select><option id="profile-copy" data-i18n-literal="模型配置 · custom/训练" data-i18n-suffix=" · 未配置" value="stable">模型配置 · custom/训练 · 未配置</option></select><span id="dynamic-status"></span>';
    shadow.append(box);
    window.testInput=shadow.getElementById('api-model');
  });
  await expect(root.locator('#profile-copy')).toHaveText('模型配置 · custom/训练 · Not configured');
  for(const lang of ['zh','en','zh','en']) {
    await page.evaluate(lang=>window.EmbodiedI18n.setLanguage(lang),lang);
    await expect(root.locator('#profile-name')).toHaveValue('模型配置');
    await expect(root.locator('#api-model')).toHaveValue('custom/模型配置-v1');
    await expect(root.locator('#api-key')).toHaveValue('translation-test-placeholder');
    await expect(root.locator('#api-provider')).toHaveValue(before);
    await expect(root.locator('[data-language-switch]')).toHaveValue(lang);
    await expect(root.locator('#original-evidence')).toHaveText('{"name":"模型配置"}');
    expect(await page.evaluate(()=>window.testInput===document.getElementById('lab-workbench').shadowRoot.getElementById('api-model'))).toBe(true);
  }
  await page.evaluate(()=>document.getElementById('lab-workbench').shadowRoot.getElementById('dynamic-status').textContent='第 5 轮 · 第 100 步 · 0.92');
  await expect(root.locator('#dynamic-status')).toHaveText('Round 5 · Step 100 · 0.92');
  await page.evaluate(()=>window.EmbodiedI18n.setLanguage('zh'));
  await expect(root.locator('#dynamic-status')).toHaveText('第 5 轮 · 第 100 步 · 0.92');
  expect(activity).toEqual({writes:[],errors:[]});
  expect(sceneRequests).toBe(0);
  expect(backgroundRequests).toEqual([]);
});

test('connections deep link never paints another workspace during delayed module loading',async({page})=>{
  await watchWrites(page);
  let release;const pending=new Promise(resolve=>{release=resolve;});
  await page.route('**/workbench/assets/lab-workbench.js',async route=>{await pending;await route.continue();});
  await page.addInitScript(()=>{
    window.wrongFrames=[];
    const check=()=>{
      if(location.hash==='#connections') {
        const visible=el=>el&&el.getClientRects().length&&getComputedStyle(el).visibility!=='hidden';
        const sim=document.getElementById('lab-simulation');
        const host=document.getElementById('lab-workbench');
        if(visible(sim)) window.wrongFrames.push('simulation');
        if(visible(host)&&visible(host.shadowRoot?.querySelector('.body-grid'))) window.wrongFrames.push('model test');
      }
      requestAnimationFrame(check);
    };requestAnimationFrame(check);
  });
  await page.goto('/simulation#connections',{waitUntil:'domcontentloaded'});
  await expect(page.locator('#lab-view-loading')).toContainText('Models');
  await expect(page.locator('#lab-simulation')).toBeHidden();
  await page.waitForTimeout(600);
  expect(await page.evaluate(()=>window.wrongFrames)).toEqual([]);
  release();
  await expect(page.locator('#lab-workbench #ext-search')).toBeVisible();
  await expect(page.locator('#lab-workbench .body-grid')).toBeHidden();
  expect(await page.evaluate(()=>window.wrongFrames)).toEqual([]);
});

test('language selection syncs between tabs and stays usable at 320px',async({page,context})=>{
  await watchWrites(page);
  await page.setViewportSize({width:320,height:900});
  await page.goto('/simulation');
  await expect(page.locator('#lab-language')).toBeVisible();
  const other=await context.newPage();await watchWrites(other);await other.goto('/simulation#report');
  await page.locator('#lab-language').selectOption('zh');
  await expect(other.locator('html')).toHaveAttribute('lang','zh-CN');
  await page.locator('#lab-language').selectOption('en');
  await expect(other.locator('html')).toHaveAttribute('lang','en');
  for(const view of ['connections','experiment','comparison','docs','simulation']) {
    await page.locator(`.lab-tabs [data-lab-view="${view}"]`).click();
    await expect(page.locator('#lab-view-loading')).toBeHidden();
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    const boxes=await page.locator('.lab-tabs button,#lab-language').evaluateAll(nodes=>nodes.map(el=>{const r=el.getBoundingClientRect();return {left:r.left,right:r.right};}));
    expect(boxes.every(box=>box.left>=0&&box.right<=320)).toBe(true);
  }
});

test('language preference falls back to English when browser storage is unavailable',async({page})=>{
  await page.addInitScript(()=>Object.defineProperty(window,'localStorage',{get(){throw new DOMException('Blocked','SecurityError');}}));
  await watchWrites(page);
  await page.goto('/simulation');
  await expect(page.locator('html')).toHaveAttribute('lang','en');
  await page.locator('#lab-language').selectOption('zh');
  await expect(page.locator('.lab-tabs [data-lab-view="simulation"]')).toHaveText('自主训练');
});
