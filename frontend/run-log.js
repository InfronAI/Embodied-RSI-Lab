

const categories = {
  runtime: "运行状态",
  observation: "观测",
  planning: "候选 / 规划",
  decision: "决策",
  model: "模型调用",
  safety: "安全检查",
  action: "动作",
  physics: "物理帧",
  evaluation: "结果判定",
  http: "页面请求",
};
const scopes = {
  workbench: "实验台",
  comparison: "模型对比",
  probe: "决策测试",
  connection: "连接测试",
};

export function createRunLog(before, {apiBase = ""} = {}) {
  const panel = document.createElement("section");
  panel.id = "run-log";
  panel.className = "run-log";
  panel.setAttribute("aria-label", "内部运行日志");
  panel.innerHTML = `
    <div class="run-log-heading">
      <button id="run-log-toggle" type="button" aria-expanded="true" aria-controls="run-log-body">⌄ <strong>运行日志</strong> <span>CONSOLE</span></button>
      <span id="run-log-status" role="status">正在连接日志流</span>
      <button id="run-log-pause" type="button" aria-pressed="false" title="只暂停日志刷新，机器人继续运行">暂停刷新</button>
      <button id="run-log-clear" type="button" title="清空当前视图，服务端保留的日志仍可导出">清空视图</button>
      <button id="run-log-copy" type="button" title="复制本页已接收且符合筛选条件的日志">复制筛选结果</button>
      <a id="run-log-export" href="${apiBase}/api/logs/export" download="embodied-jev-runtime.jsonl">导出 JSONL</a>
    </div>
    <div id="run-log-body">
      <div class="run-log-filters">
        <input id="run-log-search" type="search" aria-label="搜索运行日志" placeholder="搜索事件、实验 ID、输入或返回内容…">
        <select id="run-log-level" aria-label="日志级别"><option value="">全部级别</option><option value="debug">DEBUG 细节</option><option value="info">INFO 信息</option><option value="warning">WARN 警告</option><option value="error">ERROR 错误</option></select>
        <select id="run-log-category" aria-label="日志阶段"><option value="">全部阶段</option>${Object.entries(
          categories,
        )
          .map(([key, name]) => `<option value="${key}">${name}</option>`)
          .join("")}</select>
        <select id="run-log-scope" aria-label="日志来源"><option value="">全部来源</option>${Object.entries(
          scopes,
        )
          .map(([key, name]) => `<option value="${key}">${name}</option>`)
          .join("")}</select>
        <label><input id="run-log-follow" type="checkbox" checked>跟随最新</label>
        <span id="run-log-count">0 条</span>
      </div>
      <div id="run-log-entries" tabindex="0" aria-label="运行日志条目"></div>
      <div class="run-log-footnote"><span id="run-log-note">包含决策输入 / 返回与物理帧；密钥脱敏，图片仅记录摘要。最多保留 6,000 条 / 16 MiB。</span><span id="run-log-feedback" role="status"></span><button id="run-log-more" type="button" hidden>显示更早记录</button></div>
    </div>`;
  before.before(panel);
  const find = (id) => panel.querySelector(`#run-log-${id}`);
  const list = find("entries");
  let entries = [];
  let cursor = 0;
  let stream = null;
  let latest = 0;
  let clearedThrough = 0;
  let paused = false;
  let stopped = false;
  let follow = true;
  let displayLimit = 200;
  let timer;
  let inFlight = false;
  let dropped = 0;
  let signature = "";
  let controller;

  function filtered() {
    const search = find("search").value.trim().toLowerCase();
    const level = find("level").value;
    const category = find("category").value;
    const scope = find("scope").value;
    return entries.filter(
      ({ entry, searchable }) =>
        (!level || entry.level === level) &&
        (!category || entry.category === category) &&
        (!scope || entry.scope === scope) &&
        (!search || searchable.includes(search)),
    );
  }

  function rowFor({ entry }) {
    const row = document.createElement("details");
    row.className = `run-log-row ${["debug", "info", "warning", "error"].includes(entry.level) ? entry.level : "info"}`;
    row.dataset.logId = String(entry.id);
    const summary = document.createElement("summary");
    const parts = [
      [
        "run-log-time",
        new Date(entry.time).toLocaleTimeString(window.EmbodiedI18n.locale, { hour12: false }) +
          "." +
          String(new Date(entry.time).getMilliseconds()).padStart(3, "0"),
      ],
      ["run-log-badge", entry.level.toUpperCase()],
      ["run-log-event", entry.event],
      [
        "run-log-context",
        [
          scopes[entry.scope] || "服务",
          entry.lane_id,
          entry.episode_id && entry.episode_id.slice(0, 6),
          entry.cycle != null && `步 ${entry.cycle}`,
        ]
          .filter(Boolean)
          .join(" · "),
      ],
      ["run-log-message", entry.message],
    ];
    for (const [className, content] of parts) {
      const span = document.createElement("span");
      span.className = className;
      span.textContent = content;
      summary.append(span);
    }
    row.append(summary);
    row.addEventListener("toggle", () => {
      if (!row.open) return;
      follow = false;
      find("follow").checked = false;
      if (!row.querySelector("pre")) {
        const pre = document.createElement("pre");
        pre.textContent = JSON.stringify(entry, null, 2);
        row.append(pre);
      }
    });
    return row;
  }

  function render() {
    const matches = filtered();
    const visible = matches.slice(-displayLimit);
    find("count").textContent =
      `${matches.length.toLocaleString()} 条匹配 / ${entries.length.toLocaleString()} 条已接收`;
    find("more").hidden =
      matches.length <= displayLimit || displayLimit >= 1000;
    const nextSignature = `${clearedThrough}:${visible.map(({ entry }) => entry.id).join(",")}`;
    if (signature === nextSignature && list.childElementCount) return;
    signature = nextSignature;
    const existing = new Map(
      [...list.querySelectorAll("[data-log-id]")].map((row) => [
        row.dataset.logId,
        row,
      ]),
    );
    // Reuse open detail nodes and preserve the reader's scroll anchor.
    const anchor = [...list.children].find(
      (row) => row.offsetTop >= list.scrollTop + list.offsetTop,
    );
    const anchorId = anchor?.dataset.logId;
    const offset = anchor ? anchor.getBoundingClientRect().top : 0;
    const fragment = document.createDocumentFragment();
    for (const item of visible)
      fragment.append(existing.get(String(item.entry.id)) || rowFor(item));
    if (!visible.length) {
      const empty = document.createElement("p");
      empty.className = "run-log-empty";
      empty.textContent = entries.length
        ? "没有符合筛选条件的日志。"
        : "等待新的运行日志；开始实验后会持续输出内部步骤。";
      fragment.append(empty);
    }
    list.replaceChildren(fragment);
    if (follow) list.scrollTop = list.scrollHeight;
    else if (anchorId) {
      const retained = existing.get(anchorId);
      if (retained?.isConnected)
        list.scrollTop += retained.getBoundingClientRect().top - offset;
    }
  }

  function showStatus(message, failed = false) {
    find("status").textContent = message;
    find("status").classList.toggle("failed", failed);
  }

  async function poll() {
    if (stopped || inFlight || paused) return;
    inFlight = true;
    let more = false;
    controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    try {
      const response = await fetch(`${apiBase}/api/logs?after=${cursor}&limit=250`, {
        signal: controller.signal,
        cache: "no-store",
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const result = await response.json();
      if (stopped || paused) return;
      if (stream && stream !== result.stream_id) {
        entries = [];
        cursor = latest = clearedThrough = 0;
        signature = "";
        stream = result.stream_id;
        more = true;
        showStatus("服务已重启，重新读取日志");
        return;
      }
      stream = result.stream_id;
      latest = result.latest;
      cursor = result.next_cursor;
      dropped = result.dropped;
      entries = entries.filter(
        ({ entry }) => entry.id >= result.oldest && entry.id > clearedThrough,
      );
      for (const entry of result.entries) {
        if (entry.id > clearedThrough)
          entries.push({
            entry,
            searchable: JSON.stringify(entry).toLowerCase(),
          });
      }
      more = result.has_more;
      showStatus(more ? "正在追赶日志…" : "● 实时连接");
      find("note").textContent =
        `物理帧按约 25 Hz 输出；密钥脱敏，图片仅记录摘要。保留上限 6,000 条 / 16 MiB。${dropped ? `已轮转 ${dropped.toLocaleString()} 条旧记录。` : ""}`;
      render();
    } catch (error) {
      if (!stopped && !paused)
        showStatus(
          `日志连接中断，自动重试（${error.name === "AbortError" ? "超时" : error.message}）`,
          true,
        );
    } finally {
      clearTimeout(timeout);
      inFlight = false;
      if (!stopped && !paused)
        timer = setTimeout(poll, more ? 30 : document.hidden ? 3000 : 650);
    }
  }

  for (const id of ["search", "level", "category", "scope"]) {
    find(id).addEventListener(id === "search" ? "input" : "change", () => {
      displayLimit = 200;
      render();
    });
  }
  find("follow").addEventListener("change", (event) => {
    follow = event.target.checked;
    if (follow) list.scrollTop = list.scrollHeight;
  });
  find("toggle").addEventListener("click", () => {
    const open = find("body").hidden;
    find("body").hidden = !open;
    find("toggle").setAttribute("aria-expanded", String(open));
    panel.classList.toggle("collapsed", !open);
    if (open && follow) list.scrollTop = list.scrollHeight;
  });
  find("pause").addEventListener("click", () => {
    paused = !paused;
    clearTimeout(timer);
    find("pause").textContent = paused ? "恢复刷新" : "暂停刷新";
    find("pause").setAttribute("aria-pressed", String(paused));
    showStatus(paused ? "已暂停刷新 · 仿真继续运行" : "正在恢复日志");
    if (!paused) poll();
  });
  find("clear").addEventListener("click", () => {
    clearedThrough = latest;
    entries = [];
    render();
    find("feedback").textContent = "已清空视图，服务端记录仍可导出。";
  });
  find("copy").addEventListener("click", async () => {
    const matches = filtered();
    try {
      await navigator.clipboard.writeText(
        matches.map(({ entry }) => JSON.stringify(entry)).join("\n"),
      );
      find("feedback").textContent = `已复制 ${matches.length} 条筛选结果。`;
    } catch {
      find("feedback").textContent = "浏览器未允许复制，请使用导出 JSONL。";
    }
  });
  find("more").addEventListener("click", () => {
    follow = false;
    find("follow").checked = false;
    displayLimit = Math.min(1000, displayLimit + 200);
    render();
  });
  window.addEventListener("pagehide", () => {
    stopped = true;
    clearTimeout(timer);
    controller?.abort();
  });
  window.addEventListener("pageshow", () => {
    if (!stopped) return;
    stopped = false;
    poll();
  });
  poll();
  return panel;
}
