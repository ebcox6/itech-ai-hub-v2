// Renders the five framework infographics from src/data/learn.js into public/guides/.
// Output per framework: <slug>.png (full size), <slug>-thumb.png (card preview), <slug>.pdf (print).
//
// Run after editing lesson content:  npm run guides
// Needs Playwright with Chromium:    npm i -D playwright && npx playwright install chromium
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { frameworks } from '../src/data/learn.js';
import { site } from '../src/config/site.js';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const OUT = 'public/guides';
const WIDTH = 1080;
const logo = `data:image/png;base64,${readFileSync('src/assets/logo-mark.png').toString('base64')}`;

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function badge(f, part, i) {
  if (f.slug === 'craft') return part.key[0];
  return String(i + 1);
}

function page(f, index) {
  const twoCol = f.parts.length === 6 || f.parts.length === 4;
  const parts = f.parts
    .map(
      (p, i) => `
      <div class="part">
        <div class="badge">${esc(badge(f, p, i))}</div>
        <div>
          <div class="pname">${esc(p.key)}</div>
          ${p.quote ? `<div class="pquote">“${esc(p.quote)}”</div>` : ''}
          <div class="pdesc">${esc(p.desc)}</div>
        </div>
      </div>`,
    )
    .join('');
  const commands = f.commands
    ? `<div class="commands">${f.commands.map((c) => `<span><b>${esc(c.cmd)}</b> ${esc(c.desc)}</span>`).join('')}</div>`
    : '';
  return `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
<style>
  :root { --navy:#001e62; --deep:#001237; --orange:#ef7225; --blue:#006cff; --ink:#0f172a; --muted:#595959; --line:#d9d9d9; --soft:#fdf0e7; --surface:#f5f7fb; }
  * { box-sizing:border-box; margin:0; }
  body { width:${WIDTH}px; font-family:Nunito,sans-serif; color:var(--ink); background:#fff; }
  .top { position:relative; overflow:hidden; background:var(--deep); color:#fff; padding:56px 64px 52px; }
  .top::before { content:''; position:absolute; inset:0; background:radial-gradient(700px 360px at 92% -10%, #006cff66, transparent 60%), radial-gradient(500px 300px at 105% 110%, #ef722540, transparent 60%); }
  .top::after { content:''; position:absolute; inset:0; opacity:.08; background-image:radial-gradient(#fff 1.2px, transparent 1.2px); background-size:24px 24px; }
  .top > * { position:relative; z-index:1; }
  .meta { display:flex; justify-content:space-between; align-items:center; margin-bottom:44px; }
  .meta img { height:46px; }
  .meta span { font:600 15px Poppins; letter-spacing:.16em; text-transform:uppercase; color:#ffffffb3; }
  h1 { font:700 76px/1.02 Poppins; letter-spacing:-.01em; }
  .tag { margin-top:18px; font-size:27px; line-height:1.35; color:#ffffffcc; max-width:860px; }
  .when { display:flex; gap:14px; align-items:baseline; margin:-26px 64px 0; position:relative; z-index:2; background:var(--orange); color:#fff; border-radius:18px; padding:20px 26px; font-size:21px; line-height:1.4; box-shadow:0 10px 30px #ef722544; }
  .when b { font:700 15px Poppins; letter-spacing:.14em; text-transform:uppercase; white-space:nowrap; }
  .body { padding:40px 64px 44px; }
  .h2 { font:700 15px Poppins; letter-spacing:.16em; text-transform:uppercase; color:var(--orange); margin-bottom:18px; }
  .parts { display:grid; grid-template-columns:${twoCol ? '1fr 1fr' : '1fr'}; gap:14px; }
  .part { display:flex; gap:18px; align-items:flex-start; border:1.5px solid #e6e9f0; border-radius:18px; padding:20px 22px; background:#fff; }
  .badge { flex:none; width:52px; height:52px; border-radius:14px; background:var(--navy); color:#fff; font:700 26px/52px Poppins; text-align:center; }
  .pname { font:600 23px Poppins; color:var(--navy); }
  .pquote { font-style:italic; color:var(--navy); font-size:19px; margin-top:4px; }
  .pdesc { font-size:18.5px; line-height:1.42; color:var(--muted); margin-top:4px; }
  .commands { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-top:16px; }
  .commands span { background:var(--surface); border-radius:12px; padding:9px 14px; font-size:16.5px; color:var(--muted); }
  .commands b { font-family:ui-monospace,Menlo,monospace; color:var(--blue); margin-right:4px; }
  .sheet { margin-top:34px; }
  pre { background:var(--deep); color:#e7ecf7; border-radius:18px; padding:26px 28px; font:500 18.5px/1.6 ui-monospace,'SF Mono',Menlo,Consolas,monospace; white-space:pre-wrap; border-left:6px solid var(--orange); }
  .tip { margin-top:30px; display:flex; gap:18px; background:var(--soft); border-radius:18px; padding:22px 26px; }
  .tip .icon { flex:none; width:44px; height:44px; border-radius:50%; background:var(--orange); color:#fff; font:700 24px/44px Poppins; text-align:center; }
  .tip b { display:block; font:600 20px Poppins; color:var(--navy); margin-bottom:4px; }
  .tip p { font-size:19px; line-height:1.45; }
  .foot { background:var(--deep); color:#ffffffb3; padding:26px 64px; display:flex; justify-content:space-between; align-items:center; font-size:16px; }
  .foot img { height:36px; }
  .foot .tools { color:#fff; font:600 16px Poppins; }
</style></head><body>
  <div class="top">
    <div class="meta"><img src="${logo}" alt=""><span>Prompting guide · ${String(index + 1).padStart(2, '0')} of ${String(frameworks.length).padStart(2, '0')}</span></div>
    <h1>${esc(f.name)}</h1>
    <p class="tag">${esc(f.tagline)}</p>
  </div>
  <div class="when"><b>Use it when</b><span>${esc(f.useWhen)}</span></div>
  <div class="body">
    <div class="h2">${esc(f.partsTitle)}</div>
    <div class="parts">${parts}</div>
    ${commands}
    <div class="sheet">
      <div class="h2">${f.slug === 'synapse' ? 'Quick start' : 'Copy and fill in'}</div>
      <pre>${esc(f.sheet)}</pre>
    </div>
    <div class="tip"><div class="icon">!</div><div><b>${esc(f.insight.title)}</b><p>${esc(f.insight.body)}</p></div></div>
  </div>
  <div class="foot">
    <img src="${logo}" alt="">
    <span class="tools">Built for UnifiedAI · Works with ChatGPT, Claude, Gemini, Copilot</span>
    <span>${esc(site.orgName)} ${esc(site.hubName)} · Updated ${esc(site.guidesUpdated)}</span>
  </div>
</body></html>`;
}

mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();
for (const [i, f] of frameworks.entries()) {
  const html = page(f, i);
  for (const [suffix, scale] of [['', 1.5], ['-thumb', 0.45]]) {
    const ctx = await browser.newContext({ viewport: { width: WIDTH, height: 1350 }, deviceScaleFactor: scale });
    const p = await ctx.newPage();
    await p.setContent(html, { waitUntil: 'networkidle' });
    await p.evaluate(() => document.fonts.ready);
    if (suffix === '-thumb') {
      // Thumbnails show the top of the guide at a 4:5 ratio, matching the card.
      await p.screenshot({ path: `${OUT}/${f.slug}${suffix}.png`, clip: { x: 0, y: 0, width: WIDTH, height: 1350 } });
    } else {
      await p.screenshot({ path: `${OUT}/${f.slug}.png`, fullPage: true });
      const height = await p.evaluate(() => document.body.scrollHeight);
      await p.pdf({ path: `${OUT}/${f.slug}.pdf`, width: `${WIDTH}px`, height: `${height + 2}px`, printBackground: true, pageRanges: '1' });
    }
    await ctx.close();
  }
  writeFileSync(`${OUT}/.gitkeep`, '');
  console.log(`Rendered ${f.slug}`);
}
await browser.close();
