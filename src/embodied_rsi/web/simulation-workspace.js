/* Read-only inspectors over the existing simulation, rounds and event APIs. */
(() => {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const escape = (value) =>
    String(value ?? "").replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
  const number = (value, digits = 3) =>
    Number.isFinite(value) ? value.toFixed(digits) : "—";
  const percent = (value) =>
    Number.isFinite(value) ? `${(value * 100).toFixed(1)}%` : "—";
  const colors = ["#73e3ba", "#7aaaff", "#c49bff", "#ffbb76"];
  let report = null,
    overview = null,
    live = {},
    selectedTab = "decision";
  let eventBusy = false,
    eventError = "",
    lastTrainingOptions = "";
  const streams = new Map();
  const tabs = [...document.querySelectorAll(".inspector-tabs [role=tab]")];

  function renderModelSource() {
    // Resolve the version pinned by this episode, even if a newer deployment
    // appears while it is running. A dropdown selection is only a future intent.
    const loading = ["starting", "loading_model"].includes(live.status);
    const version = loading ? null : live.version;
    const deployments = [
      overview?.rsi_champion,
      overview?.runtime?.deployment,
      ...(overview?.deployments || []).map((run) => run.summary),
    ].filter(Boolean);
    const model =
      version && deployments.find((item) => item.version === version);
    const teacher = version === "rule-baseline";
    const rsi =
      version &&
      !teacher &&
      (version.startsWith("RSI-Jev ") ||
        model?.backend === "rsi" ||
        live.request_protocol?.startsWith("RSI "));
    const checkpoint = model?.checkpoint || (version ? live.checkpoint : null);
    const checkpointParts = checkpoint?.split("/").filter(Boolean);
    const checkpointName =
      checkpointParts?.at(-1) === "checkpoint"
        ? checkpointParts.at(-2)
        : checkpointParts?.at(-1);
    const active = ["running", "paused", "stopping"].includes(live.status);
    const fields = {
      "active-model-caption":
        active || loading ? "当前模型" : version ? "上一局模型" : "模型来源",
      "active-model-source": teacher
        ? "规则策略"
        : version
          ? "本地模型"
          : "待确认",
      "active-model-name": teacher
        ? "规则基线"
        : rsi
          ? "RSI-Jev"
          : version
            ? "Compact Policy"
            : loading
              ? "模型加载中…"
              : "尚未启动",
      "active-model-status": loading
        ? "等待本局模型加载完成"
        : !version
          ? "启动后显示实际运行模型"
          : {
              running: teacher ? "正在本机执行规则" : "正在本机推理",
              paused: "已暂停 · 本局模型保持锁定",
              stopping: "正在停止",
            }[live.status] || "本局已结束",
      "active-model-version": version || "—",
      "active-model-checkpoint":
        checkpointName ||
        (version?.startsWith("RSI-Jev ")
          ? version.slice(8).split(" / ")[0]
          : teacher
            ? "不使用模型权重"
            : "—"),
      "active-model-hash": model?.sha256?.slice(0, 12) || "—",
    };
    for (const [id, value] of Object.entries(fields)) {
      if ($(id).textContent !== value) $(id).textContent = value;
    }
    $("active-model-checkpoint").title =
      checkpoint || fields["active-model-checkpoint"];
    $("active-model-hash").title = model?.sha256 || "";
    const selected = $("policy");
    const changed =
      selected.value !== live.policy ||
      (selected.value === "rsi-selected" &&
        $("model-select").value !== checkpointName);
    const pending = $("active-model-pending");
    pending.hidden = active || loading || !changed;
    pending.textContent = pending.hidden
      ? ""
      : `下次启动：${(selected.selectedOptions[0] && window.EmbodiedI18n.sourceText(selected.selectedOptions[0])) || "待选择"}${selected.value === "rsi-selected" ? ` · ${$("model-select").value || "未选择检查点"}` : ""}`;
  }
  $("policy").addEventListener("change", renderModelSource);
  $("model-select").addEventListener("change", renderModelSource);

  function activate(name, focus = false) {
    if (!tabs.some((tab) => tab.id === `tab-${name}`)) return;
    selectedTab = name;
    for (const tab of tabs) {
      const selected = tab.id === `tab-${name}`;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
      $(tab.getAttribute("aria-controls")).hidden = !selected;
      if (selected && focus) tab.focus();
    }
    if (name === "logs") renderLogs();
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activate(tab.id.slice(4)));
    tab.addEventListener("keydown", (event) => {
      const next =
        event.key === "ArrowRight"
          ? (index + 1) % tabs.length
          : event.key === "ArrowLeft"
            ? (index + tabs.length - 1) % tabs.length
            : event.key === "Home"
              ? 0
              : event.key === "End"
                ? tabs.length - 1
                : null;
      if (next !== null) {
        event.preventDefault();
        activate(tabs[next].id.slice(4), true);
      }
    });
  });
  // A point in the completion-rate chart can open the matching iteration card.
  $("success-bar-chart").addEventListener(
    "click",
    (event) => {
      if (
        event.target.closest(".history-point") &&
        $("success-bar-mode").value === "evaluation"
      )
        activate("iteration");
    },
    true,
  );
  $("success-bar-chart").addEventListener(
    "keydown",
    (event) => {
      if (
        ["Enter", " "].includes(event.key) &&
        event.target.closest(".history-point") &&
        $("success-bar-mode").value === "evaluation"
      )
        activate("iteration");
    },
    true,
  );

  function chart(id, series, rate = false) {
    const points = series
      .flatMap((s) => s.points)
      .filter(([x, y]) => Number.isFinite(x) && Number.isFinite(y));
    if (!points.length) {
      $(id).innerHTML = "<p>暂无已记录数据</p>";
      return;
    }
    const maxX = Math.max(1, ...points.map((p) => p[0]));
    const maxY = rate ? 1 : Math.max(0.001, ...points.map((p) => p[1])) * 1.12;
    const x = (v) => 42 + (v / maxX) * 294,
      y = (v) => 130 - (v / maxY) * 111;
    $(id).innerHTML =
      `<svg viewBox="0 0 350 155" role="img" aria-label="${rate ? "开发集完成率" : id.includes("gradient") ? "梯度范数" : "训练 Loss"}">
      ${[0, 0.5, 1].map((f) => `<line x1="42" x2="336" y1="${y(f * maxY)}" y2="${y(f * maxY)}" stroke="#253b49" stroke-dasharray="3 4"/><text x="3" y="${y(f * maxY) + 3}" fill="#6f8e9e" font-size="8">${rate ? percent(f) : number(f * maxY, 2)}</text>`).join("")}
      ${series
        .map((s, index) => {
          const clean = s.points.filter(
            ([a, b]) => Number.isFinite(a) && Number.isFinite(b),
          );
          return `<polyline points="${clean.map(([a, b]) => `${x(a)},${y(b)}`).join(" ")}" fill="none" stroke="${colors[index % colors.length]}" stroke-width="1.5"/>${clean.map(([a, b]) => `<circle cx="${x(a)}" cy="${y(b)}" r="2" fill="${colors[index % colors.length]}"><title>${escape(s.name)} · 第 ${a} 步 · ${rate ? percent(b) : number(b, 4)}</title></circle>`).join("")}`;
        })
        .join(
          "",
        )}<text x="42" y="149" fill="#6f8e9e" font-size="8">0</text><text x="336" y="149" text-anchor="end" fill="#6f8e9e" font-size="8">${maxX} 次更新</text></svg>`;
  }
  function metrics(id, rows) {
    $(id).innerHTML = rows
      .map(
        ([label, value, note = ""]) =>
          `<div><span>${escape(label)}</span><b>${escape(value)}</b>${note ? `<small>${escape(note)}</small>` : ""}</div>`,
      )
      .join("");
  }
  function trainingRound() {
    return (
      report?.training.find(
        (r) => r.training === $("inspector-training-run").value,
      ) || report?.training.at(-1)
    );
  }
  function renderTraining() {
    if (!report) return;
    const options = JSON.stringify(
      report.training.map((r) => [r.training, r.round, r.status]),
    );
    if (options !== lastTrainingOptions) {
      const selected = $("inspector-training-run").value;
      $("inspector-training-run").innerHTML =
        '<option value="">跟随最新轮次</option>' +
        report.training
          .slice()
          .reverse()
          .map(
            (r) =>
              `<option value="${escape(r.training)}">第 ${r.round} 轮 · ${escape({ running: "训练中", completed: "已完成", failed: "失败", cancelled: "已取消" }[r.status] || r.status)}</option>`,
          )
          .join("");
      if (report.training.some((r) => r.training === selected))
        $("inspector-training-run").value = selected;
      lastTrainingOptions = options;
    }
    const round = trainingRound();
    if (!round) {
      $("inspector-training-summary").innerHTML =
        "<p>等待第一轮成功轨迹训练。</p>";
      $("inspector-optimization-summary").innerHTML =
        "<p>训练开始后显示实际优化指标。</p>";
      for (const id of [
        "inspector-loss-chart",
        "inspector-gradient-chart",
        "inspector-dev-chart",
        "inspector-round-loss-chart",
      ])
        chart(id, []);
      $("inspector-convergence-summary").textContent =
        "尚无训练与独立评测记录。";
      return;
    }
    const run = overview?.runs.find((r) => r.id === round.training);
    const events = streams.get(round.training)?.events || [];
    const values = events
      .filter((e) => e.kind === "metric")
      .map((e) => e.payload);
    const lastMetric = (key) =>
      [...values].reverse().find((v) => Number.isFinite(v[key]))?.[key];
    const updates = round.loss_curve?.at(-1)?.step || 0;
    metrics("inspector-training-summary", [
      [
        "成功轨迹",
        round.successful_episodes ?? "—",
        `${round.training_samples ?? "—"} 个动作样本`,
      ],
      [
        "训练 Loss",
        number(round.loss_last, 4),
        `起始 ${number(round.loss_first, 4)}`,
      ],
      [
        "选中更新",
        round.selected_step ?? "—",
        `开发完成率 ${percent(round.dev_selected)}`,
      ],
      ["已记录更新", `${round.logged_updates} / ${round.updates ?? "—"}`],
    ]);
    $("inspector-training-progress").innerHTML =
      `<progress aria-label="训练更新进度" max="${Math.max(round.updates || 1, updates)}" value="${updates}"></progress><p>第 ${round.round} 轮 · ${escape({ running: "训练中", completed: "训练完成", failed: "训练失败", cancelled: "已取消" }[round.status] || round.status)}</p>`;
    chart("inspector-loss-chart", [
      {
        name: `第 ${round.round} 轮`,
        points: (round.loss_curve || []).map((p) => [p.step, p.loss]),
      },
    ]);
    $("optimization-round").textContent = `第 ${round.round} 轮`;
    metrics("inspector-optimization-summary", [
      ["梯度范数", number(lastMetric("grad_norm"))],
      ["更新速度", number(lastMetric("steps_per_second"), 2), "steps / s"],
      [
        "学习率",
        lastMetric("learning_rate") ??
          lastMetric("lr") ??
          run?.config?.learning_rate ??
          run?.config?.lr ??
          "未记录",
      ],
      [
        "开发完成率",
        percent(round.dev_selected),
        `初始 ${percent(round.dev_before)}`,
      ],
    ]);
    chart("inspector-gradient-chart", [
      {
        name: "梯度范数",
        points: values
          .filter((v) => Number.isFinite(v.grad_norm))
          .map((v) => [v.step, v.grad_norm]),
      },
    ]);
    chart(
      "inspector-dev-chart",
      [
        {
          name: "开发集",
          points: (round.dev_curve || []).map((p) => [p.step, p.success_rate]),
        },
      ],
      true,
    );
    $("inspector-config").textContent = JSON.stringify(
      clean(run?.config || { status: "等待训练参数" }),
      null,
      2,
    );
    const evaluation = overview?.runs.find((r) => r.id === round.evaluation);
    const checks = evaluation?.summary?.gate?.checks || {};
    const labels = {
      enough_pairs: "配对样本数量",
      task_coverage: "任务覆盖",
      success_gain: "完成率提升",
      confidence_interval: "置信区间",
      no_task_regression: "任务退化检查",
      no_risk_increase: "风险检查",
    };
    $("inspector-gates").innerHTML =
      `<div><span>发布门槛</span><b class="${round.gate_passed === true ? "passed" : "failed"}">${round.gate_passed === true ? "通过" : round.gate_passed === false ? "未通过，保留当前模型" : "等待评测"}</b></div>` +
      Object.entries(checks)
        .map(
          ([key, value]) =>
            `<div><span>${escape(labels[key] || key)}</span><span class="${value ? "passed" : "failed"}">${value ? "通过" : "未通过"}</span></div>`,
        )
        .join("");
    const latest = report.training.at(-1);
    $("inspector-convergence-summary").textContent =
      `已记录 ${report.training.length} 轮，发布 ${report.training.filter((r) => r.deployment).length} 个版本。最新独立评测：父模型 ${percent(latest.parent_success_rate)} → 候选 ${percent(latest.candidate_success_rate)}${latest.evaluation_status !== "completed" ? "（尚未完成）" : ""}。${latest.gate_passed === false ? "本轮未通过发布门槛。" : ""}Loss 与独立完成率分别展示；当前未设置自动收敛判定。`;
    const series = report.training.map((r) => ({
      name: `第 ${r.round} 轮`,
      points: (r.loss_curve || []).map((p) => [p.step, p.loss]),
    }));
    chart("inspector-round-loss-chart", series);
    $("inspector-loss-legend").innerHTML = series
      .map(
        (s, i) =>
          `<span style="color:${colors[i % colors.length]}">● ${escape(s.name)}</span>`,
      )
      .join("");
  }

  let logs = [],
    logBytes = 0,
    logSequence = 0,
    logPaused = false,
    logSignature = "",
    clearedThrough = 0,
    pausedRows = [];
  let sceneKey = "",
    lastRecordCount = 0,
    decisionKey = "",
    observationKey = "",
    stateKey = "",
    resultKey = "";
  function clean(value, key = "") {
    if (
      /^(api[_-]?key|key|password|secret|authorization|headers|access[_-]?token)$/i.test(
        key,
      )
    )
      return "[已隐藏]";
    if (typeof value === "string")
      return value.startsWith("data:image/") ? "[图像内容省略]" : value;
    if (Array.isArray(value)) return value.map((item) => clean(item));
    if (value && typeof value === "object")
      return Object.fromEntries(
        Object.entries(value).map(([k, v]) => [k, clean(v, k)]),
      );
    return value;
  }
  function appendLog(
    event,
    payload,
    source = "live",
    ts = Date.now() / 1000,
    run = null,
  ) {
    const entry = {
      id: ++logSequence,
      ts,
      event,
      source,
      run,
      payload: clean(payload),
    };
    let json = JSON.stringify(entry);
    if (json.length > 24000) {
      entry.payload = {
        truncated: true,
        original_characters: json.length,
        preview: json.slice(0, 6000),
      };
      json = JSON.stringify(entry);
    }
    const row = {
      entry,
      json,
      search: json.toLowerCase(),
      bytes: json.length * 2,
    };
    logs.push(row);
    logBytes += json.length * 2;
    while (logs.length > 1000 || logBytes > 2 * 1024 * 1024)
      logBytes -= logs.shift().bytes;
    return row;
  }
  function matchingLogs() {
    if (logPaused) return pausedRows;
    const source = $("inspector-log-source").value;
    const query = $("inspector-log-search").value.trim().toLowerCase();
    const training = trainingRound()?.training;
    const rows =
      source === "training" ? streams.get(training)?.logRows || [] : logs;
    return rows.filter(
      (r) =>
        r.entry.id > clearedThrough &&
        (source === "all" ||
          (source === "live" && r.entry.source === "live") ||
          (source === "training" && r.entry.run === training)) &&
        (!query || r.search.includes(query)),
    );
  }
  function renderLogs() {
    if (logPaused || selectedTab !== "logs") return;
    const matches = matchingLogs();
    const visible = matches
      .slice()
      .sort((a, b) => b.entry.ts - a.entry.ts || b.entry.id - a.entry.id)
      .slice(0, 100);
    $("inspector-log-count").textContent = `${matches.length} 条匹配`;
    $("inspector-log-status").textContent =
      eventError || "实时采集 · 最新记录在上方";
    const signature = visible.map((r) => r.entry.id).join(",");
    if (
      signature === logSignature &&
      $("inspector-log-entries").childElementCount
    )
      return;
    logSignature = signature;
    const list = $("inspector-log-entries");
    const existing = new Map([...list.children].map((r) => [r.dataset.id, r]));
    const fragment = document.createDocumentFragment();
    for (const { entry } of visible) {
      let row = existing.get(String(entry.id));
      if (!row) {
        row = document.createElement("details");
        row.dataset.id = String(entry.id);
        row.className = `inspector-log-row ${["error", "alert"].includes(entry.event) ? entry.event : ""}`;
        const summary = document.createElement("summary");
        const time = document.createElement("time");
        time.textContent = new Date(entry.ts * 1000).toLocaleTimeString(
          "zh-CN",
          { hour12: false },
        );
        const label = document.createElement("b");
        label.textContent = `${entry.event}${entry.payload?.step != null ? ` · 步 ${entry.payload.step}` : ""}`;
        summary.append(time, label);
        row.append(summary);
        row.addEventListener("toggle", () => {
          if (row.open && !row.querySelector("pre")) {
            const pre = document.createElement("pre");
            pre.textContent = JSON.stringify(entry, null, 2);
            row.append(pre);
          }
        });
      }
      fragment.append(row);
    }
    if (!visible.length) {
      const empty = document.createElement("p");
      empty.textContent = "暂无匹配记录";
      fragment.append(empty);
    }
    list.replaceChildren(fragment);
  }
  function captureSimulation(value) {
    live = value;
    renderModelSource();
    const nextScene = JSON.stringify([
      value.collection_run,
      value.seed,
      value.version,
    ]);
    const records = value.records || [];
    if (sceneKey !== nextScene || records.length < lastRecordCount) {
      sceneKey = nextScene;
      lastRecordCount = 0;
      decisionKey = observationKey = resultKey = "";
      appendLog("scene", {
        run: value.collection_run,
        seed: value.seed,
        model: value.version,
        policy: value.policy,
        control: value.control,
      });
    }
    const status = JSON.stringify([
      value.status,
      value.error,
      value.automatic_training,
    ]);
    if (status !== stateKey) {
      stateKey = status;
      appendLog(value.error ? "error" : "status", {
        status: value.status,
        error: value.error,
        automatic_training: value.automatic_training,
      });
    }
    const decision = JSON.stringify(value.decision);
    if (value.decision && decision !== decisionKey) {
      appendLog(
        value.decision.phase === "inference" ? "model_input" : "model_decision",
        {
          ...value.decision,
          model: value.version,
          seed: value.seed,
          prompt: value.prompt,
          control: value.control,
          observation: value.observation,
        },
      );
    }
    decisionKey = decision;
    for (const row of records.slice(lastRecordCount))
      appendLog("action_completed", {
        ...row,
        seed: value.seed,
        model: value.version,
      });
    lastRecordCount = records.length;
    const observation = JSON.stringify(value.observation);
    if (observation !== observationKey && value.observation) {
      observationKey = observation;
      appendLog("observation", {
        seed: value.seed,
        observation: value.observation,
      });
    }
    const result = JSON.stringify(value.result);
    if (value.result && result !== resultKey)
      appendLog("episode_result", value.result);
    resultKey = result;
    renderLogs();
  }

  async function pollEvents() {
    if (eventBusy || !overview || document.hidden || (document.documentElement.dataset.activeView && document.documentElement.dataset.activeView !== "simulation")) return;
    eventBusy = true;
    const round = trainingRound();
    const ids = [
      ...new Set(
        [
          round?.training,
          round?.evaluation,
          live.collection_run,
          ...overview.runs
            .filter((r) => r.status === "running")
            .slice(0, 3)
            .map((r) => r.id),
        ].filter(Boolean),
      ),
    ];
    try {
      const results = await Promise.allSettled(
        ids.map(async (id) => {
          const stream = streams.get(id) || {
            cursor: 0,
            events: [],
            complete: false,
          };
          if (stream.complete) return;
          const response = await fetch(
            `/api/runs/${encodeURIComponent(id)}/events?after=${stream.cursor}`,
            { cache: "no-store", signal: AbortSignal.timeout(15000) },
          );
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          const { events } = await response.json();
          const received = events.map((row) =>
            appendLog(row.kind, row.payload, "run", row.ts, id),
          );
          stream.logRows = [...(stream.logRows || []), ...received].slice(
            -1000,
          );
          let bytes = stream.logRows.reduce(
            (total, row) => total + row.bytes,
            0,
          );
          while (bytes > 2 * 1024 * 1024) bytes -= stream.logRows.shift().bytes;
          if (events.length) stream.cursor = events.at(-1).seq;
          stream.events = [...stream.events, ...events].slice(-1000);
          stream.complete = ["completed", "failed", "cancelled"].includes(
            overview.runs.find((r) => r.id === id)?.status,
          );
          streams.set(id, stream);
        }),
      );
      eventError = results.some((r) => r.status === "rejected")
        ? "部分作业日志暂不可用，自动重试"
        : "";
      for (const id of streams.keys())
        if (streams.size > 8 && !ids.includes(id)) streams.delete(id);
      renderTraining();
      renderLogs();
    } finally {
      eventBusy = false;
    }
  }
  $("inspector-training-run").addEventListener("change", () => {
    renderTraining();
    renderLogs();
    pollEvents();
  });
  $("inspector-log-source").addEventListener("change", renderLogs);
  $("inspector-log-search").addEventListener("input", renderLogs);
  $("inspector-log-pause").addEventListener("click", () => {
    if (!logPaused) pausedRows = matchingLogs();
    logPaused = !logPaused;
    $("inspector-log-pause").textContent = logPaused ? "恢复刷新" : "暂停刷新";
    $("inspector-log-pause").setAttribute("aria-pressed", String(logPaused));
    $("inspector-log-status").textContent = "视图已暂停 · 后台继续采集";
    if (!logPaused) renderLogs();
  });
  $("inspector-log-clear").addEventListener("click", () => {
    logs = [];
    logBytes = 0;
    logSignature = "";
    clearedThrough = logSequence;
    pausedRows = [];
    $("inspector-log-entries").replaceChildren();
    $("inspector-log-count").textContent = "0 条";
    renderLogs();
  });
  $("inspector-log-export").addEventListener("click", () => {
    const text =
      matchingLogs()
        .map((r) => r.json)
        .join("\n") + "\n";
    const url = URL.createObjectURL(
      new Blob([text], { type: "application/x-ndjson" }),
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "rsi-runtime.jsonl";
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
  window.addEventListener("rsi-rounds", (event) => {
    report = event.detail;
    $("inspector-sync").textContent =
      `学习记录 · ${new Date(report.generated_at * 1000).toLocaleTimeString(window.EmbodiedI18n.locale)} · 每 5 秒同步`;
    $("inspector-sync").classList.remove("unavailable");
    renderTraining();
    pollEvents();
  });
  window.addEventListener("rsi-rounds-unavailable", () => {
    $("inspector-sync").textContent =
      "学习记录连接中断 · 保留上次数据，自动重试";
    $("inspector-sync").classList.add("unavailable");
  });
  window.SimulationWorkspace = {
    updateSimulation: captureSimulation,
    updateOverview(value) {
      overview = value;
      renderModelSource();
      renderTraining();
      pollEvents();
    },
  };
})();
