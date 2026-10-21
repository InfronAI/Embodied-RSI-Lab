/* Shared by the shell, the report, and the model workbench's shadow root.
 * Translate presentation text only: never input values, requests, or raw evidence.
 * Remember source text per node so language changes do not destroy the originals.
 */
(() => {
  if (globalThis.EmbodiedI18n) return;
  const STORAGE_KEY = 'embodied-lab-language';
  const messages = globalThis.EmbodiedMessages || [];
  const normalize = value => value.replace(/\s+/g, ' ').trim();
  const exact = new Map(), reverse = new Map();
  const patterns = [];
  const escape = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  for (const [zh, en] of messages) {
    exact.set(normalize(zh), en);
    if (!reverse.has(normalize(en))) reverse.set(normalize(en), zh);
    if (/\{\d+\}/.test(zh)) {
      const slots = [...zh.matchAll(/\{(\d+)\}/g)].map(match => match[1]);
      const pieces = zh.split(/\{\d+\}/);
      let expression=escape(pieces[0]);
      for(let i=0;i<slots.length;i++) {
        const numeric=/第\s*$/.test(pieces[i]) || /^\s*(?:条|个|帧|局|次|组|层|点|样本|tokens|ms)(?:[^\u3400-\u9fff]|$)/.test(pieces[i+1]);
        expression+=(numeric?'([0-9.,+eE%/×: −—-]+)':'([\\s\\S]*?)')+escape(pieces[i+1]);
      }
      const regex=new RegExp('^'+expression+'$');
      patterns.push({regex, slots, en, weight:zh.replace(/\{\d+\}/g, '').length});
    }
  }
  for(const [en,zh] of Object.entries({
    READY:'就绪',LOADING:'加载中',STANDBY:'待命',LIVE:'实时','● LIVE':'● 实时',
    OPEN:'张开',CLOSED:'闭合',ON:'开启',OFF:'关闭',YES:'是',NO:'否',RUNNING:'运行中',
    PAUSED:'已暂停',COMPLETED:'已完成',STOPPED:'已停止',FAILED:'失败',
    'RULE BASELINE':'规则基线',FEEDBACK:'反馈','MODEL CONNECTION':'模型连接',
    'EPISODE TIMELINE':'本局时间轴','WORLD / m':'世界坐标 / m',TRANSFER:'搬运入盘',
    STACK:'方块堆叠',BARRIER:'越障搬运',COMMAND:'指令',OBSERVATION:'观测',CONSOLE:'控制台',
  })) reverse.set(en,zh);
  patterns.sort((a,b) => b.weight-a.weight);
  let language = 'en';
  try {if (localStorage.getItem(STORAGE_KEY) === 'zh') language = 'zh';} catch {}
  const roots = new Map(), nodes = new WeakMap(), attributes = new WeakMap();
  const ignored = 'script,style,pre,code,textarea,[data-no-i18n],[data-i18n-literal],[translate="no"],[contenteditable]';
  const attrs = ['title','placeholder','aria-label','alt','aria-description','label'];
  const missing = new Set();
  function translate(value, depth=0) {
    if (value == null) return '';
    const text = String(value), key = normalize(text);
    if (!key || depth>8) return text;
    let result;
    if (language === 'zh') result = reverse.get(key) || key;
    else if (exact.has(key)) result = exact.get(key);
    else if (/[\u3400-\u9fff]/.test(key)) {
      for (const {regex,slots,en} of patterns) {
        const match = key.match(regex);
        if (!match) continue;
        const values = Object.fromEntries(slots.map((slot,i) => [slot,translate(match[i+1],depth+1)]));
        result = en.replace(/\{(\d+)\}/g, (_,slot) => values[slot]);
        break;
      }
      if (result === undefined) {
        const decorated=key.match(/^([●✓✗▶Ⅱ■＋▸▾◇◈◉▤]\s*)(.+)$/);
        const sentences=key.match(/[^。！？]+[。！？]?/g) || [];
        const compounds=key.split(/(\s*[·•→|]\s*)/);
        const parts=key.split(/([：；]\s*)/);
        const bracket=key.match(/^(.*?)[（(]([^()（）]*)[）)](.*)$/);
        const metric=key.match(/^(.+?)\s+([0-9.,+%/−—-]+)$/);
        if(compounds.length>1) result=compounds.map((part,i)=>i%2?part:translate(part,depth+1)).join('');
        else if(decorated) result=decorated[1]+translate(decorated[2],depth+1);
        else if(sentences.length>1) result=sentences.map(part=>translate(part,depth+1).trim()).join(' ');
        else if(parts.length>1) result=parts.map((part,i)=>i%2 ? part.replace('：',': ').replace('；','; ') : translate(part,depth+1)).join('');
        else if(bracket) result=translate(bracket[1],depth+1)+' ('+translate(bracket[2],depth+1)+')'+translate(bracket[3],depth+1);
        else if(metric) result=translate(metric[1],depth+1)+' '+metric[2];
        else {missing.add(key); result=key;}
      }
    } else result = key;
    const leading = text.match(/^\s*/)[0], trailing = text.match(/\s*$/)[0];
    return leading + result + trailing;
  }
  function excluded(element) {return !element || !!element.closest(ignored);}
  function translateNode(node) {
    if (excluded(node.parentElement)) return;
    const old=nodes.get(node), current=node.data;
    const source=old && current===old.rendered ? old.source : current;
    const rendered=translate(source);
    nodes.set(node,{source,rendered});
    if (rendered!==current) node.data=rendered;
  }
  function translateAttributes(element) {
    if(element.hasAttribute('data-i18n-literal')) {
      const value=element.dataset.i18nLiteral+translate(element.dataset.i18nSuffix||'');
      if(element.textContent!==value) element.textContent=value;
      return;
    }
    if (excluded(element)) return;
    let saved=attributes.get(element);
    if (!saved) {saved=new Map(); attributes.set(element,saved);}
    for (const attr of attrs) {
      if (!element.hasAttribute(attr)) continue;
      const current=element.getAttribute(attr),old=saved.get(attr);
      const source=old && current===old.rendered ? old.source : current;
      const rendered=translate(source);
      saved.set(attr,{source,rendered});
      if (current!==rendered) element.setAttribute(attr,rendered);
    }
    if (element.matches('[data-language-switch]')) element.value=language;
  }
  function scan(root) {
    if (root.nodeType===Node.TEXT_NODE) {translateNode(root); return;}
    // Language names stay literal, but newly mounted selectors still reflect the saved language.
    if (root.matches?.('[data-language-switch]')) root.value=language;
    root.querySelectorAll?.('[data-language-switch]').forEach(select=>{select.value=language;});
    if (root.nodeType===Node.ELEMENT_NODE && root.hasAttribute('data-i18n-literal')) {translateAttributes(root);return;}
    if (root.nodeType===Node.ELEMENT_NODE && excluded(root)) return;
    if (root.nodeType===Node.ELEMENT_NODE) translateAttributes(root);
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_TEXT,{
      acceptNode(node) {
        if (node.nodeType===Node.ELEMENT_NODE && node.matches(ignored) && !node.hasAttribute('data-i18n-literal')) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    while(walker.nextNode()) {
      const node=walker.currentNode;
      if(node.nodeType===Node.TEXT_NODE) translateNode(node); else translateAttributes(node);
    }
  }
  function syncLanguage() {
    document.documentElement.lang=language==='zh'?'zh-CN':'en';
    document.documentElement.dataset.language=language;
    for(const root of roots.keys()) {
      if(root.host) root.host.lang=document.documentElement.lang;
      scan(root);
      root.querySelectorAll('[data-language-switch]').forEach(select=>{select.value=language;});
    }
  }
  function setLanguage(value,{persist=true}={}) {
    if (!['en','zh'].includes(value)) return;
    language=value;
    if(persist) try {localStorage.setItem(STORAGE_KEY,value);} catch {}
    syncLanguage();
    window.dispatchEvent(new CustomEvent('lab-language-change',{detail:{language}}));
  }
  function observe(root=document) {
    if(roots.has(root)) return;
    const observer=new MutationObserver(records=>{
      for(const record of records) {
        if(record.type==='characterData') translateNode(record.target);
        else if(record.type==='attributes') translateAttributes(record.target);
        else for(const node of record.addedNodes) if(node.isConnected) scan(node);
      }
    });
    roots.set(root,observer);
    observer.observe(root,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:[...attrs,"data-i18n-literal","data-i18n-suffix"]});
    root.addEventListener('change',event=>{
      if(event.target.matches?.('[data-language-switch]')) setLanguage(event.target.value);
    });
    syncLanguage();
  }
  globalThis.EmbodiedI18n={
    t:translate,observe,setLanguage,missing,
    get language(){return language;},
    get locale(){return language==='zh'?'zh-CN':'en-US';},
    sourceText(element){return [...element.childNodes].map(node=>nodes.get(node)?.source||node.textContent).join('');},
  };
  observe(document);
  window.addEventListener('storage',event=>{
    if(event.key===STORAGE_KEY) setLanguage(event.newValue==='zh'?'zh':'en',{persist:false});
  });
})();
