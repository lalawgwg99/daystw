import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
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
  assert.match(html, /<title>吉日通｜黃曆查詢、吉日篩選與線上祈福<\/title>/i);
  assert.match(html, /吉日、節氣、拜拜指南，一次查清楚。/);
  assert.match(html, /吉日篩選器/);
  assert.match(html, /線上算命/);
  assert.match(html, /線上點燈祈福/);
  assert.match(html, /需求對應神明資料庫範例/);
  assert.match(html, /lunar-javascript/);
  assert.doesNotMatch(html, /Your site is taking shape|codex-preview|react-loading-skeleton/i);
});

test("keeps starter preview code out of the product source", async () => {
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /lunar-javascript/);
  assert.match(page, /serviceModules/);
  assert.match(layout, /吉日通｜黃曆查詢、吉日篩選與線上祈福/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.doesNotMatch(page, /SkeletonPreview|codex-preview|Your site is taking shape/);
  assert.doesNotMatch(layout, /Starter Project|codex-preview|_sites-preview/);

  await assert.rejects(access(new URL("../app/_sites-preview", import.meta.url)));
});
