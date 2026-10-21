import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";

test("runtime console shows real decisions, filters details and exports after clearing", async ({
  page,
}) => {
  const reset = await page.request.post("/api/reset", {
    data: { provider: "baseline", speed: 4, max_cycles: 30 },
  });
  expect(reset.ok()).toBe(true);
  await page.goto("/");
  await expect(page.locator("#loading")).toHaveClass(/hidden/, {
    timeout: 30000,
  });
  await expect(page.locator("#connection")).toContainText("已连接");
  await expect(page.locator("#run-log-status")).toContainText("实时连接");
  await page.locator("#step").click();
  await expect(page.locator("#status-text")).toHaveText("已暂停", {
    timeout: 30000,
  });
  // Starting from the UI may reset the episode to apply its visible settings.
  const { id: episodeId } = await (await page.request.get("/api/state")).json();
  await page.locator("#run-log-scope").selectOption("workbench");
  await page.locator("#run-log-category").selectOption("decision");
  await page.locator("#run-log-search").fill("decision_finished");
  await expect(
    page.locator("#run-log-entries .run-log-row").first(),
  ).toBeVisible();
  await page.locator("#run-log-pause").click();
  await page.locator("#run-log-entries summary").first().click();
  await expect(
    page.locator("#run-log-entries details[open] pre"),
  ).toContainText('"decision"');
  const before = await page.locator("#run-log-count").textContent();
  await page.request.post("/api/control/stop", { data: {} });
  await page.waitForTimeout(800);
  await expect(page.locator("#run-log-count")).toHaveText(before);
  await expect(page.locator("#status-text")).toHaveText("已停止");
  await page.locator("#run-log-clear").click();
  await expect(page.locator("#run-log-entries")).toContainText(
    "等待新的运行日志",
  );
  const downloadEvent = page.waitForEvent("download");
  await page.locator("#run-log-export").click();
  const download = await downloadEvent;
  const rows = (await readFile(await download.path(), "utf8"))
    .trim()
    .split("\n")
    .map(JSON.parse);
  const episodeRows = rows.filter((row) => row.episode_id === episodeId);
  expect(episodeRows.some((row) => row.event === "decision_finished")).toBe(true);
  expect(episodeRows.some((row) => row.event === "physics_frame")).toBe(true);
  await page.locator("#run-log-toggle").click();
  await expect(page.locator("#run-log-body")).toBeHidden();
  await page.locator("#run-log-toggle").click();
  await expect(page.locator("#run-log-body")).toBeVisible();
});

test("console remains available across views and on mobile", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.locator("#run-log-status")).toContainText("实时连接");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.locator("#extensions-open").click();
  await expect(page.locator("#extensions-view")).toBeVisible();
  await expect(page.locator("#run-log")).toBeVisible();
  await page.locator("#run-log-search").fill("does-not-match-any-log-30821");
  await expect(page.locator("#run-log-entries")).toContainText(
    "没有符合筛选条件",
  );
});
