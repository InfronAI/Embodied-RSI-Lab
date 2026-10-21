import {test,expect} from '@playwright/test';
import {access} from 'node:fs/promises';
import path from 'node:path';

test('Doc opens directly without loading a model workbench, localizes, and navigates its chapters',async({page})=>{
  const errors=[],writes=[],workbench=[];
  page.on('pageerror',error=>errors.push(error.message));
  page.on('request',request=>{
    if(request.url().includes('/workbench/assets/')) workbench.push(request.url());
  });
  await page.route('**/api/**',route=>{
    if(['GET','HEAD'].includes(route.request().method())) return route.continue();
    writes.push(route.request().url());return route.abort();
  });
  await page.goto('/simulation#docs');
  const docs=page.locator('#lab-docs');
  await expect(docs.locator('h1')).toHaveText('Project documentation');
  await expect(page.locator('#lab-simulation')).toBeHidden();
  await expect(page.locator('#lab-workbench')).toBeHidden();
  await expect(docs.locator('[data-doc-chapter]')).toHaveCount(9);
  await expect(docs.locator('[data-doc-chapter]').first()).toHaveAttribute('data-doc-chapter','background');
  await expect(docs.locator('#doc-background-title')).toContainText('Project background');
  await expect(docs.locator('#doc-background a[href="https://github.com/FBddcz/embodied-jev"]')).toHaveText('embodied_jev');
  await expect(docs.locator('#doc-background a[href="https://github.com/gaohuan2020/embodied-rsi"]')).toHaveAttribute('target','_blank');
  expect(workbench).toEqual([]);
  const references=await docs.locator('[data-doc-file]').allTextContents();
  for(const reference of new Set(references)) await access(path.resolve(reference));
  await docs.locator('.doc-toc [data-doc-section="architecture"]').click();
  await docs.locator('[data-doc-jump="architecture-actions"]').click();
  await expect(docs.locator('#doc-architecture-actions-title')).toBeFocused();
  await expect(docs.locator('.doc-toc [data-doc-section="architecture"]')).toHaveAttribute('aria-current','location');
  await page.locator('#lab-language').selectOption('zh');
  await expect(docs.locator('#doc-architecture-actions-title')).toContainText('三种动作模式');
  await expect.poll(()=>docs.locator('#doc-architecture-actions-title').evaluate(el=>{
    const r=el.getBoundingClientRect();return r.top>=0&&r.bottom<=innerHeight;
  })).toBe(true);
  await page.locator('#lab-language').selectOption('en');
  const command=await docs.locator('#doc-install-command').textContent();
  await docs.locator('[data-doc-jump="install"]').click();
  await expect(docs.locator('#doc-install-title')).toBeFocused();
  expect(await docs.locator('#doc-install-title').evaluate(el=>{
    const r=el.getBoundingClientRect();return r.top>=0&&r.bottom<=innerHeight;
  })).toBe(true);
  await page.locator('#lab-language').selectOption('zh');
  await expect(docs.locator('h1')).toHaveText('项目文档');
  await expect(docs.locator('#doc-install-title')).toContainText('安装与运行');
  await expect(docs.locator('#doc-install-command')).toHaveText(command);
  await page.locator('#lab-language').selectOption('en');
  await docs.locator('[data-doc-jump="install-web"]').click();
  await expect(docs.locator('#doc-install-web-title')).toBeFocused();
  await expect(docs.locator('#doc-web-command')).toHaveText('npm ci\nnpm run build');
  await expect(docs.locator('#doc-learning-title')).toContainText('Self-evolving training');
  await docs.locator('.doc-toc [data-doc-section="learning"]').click();
  await docs.locator('.doc-stage').nth(3).locator('summary').click();
  await expect(docs.locator('.doc-stage').nth(3)).toContainText('95%');
  await page.reload();
  await expect(page.locator('.lab-tabs [data-lab-view="docs"]')).toHaveAttribute('aria-selected','true');
  await expect(docs.locator('h1')).toHaveText('Project documentation');
  await docs.locator('a[href="#connections"]').click();
  await expect(page.locator('#lab-workbench #ext-search')).toBeVisible();
  await expect(docs).toBeHidden();
  expect({errors,writes}).toEqual({errors:[],writes:[]});
});

test('Doc command copy preserves executable text and mobile chapters remain readable',async({page,context})=>{
  await context.grantPermissions(['clipboard-read','clipboard-write']);
  await page.setViewportSize({width:320,height:900});
  await page.goto('/simulation#docs');
  const docs=page.locator('#lab-docs');
  await expect(docs.locator('h1')).toBeVisible();
  await docs.locator('[data-doc-jump="install"]').click();
  const source=await docs.locator('#doc-install-command').textContent();
  await docs.locator('[data-doc-copy="doc-install-command"]').click();
  expect(await page.evaluate(()=>navigator.clipboard.readText())).toBe(source);
  await expect(docs.locator('#doc-copy-status')).toHaveText('Commands copied');
  for(const language of ['zh','en']) {
    await page.locator('#lab-language').selectOption(language);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    const titles=await docs.locator('h2').evaluateAll(nodes=>nodes.map(node=>{
      const r=node.getBoundingClientRect();return r.left>=0&&r.right<=innerWidth;
    }));
    expect(titles.every(Boolean)).toBe(true);
  }
  await docs.locator('.doc-end [data-doc-section="background"]').click();
  await expect(docs.locator('#doc-background-title')).toBeFocused();
});

test('architecture diagrams support node inspection, zoom, keyboard tabs, expansion, and language changes',async({page})=>{
  const errors=[],writes=[];
  page.on('pageerror',error=>errors.push(error.message));
  await page.route('**/api/**',route=>{
    if(['GET','HEAD'].includes(route.request().method())) return route.continue();
    writes.push(route.request().url());return route.abort();
  });
  await page.goto('/simulation#docs');
  const docs=page.locator('#lab-docs');
  await docs.locator('.doc-toc [data-doc-section="architecture"]').click();
  await docs.locator('[data-doc-jump="architecture-diagrams"]').click();
  await expect(docs.locator('[data-diagram-view="business"]')).toHaveAttribute('aria-selected','true');
  await expect(docs.locator('#doc-diagram-panel-system')).toBeHidden();
  await docs.locator('[data-diagram-view="data"]').click();
  await docs.locator('[data-diagram-node="d-execute"]').click();
  await expect(docs.locator('.doc-diagram-detail h4')).toHaveText('Preview and physical execution');
  await expect(docs.locator('.doc-diagram-detail')).toContainText('executed');
  await expect(docs.locator('.doc-diagram-detail')).toContainText('src/embodied_jev/physics.py');
  await docs.locator('[data-diagram-zoom="actual"]').click();
  await expect(docs.locator('.doc-diagram-scale')).toHaveText('100%');
  await docs.locator('[data-diagram-zoom="in"]').click();
  await expect(docs.locator('.doc-diagram-scale')).toHaveText('120%');
  await docs.locator('[data-diagram-expand]').click();
  await expect(docs.locator('#doc-diagram-dialog')).toBeVisible();
  await expect(docs.locator('#doc-diagram-dialog [data-diagram-node="d-execute"]')).toHaveAttribute('aria-pressed','true');
  await page.keyboard.press('Escape');
  await expect(docs.locator('#doc-diagram-dialog')).not.toBeVisible();
  await expect(docs.locator('[data-doc-diagrams] [data-diagram-expand]')).toBeFocused();
  await docs.locator('[data-diagram-view="data"]').focus();
  await page.keyboard.press('ArrowLeft');
  await expect(docs.locator('[data-diagram-view="system"]')).toBeFocused();
  await expect(docs.locator('[data-diagram-view="system"]')).toHaveAttribute('aria-selected','true');
  await page.locator('#lab-language').selectOption('zh');
  await expect(docs.locator('[data-diagram-view="system"]')).toHaveText('系统架构流程图');
  await docs.locator('[data-diagram-view="data"]').click();
  await expect(docs.locator('.doc-diagram-detail h4')).toHaveText('预演与物理执行');
  await page.setViewportSize({width:320,height:900});
  for(const language of ['zh','en']) {
    await page.locator('#lab-language').selectOption(language);
    for(const id of ['business','system','data']) {
      await docs.locator(`[data-diagram-view="${id}"]`).click();
      await docs.locator('[data-diagram-zoom="fit"]').click();
      expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    }
  }
  await docs.locator('[data-diagram-expand]').click();
  const dialog=docs.locator('#doc-diagram-dialog');
  expect(await dialog.evaluate(el=>el.getBoundingClientRect().right<=innerWidth)).toBe(true);
  await docs.locator('[data-diagram-expand]').click();
  await expect(dialog).not.toBeVisible();
  expect({errors,writes}).toEqual({errors:[],writes:[]});
});
