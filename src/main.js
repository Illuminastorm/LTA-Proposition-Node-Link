import { METERS, SCENARIOS, CONSEQUENCES, ENDINGS } from "./scenarios.js";

// ---------------------------------------------------------------------------
//  Game state
// ---------------------------------------------------------------------------
const START_STATS = { eff: 50, liv: 50, coh: 50, spa: 50 };
const START_BUDGET = 120;       // S$ millions
const PASSIVE_INCOME = 6;       // budget added per week
const SWIPE_THRESHOLD = 110;    // px drag distance to commit
const CONSEQUENCE_DELAY = 3;    // weeks until a ripple resurfaces

let state;

function freshState() {
  return {
    stats: { ...START_STATS },
    budget: START_BUDGET,
    week: 1,
    decisions: 0,
    deck: shuffle([...SCENARIOS]),  // upcoming main cards
    queued: [],                     // {card, dueWeek} consequences waiting
    current: null,
    over: false,
  };
}

// ---------------------------------------------------------------------------
//  DOM refs
// ---------------------------------------------------------------------------
const el = (id) => document.getElementById(id);
const screens = {
  start: el("screen-start"),
  game: el("screen-game"),
  over: el("screen-over"),
};
const deckEl = el("deck");
const metersEl = el("meters");
const bannerLeft = el("banner-left");
const bannerRight = el("banner-right");

// ---------------------------------------------------------------------------
//  Helpers
// ---------------------------------------------------------------------------
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

function showScreen(name) {
  Object.values(screens).forEach((s) => s.classList.remove("is-active"));
  screens[name].classList.add("is-active");
}

// ---------------------------------------------------------------------------
//  Meters (HUD)
// ---------------------------------------------------------------------------
function buildMeters() {
  metersEl.innerHTML = "";
  METERS.forEach((m) => {
    const wrap = document.createElement("div");
    wrap.className = "meter";
    wrap.dataset.key = m.key;
    wrap.style.setProperty("--mc", m.color);
    wrap.innerHTML = `
      <div class="meter-head">
        <span class="meter-glyph">${m.glyph}</span>
        <span class="meter-name">${m.label}</span>
        <span class="meter-hint" data-hint="${m.key}"></span>
      </div>
      <div class="meter-track">
        <div class="meter-fill" data-fill="${m.key}"></div>
        <div class="meter-ticks"></div>
      </div>`;
    metersEl.appendChild(wrap);
  });
}

function renderMeters(flashKeys = []) {
  METERS.forEach((m) => {
    const v = state.stats[m.key];
    const fill = metersEl.querySelector(`[data-fill="${m.key}"]`);
    fill.style.height = v + "%";
    const wrap = metersEl.querySelector(`.meter[data-key="${m.key}"]`);
    wrap.classList.toggle("is-danger", v <= 20 || v >= 80);
    if (flashKeys.includes(m.key)) {
      wrap.classList.remove("is-flash");
      void wrap.offsetWidth; // reflow to restart animation
      wrap.classList.add("is-flash");
    }
  });
  el("week-num").textContent = String(state.week).padStart(3, "0");
  el("budget-num").textContent = Math.round(state.budget);
  el("budget-wrap").classList.toggle("is-danger", state.budget <= 25);
}

// preview dots above meters while dragging
function showPreview(side) {
  if (!state.current || !side) return clearPreview();
  const eff = state.current[side].effects;
  METERS.forEach((m) => {
    const hint = metersEl.querySelector(`[data-hint="${m.key}"]`);
    const d = eff[m.key] || 0;
    hint.className = "meter-hint";
    if (d > 0) hint.classList.add("up");
    else if (d < 0) hint.classList.add("down");
    hint.textContent = d > 0 ? "▲" : d < 0 ? "▼" : "";
  });
  // budget preview
  const bw = el("budget-wrap");
  bw.classList.remove("prev-up", "prev-down");
  const bd = eff.budget || 0;
  if (bd > 0) bw.classList.add("prev-up");
  else if (bd < 0) bw.classList.add("prev-down");
}
function clearPreview() {
  metersEl.querySelectorAll(".meter-hint").forEach((h) => {
    h.className = "meter-hint";
    h.textContent = "";
  });
  el("budget-wrap").classList.remove("prev-up", "prev-down");
}

// ---------------------------------------------------------------------------
//  Drawing cards
// ---------------------------------------------------------------------------
function drawNext() {
  // promote any due consequence first
  const due = state.queued.findIndex((q) => q.dueWeek <= state.week);
  let card;
  if (due !== -1) {
    card = state.queued.splice(due, 1)[0].card;
  } else if (state.deck.length) {
    card = state.deck.shift();
  } else {
    // recycle main deck so the run can continue indefinitely
    state.deck = shuffle([...SCENARIOS]);
    card = state.deck.shift();
  }
  state.current = card;
  renderCard(card);
}

function renderCard(card) {
  deckEl.innerHTML = "";

  // a couple of inert backdrop cards for depth
  for (let i = 2; i >= 1; i--) {
    const ghost = document.createElement("div");
    ghost.className = "card card--ghost";
    ghost.style.setProperty("--i", i);
    deckEl.appendChild(ghost);
  }

  const c = document.createElement("article");
  c.className = "card card--active";
  const tag = card.tag
    ? `<span class="card-tag card-tag--ripple">↻ ${card.tag}</span>`
    : `<span class="card-tag">PROPOSAL</span>`;
  c.innerHTML = `
    <div class="card-sheen"></div>
    <div class="card-top">
      ${tag}
      <span class="card-dept">${card.dept}</span>
    </div>
    <div class="card-art">
      <div class="card-art-ring"></div>
      <span class="card-icon">${card.icon}</span>
    </div>
    <h2 class="card-title">${card.title}</h2>
    <p class="card-context">${card.context}</p>
    <div class="card-choices">
      <div class="card-choice card-choice--l">
        <span class="cc-dir">◄ REJECT</span>
        <span class="cc-label">${card.left.label}</span>
      </div>
      <div class="card-choice card-choice--r">
        <span class="cc-dir">APPROVE ►</span>
        <span class="cc-label">${card.right.label}</span>
      </div>
    </div>
    <div class="card-verdict card-verdict--l"><span>${card.left.blurb}</span></div>
    <div class="card-verdict card-verdict--r"><span>${card.right.blurb}</span></div>`;
  deckEl.appendChild(c);

  el("ctrl-left-text").textContent = card.left.label;
  el("ctrl-right-text").textContent = card.right.label;
  el("card-counter").textContent = card.tag ? "↻ RIPPLE EFFECT" : "PROPOSAL";

  attachDrag(c);
}

// ---------------------------------------------------------------------------
//  Drag / swipe interaction
// ---------------------------------------------------------------------------
function attachDrag(card) {
  let startX = 0, startY = 0, dx = 0, dy = 0, dragging = false, side = null;

  const onDown = (e) => {
    if (state.over) return;
    dragging = true;
    const p = point(e);
    startX = p.x; startY = p.y;
    card.classList.add("is-grabbing");
    card.setPointerCapture?.(e.pointerId);
  };
  const onMove = (e) => {
    if (!dragging) return;
    const p = point(e);
    dx = p.x - startX;
    dy = p.y - startY;
    const rot = dx * 0.05;
    card.style.transform = `translate(${dx}px, ${dy * 0.25}px) rotate(${rot}deg)`;
    const intensity = clamp(Math.abs(dx) / SWIPE_THRESHOLD, 0, 1);
    const newSide = dx > 12 ? "right" : dx < -12 ? "left" : null;
    card.classList.toggle("tilt-r", newSide === "right");
    card.classList.toggle("tilt-l", newSide === "left");
    bannerRight.style.opacity = newSide === "right" ? intensity : 0;
    bannerLeft.style.opacity = newSide === "left" ? intensity : 0;
    bannerRight.textContent = "APPROVE";
    bannerLeft.textContent = "REJECT";
    if (newSide !== side) {
      side = newSide;
      showPreview(side);
    }
  };
  const onUp = (e) => {
    if (!dragging) return;
    dragging = false;
    card.classList.remove("is-grabbing");
    bannerLeft.style.opacity = 0;
    bannerRight.style.opacity = 0;
    if (Math.abs(dx) >= SWIPE_THRESHOLD) {
      commit(card, dx < 0 ? "left" : "right");
    } else {
      // snap back
      card.classList.add("snap-back");
      card.style.transform = "";
      card.classList.remove("tilt-l", "tilt-r");
      clearPreview();
      setTimeout(() => card.classList.remove("snap-back"), 300);
    }
    dx = dy = 0; side = null;
  };

  card.addEventListener("pointerdown", onDown);
  card.addEventListener("pointermove", onMove);
  card.addEventListener("pointerup", onUp);
  card.addEventListener("pointercancel", onUp);

  // expose programmatic swipe for buttons
  card._swipe = (dir) => {
    side = dir;
    showPreview(dir);
    const off = dir === "left" ? -1 : 1;
    setTimeout(() => commit(card, dir, off), 60);
  };
}

const point = (e) => ({ x: e.clientX ?? 0, y: e.clientY ?? 0 });

function commit(card, dir) {
  clearPreview();
  card.classList.add(dir === "left" ? "fly-left" : "fly-right");
  applyChoice(state.current[dir]);
  setTimeout(() => {
    if (!state.over) {
      advanceWeek();
      drawNext();
    }
  }, 360);
}

// ---------------------------------------------------------------------------
//  Applying a choice
// ---------------------------------------------------------------------------
function applyChoice(choice) {
  state.decisions++;
  const eff = choice.effects;
  const flash = [];
  METERS.forEach((m) => {
    const d = eff[m.key] || 0;
    if (d) {
      state.stats[m.key] = state.stats[m.key] + d;
      flash.push(m.key);
    }
  });
  if (eff.budget) state.budget += eff.budget;

  // queue a consequence ripple
  if (choice.consequence && CONSEQUENCES[choice.consequence]) {
    state.queued.push({
      card: CONSEQUENCES[choice.consequence],
      dueWeek: state.week + CONSEQUENCE_DELAY,
    });
  }

  renderMeters(flash);
  checkCollapse();
}

function advanceWeek() {
  state.week++;
  state.budget += PASSIVE_INCOME;
  renderMeters();
  checkCollapse();
}

function checkCollapse() {
  if (state.over) return;
  // budget bankruptcy
  if (state.budget < 0) return endGame("budget", "low");
  for (const m of METERS) {
    const v = state.stats[m.key];
    if (v >= 100) return endGame(m.key, "high");
    if (v <= 0) return endGame(m.key, "low");
  }
  // clamp survivors into range for display sanity
  METERS.forEach((m) => (state.stats[m.key] = clamp(state.stats[m.key], 0, 100)));
}

// ---------------------------------------------------------------------------
//  Game over
// ---------------------------------------------------------------------------
function endGame(key, dir) {
  state.over = true;
  const ending = ENDINGS[key]?.[dir] || {
    title: "Dismissed",
    body: "The balance broke and your tenure ended.",
  };
  el("over-title").textContent = ending.title;
  el("over-body").textContent = ending.body;
  el("over-weeks").textContent = state.week;
  el("over-decisions").textContent = state.decisions;

  const meterLabel =
    key === "budget" ? "TREASURY" : METERS.find((m) => m.key === key)?.label.toUpperCase();
  el("over-stamp").textContent =
    dir === "high" ? `${meterLabel} MAXED` : `${meterLabel} COLLAPSED`;

  setTimeout(() => showScreen("over"), 420);
}

// ---------------------------------------------------------------------------
//  Wiring
// ---------------------------------------------------------------------------
function startGame() {
  state = freshState();
  buildMeters();
  renderMeters();
  showScreen("game");
  drawNext();
}

function buttonSwipe(dir) {
  if (state?.over) return;
  const card = deckEl.querySelector(".card--active");
  if (card && card._swipe) card._swipe(dir);
}

el("btn-start").addEventListener("click", startGame);
el("btn-restart").addEventListener("click", startGame);
el("ctrl-left").addEventListener("click", () => buttonSwipe("left"));
el("ctrl-right").addEventListener("click", () => buttonSwipe("right"));

// keyboard support
window.addEventListener("keydown", (e) => {
  if (!screens.game.classList.contains("is-active")) return;
  if (e.key === "ArrowLeft") buttonSwipe("left");
  if (e.key === "ArrowRight") buttonSwipe("right");
});
