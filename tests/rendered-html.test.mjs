import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the fortune calendar product page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="zh-Hant-TW">/i);
  assert.match(html, /吉日通/);
  assert.match(html, /推薦吉日/);
  assert.match(html, /月曆總覽/);
  assert.match(html, /民俗指南/);
  assert.doesNotMatch(html, /Your site is taking shape|codex-preview|react-loading-skeleton/i);
});

test("renders SEO landing page for move-in dates", async () => {
  const response = await render("/2026/move-in");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /2026[\s\S]*搬家入宅[\s\S]*吉日/);
});

test("keeps starter preview code out of the product source", async () => {
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /FinderSection/);
  assert.match(page, /MonthCalendar/);
  assert.match(layout, /吉日通/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.doesNotMatch(page, /SkeletonPreview|codex-preview|Your site is taking shape/);
  assert.doesNotMatch(layout, /Starter Project|codex-preview|_sites-preview/);

  await assert.rejects(access(new URL("../app/_sites-preview", import.meta.url)));
});
