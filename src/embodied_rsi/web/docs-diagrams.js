import {DOC_DIAGRAMS} from './docs-diagram-data.js';

const SVG_NS = 'http://www.w3.org/2000/svg';
const svgElement = (tag, attributes = {}, text) => {
  const element = document.createElementNS(SVG_NS, tag);
  Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value));
  if (text !== undefined) element.textContent = text;
  return element;
};
const element = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};
const button = (text, attributes = {}) => {
  const node = element('button', '', text);
  node.type = 'button';
  Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, value));
  return node;
};

function drawDiagram(graph, select) {
  const svg = svgElement('svg', {
    viewBox: `0 0 ${graph.width} ${graph.height}`,
    class: 'doc-diagram-svg', role: 'group', 'aria-label': graph.title,
  });
  const defs = svgElement('defs');
  for (const kind of ['flow', 'record', 'feedback', 'reject']) {
    const marker = svgElement('marker', {
      id: `doc-arrow-${graph.id}-${kind}`, viewBox: '0 0 10 10',
      refX: 9, refY: 5, markerWidth: 7, markerHeight: 7,
      orient: 'auto-start-reverse', markerUnits: 'strokeWidth',
    });
    marker.append(svgElement('path', {d: 'M 1 1 L 9 5 L 1 9 Z', class: `doc-arrow-fill ${kind}`}));
    defs.append(marker);
  }
  svg.append(defs);
  for (const group of graph.groups) {
    svg.append(svgElement('rect', {x: group.x, y: group.y, width: group.width, height: group.height, rx: 12, class: 'doc-graph-lane'}));
    svg.append(svgElement('text', {x: group.x + 18, y: group.y + 28, class: 'doc-graph-lane-title'}, group.title));
  }
  // Draw routes beneath nodes so the boxes keep a clear visual boundary.
  for (const edge of graph.edges) {
    const attrs = {
      d: edge.points.map(([x, y], index) => `${index ? 'L' : 'M'} ${x} ${y}`).join(' '),
      class: `doc-graph-edge ${edge.kind}`,
      'marker-end': `url(#doc-arrow-${graph.id}-${edge.kind})`,
    };
    if (edge.both) attrs['marker-start'] = attrs['marker-end'];
    svg.append(svgElement('path', attrs));
  }
  for (const edge of graph.edges.filter(edge => edge.label)) {
    const [x, y] = edge.at;
    svg.append(svgElement('text', {
      x, y, class: `doc-graph-edge-label ${edge.kind}`, 'text-anchor': 'middle',
      ...(edge.rotate ? {transform: `rotate(${edge.rotate} ${x} ${y})`} : {}),
    }, edge.label));
  }
  for (const [index, node] of graph.nodes.entries()) {
    const box = svgElement('foreignObject', {x: node.x, y: node.y, width: node.width, height: node.height});
    const control = button('', {'data-diagram-node': node.id, 'aria-pressed': 'false'});
    control.className = `doc-graph-node ${node.kind}`;
    const number = element('span', 'doc-graph-node-number', String(index + 1).padStart(2, '0'));
    number.setAttribute('aria-hidden', 'true');
    number.setAttribute('data-no-i18n', '');
    control.append(number, element('strong', 'doc-graph-node-title', node.title), element('span', 'doc-graph-node-hint', node.hint));
    control.addEventListener('click', () => select(graph, node));
    box.append(control);
    svg.append(box);
  }
  return svg;
}

export function mountDocDiagrams(root) {
  const home = root.querySelector('[data-doc-diagrams]');
  if (!home || home.firstElementChild) return;
  const viewer = element('div', 'doc-diagram-viewer');
  const tabs = element('div', 'doc-diagram-tabs');
  tabs.setAttribute('role', 'tablist');
  tabs.setAttribute('aria-label', '架构图类型');
  const toolbar = element('div', 'doc-diagram-toolbar');
  const controls = element('div', 'doc-diagram-controls');
  const zoomOut = button('−', {'aria-label': '缩小图表', 'data-diagram-zoom': 'out'});
  const zoomIn = button('+', {'aria-label': '放大图表', 'data-diagram-zoom': 'in'});
  const fit = button('适应宽度', {'data-diagram-zoom': 'fit'});
  const actual = button('100%', {'aria-label': '原始尺寸', 'data-diagram-zoom': 'actual'});
  const expand = button('展开图表', {'aria-haspopup': 'dialog', 'aria-controls': 'doc-diagram-dialog', 'data-diagram-expand': ''});
  const zoomLabel = element('output', 'doc-diagram-scale');
  zoomLabel.setAttribute('aria-label', '图表缩放');
  controls.append(zoomOut, zoomLabel, zoomIn, fit, actual, expand);
  toolbar.append(tabs, controls);
  const summary = element('p', 'doc-diagram-summary');
  const viewport = element('div', 'doc-diagram-viewport');
  viewport.tabIndex = 0;
  viewport.setAttribute('role', 'region');
  viewport.setAttribute('aria-label', '图表画布，可滚动查看');
  const legend = element('div', 'doc-diagram-legend');
  legend.setAttribute('aria-label', '图例');
  for (const [kind, text] of [['flow', '主流程'], ['record', '记录与产物'], ['feedback', '反馈 / 新局'], ['reject', '拒绝 / 未通过']]) {
    legend.append(element('span', kind, text));
  }
  const hint = element('p', 'doc-diagram-hint', '点击节点查看说明；放大后可滚动查看。');
  const detail = element('div', 'doc-diagram-detail');
  detail.setAttribute('aria-live', 'polite');
  const detailTitle = element('h4');
  const detailText = element('p');
  const detailSources = element('div', 'doc-source');
  detail.append(element('span', 'doc-diagram-detail-label', '当前节点'), detailTitle, detailText, detailSources);
  viewer.append(toolbar, summary, legend, viewport, hint, detail);
  home.append(viewer);
  const dialog = element('dialog', 'doc-diagram-dialog');
  dialog.id = 'doc-diagram-dialog';
  dialog.setAttribute('aria-label', '架构与流程图');
  home.after(dialog);

  let active = DOC_DIAGRAMS[0];
  let zoom = 1;
  let fitWidth = true;
  const panels = new Map();
  const tabButtons = [];
  const selected = new Map();
  const selectNode = (graph, node) => {
    selected.set(graph.id, node);
    const panel = panels.get(graph.id);
    panel.querySelectorAll('[data-diagram-node]').forEach(control => {
      control.setAttribute('aria-pressed', String(control.dataset.diagramNode === node.id));
    });
    detailTitle.textContent = node.title;
    detailText.textContent = node.detail;
    detailSources.replaceChildren(...node.files.map(path => {
      const code = element('code', '', path);
      code.setAttribute('data-doc-file', '');
      return code;
    }));
  };
  const applyScale = () => {
    if (fitWidth && viewport.clientWidth) zoom = Math.min(1.5, (viewport.clientWidth - 2) / active.width);
    const svg = panels.get(active.id).firstElementChild;
    svg.style.width = `${active.width * zoom}px`;
    svg.style.height = `${active.height * zoom}px`;
    zoomLabel.textContent = `${Math.round(zoom * 100)}%`;
    zoomOut.disabled = zoom <= .25;
    zoomIn.disabled = zoom >= 2;
    fit.setAttribute('aria-pressed', String(fitWidth));
  };
  const show = id => {
    active = DOC_DIAGRAMS.find(graph => graph.id === id);
    for (const tab of tabButtons) {
      const current = tab.dataset.diagramView === id;
      tab.setAttribute('aria-selected', String(current));
      tab.tabIndex = current ? 0 : -1;
    }
    for (const [key, panel] of panels) panel.hidden = key !== id;
    summary.textContent = active.summary;
    selectNode(active, selected.get(id) || active.nodes[0]);
    applyScale();
    viewport.scrollTo(0, 0);
  };
  for (const graph of DOC_DIAGRAMS) {
    const tab = button(graph.title, {
      role: 'tab', id: `doc-diagram-tab-${graph.id}`,
      'aria-controls': `doc-diagram-panel-${graph.id}`, 'data-diagram-view': graph.id,
    });
    tab.addEventListener('click', () => show(graph.id));
    tabButtons.push(tab);
    tabs.append(tab);
    const panel = element('div', 'doc-diagram-panel');
    panel.id = `doc-diagram-panel-${graph.id}`;
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', tab.id);
    panel.append(drawDiagram(graph, selectNode));
    panels.set(graph.id, panel);
    viewport.append(panel);
  }
  tabs.addEventListener('keydown', event => {
    const current = tabButtons.indexOf(document.activeElement);
    if (current < 0 || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabButtons.length - 1 :
      (current + (event.key === 'ArrowRight' ? 1 : -1) + tabButtons.length) % tabButtons.length;
    show(tabButtons[next].dataset.diagramView);
    tabButtons[next].focus({preventScroll: true});
  });
  const changeZoom = value => {
    const previous = zoom;
    fitWidth = false;
    zoom = Math.max(.25, Math.min(2, value));
    const x = (viewport.scrollLeft + viewport.clientWidth / 2) / previous;
    const y = (viewport.scrollTop + viewport.clientHeight / 2) / previous;
    applyScale();
    viewport.scrollTo(x * zoom - viewport.clientWidth / 2, y * zoom - viewport.clientHeight / 2);
  };
  zoomOut.onclick = () => changeZoom(zoom - .2);
  zoomIn.onclick = () => changeZoom(zoom + .2);
  actual.onclick = () => changeZoom(1);
  fit.onclick = () => {fitWidth = true; applyScale(); viewport.scrollTo(0, 0);};
  expand.onclick = () => {
    if (dialog.open) {dialog.close(); return;}
    dialog.append(viewer);
    expand.textContent = '收起图表';
    dialog.showModal();
    expand.focus({preventScroll: true});
    applyScale();
  };
  dialog.addEventListener('close', () => {
    home.append(viewer);
    expand.textContent = '展开图表';
    applyScale();
    expand.focus({preventScroll: true});
  });
  const resize = new ResizeObserver(() => {if (fitWidth) applyScale();});
  resize.observe(viewport);
  show(active.id);
}
