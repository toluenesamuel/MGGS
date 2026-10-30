/*
 * Content regression check for the MGGS site.
 *
 * Renders the real application in jsdom, walks every route and asserts that:
 *   - each route renders a heading and a per-page document title
 *   - no copy from the previous school/organisation survives
 *   - every <img> src resolves to a file in public/
 *   - every internal #/ link points at a route that exists
 *
 * Usage:
 *   1. npm install --no-save jsdom@25.0.1
 *   2. npx esbuild src/main.tsx --bundle --format=iife --outfile=/tmp/app.js \
 *        --loader:.css=text --jsx=automatic --alias:@=./src \
 *        --define:process.env.NODE_ENV='"production"'
 *   3. node tests/content-check.mjs /tmp/app.js
 *
 * This is a development aid, not part of the build; like the other files in
 * tests/ it depends on packages that are not installed by default.
 */
import { JSDOM, VirtualConsole } from "jsdom";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const bundlePath = process.argv[2] ?? "/tmp/app.js";
const bundle = fs.readFileSync(bundlePath, "utf8");

const routes = [
  "/",
  "/about/the-mggs-difference", "/about/our-values", "/about/our-story", "/about/contact-us",
  "/about/leadership-and-governance", "/about/community-and-belonging", "/about/career-opportunities",
  "/admissions/start-here", "/admissions/how-to-apply", "/admissions/visit-us",
  "/admissions/fees-and-financial-information", "/admissions/parent-partnership",
  "/admissions/connect-with-admissions",
  "/academics/our-academic-approach", "/academics/how-we-teach",
  "/academics/character-and-moral-instruction", "/academics/co-curricular-activities",
  "/academics/student-support", "/academics/preparing-for-the-future",
  "/student-life", "/student-life/arts", "/student-life/sports", "/student-life/clubs",
  "/student-life/leadership",
  "/community/parents-and-families", "/community/stories", "/community/educators",
  "/campus/our-campus", "/campus/getting-to-school", "/campus/campus-tours",
  "/giving/donate-now", "/giving/ways-to-give", "/giving/your-impact",
  "/mggs-news", "/mggs-news/welcome-to-the-new-school-year", "/mggs-news/open-day-invitation",
  "/search?q=discipline", "/no-such-page",
];

/** Copy that must not appear anywhere — previous organisation, country, curriculum. */
const banned = /Branksome|Toronto|Canada|Canadian|Ontario|Rosedale|Elm Ave|iCAST|boarding|IB World|IB Diploma/;

function boot() {
  const errors = [];
  const virtualConsole = new VirtualConsole();
  virtualConsole.on("error", (...args) => errors.push(args.map(String).join(" ").slice(0, 160)));
  virtualConsole.on("jsdomError", (error) => {
    if (!/CSS|HTMLMediaElement/.test(error.message)) errors.push(error.message.slice(0, 160));
  });

  const dom = new JSDOM(
    "<!doctype html><html><head><title></title></head><body><div id=\"root\"></div></body></html>",
    { runScripts: "dangerously", pretendToBeVisual: true, url: "http://localhost/#/", virtualConsole },
  );
  const { window } = dom;
  window.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {} });
  window.scrollTo = () => {};
  window.ResizeObserver = class { observe() {} unobserve() {} disconnect() {} };
  window.requestAnimationFrame = (cb) => window.setTimeout(() => cb(Date.now()), 0);
  window.cancelAnimationFrame = () => {};
  window.fetch = () => Promise.resolve({ ok: true, headers: { get: () => "video/mp4" } });
  window.HTMLMediaElement.prototype.play = function play() { return Promise.resolve(); };
  window.HTMLMediaElement.prototype.pause = function pause() {};
  window.eval(bundle);
  return { window, document: window.document, errors };
}

const wait = (ms = 90) => new Promise((resolve) => setTimeout(resolve, ms));
const failures = [];

const { window, document: doc, errors } = boot();
await wait(400);

const titles = new Map();
for (const route of routes) {
  window.location.hash = `#${route}`;
  await wait();

  const heading = doc.querySelector("main h1")?.textContent?.replace(/\s+/g, " ").trim() ?? "";
  if (!heading) failures.push(`${route}: no <h1> rendered`);

  if (!doc.title || doc.title === "Marvellous Greatness Group of Schools") {
    failures.push(`${route}: document title not set per page`);
  }
  if (doc.title.length > 70) failures.push(`${route}: title too long (${doc.title.length} chars)`);
  if (titles.has(doc.title)) failures.push(`${route}: duplicate title with ${titles.get(doc.title)}`);
  titles.set(doc.title, route);

  const text = doc.body.textContent ?? "";
  const hit = text.match(banned);
  if (hit) failures.push(`${route}: contains outdated copy "${hit[0]}"`);

  for (const img of doc.images) {
    const src = img.getAttribute("src");
    if (!src || src.startsWith("http")) continue;
    if (!fs.existsSync(path.join(repo, "public", src))) failures.push(`${route}: missing image ${src}`);
  }

  for (const anchor of doc.querySelectorAll('a[href^="#/"]')) {
    const target = anchor.getAttribute("href").slice(1).split("?")[0];
    const known = routes.some((r) => r.split("?")[0] === target) || target.startsWith("/mggs-news/");
    if (!known) failures.push(`${route}: link to unknown route ${target}`);
  }
}

for (const error of errors) failures.push(`console: ${error}`);

console.log(`checked ${routes.length} routes, ${titles.size} unique titles`);
if (failures.length) {
  console.error(`FAILURES (${failures.length}):`);
  for (const failure of failures) console.error(` - ${failure}`);
  process.exit(1);
}
console.log("content check passed");
process.exit(0);
