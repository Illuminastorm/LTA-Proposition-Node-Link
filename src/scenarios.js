// ============================================================
//  THE LAST METER , Scenario Deck
//  Pillars:  eff = Efficiency ⚡ | liv = Livability 🌿
//            coh = Social Cohesion 🤝 | spa = Space 🏙️
//  budget in S$ millions. Effects are integer deltas.
//  `consequence` (optional): id of a card shuffled into the
//   deck N weeks later as a ripple of that choice.
// ============================================================

export const METERS = [
  { key: "eff", label: "Efficiency",      glyph: "⚡", color: "#ffcf4a" },
  { key: "liv", label: "Livability",      glyph: "❀", color: "#54e08a" },
  { key: "coh", label: "Social Cohesion", glyph: "⬡", color: "#4ad4ff" },
  { key: "spa", label: "Space",           glyph: "▦", color: "#c98bff" },
];

// --- main proposals (the 10) -------------------------------------------------
export const SCENARIOS = [
  {
    id: "vertical-hive",
    dept: "URBAN DENSITY TASKFORCE",
    icon: "🏗️",
    title: "The Vertical Hive Initiative",
    context:
      "Developers propose stacking housing, transit and offices into self-contained mega-spires , a whole district in a single tower footprint.",
    left: {
      label: "DISTRIBUTED GARDEN HUBS",
      blurb: "Spread low-rise community hubs threaded with greenery instead.",
      effects: { liv: +9, coh: +8, spa: -10, eff: -6, budget: -15 },
      consequence: "hub-sprawl",
    },
    right: {
      label: "BUILD THE MEGA-SPIRES",
      blurb: "Pack the population vertically. Maximise every square metre.",
      effects: { eff: +10, spa: +12, liv: -9, coh: -8, budget: -25 },
      consequence: "spire-isolation",
    },
  },
  {
    id: "auto-walkways",
    dept: "PEDESTRIAN SYSTEMS DIV.",
    icon: "🚶",
    title: "Automated High-Speed Walkways",
    context:
      "Engineers want to rip out neighbourhood footpaths and replace them with conveyor-belt 'flow-ways' that move commuters at 12 km/h.",
    left: {
      label: "KEEP THE WALKABLE STREETS",
      blurb: "People stroll, greet neighbours, linger. Slower, but human.",
      effects: { coh: +9, liv: +7, eff: -8, budget: +5 },
    },
    right: {
      label: "INSTALL THE FLOW-WAYS",
      blurb: "Commutes shrink. Sidewalk life disappears into the machine.",
      effects: { eff: +11, liv: -7, coh: -9, budget: -18 },
      consequence: "walkway-backlash",
    },
  },
  {
    id: "freight-tunnels",
    dept: "SUBTERRANEAN LOGISTICS",
    icon: "📦",
    title: "Underground Freight Grid",
    context:
      "Bore a network of autonomous cargo tunnels beneath the island, clearing every delivery lorry off the surface streets.",
    left: {
      label: "DEFER , TOO COSTLY",
      blurb: "Lorries stay above ground. The treasury keeps its reserves.",
      effects: { eff: -5, liv: -4, budget: +10 },
    },
    right: {
      label: "BORE THE TUNNELS",
      blurb: "Surface freed for people; a generational debt for the city.",
      effects: { eff: +12, liv: +8, spa: +6, budget: -40 },
      consequence: "tunnel-overrun",
    },
  },
  {
    id: "congestion-pricing",
    dept: "ROAD ECONOMICS UNIT",
    icon: "🛣️",
    title: "Dynamic Road Pricing 2.0",
    context:
      "Charge every vehicle by the metre, in real time, everywhere. Traffic would melt , and so might your popularity.",
    left: {
      label: "FREEZE THE TARIFFS",
      blurb: "No new charges. Roads clog, but the public exhales.",
      effects: { coh: +6, eff: -8, budget: -8 },
    },
    right: {
      label: "PRICE EVERY METRE",
      blurb: "Congestion evaporates. Lower-income drivers feel squeezed.",
      effects: { eff: +12, coh: -11, budget: +30 },
      consequence: "pricing-protest",
    },
  },
  {
    id: "car-lite-cbd",
    dept: "CITY CORE RENEWAL",
    icon: "🌳",
    title: "Car-Lite Civic Heart",
    context:
      "Ban private cars from the entire downtown core and hand the asphalt back to parks, plazas and cyclists.",
    left: {
      label: "KEEP IT OPEN TO TRAFFIC",
      blurb: "Businesses keep their kerbside access. The status quo holds.",
      effects: { eff: +5, liv: -6, spa: -4 },
    },
    right: {
      label: "PEDESTRIANISE THE CORE",
      blurb: "Greener, calmer, beloved , but freight and commuters reroute.",
      effects: { liv: +12, coh: +9, spa: +7, eff: -9, budget: -20 },
      consequence: "cbd-business-flight",
    },
  },
  {
    id: "drone-airspace",
    dept: "AERIAL MOBILITY BOARD",
    icon: "🚁",
    title: "Open the Drone Corridors",
    context:
      "License the low-altitude sky for delivery drones and air-taxis. Goods and VIPs fly; everyone else hears the buzzing.",
    left: {
      label: "GROUND THE FLEETS",
      blurb: "Skies stay quiet. Logistics firms grumble about lost speed.",
      effects: { liv: +7, eff: -6, budget: -5 },
    },
    right: {
      label: "RELEASE THE AIRSPACE",
      blurb: "Instant delivery, premium air-taxis , and a relentless hum.",
      effects: { eff: +11, spa: +8, liv: -10, coh: -6, budget: +18 },
      consequence: "drone-noise",
    },
  },
  {
    id: "ai-signals",
    dept: "TRAFFIC INTELLIGENCE",
    icon: "🧠",
    title: "Hand Signals to the AI",
    context:
      "Let a single neural network run every traffic light, train and bus on the island, optimising flow second by second.",
    left: {
      label: "KEEP HUMANS IN THE LOOP",
      blurb: "Operators stay employed; the network runs a little slower.",
      effects: { coh: +7, eff: -5, budget: -6 },
    },
    right: {
      label: "FULL AUTONOMY",
      blurb: "Flawless flow , until the day the model makes a choice you can't explain.",
      effects: { eff: +13, budget: +12, coh: -8, liv: -4 },
      consequence: "ai-blackbox",
    },
  },
  {
    id: "floating-hub",
    dept: "COASTAL EXPANSION",
    icon: "🌊",
    title: "Floating Transit Islands",
    context:
      "Out of land? Anchor modular transit hubs on the sea off the southern coast and grow the network outward over water.",
    left: {
      label: "RECLAIM INLAND PLOTS",
      blurb: "Demolish ageing estates instead. Cheaper, but displacing.",
      effects: { spa: +9, coh: -9, budget: -10 },
    },
    right: {
      label: "FLOAT THE HUBS",
      blurb: "New space from nothing , at the mercy of rising seas.",
      effects: { spa: +13, eff: +6, liv: +4, budget: -35 },
      consequence: "floating-storm",
    },
  },
  {
    id: "night-transit",
    dept: "24-HOUR CITY OFFICE",
    icon: "🌙",
    title: "The City That Never Sleeps",
    context:
      "Run the MRT around the clock to power a true 24-hour economy. Maintenance crews and quiet nights pay the price.",
    left: {
      label: "PROTECT THE NIGHT HOURS",
      blurb: "Trains rest; tracks get maintained; the city sleeps.",
      effects: { liv: +8, coh: +5, eff: -7 },
    },
    right: {
      label: "GO 24/7",
      blurb: "The night economy booms; track wear and burnout creep in.",
      effects: { eff: +10, budget: +20, liv: -9, coh: -5 },
      consequence: "night-maintenance",
    },
  },
  {
    id: "green-corridor",
    dept: "LAND ALLOCATION BOARD",
    icon: "🦋",
    title: "Corridor or Expressway?",
    context:
      "One last strip of land splits the island. Engineers want an expressway; ecologists want a continuous wildlife-and-cycling green corridor.",
    left: {
      label: "THE GREEN CORRIDOR",
      blurb: "A spine of nature across the city. Cars take the long way round.",
      effects: { liv: +13, coh: +8, eff: -10, budget: -15 },
      consequence: "corridor-congestion",
    },
    right: {
      label: "THE EXPRESSWAY",
      blurb: "Traffic flows; the last green seam is paved over for good.",
      effects: { eff: +12, spa: +7, liv: -11, coh: -6, budget: +10 },
    },
  },
];

// --- consequence / ripple cards (shuffled in later) --------------------------
export const CONSEQUENCES = {
  "hub-sprawl": {
    id: "hub-sprawl", dept: "RIPPLE · PLANNING", icon: "🗺️", tag: "CONSEQUENCE",
    title: "The Hubs Are Sprawling",
    context: "Your garden hubs are beloved , and devouring land. The board demands you reclaim some footprint.",
    left:  { label: "HOLD THE LINE", blurb: "Keep every hub as is.", effects: { coh: +5, spa: -7 } },
    right: { label: "CONSOLIDATE", blurb: "Merge hubs, upset residents.", effects: { spa: +9, coh: -8, liv: -4 } },
  },
  "spire-isolation": {
    id: "spire-isolation", dept: "RIPPLE · COMMUNITY", icon: "🏢", tag: "CONSEQUENCE",
    title: "Life Inside the Spires",
    context: "Residents never leave their towers. Loneliness reports are climbing through the mega-spires.",
    left:  { label: "FUND SKY-COMMONS", blurb: "Build shared floors mid-tower.", effects: { coh: +9, liv: +5, budget: -18 } },
    right: { label: "IGNORE IT", blurb: "Efficiency over wellbeing.", effects: { eff: +4, coh: -9, liv: -6 } },
  },
  "walkway-backlash": {
    id: "walkway-backlash", dept: "RIPPLE · PUBLIC MOOD", icon: "📢", tag: "CONSEQUENCE",
    title: "Commuters Revolt",
    context: "Elderly residents are stranded by the flow-ways and the press has noticed. Footage is going viral.",
    left:  { label: "ADD SLOW LANES", blurb: "Retrofit accessible paths.", effects: { coh: +8, liv: +5, budget: -16 } },
    right: { label: "STAY THE COURSE", blurb: "Speed above all.", effects: { eff: +5, coh: -10 } },
  },
  "tunnel-overrun": {
    id: "tunnel-overrun", dept: "RIPPLE · TREASURY", icon: "💸", tag: "CONSEQUENCE",
    title: "Tunnel Cost Overrun",
    context: "The freight grid is two years late and bleeding money. Auditors want answers , and budget.",
    left:  { label: "BAIL IT OUT", blurb: "Pour in emergency funds.", effects: { eff: +6, budget: -30 } },
    right: { label: "HALT THE DIG", blurb: "Mothball half the network.", effects: { eff: -8, spa: -5, budget: +12 } },
  },
  "pricing-protest": {
    id: "pricing-protest", dept: "RIPPLE · UNREST", icon: "✊", tag: "CONSEQUENCE",
    title: "Drivers on the Streets",
    context: "Road-pricing has sparked the largest protest in a decade. The mood is turning against your office.",
    left:  { label: "OFFER REBATES", blurb: "Subsidise lower-income drivers.", effects: { coh: +11, budget: -25 } },
    right: { label: "HOLD FIRM", blurb: "The system pays for itself.", effects: { budget: +15, coh: -9, liv: -4 } },
  },
  "cbd-business-flight": {
    id: "cbd-business-flight", dept: "RIPPLE · ECONOMY", icon: "🏬", tag: "CONSEQUENCE",
    title: "Shops Are Leaving",
    context: "Without car access, downtown retailers are relocating. The plazas are gorgeous but quiet.",
    left:  { label: "INCENTIVISE TENANTS", blurb: "Grants to keep them.", effects: { coh: +6, eff: +4, budget: -22 } },
    right: { label: "LET IT REBALANCE", blurb: "Trust the long game.", effects: { liv: +5, eff: -7, coh: -4 } },
  },
  "drone-noise": {
    id: "drone-noise", dept: "RIPPLE · WELLBEING", icon: "🔊", tag: "CONSEQUENCE",
    title: "The Sky Won't Hush",
    context: "Drone noise complaints have tripled. Sleep clinics report a city-wide spike.",
    left:  { label: "CURFEW THE SKIES", blurb: "Ground drones at night.", effects: { liv: +9, eff: -7, budget: -6 } },
    right: { label: "RAISE THE CEILING", blurb: "Push corridors higher, costlier.", effects: { liv: +4, budget: -14 } },
  },
  "ai-blackbox": {
    id: "ai-blackbox", dept: "RIPPLE · GOVERNANCE", icon: "🕳️", tag: "CONSEQUENCE",
    title: "The Model Won't Explain",
    context: "The traffic AI rerouted three districts overnight and no engineer can say why. Trust is wobbling.",
    left:  { label: "AUDIT & THROTTLE", blurb: "Cap the AI's authority.", effects: { coh: +9, eff: -8, budget: -10 } },
    right: { label: "TRUST THE MACHINE", blurb: "Let it keep optimising.", effects: { eff: +8, coh: -10, liv: -3 } },
  },
  "floating-storm": {
    id: "floating-storm", dept: "RIPPLE · CLIMATE", icon: "⛈️", tag: "CONSEQUENCE",
    title: "Storm Surge Warning",
    context: "A record monsoon is forecast. Your floating hubs need reinforced moorings , fast.",
    left:  { label: "REINFORCE NOW", blurb: "Pay for storm-proofing.", effects: { liv: +5, spa: +3, budget: -28 } },
    right: { label: "RIDE IT OUT", blurb: "Gamble on calm weather.", effects: { spa: +4, liv: -10, coh: -6 } },
  },
  "night-maintenance": {
    id: "night-maintenance", dept: "RIPPLE · SAFETY", icon: "🔧", tag: "CONSEQUENCE",
    title: "Tracks Are Wearing Thin",
    context: "Round-the-clock trains left no time for repairs. A fault has shut the central line for a week.",
    left:  { label: "PAUSE FOR REPAIRS", blurb: "Suspend nights to fix tracks.", effects: { liv: +7, eff: -9, budget: -12 } },
    right: { label: "PATCH AND PRESS ON", blurb: "Quick fixes, keep running.", effects: { eff: +4, liv: -7, coh: -5 } },
  },
  "corridor-congestion": {
    id: "corridor-congestion", dept: "RIPPLE · TRAFFIC", icon: "🚗", tag: "CONSEQUENCE",
    title: "The Long Way Round",
    context: "With the corridor closed to cars, the ring road is gridlocked. Commuters are losing patience.",
    left:  { label: "ADD EXPRESS BUSES", blurb: "Fund rapid transit instead.", effects: { eff: +7, coh: +4, budget: -20 } },
    right: { label: "NARROW THE CORRIDOR", blurb: "Give a lane back to cars.", effects: { eff: +6, liv: -8, coh: -5 } },
  },
};

// --- endings: which dystopia for which collapsed meter ----------------------
export const ENDINGS = {
  eff: {
    high: { title: "The Hyper-Optimised Cage", body: "Efficiency became the only god. Every second is scheduled, every route forced. The city runs perfectly and no one can breathe inside the machine. You are quietly retired." },
    low:  { title: "The Great Standstill", body: "Trains crawl, roads clot, goods rot in transit. The island that ran like clockwork has seized. The Cabinet relieves you of your duties." },
  },
  liv: {
    high: { title: "The Gilded Garden", body: "You chased livability so hard the city stopped moving forward. Beautiful, idle, and bankrupt of ambition , the economy withers among the orchids. You are let go." },
    low:  { title: "The Concrete Lung", body: "Greenery vanished beneath glass and asphalt. Air-quality alarms are permanent now. A burnt-out, joyless metropolis demands your resignation." },
  },
  coh: {
    high: { title: "The Velvet Consensus", body: "So much was spent keeping everyone content that the treasury cracked and progress stalled. A city of comfort with no future. You are gently shown the door." },
    low:  { title: "The Fractured Island", body: "Inequality and resentment tore the social fabric. Districts no longer speak to one another. Amid the unrest, your office is dissolved." },
  },
  spa: {
    high: { title: "The Hollow Sprawl", body: "You hoarded land and footprint until the city sprawled thin and lifeless , vast, empty, unaffordable to maintain. The board removes you." },
    low:  { title: "The Crush", body: "Every metre was built over. There is no room left to move, to grow, to live. The overcrowded island grinds against itself and you are dismissed." },
  },
  budget: {
    low:  { title: "The Reckoning", body: "The treasury is empty. Salaries go unpaid, projects freeze mid-build, contractors walk. Bankruptcy ends your tenure as Connectivity Architect." },
  },
};
