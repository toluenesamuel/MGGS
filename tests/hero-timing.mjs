/*
 * Hero film timing check.
 *
 * Verifies the rule "the film plays for at least 10 seconds before the hero
 * crossfades to the still frames", including the two failure modes that
 * previously cut the film short:
 *   - a slow/absent HEAD response must not force the fallback
 *   - a genuinely missing film (404 or a media error) must fall back
 *
 * Usage:
 *   npm install --no-save jsdom@25.0.1
 *   npx esbuild src/main.tsx --bundle --format=iife --outfile=/tmp/app.js \
 *     --loader:.css=text --jsx=automatic --alias:@=./src \
 *     --define:process.env.NODE_ENV='"production"'
 *   node tests/hero-timing.mjs /tmp/app.js
 */
import { JSDOM, VirtualConsole } from "jsdom";
import fs from "node:fs";

const bundle = fs.readFileSync(process.argv[2] ?? "/tmp/app.js", "utf8");
const MIN_MS = 10000;

function boot({ head = "ok", constraint = null } = {}) {
  const dom = new JSDOM(
    "<!doctype html><html><body><div id=\"root\"></div></body></html>",
    { runScripts: "dangerously", url: "http://localhost/#/", virtualConsole: new VirtualConsole() },
  );
  const { window } = dom;
  window.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {} });
  window.scrollTo = () => {};
  window.ResizeObserver = class { observe() {} unobserve() {} disconnect() {} };
  window.requestAnimationFrame = (cb) => window.setTimeout(() => cb(Date.now()), 0);
  window.cancelAnimationFrame = () => {};
  if (constraint) {
    Object.defineProperty(window.navigator, "connection", { value: constraint, configurable: true });
  }
  window.fetch = () => {
    if (head === "404") return Promise.resolve({ ok: false, status: 404, headers: { get: () => "text/html" } });
    if (head === "reject") return Promise.reject(new Error("network"));
    return Promise.resolve({ ok: true, status: 200, headers: { get: () => "video/mp4" } });
  };

  // Controllable film: currentTime is settable so the test can "play" it.
  let position = 0;
  Object.defineProperty(window.HTMLMediaElement.prototype, "currentTime", {
    configurable: true,
    get() { return position; },
    set(value) { position = value; },
  });
  window.HTMLMediaElement.prototype.play = function play() { return Promise.resolve(); };
  window.HTMLMediaElement.prototype.pause = function pause() {};

  window.eval(bundle);
  return { window, document: window.document, setPosition: (v) => { position = v; } };
}

const wait = (ms = 100) => new Promise((resolve) => setTimeout(resolve, ms));
const failures = [];
const check = (ok, message) => { if (!ok) failures.push(message); };

function activeFrame(doc) {
  const active = doc.querySelectorAll(".hero-frame.is-active");
  if (!active.length) return "none";
  if (active[0].querySelector("video")) return "video";
  return active[0].querySelector("img")?.getAttribute("src")?.split("/").pop() ?? "none";
}

// 1. Full-length film (15s): plays through, then moves to the still frames.
{
  const { window, document: doc, setPosition } = boot();
  await wait(400);
  check(activeFrame(doc) === "video", "full film: film should start active");
  for (const t of [1, 5, 9, 10, 14, 15]) {
    setPosition(t);
    doc.querySelector("video").dispatchEvent(new window.Event("timeupdate"));
    await wait(20);
  }
  check(activeFrame(doc) === "video", "full film: must still be on the film before it ends");
  doc.querySelector("video").dispatchEvent(new window.Event("ended"));
  await wait(150);
  check(activeFrame(doc) === "hero-campus.jpg", `full film: should advance after ending (got ${activeFrame(doc)})`);
}

// 2. A film shorter than 10s must repeat, not cut to the still frames.
{
  const { window, document: doc, setPosition } = boot();
  await wait(400);
  for (const t of [1, 3, 5]) {
    setPosition(t);
    doc.querySelector("video").dispatchEvent(new window.Event("timeupdate"));
    await wait(20);
  }
  const video = doc.querySelector("video");
  video.dispatchEvent(new window.Event("ended"));
  await wait(150);
  check(activeFrame(doc) === "video", `short film: must not advance at 5s (got ${activeFrame(doc)})`);
  check(video.currentTime === 0, "short film: should restart from the beginning");
  // second pass: 5s + 6s = 11s watched -> now it may advance
  for (const t of [2, 4, 6]) {
    setPosition(t);
    video.dispatchEvent(new window.Event("timeupdate"));
    await wait(20);
  }
  video.dispatchEvent(new window.Event("ended"));
  await wait(150);
  check(activeFrame(doc) === "hero-campus.jpg", `short film: should advance once ${MIN_MS / 1000}s watched (got ${activeFrame(doc)})`);
}

// 3. A rejected HEAD request (proxy refuses) must NOT drop the film.
{
  const { document: doc } = boot({ head: "reject" });
  await wait(500);
  check(activeFrame(doc) === "video", `rejected HEAD: film should still be used (got ${activeFrame(doc)})`);
}

// 4. A missing film (404) falls back to the still frames.
{
  const { document: doc } = boot({ head: "404" });
  await wait(500);
  check(!doc.querySelector("video"), "404: video element should not be rendered");
  check(activeFrame(doc) === "hero-campus.jpg", `404: still frames should show (got ${activeFrame(doc)})`);
}

// 5. Data-saver connections skip the film.
{
  const { document: doc } = boot({ constraint: { saveData: true, effectiveType: "3g" } });
  await wait(400);
  check(!doc.querySelector("video"), "save-data: video element should not be rendered");
}

// 6a. An error bubbling up from an alternative <source> must NOT drop the film.
// (Previously a missing .webm source fired this and the MP4 was never tried.)
{
  const { window, document: doc } = boot();
  await wait(400);
  const video = doc.querySelector("video");
  const source = doc.createElement("source"); // stand-in for a failed alternative
  source.setAttribute("src", "/media/does-not-exist.webm");
  source.setAttribute("type", "video/webm");
  video.appendChild(source);
  source.dispatchEvent(new window.Event("error", { bubbles: true }));
  await wait(150);
  check(!!doc.querySelector("video"), "source error: film must stay usable");
  check(activeFrame(doc) === "video", `source error: film should stay active (got ${activeFrame(doc)})`);
}

// 6b. The film must only use sources that are actually configured, so a missing
// alternative file can never be requested first.
{
  const { document: doc } = boot();
  await wait(300);
  const sources = [...doc.querySelectorAll("video source")].map((s) => s.getAttribute("src"));
  check(
    sources.length === 1 && sources[0].endsWith(".mp4"),
    `sources: expected only the MP4, got ${JSON.stringify(sources)}`,
  );
}

// 7. A media error (unsupported codec) falls back.
{
  const { window, document: doc } = boot();
  await wait(400);
  doc.querySelector("video").dispatchEvent(new window.Event("error"));
  await wait(150);
  check(activeFrame(doc) === "hero-campus.jpg", `media error: still frames should show (got ${activeFrame(doc)})`);
}

if (failures.length) {
  console.error(`FAILURES (${failures.length}):`);
  for (const failure of failures) console.error(` - ${failure}`);
  process.exit(1);
}
console.log("hero timing check passed: film held for at least 10s; fallbacks behave");
process.exit(0);
