const host = document.getElementById("lab-process-log");
host.innerHTML = `
  <div class="compact-section-head"><h2>全过程日志</h2><span id="lab-log-count">连接中</span></div>
  <p class="lab-log-stages">感知 → 决策 → 轨迹过滤 → 拟合训练 → 评测 → 部署</p>
  <div class="lab-log-filters">
    <select id="lab-log-phase" aria-label="日志过程">
      <option value="all">全部过程</option><option value="perception">感知探测</option>
      <option value="decision">决策选择</option><option value="filter">轨迹过滤</option>
      <option value="training">拟合训练</option><option value="evaluation">独立评测</option>
      <option value="deployment">模型部署</option><option value="action">物理执行</option>
      <option value="system">系统状态</option>
    </select>
    <input id="lab-log-run" aria-label="按运行 ID 筛选日志" placeholder="运行 ID（可选）" style="grid-column:auto">
    <input id="lab-log-query" type="search" aria-label="搜索全过程日志" placeholder="搜索模型、步骤、场景或失败原因">
  </div>
  <div class="lab-log-toolbar">
    <button id="lab-log-pause" aria-pressed="false">暂停刷新</button>
    <button id="lab-log-latest">回到最新</button>
    <a id="lab-log-export" download>导出全部 JSONL</a>
  </div>
  <p id="lab-log-status" role="status">读取持久化记录…</p>
  <div id="lab-log-list"></div>
  <div class="lab-log-pager">
    <button id="lab-log-newer" disabled>较新记录</button>
    <button id="lab-log-older">较早记录</button>
  </div>
`;
const $ = id => document.getElementById(id);
const trainingHidden = () => document.hidden || (document.documentElement.dataset.activeView && document.documentElement.dataset.activeView !== "simulation");
let entries = [], cursor = 0, more = false, paused = false, generation = 0, busy = false;
let history = [null], page = 0, timer, filterTimer;
function filters() {
  return new URLSearchParams({
    phase: $("lab-log-phase").value,
    run: $("lab-log-run").value.trim(),
    search: $("lab-log-query").value.trim(),
  });
}
function render() {
  $("lab-log-count").textContent = `${entries.length} 条`;
  $("lab-log-export").href = "/api/lab/logs/export?" + filters();
  $("lab-log-newer").disabled = page === 0;
  $("lab-log-older").disabled = !more || !entries.length;
  const list = $("lab-log-list");
  const existing = new Map([...list.children].map(el => [Number(el.dataset.seq), el]));
  const fragment = document.createDocumentFragment();
  for (const entry of entries) {
    let el = existing.get(entry.seq);
    if (!el) {
      el = document.createElement("details");
      el.className = "lab-log-row";
      el.dataset.seq = entry.seq;
      el.dataset.level = entry.level;
      const summary = document.createElement("summary");
      const time = document.createElement("time");
      time.textContent = new Date(entry.ts * 1000).toLocaleString(window.EmbodiedI18n.locale, {hour12:false});
      const title = document.createElement("b");
      title.textContent = entry.phase_name + " · " + entry.message;
      const context = document.createElement("small");
      const p = entry.payload;
      const meta = p.details || p;
      context.textContent = [
        entry.run_id, p.model_version || p.model || entry.backend,
        meta.step != null ? `步 ${meta.step}` : "",
        meta.seed != null ? `场景 ${meta.seed}` : "",
        meta.reason || meta.rejection || "",
      ].filter(Boolean).join(" · ");
      summary.append(time, title, context);
      el.append(summary);
      el.addEventListener("toggle", () => {
        if (el.open && !el.querySelector("pre")) {
          const pre = document.createElement("pre");
          pre.textContent = JSON.stringify(entry, null, 2);
          el.append(pre);
        }
      });
    }
    fragment.append(el);
  }
  if (!entries.length) {
    const empty = document.createElement("p");
    empty.textContent = "暂无匹配记录。流程实际执行后，会在这里出现。";
    fragment.append(empty);
  }
  list.replaceChildren(fragment);
}
async function fetchPage(reset = false) {
  clearTimeout(timer);
  if (trainingHidden()) {timer = setTimeout(() => fetchPage(reset), 1500); return;}
  const token = ++generation;
  busy = true;
  const query = filters();
  query.set("limit", "100");
  query.set("newest", "true");
  if (history[page]) query.set("before", history[page]);
  try {
    const response = await fetch("/api/lab/logs?" + query, {cache:"no-store", signal:AbortSignal.timeout(15000)});
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    if (token !== generation) return;
    entries = data.entries;
    cursor = data.next_cursor;
    more = data.has_more;
    render();
    status();
  } catch (error) {
    if (token === generation) $("lab-log-status").textContent = `日志暂不可用：${error.message}，自动重试。`;
  } finally {
    if (token === generation) {
      busy = false;
      timer = setTimeout(poll, 1500);
    }
  }
}
function status() {
  $("lab-log-status").textContent = (paused ? "视图已暂停" : page ? "正在查看历史" : "实时更新") +
    " · 记录保存在服务器，刷新不丢失。每页 100 条，可翻页或导出全部；展开查看完整字段。";
}
async function poll() {
  if (busy || paused || page || trainingHidden()) {
    timer = setTimeout(poll, 1500); return;
  }
  busy = true;
  const token = generation;
  try {
    const query = filters();
    query.set("after", cursor);
    query.set("limit", "250");
    const response = await fetch("/api/lab/logs?" + query, {cache:"no-store", signal:AbortSignal.timeout(15000)});
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    if (token !== generation) return;
    if (data.entries.length) {
      cursor = data.next_cursor;
      const combined = [...data.entries.reverse(), ...entries];
      more ||= combined.length > 100;
      entries = combined.slice(0, 100);
      render();
    } else {
      cursor = Math.max(cursor, data.latest);
    }
    status();
    timer = setTimeout(poll, data.has_more ? 50 : 1500);
  } catch (error) {
    if (token === generation) $("lab-log-status").textContent = `日志连接中断：${error.message}，自动重试。`;
    timer = setTimeout(poll, 3000);
  } finally {busy = false;}
}
function reset() {history = [null]; page = 0; fetchPage(true);}
$("lab-log-phase").onchange = reset;
for (const id of ["lab-log-run", "lab-log-query"]) $(id).oninput = () => {
  clearTimeout(filterTimer); filterTimer = setTimeout(reset, 250);
};
$("lab-log-latest").onclick = () => {paused = false; $("lab-log-pause").textContent = "暂停刷新"; $("lab-log-pause").setAttribute("aria-pressed", "false"); reset();};
$("lab-log-pause").onclick = () => {
  paused = !paused;
  $("lab-log-pause").textContent = paused ? "恢复刷新" : "暂停刷新";
  $("lab-log-pause").setAttribute("aria-pressed", String(paused));
  status();
};
$("lab-log-older").onclick = () => {
  history = history.slice(0, page + 1);
  history.push(Math.min(...entries.map(e => e.seq)));
  page++; fetchPage();
};
$("lab-log-newer").onclick = () => {if (page) {page--; fetchPage();}};
fetchPage();
