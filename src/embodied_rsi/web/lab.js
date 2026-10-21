import {mountRounds} from "./rounds.js";

const $ = (selector) => document.querySelector(selector);
const header = $(".compact-header");
new ResizeObserver(() => {
  document.documentElement.style.setProperty("--lab-header-height", `${header.getBoundingClientRect().height}px`);
}).observe(header);

const panels = {
  simulation: $("#lab-simulation"),
  workbench: $("#lab-workbench"),
  report: $("#lab-report"),
  docs: $("#lab-docs"),
};
let workbench, report, docs, current = "", navigation = 0;
const choices = [...document.querySelectorAll(".lab-tabs [data-lab-view]")].map(button => button.dataset.labView);

async function loadWorkbench() {
  if (!workbench) workbench = (async () => {
    const {mountWorkbench} = await import("/workbench/assets/lab-workbench.js");
    const root = panels.workbench.attachShadow({mode:"open"});
    const app = document.createElement("div");
    app.id = "app";
    root.append(app);
    return mountWorkbench(root, {apiBase:"/workbench", embedded:true});
  })().catch(error => { workbench = null; throw error; });
  return workbench;
}

async function loadDocs() {
  if (!docs) docs = (async () => {
    const [response, {mountDocs}] = await Promise.all([
      fetch("/static/docs.html?v=20261020-1"),
      import("./docs.js?v=20261020-1"),
    ]);
    if (!response.ok) throw new Error("文档加载失败");
    panels.docs.innerHTML = await response.text();
    mountDocs(panels.docs);
  })().catch(error => { docs = null; throw error; });
  return docs;
}

async function loadReport() {
  if (!report) report = (async () => {
    $("#report-load-status").textContent = "正在加载训练报告…";
    $("#report-load").disabled = true;
    const [html, css, theme, reportCss, app, visual, replays] = await Promise.all([
      fetch("/static/index.html").then(r => {if (!r.ok) throw new Error("报告加载失败"); return r.text();}),
      fetch("/static/style.css").then(r => r.text()),
      fetch("/static/theme.css").then(r => r.text()),
      fetch("/static/report.css").then(r => r.text()),
      import("./app.js"), import("./training-visual.js"), import("./replays.js"),
    ]);
    const source = new DOMParser().parseFromString(html, "text/html");
    const reportHeader = source.querySelector("main > header");
    reportHeader.className = "report-heading";
    reportHeader.innerHTML = `<h2>训练报告</h2><div class="report-actions">
      <span class="live" id="connection">连接中</span>
      <button id="open-job">高级实验</button>
      <button id="report-back">回到实时画面 ↑</button></div>`;
    const sectionNav = source.createElement("nav");
    sectionNav.className = "report-section-nav";
    sectionNav.setAttribute("aria-label", "报告内容");
    sectionNav.innerHTML = [
      [".report-stats", "概览"], [".learning", "训练曲线"],
      ["#training-visual", "参数变化"], ["#evaluation", "独立评测"],
      ["#training-data", "训练数据"], ["#replay-gallery", "轨迹回放"],
      ["#round-comparison", "轮次对比"], ["#experiments", "历史记录"],
    ].map(([target, label]) => `<button data-report-target="${target}">${label}</button>`).join("");
    reportHeader.after(sectionNav);
    source.querySelectorAll(".mobile-nav, footer").forEach(el => el.remove());
    const root = panels.report.shadowRoot || panels.report.attachShadow({mode:"open"});
    const style = document.createElement("style");
    style.textContent = [css, theme, reportCss].join("\n").replaceAll(":root", ":host");
    root.replaceChildren(style, source.querySelector("main"), source.querySelector("dialog"));
    window.EmbodiedI18n.observe(root);
    root.getElementById("report-back").onclick = () => navigate("simulation");
    root.querySelectorAll("[data-report-target]").forEach(button => {
      button.onclick = () => {
        const target = root.querySelector(button.dataset.reportTarget);
        if (target.tagName === "DETAILS") target.open = true;
        target.scrollIntoView({block:"start", behavior:"instant"});
      };
    });
    app.mountReport(root);
    visual.mountTrainingVisual(root);
    mountRounds(root, {broadcast:false});
    replays.mountReplays(root);
  })().catch(error => {
    report = null;
    $("#report-load-status").textContent = `报告加载失败：${error.message}`;
    $("#report-load").textContent = "重新加载";
    $("#report-load").disabled = false;
    throw error;
  });
  return report;
}

async function navigate(view, updateHash = true) {
  const showReport = view === "report";
  if (!choices.includes(view)) view = "simulation";
  const token = ++navigation;
  current = view;
  document.documentElement.dataset.activeView = view;
  const tab = document.querySelector(`.lab-tabs [data-lab-view="${view}"]`);
  document.title = `Embodied Lab · ${window.EmbodiedI18n.sourceText(tab).trim()}`;
  if (updateHash) history.replaceState(null, "", `/simulation${showReport ? "#report" : view === "simulation" ? "" : "#" + view}`);
  document.querySelectorAll("[data-lab-view]").forEach(button => {
    const selected = button.dataset.labView === view;
    button.setAttribute("aria-selected", String(selected));
    button.tabIndex = selected ? 0 : -1;
  });
  panels.simulation.hidden = view !== "simulation";
  $(".simulation-workspace").hidden = view !== "simulation";
  panels.workbench.hidden = !["experiment", "comparison", "connections"].includes(view);
  panels.docs.hidden = view !== "docs";
  const isWorkbench = !panels.workbench.hidden;
  panels.workbench.setAttribute("aria-busy", String(isWorkbench));
  $("#lab-view-loading").hidden = !isWorkbench && (view !== "docs" || !!panels.docs.childElementCount);
  if (!$("#lab-view-loading").hidden) $("#lab-view-loading").textContent = `正在加载${window.EmbodiedI18n.sourceText(tab).trim()}…`;
  $("#lab-load-error").hidden = true;
  try {
    if (showReport) {
      // Keep the old link as an anchor inside autonomous training.
      panels.report.scrollIntoView({block:"start", behavior:"instant"});
      await loadReport();
      if (token === navigation) {
        panels.report.scrollIntoView({block:"start", behavior:"instant"});
        panels.report.focus({preventScroll:true});
      }
    } else if (view === "docs") {
      await loadDocs();
      if (token === navigation) $("#lab-view-loading").hidden = true;
    } else if (isWorkbench) {
      const module = await loadWorkbench();
      if (token === navigation) {
        await module.showView(view);
        if (token === navigation) {
          panels.workbench.setAttribute("aria-busy", "false");
          $("#lab-view-loading").hidden = true;
        }
      }
    } else if (updateHash) {
      $(".simulation-workspace").scrollIntoView({block:"start", behavior:"instant"});
    }
  } catch (error) {
    if (token !== navigation || showReport) return;
    $("#lab-view-loading").hidden = true;
    $("#lab-load-error").textContent = `模块加载失败：${error.message}。点击当前标签可重试。`;
    $("#lab-load-error").hidden = false;
  }
}

document.querySelectorAll("[data-open-report]").forEach(link => {
  link.onclick = event => {event.preventDefault(); navigate("report");};
});
$("#report-load").onclick = () => loadReport().catch(() => {});
const reportObserver = new IntersectionObserver(entries => {
  if (!panels.simulation.hidden && entries.some(entry => entry.isIntersecting)) {
    reportObserver.disconnect();
    loadReport().catch(() => {});
  }
});
reportObserver.observe(panels.report);

document.querySelectorAll("[data-lab-view]").forEach(button => {
  button.onclick = () => navigate(button.dataset.labView);
  button.onkeydown = event => {
    const index = choices.indexOf(current);
    const next = event.key === "ArrowRight" ? (index + 1) % choices.length
      : event.key === "ArrowLeft" ? (index + choices.length - 1) % choices.length
      : event.key === "Home" ? 0 : event.key === "End" ? choices.length - 1 : null;
    if (next === null) return;
    event.preventDefault();
    document.querySelector(`[data-lab-view="${choices[next]}"]`).focus();
    navigate(choices[next]);
  };
});
window.addEventListener("hashchange", () => navigate(location.hash.slice(1), false));
mountRounds();
navigate(location.hash.slice(1) || "simulation", false);
