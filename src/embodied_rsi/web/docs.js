import {mountDocDiagrams} from './docs-diagrams.js';

export function mountDocs(root) {
  mountDocDiagrams(root);
  const toc = [...root.querySelectorAll('.doc-toc [data-doc-section]')];
  const chapters = [...root.querySelectorAll('[data-doc-chapter]')];
  const anchors = [...root.querySelectorAll('[data-doc-chapter],.doc-subsection')];
  let readingAnchor = anchors[0];
  const activate = id => toc.forEach(button => {
    if (button.dataset.docSection === id) button.setAttribute('aria-current', 'location');
    else button.removeAttribute('aria-current');
  });
  const go = id => {
    const target = root.querySelector(`#doc-${id}`);
    if (!target) return;
    readingAnchor = target;
    target.scrollIntoView({block: 'start', behavior: 'instant'});
    target.querySelector('h2,h3')?.focus({preventScroll: true});
    activate(target.closest('[data-doc-chapter]').dataset.docChapter);
  };
  root.querySelectorAll('[data-doc-section],[data-doc-jump]').forEach(button => {
    button.onclick = event => {
      event.preventDefault();
      go(button.dataset.docSection || button.dataset.docJump);
    };
  });
  let queued = false;
  const onScroll = () => {
    if (queued || root.hidden) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      const top = Math.max(root.getBoundingClientRect().top, 0) + 80;
      const current = chapters.findLast(chapter => chapter.getBoundingClientRect().top <= top);
      readingAnchor = anchors.findLast(anchor => anchor.getBoundingClientRect().top <= top) || anchors[0];
      activate(current?.dataset.docChapter || 'background');
    });
  };
  root.addEventListener('scroll', onScroll, {passive: true});
  window.addEventListener('scroll', onScroll, {passive: true});
  window.addEventListener('lab-language-change', () => {
    if (root.hidden) return;
    const target = readingAnchor;
    if (target) requestAnimationFrame(() => {
      target.scrollIntoView({block: 'start', behavior: 'instant'});
    });
  });
  root.querySelectorAll('[data-doc-copy]').forEach(button => {
    button.onclick = async () => {
      const command = root.querySelector(`#${button.dataset.docCopy}`);
      const status = root.querySelector('#doc-copy-status');
      try {
        await navigator.clipboard.writeText(command.textContent);
        status.textContent = '已复制命令';
        button.textContent = '已复制命令';
        setTimeout(() => {button.textContent = '复制命令';}, 2000);
      } catch {
        const range = document.createRange();
        range.selectNodeContents(command);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        command.focus();
        status.textContent = '无法自动复制，请选中命令后复制。';
      }
    };
  });
}
