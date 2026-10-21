import {
  selectionOptions,
  selectionConfig,
  profileReady,
  storageDescription,
} from "./model-options.js";


const escape = (value) =>
  String(value ?? "").replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        character
      ],
  );
const STORE = "embodied-jev-presets-v1";
const TASKS = ["transfer", "stack", "barrier"];
function finiteJSON(value) {
  return typeof value === "number"
    ? Number.isFinite(value)
    : value && typeof value === "object"
      ? Object.values(value).every(finiteJSON)
      : true;
}
function validatedObject(value, label) {
  if (!value || typeof value !== "object" || Array.isArray(value))
    throw new Error(`${label}必须是 JSON 对象。`);
  if (!finiteJSON(value)) throw new Error(`${label}不能包含非有限数值。`);
  if (new TextEncoder().encode(JSON.stringify(value)).length > 8192)
    throw new Error(`${label}不能超过 8 KB。`);
  return value;
}
function objectJSON(text, label) {
  let value;
  try {
    value = JSON.parse(text);
  } catch {
    throw new Error(`${label}需要有效的 JSON。`);
  }
  return validatedObject(value, label);
}
function validatePreset(value) {
  if (!value || value.format !== "embodied-jev-preset-v1")
    throw new Error("不是支持的 embodied-jev-preset-v1 预设。");
  if (
    Object.keys(value).some(
      (key) =>
        !["format", "name", "task", "scene_config", "user_context"].includes(
          key,
        ),
    )
  )
    throw new Error(
      "预设只能包含名称、任务、场景与额外要求，不能包含模型连接或密钥。",
    );
  if (
    typeof value.name !== "string" ||
    !value.name.trim() ||
    value.name.length > 80 ||
    !TASKS.includes(value.task)
  )
    throw new Error("请填写有效名称并选择基础任务模板。");
  const scene = validatedObject(value.scene_config ?? {}, "场景配置"),
    context = validatedObject(value.user_context ?? {}, "额外决策要求");
  if (
    Object.keys(scene).some(
      (key) =>
        !["name", "source_xy", "target_xy", "barrier_height"].includes(key),
    )
  )
    throw new Error(
      "场景配置含不支持的字段；仅支持 name、source_xy、target_xy、barrier_height。",
    );
  if (
    scene.name !== undefined &&
    (typeof scene.name !== "string" || scene.name.length > 80)
  )
    throw new Error("场景名称必须是 80 字以内的文字。");
  for (const key of ["source_xy", "target_xy"]) {
    const xy = scene[key];
    if (xy === undefined || (key === "source_xy" && xy === null)) continue;
    if (
      !Array.isArray(xy) ||
      xy.length !== 2 ||
      xy.some((value) => typeof value !== "number") ||
      xy[0] < 0.3 ||
      xy[0] > 0.58 ||
      xy[1] < -0.28 ||
      xy[1] > 0.28
    )
      throw new Error(
        "场景坐标需要为 [X, Y]：X 在 0.30–0.58，Y 在 -0.28–0.28 米之间。",
      );
  }
  if (
    scene.barrier_height != null &&
    (value.task !== "barrier" ||
      typeof scene.barrier_height !== "number" ||
      scene.barrier_height < 0.02 ||
      scene.barrier_height > 0.16)
  )
    throw new Error("障碍高度仅适用于越障任务，范围为 0.02–0.16 米。");
  const secret = (item) =>
    item &&
    typeof item === "object" &&
    Object.entries(item).some(
      ([key, nested]) =>
        /^(api[_-]?key|authorization|password|secret|access[_-]?token|refresh[_-]?token)$/i.test(
          key,
        ) || secret(nested),
    );
  if (secret(scene) || secret(context))
    throw new Error("预设检测到密钥字段；请通过模型连接管理凭据。");
  return {
    format: "embodied-jev-preset-v1",
    name: value.name.trim(),
    task: value.task,
    scene_config: scene,
    user_context: context,
  };
}
function downloadJSON(name, value) {
  const url = URL.createObjectURL(
    new Blob([JSON.stringify(value, null, 2)], { type: "application/json" }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export async function createExtensions(
  container,
  { api, openConnection, openDefaultConnection, applyPreset, applyModel, applyDefaultModel },
) {
  const $ = (selector) => container.querySelector(selector);
  let profiles = [],
    config,
    connections = {},
    connectionFilter = "all",
    probeBusy = false,
    actionBusy = false;
  let saved = [];
  try {
    saved = JSON.parse(localStorage.getItem(STORE) || "[]").map(validatePreset);
  } catch {
    saved = [];
  }
  container.innerHTML = `<div class="extension-heading connection-heading"><div><h1>模型配置</h1><span class="connection-scope">用于模型测试与模型对比</span></div><div class="connection-heading-actions"><button class="secondary" id="ext-refresh" type="button">刷新</button><button class="primary" id="ext-new-profile" type="button">＋ 新建配置</button></div></div>
  <section class="connection-manager" id="ext-models" aria-label="模型连接管理">
    <div class="connection-overview" id="ext-connection-overview"></div>
    <div class="connection-toolbar"><div class="connection-filters" role="group" aria-label="连接位置筛选"><button type="button" data-connection-filter="all" aria-pressed="true">全部</button><button type="button" data-connection-filter="local" aria-pressed="false">本机接口</button><button type="button" data-connection-filter="remote" aria-pressed="false">远端 API</button></div><input id="ext-search" type="search" aria-label="搜索模型配置" placeholder="搜索名称、模型或接口地址"><label for="ext-target">应用到<select id="ext-target"><option value="workbench">模型测试</option><option value="comparison">模型对比 · 模型 1</option></select></label></div>
    <div id="ext-default-group" class="connection-group"><h2>默认连接 <span>每种接口类型一个</span></h2><div id="ext-default-list" class="connection-cards"></div></div>
    <div id="ext-profile-group" class="connection-group"><h2>已保存配置 <span id="ext-profile-count">0</span></h2><div id="ext-profile-list" class="extension-profile-list connection-cards"></div></div>
    <div id="ext-connection-empty" class="connection-empty" hidden>没有匹配的配置。<button class="text-button" type="button" id="ext-clear-filter">清除筛选</button></div>
    <p class="extension-hint connection-storage-note" id="ext-profile-storage"></p>
  </section>
  <details class="extension-section" id="ext-presets"><summary>任务与场景预设 <span>保存 / 导入 / 导出 JSON</span></summary><div class="extension-body"><div class="extension-grid"><label>已保存的预设<select id="ext-preset-select"><option value="">新预设</option></select></label><label>预设名称<input id="ext-preset-name" maxlength="80" value="我的搬运场景"></label><label>基础任务<select id="ext-task"><option value="transfer">搬运入盘</option><option value="stack">方块堆叠</option><option value="barrier">越障搬运</option></select></label><label>物体 X · m<input id="ext-source-x" type="number" min="0.30" max="0.58" step="any" placeholder="留空按种子生成"></label><label>物体 Y · m<input id="ext-source-y" type="number" min="-0.28" max="0.28" step="any" placeholder="留空按种子生成"></label><label>目标 X · m<input id="ext-target-x" type="number" min="0.30" max="0.58" step="any" value="0.43"></label><label>目标 Y · m<input id="ext-target-y" type="number" min="-0.28" max="0.28" step="any" value="0.18"></label><label>障碍高度 · m<input id="ext-barrier-height" type="number" min="0.02" max="0.16" step="any" value="0.11" disabled></label></div><label class="extension-json-label">额外决策要求 · user_context JSON<textarea id="ext-user-context" spellcheck="false" rows="5">{}</textarea></label><p class="extension-hint">JSON 中请勿填写 API Key、密码或私人凭据。额外要求独立追加，不会覆盖实测位置、接触或成功条件。规则基线不读取自然语言指令；全新任务语义与机器人类型需要通过代码扩展。场景是否可达、安全，以后端校验为准。</p><div class="extension-actions"><button class="primary" id="ext-apply-preset">应用预设</button><button class="secondary" id="ext-save-preset">保存到浏览器</button><button class="secondary" id="ext-import-preset">导入 JSON</button><button class="secondary" id="ext-export-preset">导出 JSON</button><input id="ext-import-file" type="file" accept="application/json,.json" hidden></div></div></details>
  <details class="extension-section" id="ext-probe"><summary>输入测试 <span>只选择候选，不移动机器人</span></summary><div class="extension-body"><div class="extension-grid"><label>决策模型<select id="ext-probe-provider"></select></label><label>模型 ID · 可选覆盖<input id="ext-probe-model" placeholder="继承已有配置" disabled></label></div><label class="extension-json-label">观察数据 · JSON<textarea id="ext-probe-observation" rows="6" spellcheck="false">{"gripper":"open","object_reachable":true}</textarea></label><label class="extension-json-label">决策问题<textarea id="ext-probe-question" rows="3">Choose the next safe action using the supplied observation.</textarea></label><label class="extension-json-label">候选 · key → 描述 JSON<textarea id="ext-probe-options" rows="5" spellcheck="false">{"approach":"Move above the reachable object","hold":"Keep the current pose"}</textarea></label><div class="extension-actions"><button class="primary" id="ext-probe-run">测试一次决策</button></div><p class="extension-hint">此处是独立输入实验，不执行机械臂控制。规则基线固定选择第一个候选，用于检查输入流程，不验证语义。</p><div id="ext-probe-result" class="extension-probe-result" hidden><p id="ext-probe-summary"></p><details><summary>模型返回与实际输入</summary><pre id="ext-probe-json"></pre></details></div></div></details><p id="ext-message" class="extension-message" role="status"></p>`;

  function showSaved() {
    $("#ext-preset-select").innerHTML =
      '<option value="">新预设</option>' +
      saved
        .map(
          (preset, index) =>
            `<option data-no-i18n value="${index}">${escape(preset.name)}</option>`,
        )
        .join("");
  }
  function setPreset(preset) {
    $("#ext-preset-name").value = preset.name;
    $("#ext-task").value = preset.task;
    $("#ext-source-x").value = preset.scene_config.source_xy?.[0] ?? "";
    $("#ext-source-y").value = preset.scene_config.source_xy?.[1] ?? "";
    $("#ext-target-x").value = preset.scene_config.target_xy?.[0] ?? 0.43;
    $("#ext-target-y").value = preset.scene_config.target_xy?.[1] ?? 0.18;
    $("#ext-barrier-height").value = preset.scene_config.barrier_height ?? 0.11;
    $("#ext-barrier-height").disabled = preset.task !== "barrier";
    $("#ext-user-context").value = JSON.stringify(preset.user_context, null, 2);
  }
  function currentPreset() {
    if (
      ![
        ...container.querySelectorAll("#ext-presets input:not([type=file])"),
      ].every((input) => input.reportValidity())
    )
      throw new Error("请检查场景参数范围。");
    const x = $("#ext-source-x").value,
      y = $("#ext-source-y").value;
    if (!!x !== !!y) throw new Error("物体 X 和 Y 需要一起填写，或同时留空。");
    if (!$("#ext-target-x").value || !$("#ext-target-y").value)
      throw new Error("请填写目标 X 和 Y。");
    const scene_config = {
      name: $("#ext-preset-name").value.trim(),
      source_xy: x ? [Number(x), Number(y)] : null,
      target_xy: [
        Number($("#ext-target-x").value),
        Number($("#ext-target-y").value),
      ],
    };
    if ($("#ext-task").value === "barrier")
      scene_config.barrier_height = Number($("#ext-barrier-height").value);
    return validatePreset({
      format: "embodied-jev-preset-v1",
      name: scene_config.name,
      task: $("#ext-task").value,
      scene_config,
      user_context: objectJSON($("#ext-user-context").value, "额外决策要求"),
    });
  }
  async function checkedPreset() {
    return api("/api/presets/validate", currentPreset());
  }
  async function handle(action) {
    if (actionBusy) return;
    actionBusy = true;
    $("#ext-message").textContent = "正在处理…";
    try {
      await action();
      if (window.EmbodiedI18n.sourceText($("#ext-message")) === "正在处理…") $("#ext-message").textContent = "";
    } catch (error) {
      $("#ext-message").textContent = error.message;
    } finally {
      actionBusy = false;
    }
  }
  $("#ext-task").onchange = () => {
    $("#ext-barrier-height").disabled = $("#ext-task").value !== "barrier";
  };
  $("#ext-preset-select").onchange = () => {
    const index = $("#ext-preset-select").value;
    if (index !== "") setPreset(saved[Number(index)]);
  };
  $("#ext-save-preset").onclick = () =>
    handle(async () => {
      const preset = await checkedPreset();
      saved = [
        ...saved.filter((item) => item.name !== preset.name),
        preset,
      ].slice(-30);
      localStorage.setItem(STORE, JSON.stringify(saved));
      showSaved();
      $("#ext-preset-select").value = saved.length - 1;
      $("#ext-message").textContent = "已保存到本浏览器，未运行推理。";
    });
  $("#ext-export-preset").onclick = () =>
    handle(async () =>
      downloadJSON("embodied-jev-preset.json", await checkedPreset()),
    );
  $("#ext-import-preset").onclick = () => $("#ext-import-file").click();
  $("#ext-import-file").onchange = () =>
    handle(async () => {
      const file = $("#ext-import-file").files[0];
      if (!file) return;
      if (file.size > 40000) throw new Error("预设文件过大。");
      const preset = await api(
        "/api/presets/validate",
        validatePreset(JSON.parse(await file.text())),
      );
      setPreset(preset);
      $("#ext-import-file").value = "";
      $("#ext-message").textContent = "已导入预设草稿；点击应用才会改变场景。";
    });
  $("#ext-apply-preset").onclick = () =>
    handle(async () => {
      await applyPreset(await checkedPreset(), $("#ext-target").value);
      $("#ext-message").textContent = "预设已应用，尚未运行推理。";
    });
  $("#ext-new-profile").onclick = () => openConnection();
  $("#ext-refresh").onclick = () => handle(async () => {
    $("#ext-refresh").disabled = true;
    try { await refresh(); $("#ext-message").textContent = "配置列表已更新。"; }
    finally { $("#ext-refresh").disabled = false; }
  });
  $("#ext-search").oninput = renderConnections;
  $("#ext-target").onchange = renderConnections;
  container.querySelectorAll("[data-connection-filter]").forEach(button => {
    button.onclick = () => { connectionFilter = button.dataset.connectionFilter; renderConnections(); };
  });
  $("#ext-clear-filter").onclick = () => {
    connectionFilter = "all";
    $("#ext-search").value = "";
    renderConnections();
    $("#ext-search").focus();
  };
  function openProbe(selection) {
    $("#ext-probe-provider").value = selection;
    $("#ext-probe-provider").onchange();
    $("#ext-probe-result").hidden = true;
    $("#ext-probe").open = true;
    $("#ext-probe").scrollIntoView({ behavior: "smooth", block: "start" });
    $("#ext-probe-run").focus({ preventScroll: true });
    $("#ext-message").textContent = "已选择测试模型；点击「测试一次决策」后才会发起请求。";
  }
  $("#ext-default-list").onclick = event => {
    const button = event.target.closest("[data-provider]");
    if (!button) return;
    handle(async () => {
      const provider = button.dataset.provider;
      if (button.dataset.action === "edit") await openDefaultConnection(provider);
      else if (button.dataset.action === "probe") openProbe(provider);
      else {
        await applyDefaultModel(provider, $("#ext-target").value);
        $("#ext-message").textContent = "已选择默认连接，尚未调用模型。";
      }
    });
  };
  $("#ext-profile-list").onclick = (event) =>
    handle(async () => {
      const button = event.target.closest("[data-profile]");
      if (!button) return;
      if (button.dataset.action === "edit")
        await openConnection(button.dataset.profile);
      else if (button.dataset.action === "probe") openProbe("profile:" + button.dataset.profile);
      else {
        await applyModel(button.dataset.profile, $("#ext-target").value);
        $("#ext-message").textContent = "已选择模型配置，尚未调用模型。";
      }
    });
  $("#ext-probe-provider").onchange = () => {
    const selected = selectionConfig($("#ext-probe-provider").value, profiles);
    $("#ext-probe-model").disabled = ["baseline", "minicpm"].includes(
      selected.provider,
    );
    if ($("#ext-probe-model").disabled) $("#ext-probe-model").value = "";
  };
  $("#ext-probe-run").onclick = async () => {
    if (probeBusy) return;
    probeBusy = true;
    $("#ext-probe-result").hidden = true;
    $("#ext-probe-run").disabled = true;
    for (const input of container.querySelectorAll(
      "#ext-probe textarea,#ext-probe input,#ext-probe select",
    ))
      input.disabled = true;
    $("#ext-message").textContent = "正在测试一次决策，机器人不会移动…";
    try {
      const selected = selectionConfig(
        $("#ext-probe-provider").value,
        profiles,
      );
      const options = objectJSON($("#ext-probe-options").value, "候选");
      if (
        Object.keys(options).length < 2 ||
        Object.keys(options).length > 12 ||
        Object.values(options).some(
          (value) => typeof value !== "string" || !value.trim(),
        )
      )
        throw new Error("请提供 2–12 个候选，每个描述必须是非空字符串。");
      const question = $("#ext-probe-question").value.trim();
      if (!question) throw new Error("请填写决策问题。");
      const model = $("#ext-probe-model").value.trim();
      const result = await api("/api/decision/probe", {
        ...selected,
        ...(model ? { model } : {}),
        observation: objectJSON($("#ext-probe-observation").value, "观察数据"),
        question,
        options,
      });
      $("#ext-probe-result").hidden = false;
      $("#ext-probe-summary").textContent =
        `选择 ${result.decision.choice} · ${result.decision.model_call ? `${Number(result.decision.latency_ms).toFixed(0)} ms` : "无模型调用"}`;
      $("#ext-probe-json").textContent = JSON.stringify(result, null, 2);
      $("#ext-message").textContent =
        result.message || "输入测试完成，机器人未执行动作。";
    } catch (error) {
      $("#ext-message").textContent = error.message;
    } finally {
      probeBusy = false;
      $("#ext-probe-run").disabled = false;
      for (const input of container.querySelectorAll(
        "#ext-probe textarea,#ext-probe input,#ext-probe select",
      ))
        input.disabled = false;
      $("#ext-probe-provider").onchange();
    }
  };
  function locationKind(item) {
    if (!item.url) return "unset";
    try {
      const host = new URL(item.url).hostname.toLowerCase();
      return host === "localhost" || host.endsWith(".localhost") || host === "[::1]" || /^127\./.test(host) ? "local" : "remote";
    } catch { return "unset"; }
  }
  function connectionState(item) {
    if (!profileReady(item)) return { kind: "missing", label: "待配置" };
    if (item.verification?.status === "passed") return { kind: "passed", label: "已验证" };
    if (item.verification?.status === "failed") return { kind: "failed", label: "验证失败" };
    return { kind: "untested", label: "已配置 · 未验证" };
  }
  function connectionCard(item, isProfile) {
    const status = connectionState(item), location = locationKind(item);
    const ready = profileReady(item), target = $("#ext-target").value;
    const identity = isProfile ? `data-profile="${escape(item.id)}"` : `data-provider="${escape(item.provider)}"`;
    const providerName = config.providers.find(value => value.id === item.provider)?.name || item.provider;
    const verification = item.verification;
    const checkedAt = verification?.checked_at ? new Date(verification.checked_at).toLocaleString(window.EmbodiedI18n.locale) : "";
    const verificationNote = verification?.status === "passed"
      ? `${verification.model || item.model}${Number.isFinite(verification.latency_ms) ? ` · ${verification.latency_ms} ms` : ""}`
      : verification?.status === "failed" ? verification.message || "请检查接口配置" : "保存配置后，可通过输入测试验证模型响应。";
    return `<article class="connection-card" data-location="${location}" data-status="${status.kind}" aria-label="${escape(item.name || providerName)}">
      <header><div><span class="connection-kind">${location === "local" ? "本机接口" : location === "remote" ? "远端 API" : "未设置地址"} · ${escape(providerName)}</span><h3 ${isProfile ? "data-no-i18n" : ""}>${escape(item.name || providerName)}</h3></div><span class="connection-badge" data-status="${status.kind}">${status.label}</span></header>
      <dl><div><dt>模型 ID</dt><dd class="connection-model" ${item.model ? "data-no-i18n" : ""}>${escape(item.model || "未填写")}</dd></div><div><dt>接口地址</dt><dd ${item.url ? "data-no-i18n" : ""} title="${escape(item.url || "")}">${escape(item.url || "未填写")}</dd></div><div><dt>API Key</dt><dd>${item.key_configured ? '<span class="connection-key">● 已配置</span>' : ["jev", "claude"].includes(item.provider) ? "未配置 · 必填" : "未配置 · 按服务要求填写"}</dd></div></dl>
      <p class="connection-verification-note" title="${escape(checkedAt)}">${escape(verificationNote)}</p>
      <footer><span class="connection-storage" title="${escape(storageDescription(item.storage))}">${item.storage?.persistent ? "本机已保存" : "本次服务有效"}</span><div><button type="button" class="text-button" ${identity} data-action="probe" ${ready ? "" : "disabled"}>输入测试</button><button type="button" class="secondary" ${identity} data-action="edit">${ready ? "编辑" : "配置"}</button><button type="button" class="connection-use secondary" ${identity} data-action="use" ${ready ? "" : "disabled"}>${target === "comparison" ? "用于对比" : "用于实验"}</button></div></footer>
    </article>`;
  }
  function renderConnections() {
    if (!config) return;
    const defaults = ["local", "chat", "jev", "claude"].map(provider => ({ ...connections[provider], provider }));
    const all = [...defaults, ...profiles];
    const readyCount = all.filter(profileReady).length;
    const passedCount = all.filter(item => connectionState(item).kind === "passed").length;
    $("#ext-connection-overview").innerHTML = `<span><b>${all.length}</b> 个连接</span><span><b>${readyCount}</b> 已配置</span><span><b>${passedCount}</b> 已验证</span><span>保存配置与验证连接分别操作</span>`;
    const query = $("#ext-search").value.trim().toLowerCase();
    const match = item => (connectionFilter === "all" || locationKind(item) === connectionFilter)
      && [item.name, item.model, item.url, item.provider, config.providers.find(p => p.id === item.provider)?.name].join(" ").toLowerCase().includes(query);
    const filteredDefaults = defaults.filter(match), filteredProfiles = profiles.filter(match);
    container.querySelectorAll("[data-connection-filter]").forEach(button => {
      button.setAttribute("aria-pressed", String(button.dataset.connectionFilter === connectionFilter));
    });
    $("#ext-default-group").hidden = filteredDefaults.length === 0;
    $("#ext-profile-group").hidden = profiles.length > 0 ? filteredProfiles.length === 0 : !!query || connectionFilter !== "all";
    $("#ext-default-list").innerHTML = filteredDefaults.map(item => connectionCard(item, false)).join("");
    $("#ext-profile-list").innerHTML = profiles.length
      ? filteredProfiles.map(item => connectionCard(item, true)).join("")
      : '<div class="connection-empty">暂无具名配置。点击「新建配置」，保存同一平台的多个模型。</div>';
    $("#ext-profile-count").textContent = String(profiles.length);
    $("#ext-connection-empty").hidden = filteredDefaults.length + filteredProfiles.length > 0;
  }
  showSaved();
  async function refresh(target) {
    if (target) $("#ext-target").value = target;
    const previous = $("#ext-probe-provider").value;
    let storage;
    [config, { profiles, storage }, connections] = await Promise.all([
      api("/api/config"), api("/api/model-profiles"), api("/api/connections"),
    ]);
    renderConnections();
    $("#ext-profile-storage").textContent = storageDescription(storage);
    $("#ext-probe-provider").innerHTML = selectionOptions(
      config,
      profiles,
      escape,
    );
    $("#ext-probe-provider").value =
      previous &&
      [...$("#ext-probe-provider").options].some(
        (option) => option.value === previous,
      )
        ? previous
        : "baseline";
    $("#ext-probe-provider").onchange();
  }
  await refresh();
  return { refresh };
}
