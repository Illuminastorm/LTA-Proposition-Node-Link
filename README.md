# THE LAST METER

A swipe-based urban survival simulation. You are the **Chief Connectivity Architect** of
Singapore, 2050. The island is full — you can't build your way to utopia, only keep the
plates spinning.

Every proposal is a binary choice. **Swipe / drag the card** left (reject) or right (approve),
or use the buttons / arrow keys. While you hold a card, indicator arrows above each meter
hint at *what* will change — but never *by how much*.

## The five gauges

| Pillar | Meaning |
| --- | --- |
| ⚡ **Efficiency** | Transit speed & economic output |
| ❀ **Livability** | Mental health, greenery, breathing room |
| ⬡ **Social Cohesion** | Equity & community connection |
| ▦ **Space** | Land availability & infrastructure footprint |
| S$ **Treasury** | Budget — grows passively each week, spent on projects |

If any pillar hits **0%** *or* **100%**, or the treasury goes bankrupt, you are dismissed —
and the game ends in a specific dystopia tied to whichever meter broke.

Some decisions queue a **ripple card** that resurfaces a few weeks later as a consequence.
Survive as many *weeks in office* as you can.

## Run it

```bash
npm install
npm run dev
```

Then open the printed URL (default <http://localhost:5173>).

To build a static bundle (deployable to any host — Netlify, GitHub Pages, etc.):

```bash
npm run build      # outputs to dist/
npm run preview    # serve the production build locally
```

## Project layout

```
index.html        markup + atmospheric SVG skyline
src/style.css      "cyber-clean" control-desk styling & animations
src/main.js        game engine: state, draw/swipe, meters, endings
src/scenarios.js   the 10 proposals, ripple cards, and dystopia endings
```

Built as a 1-month-sprint prototype: a finite state machine driving a data-defined deck,
so adding cards is just editing `src/scenarios.js`.
