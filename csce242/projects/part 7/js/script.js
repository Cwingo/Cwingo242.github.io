/* NAV TOGGLE */
const btn = document.getElementById('menu-toggle');
const nav = document.getElementById('main-nav');
const backdrop = document.getElementById('nav-backdrop');

function openNav() {
  nav.classList.add('open');
  backdrop.classList.add('show');
  btn.setAttribute('aria-expanded', 'true');
  document.documentElement.classList.add('no-scroll');
}
function closeNav() {
  nav.classList.remove('open');
  backdrop.classList.remove('show');
  btn.setAttribute('aria-expanded', 'false');
  document.documentElement.classList.remove('no-scroll');
}
function toggleNav() { nav.classList.contains('open') ? closeNav() : openNav(); }
if (btn && nav && backdrop) {
  btn.addEventListener('click', toggleNav);
  backdrop.addEventListener('click', closeNav);
  nav.addEventListener('click', e => { if (e.target.tagName === 'A') closeNav(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeNav(); });
  const mql = window.matchMedia('(min-width: 721px)');
  mql.addEventListener('change', e => { if (e.matches) closeNav(); });
}

/* GALLERY */
document.querySelectorAll('[data-gallery]').forEach(gal => {
  const track = gal.querySelector('[data-track]');
  const slides = Array.from(track.children);
  const prev = gal.querySelector('.prev');
  const next = gal.querySelector('.next');
  let i = 0;
  function update() { track.style.transform = `translateX(${-i*100}%)`; }
  slides.forEach(s => s.style.flex = '0 0 100%');
  update();
  next.addEventListener('click', () => { i = (i + 1) % slides.length; update(); });
  prev.addEventListener('click', () => { i = (i - 1 + slides.length) % slides.length; update(); });
  let startX = 0, deltaX = 0;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; deltaX = 0; }, {passive:true});
  track.addEventListener('touchmove',  e => { deltaX = e.touches[0].clientX - startX; }, {passive:true});
  track.addEventListener('touchend',   () => {
    if (Math.abs(deltaX) > 40) { i = deltaX < 0 ? (i + 1) % slides.length : (i - 1 + slides.length) % slides.length; update(); }
  });
});

/* PARTS: CONFIG */
const JSON_URL = "https://cwingo.github.io/Cwingo242.github.io/csce242/projects/part%206/json/parts.json";

/* PARTS: HELPERS */
const $ = (s) => document.querySelector(s);

function makePartCard(it) {
  const a = document.createElement("article");
  a.className = "card";
  a.innerHTML = `
    <div class="card-media" data-fit="contain">
      <img src="${it.image}" alt="${it.name}" loading="lazy" />
    </div>
    <div class="card-body">
      <strong>${it.name}</strong>
      <div class="meta">${it.brand} • $${it.price}</div>
    </div>
  `;
  return a;
}

function renderParts(items) {
  const all = $("#grid-all");
  const eng = $("#grid-engine");
  const sus = $("#grid-suspension");
  const intr = $("#grid-interior");
  [all, eng, sus, intr].forEach(g => g && (g.innerHTML = ""));
  items.forEach(it => {
    all && all.appendChild(makePartCard(it));
    if (it.category === "Engine" && eng) eng.appendChild(makePartCard(it));
    if (it.category === "Suspension" && sus) sus.appendChild(makePartCard(it));
    if (it.category === "Interior" && intr) intr.appendChild(makePartCard(it));
  });
}

function hookSearch(items) {
  const input = $(".search-input");
  if (!input) return;
  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    const f = items.filter(it =>
      it.name.toLowerCase().includes(q) ||
      it.brand.toLowerCase().includes(q) ||
      it.category.toLowerCase().includes(q)
    );
    renderParts(f);
  });
}

async function initParts() {
  try {
    const res = await fetch(JSON_URL, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const items = Array.isArray(data.items) ? data.items : [];
    renderParts(items);
    hookSearch(items);
  } catch (e) {
    const all = $("#grid-all");
    if (all) all.innerHTML = `<p>Could not load parts.<br><code>${e.message}</code></p>`;
  }
}

document.addEventListener("DOMContentLoaded", initParts);


/* PARTS: SORT + FILTER */
function applySort(items) {
  const sel = document.getElementById("sort-select");
  if (!sel) return items.slice();
  const val = sel.value;
  const out = items.slice();
  if (val === "price-asc") out.sort((a,b)=>a.price-b.price);
  if (val === "price-desc") out.sort((a,b)=>b.price-a.price);
  if (val === "name-asc") out.sort((a,b)=>a.name.localeCompare(b.name));
  if (val === "name-desc") out.sort((a,b)=>b.name.localeCompare(a.name));
  return out;
}
function applyFavFilter(items) {
  const cb = document.getElementById("fav-only");
  if (!cb || !cb.checked) return items;
  return items.filter(it => FAVS.has(String(it._id)));
}

/* PARTS: RENDER */
function renderParts(items) {
  const all = document.getElementById("grid-all");
  const eng = document.getElementById("grid-engine");
  const sus = document.getElementById("grid-suspension");
  const intr = document.getElementById("grid-interior");
  [all, eng, sus, intr].forEach(g => { if (g) g.innerHTML = ""; });

  const sorted = applySort(items);
  const finalList = applyFavFilter(sorted);

  finalList.forEach(it => {
    if (all) all.appendChild(makePartCard(it));
    if (it.category === "Engine" && eng) eng.appendChild(makePartCard(it));
    if (it.category === "Suspension" && sus) sus.appendChild(makePartCard(it));
    if (it.category === "Interior" && intr) intr.appendChild(makePartCard(it));
  });

  updateCounts(items);
  wireFavButtons();
}

/* PARTS: COUNTS */
function updateCounts(items) {
  const counts = { All: items.length, Engine: 0, Suspension: 0, Interior: 0 };
  items.forEach(it => { if (counts[it.category] !== undefined) counts[it.category]++; });
  const nav = document.querySelector(".tab-nav");
  if (!nav) return;
  [...nav.querySelectorAll("label")].forEach(label => {
    const text = label.textContent.replace(/\s+\(\d+\)$/, "");
    if (counts[text] !== undefined) label.textContent = `${text} (${counts[text]})`;
  });
}

/* PARTS: FAVORITES */
function wireFavButtons() {
  document.querySelectorAll(".fav-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      if (FAVS.has(id)) FAVS.delete(id); else FAVS.add(id);
      saveFavs(FAVS);
      btn.classList.toggle("is-fav");
      const input = document.querySelector(".search-input");
      const q = input ? input.value.trim().toLowerCase() : "";
      const filtered = CURRENT_ITEMS.filter(it =>
        it.name.toLowerCase().includes(q) ||
        it.brand.toLowerCase().includes(q) ||
        it.category.toLowerCase().includes(q)
      );
      renderParts(filtered);
    });
  });
}

/* PARTS: CONTROLS */
function hookPartsControls(items) {
  CURRENT_ITEMS = items.slice();

  const toolbar = document.querySelector(".search");
  if (toolbar && !document.getElementById("sort-select")) {
    const sort = document.createElement("select");
    sort.id = "sort-select";
    sort.innerHTML = `
      <option value="default">Sort</option>
      <option value="price-asc">Price: Low → High</option>
      <option value="price-desc">Price: High → Low</option>
      <option value="name-asc">Name: A → Z</option>
      <option value="name-desc">Name: Z → A</option>
    `;
    const favWrap = document.createElement("label");
    favWrap.className = "fav-toggle";
    favWrap.innerHTML = `<input type="checkbox" id="fav-only"> Favorites only`;
    toolbar.appendChild(sort);
    toolbar.appendChild(favWrap);
  }

  const input = document.querySelector(".search-input");
  const sort = document.getElementById("sort-select");
  const favOnly = document.getElementById("fav-only");

  let t = null;
  if (input) {
    input.addEventListener("input", () => {
      clearTimeout(t);
      t = setTimeout(() => {
        const q = input.value.trim().toLowerCase();
        const filtered = items.filter(it =>
          it.name.toLowerCase().includes(q) ||
          it.brand.toLowerCase().includes(q) ||
          it.category.toLowerCase().includes(q)
        );
        CURRENT_ITEMS = filtered;
        renderParts(filtered);
      }, 150);
    });
  }
  if (sort) sort.addEventListener("change", () => renderParts(CURRENT_ITEMS));
  if (favOnly) favOnly.addEventListener("change", () => renderParts(CURRENT_ITEMS));
}

/* PARTS: SKELETONS */
function showSkeletons() {
  const grids = ["grid-all","grid-engine","grid-suspension","grid-interior"]
    .map(id=>document.getElementById(id)).filter(Boolean);
  grids.forEach(g => {
    g.innerHTML = "";
    for (let i=0;i<6;i++) {
      const sk = document.createElement("div");
      sk.className = "card skeleton";
      sk.innerHTML = `<div class="sk-media"></div><div class="sk-line"></div><div class="sk-line short"></div>`;
      g.appendChild(sk);
    }
  });
}

/* PARTS: HASH SYNC */
function syncTabFromHash() {
  const h = (location.hash || "").replace("#","");
  const map = { all: "tab-all", engine: "tab-engine", suspension: "tab-suspension", interior: "tab-interior" };
  if (map[h]) {
    const r = document.getElementById(map[h]);
    if (r) r.checked = true;
  }
}
window.addEventListener("hashchange", syncTabFromHash);

/* PARTS: LOAD */
async function initParts() {
  try {
    syncTabFromHash();
    showSkeletons();
    const res = await fetch(JSON_URL, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    hookPartsControls(data.items);
    renderParts(data.items);
  } catch (e) {
    const all = document.getElementById("grid-all");
    if (all) all.innerHTML = `<p>Could not load parts.<br><code>${e.message}</code></p>`;
  }
}
document.addEventListener("DOMContentLoaded", initParts);

/* CONTACT FORM */
const form = document.getElementById("contact-form");
const statusMsg = document.getElementById("form-status");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    statusMsg.textContent = "Sending...";

    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      subject: form.subject.value.trim(),
      message: form.message.value.trim(),
      source: "bmDub site"
    };

    try {
      const res = await fetch("https://bmdub-api.onrender.com/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const result = await res.json();
      if (res.ok && result.ok) {
        statusMsg.textContent = "Message sent successfully!";
        form.reset();
      } else {
        statusMsg.textContent = "Error sending message. Try again later.";
      }
    } catch (err) {
      statusMsg.textContent = "Network error. Please try again.";
    }
  });
}
