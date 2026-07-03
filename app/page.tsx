"use client";

import { useMemo, useState } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import {
  Activity,
  ArrowRight,
  BatteryCharging,
  Building2,
  Car,
  CheckCircle2,
  CircleDollarSign,
  CloudLightning,
  Cpu,
  Gauge,
  Layers3,
  LineChart,
  MapPin,
  Navigation,
  Network,
  PlugZap,
  Radar,
  Route,
  ShieldCheck,
  Sparkles,
  TimerReset,
  Zap
} from "lucide-react";
import clsx from "clsx";

type Charger = {
  id: string;
  name: string;
  operator: string;
  status: "available" | "busy" | "offline";
  x: number;
  y: number;
  power: string;
  connector: string;
  price: string;
  wait: string;
  health: number;
  crowd: string;
  updated: string;
  eta: string;
  queueRisk: number;
  distance: string;
  recommendation: string;
};

const chargers: Charger[] = [
  {
    id: "z-101",
    name: "Aero Mall Hub",
    operator: "ChargeZone",
    status: "available",
    x: 24,
    y: 42,
    power: "120 kW DC",
    connector: "CCS2 x 4",
    price: "Rs 21/kWh",
    wait: "0 min",
    health: 96,
    crowd: "Low",
    updated: "18 sec ago",
    eta: "18 min",
    queueRisk: 8,
    distance: "6.4 km",
    recommendation: "Best stop now. Two stalls open and queue risk stays below 8% for the next 30 min."
  },
  {
    id: "z-214",
    name: "Indiranagar Grid",
    operator: "Statiq",
    status: "busy",
    x: 54,
    y: 35,
    power: "60 kW DC",
    connector: "CCS2 x 2",
    price: "Rs 24/kWh",
    wait: "11 min",
    health: 88,
    crowd: "Medium",
    updated: "41 sec ago",
    eta: "14 min",
    queueRisk: 46,
    distance: "4.1 km",
    recommendation: "Reserve only if destination is nearby. Queue clears after the current Bolt Earth session."
  },
  {
    id: "z-330",
    name: "ORR Fleet Bay",
    operator: "Tata Power",
    status: "available",
    x: 70,
    y: 56,
    power: "180 kW DC",
    connector: "CCS2 x 6",
    price: "Rs 19/kWh",
    wait: "3 min",
    health: 93,
    crowd: "Low",
    updated: "27 sec ago",
    eta: "23 min",
    queueRisk: 12,
    distance: "9.8 km",
    recommendation: "Recommended for fleet top-up. Strong uptime history and off-peak pricing window is open."
  },
  {
    id: "z-408",
    name: "CBD Basement",
    operator: "Jio BP",
    status: "offline",
    x: 39,
    y: 66,
    power: "30 kW DC",
    connector: "CCS2 x 1",
    price: "Rs 25/kWh",
    wait: "Unavailable",
    health: 42,
    crowd: "Unknown",
    updated: "7 min ago",
    eta: "12 min",
    queueRisk: 99,
    distance: "3.2 km",
    recommendation: "Avoid. Telemetry indicates a contactor fault and the operator ticket is still open."
  },
  {
    id: "z-519",
    name: "Whitefield Superpod",
    operator: "Bolt Earth",
    status: "busy",
    x: 82,
    y: 31,
    power: "90 kW DC",
    connector: "CCS2 x 3",
    price: "Rs 22/kWh",
    wait: "19 min",
    health: 79,
    crowd: "High",
    updated: "1 min ago",
    eta: "31 min",
    queueRisk: 68,
    distance: "13.7 km",
    recommendation: "Delay by 22 min or route to ORR Fleet Bay for faster completion."
  }
];

const statusStyles = {
  available: "bg-signal shadow-[0_0_32px_rgba(22,242,179,0.78)]",
  busy: "bg-caution shadow-[0_0_32px_rgba(248,212,98,0.72)]",
  offline: "bg-danger shadow-[0_0_32px_rgba(255,93,115,0.7)]"
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 }
};

function Section({ children, id, className }: { children: React.ReactNode; id?: string; className?: string }) {
  return (
    <motion.section
      id={id}
      className={clsx("relative mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-120px" }}
      variants={fadeUp}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-100/80">
      <Sparkles className="h-3.5 w-3.5 text-electric" />
      {children}
    </div>
  );
}

function TopNav() {
  const { scrollYProgress } = useScroll();
  return (
    <div className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-night/62 px-3 py-2 shadow-[0_18px_70px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
        <a href="#" className="flex items-center gap-3 rounded-full pr-3">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-night">
            <Zap className="h-5 w-5 fill-night" />
          </span>
          <span className="font-display text-sm font-semibold sm:text-base">ZAi-Fi</span>
        </a>
        <div className="hidden items-center gap-5 text-xs font-medium text-white/58 md:flex">
          <a href="#demo" className="transition hover:text-white">Demo</a>
          <a href="#prediction" className="transition hover:text-white">Prediction</a>
          <a href="#platform" className="transition hover:text-white">Platform</a>
        </div>
        <a href="#pilot" className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-night transition hover:bg-sky-100">
          Request Pilot <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </nav>
      <motion.div className="mx-auto mt-2 h-px max-w-7xl origin-left bg-gradient-to-r from-electric via-signal to-transparent" style={{ scaleX: scrollYProgress }} />
    </div>
  );
}

function MiniMetric({ label, value, tone }: { label: string; value: string; tone?: "green" | "yellow" | "blue" | "red" }) {
  return (
    <div className="rounded-md border border-white/10 bg-black/22 p-3">
      <p className="text-[10px] uppercase tracking-[0.16em] text-white/38">{label}</p>
      <p className={clsx("mt-1 font-display text-xl font-semibold", tone === "green" && "text-signal", tone === "yellow" && "text-caution", tone === "red" && "text-danger", tone === "blue" && "text-electric")}>{value}</p>
    </div>
  );
}

function HeroConsole() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 70, damping: 18 });
  const springY = useSpring(y, { stiffness: 70, damping: 18 });
  const rotateX = useTransform(springY, [-220, 220], [4, -4]);
  const rotateY = useTransform(springX, [-220, 220], [-5, 5]);

  return (
    <motion.div
      className="relative min-h-[560px] overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#050b13] shadow-glow sm:min-h-[650px]"
      onMouseMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        x.set(event.clientX - bounds.left - bounds.width / 2);
        y.set(event.clientY - bounds.top - bounds.height / 2);
      }}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
    >
      <div className="mesh absolute inset-0 opacity-70" />
      <motion.div
        className="absolute -right-20 top-16 h-72 w-72 rounded-full bg-electric/24 blur-3xl"
        animate={{ scale: [1, 1.16, 0.96, 1], opacity: [0.32, 0.5, 0.34, 0.32] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <svg className="absolute inset-0 h-full w-full opacity-80" viewBox="0 0 860 680" fill="none">
        <path className="map-line" d="M88 438C192 292 282 508 393 351C505 193 609 269 773 101" stroke="rgba(56,189,248,.48)" strokeWidth="2" />
        <path className="map-line" d="M122 196C249 245 251 122 374 210C496 298 493 433 676 420C735 416 774 457 812 512" stroke="rgba(22,242,179,.35)" strokeWidth="2" />
        <path d="M144 562C236 518 314 590 433 502C542 421 601 533 769 472" stroke="rgba(255,255,255,.15)" strokeWidth="1.5" />
      </svg>

      {Array.from({ length: 52 }).map((_, index) => {
        const left = 7 + ((index * 19) % 86);
        const top = 10 + ((index * 31) % 78);
        const color = index % 11 === 0 ? "bg-danger" : index % 5 === 0 ? "bg-caution" : "bg-signal";
        return (
          <motion.span
            key={index}
            className={clsx("absolute h-1.5 w-1.5 rounded-full", color)}
            style={{ left: `${left}%`, top: `${top}%` }}
            animate={{ scale: [1, 2.1, 1], opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 2.2 + (index % 5) * 0.28, repeat: Infinity, delay: index * 0.05 }}
          />
        );
      })}

      <div className="absolute left-4 right-4 top-4 flex items-center justify-between rounded-2xl border border-white/10 bg-black/32 px-4 py-3 backdrop-blur sm:left-6 sm:right-6 sm:top-6">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-electric/15 text-electric">
            <Radar className="h-5 w-5" />
          </span>
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/42">Live network intelligence</p>
            <p className="text-sm font-semibold text-white/88">Bengaluru charging graph</p>
          </div>
        </div>
        <div className="hidden items-center gap-2 text-xs text-signal sm:flex">
          <span className="h-2 w-2 rounded-full bg-signal" /> Syncing
        </div>
      </div>

      <motion.div
        className="glass absolute bottom-4 left-4 right-4 rounded-2xl p-4 sm:bottom-6 sm:left-6 sm:right-auto sm:w-[410px]"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-white/45">Recommended stop</p>
            <h3 className="mt-1 font-display text-2xl font-semibold">Aero Mall Hub</h3>
            <p className="mt-2 text-sm text-white/58">120 kW DC - 2 stalls available - Rs 21/kWh</p>
          </div>
          <span className="rounded-full bg-signal px-3 py-1 text-xs font-semibold text-night">Best</span>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          <MiniMetric label="ETA" value="18m" tone="blue" />
          <MiniMetric label="Queue risk" value="8%" tone="green" />
          <MiniMetric label="Health" value="96" tone="green" />
        </div>
      </motion.div>
    </motion.div>
  );
}

function Hero() {
  return (
    <header className="relative overflow-hidden px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <div className="absolute inset-x-0 top-0 h-[760px] bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.22),transparent_42rem)]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:min-h-[820px] lg:grid-cols-[0.78fr_1.22fr]">
        <motion.div initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.82 }}>
          <Eyebrow>EV charging intelligence layer</Eyebrow>
          <h1 className="font-display text-5xl font-semibold leading-[0.92] sm:text-7xl lg:text-8xl">
            Find Chargers.
            <span className="block text-white/48">Not Frustration.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/66 sm:text-xl">
            ZAi-Fi sits above charging networks and tells drivers which charger will actually work before they leave.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#demo" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-night transition hover:bg-sky-100">
              Watch Demo <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#platform" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/14 px-6 py-3 text-sm font-semibold text-white transition hover:border-electric/60">
              See Platform <Layers3 className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-8 grid max-w-xl grid-cols-3 gap-2 text-center sm:gap-3">
            <MiniMetric label="Stations" value="13.5k+" tone="blue" />
            <MiniMetric label="Predictive" value="98%" tone="green" />
            <MiniMetric label="Wait cut" value="40%" tone="yellow" />
          </div>
        </motion.div>
        <HeroConsole />
      </div>
    </header>
  );
}

function ProblemSection() {
  const oldFlow = ["Open 5 apps", "Drive across town", "Reach charger", "Occupied", "Drive again", "Battery drops"];
  const zaifiFlow = ["Open one app", "AI ranks stops", "Live availability", "Reserve", "Navigate", "Charge"];
  return (
    <Section>
      <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <div>
          <Eyebrow>The broken journey</Eyebrow>
          <h2 className="font-display text-4xl font-semibold leading-tight sm:text-6xl">Availability is only useful when it is trustworthy.</h2>
          <p className="mt-5 text-lg leading-8 text-white/62">
            Drivers do not need another charger list. They need a confidence layer that understands sessions, faults, queue pressure, and route context.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {[["Old EV Experience", oldFlow, "danger"], ["With ZAi-Fi", zaifiFlow, "signal"]].map(([title, flow, tone]) => (
            <motion.div key={title as string} className={clsx("rounded-[1.4rem] border p-4 sm:p-5", tone === "signal" ? "border-signal/24 bg-signal/[0.07]" : "border-danger/20 bg-danger/[0.055]")} whileHover={{ y: -6 }}>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-display text-xl font-semibold">{title as string}</h3>
                {tone === "signal" ? <ShieldCheck className="text-signal" /> : <CloudLightning className="text-danger" />}
              </div>
              <div className="space-y-3">
                {(flow as string[]).map((step, index) => (
                  <motion.div
                    key={step}
                    className="flex items-center gap-3 rounded-2xl border border-white/8 bg-black/20 p-3 text-sm text-white/76"
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.06 }}
                  >
                    <span className={clsx("grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-semibold text-night", tone === "signal" ? "bg-signal" : "bg-danger")}>{index + 1}</span>
                    {step}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function ChargerPanel({ charger }: { charger: Charger }) {
  const facts = [
    ["Operator", charger.operator],
    ["Connector", charger.connector],
    ["Power", charger.power],
    ["Price", charger.price],
    ["Distance", charger.distance],
    ["Last update", charger.updated]
  ];
  return (
    <motion.aside
      key={charger.id}
      className="glass rounded-[1.4rem] p-5 lg:sticky lg:top-28"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-white/42">{charger.id}</p>
          <h3 className="mt-1 font-display text-2xl font-semibold">{charger.name}</h3>
        </div>
        <span className={clsx("rounded-full px-3 py-1 text-xs font-semibold capitalize text-night", charger.status === "available" ? "bg-signal" : charger.status === "busy" ? "bg-caution" : "bg-danger")}>
          {charger.status}
        </span>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-2">
        <MiniMetric label="Wait" value={charger.wait} tone={charger.status === "available" ? "green" : charger.status === "busy" ? "yellow" : "red"} />
        <MiniMetric label="Risk" value={`${charger.queueRisk}%`} tone={charger.queueRisk > 60 ? "red" : charger.queueRisk > 25 ? "yellow" : "green"} />
        <MiniMetric label="Health" value={`${charger.health}`} tone={charger.health > 88 ? "green" : charger.health > 70 ? "yellow" : "red"} />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {facts.map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-white/8 bg-black/18 p-3">
            <p className="text-[10px] uppercase tracking-[0.15em] text-white/38">{label}</p>
            <p className="mt-1 text-sm font-medium text-white/84">{value}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-2xl border border-electric/22 bg-electric/10 p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-sky-100">
          <Cpu className="h-4 w-4 text-electric" /> AI Recommendation
        </div>
        <p className="mt-2 text-sm leading-6 text-white/70">{charger.recommendation}</p>
      </div>
    </motion.aside>
  );
}

function MapDemo() {
  const [selected, setSelected] = useState(chargers[0]);
  return (
    <Section id="demo" className="scroll-mt-24">
      <div className="mb-8 grid gap-5 lg:grid-cols-[0.72fr_0.28fr] lg:items-end">
        <div>
          <Eyebrow>Interactive demo</Eyebrow>
          <h2 className="max-w-4xl font-display text-4xl font-semibold leading-tight sm:text-6xl">A real-time charger command center, not a static map.</h2>
        </div>
        <p className="text-sm leading-6 text-white/56 lg:text-right">Tap a charger. ZAi-Fi explains whether to go, reserve, wait, or avoid.</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.34fr_0.66fr]">
        <div className="relative min-h-[560px] overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#06111d] sm:min-h-[680px]">
          <div className="mesh absolute inset-0 opacity-80" />
          <svg className="absolute inset-0 h-full w-full opacity-75" viewBox="0 0 900 660" fill="none">
            <path d="M78 492C236 366 321 512 429 347C532 203 667 271 813 96" stroke="rgba(56,189,248,.42)" strokeWidth="2" />
            <path d="M117 168C258 207 224 314 382 318C536 322 590 433 812 402" stroke="rgba(255,255,255,.14)" strokeWidth="2" />
            <path d="M194 588C308 509 375 585 506 502C633 422 681 524 830 481" stroke="rgba(22,242,179,.24)" strokeWidth="2" />
            <motion.path d="M180 480C280 400 330 438 430 348C525 262 617 260 730 155" stroke="rgba(255,255,255,.72)" strokeWidth="3" strokeLinecap="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.4 }} />
          </svg>

          <div className="absolute left-4 right-4 top-4 grid gap-3 sm:left-6 sm:right-6 sm:grid-cols-3">
            <MiniMetric label="Best ETA" value={selected.eta} tone="blue" />
            <MiniMetric label="Queue risk" value={`${selected.queueRisk}%`} tone={selected.queueRisk > 60 ? "red" : selected.queueRisk > 25 ? "yellow" : "green"} />
            <MiniMetric label="Crowd" value={selected.crowd} tone={selected.crowd === "Low" ? "green" : selected.crowd === "High" ? "red" : "yellow"} />
          </div>

          {chargers.map((charger) => (
            <button
              key={charger.id}
              type="button"
              aria-label={`Select ${charger.name}`}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${charger.x}%`, top: `${charger.y}%` }}
              onClick={() => setSelected(charger)}
            >
              <motion.span
                className={clsx("grid h-9 w-9 place-items-center rounded-full border border-white/50 bg-black/20 backdrop-blur", selected.id === charger.id && "ring-4 ring-white/20")}
                whileHover={{ scale: 1.12 }}
              >
                <motion.span
                  className={clsx("block h-4 w-4 rounded-full", statusStyles[charger.status])}
                  animate={{ scale: selected.id === charger.id ? [1, 1.35, 1] : [1, 1.08, 1] }}
                  transition={{ duration: 1.45, repeat: Infinity }}
                />
              </motion.span>
            </button>
          ))}

          <div className="absolute bottom-4 left-4 right-4 rounded-[1.25rem] border border-white/10 bg-black/48 p-3 backdrop-blur sm:bottom-6 sm:left-6 sm:right-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-3 text-xs text-white/62">
                <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-signal" />Available</span>
                <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-caution" />Busy</span>
                <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-danger" />Offline</span>
              </div>
              <div className="text-xs text-white/58">Selected: <span className="text-white">{selected.name}</span></div>
            </div>
          </div>
        </div>
        <ChargerPanel charger={selected} />
      </div>
    </Section>
  );
}

function PredictionEngine() {
  const forecast = [
    ["Current", 92, "2 open stalls"],
    ["15 min", 88, "1 likely open"],
    ["30 min", 74, "queue forming"],
    ["1 hour", 61, "peak risk"]
  ];
  return (
    <Section id="prediction" className="scroll-mt-24">
      <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
        <div>
          <Eyebrow>Prediction engine</Eyebrow>
          <h2 className="font-display text-4xl font-semibold leading-tight sm:text-6xl">The ETA for charger truth.</h2>
          <p className="mt-5 text-lg leading-8 text-white/62">ZAi-Fi models live sessions, historical dwell time, connector reliability, traffic, and event congestion before showing a route.</p>
        </div>
        <div className="glass rounded-[1.5rem] p-5 sm:p-7">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-white/42">Aero Mall Hub</p>
              <h3 className="mt-1 font-display text-2xl font-semibold">Availability forecast</h3>
            </div>
            <LineChart className="h-8 w-8 text-electric" />
          </div>
          <div className="space-y-5">
            {forecast.map(([time, confidence, note], index) => (
              <div key={time as string}>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span className="text-sm font-medium">{time}</span>
                  <span className="text-right text-sm text-white/58">{note as string} - {confidence as number}% confidence</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-white/8">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-signal via-electric to-caution"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${confidence}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: index * 0.12 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function FleetAndOperator() {
  const cards = [
    { icon: Route, title: "Fleet optimization", value: "Rs 8.2L", label: "monthly savings predicted" },
    { icon: Activity, title: "Peak-hour heatmap", value: "37%", label: "load shifted off peak" },
    { icon: CircleDollarSign, title: "Operator lift", value: "18.4%", label: "from uptime recommendations" },
    { icon: TimerReset, title: "Downtime prevention", value: "6.8h", label: "fault risk caught early" }
  ];
  return (
    <Section>
      <div className="mb-8 max-w-4xl">
        <Eyebrow>Fleet and operator intelligence</Eyebrow>
        <h2 className="font-display text-4xl font-semibold leading-tight sm:text-6xl">A control room for demand, health, and margin.</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            className="glass rounded-[1.35rem] p-5"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06 }}
            whileHover={{ y: -7 }}
          >
            <card.icon className="h-7 w-7 text-electric" />
            <h3 className="mt-5 text-sm font-medium text-white/70">{card.title}</h3>
            <p className="mt-3 font-display text-3xl font-semibold">{card.value}</p>
            <p className="mt-2 text-sm text-white/45">{card.label}</p>
          </motion.div>
        ))}
      </div>
      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_0.9fr]">
        <div className="glass rounded-[1.35rem] p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-xl font-semibold">Fleet schedule</h3>
            <BatteryCharging className="text-signal" />
          </div>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 35 }).map((_, i) => (
              <motion.div
                key={i}
                className={clsx("aspect-square rounded-lg", i % 7 === 0 ? "bg-danger/70" : i % 5 === 0 ? "bg-caution/70" : "bg-signal/70")}
                initial={{ opacity: 0.24 }}
                whileInView={{ opacity: 0.86 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.01 }}
              />
            ))}
          </div>
        </div>
        <div className="glass rounded-[1.35rem] p-5">
          <h3 className="font-display text-xl font-semibold">AI actions</h3>
          <div className="mt-4 space-y-3">
            {["Move 12 delivery EVs to ORR Fleet Bay between 01:00 and 03:00.", "Open dynamic pricing at CBD Basement after repair clears.", "Throttle Whitefield reservations until connector three stabilizes."].map((text) => (
              <div key={text} className="flex gap-3 rounded-2xl border border-white/8 bg-white/[0.04] p-3 text-sm leading-6 text-white/68">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-signal" />
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function Architecture() {
  const outputs = ["Developers", "Fleet", "Drivers", "OEMs", "Governments", "Apps"];
  return (
    <Section id="platform" className="scroll-mt-24">
      <div className="text-center">
        <Eyebrow>Platform architecture</Eyebrow>
        <h2 className="mx-auto max-w-4xl font-display text-4xl font-semibold leading-tight sm:text-6xl">Not another network. The layer above every network.</h2>
      </div>
      <div className="mt-10 grid gap-4 lg:grid-cols-[1fr_0.9fr_1fr] lg:items-center">
        <div className="grid gap-3">
          {["ChargePoint", "ChargeZone", "Statiq", "Tata Power", "Bolt Earth"].map((name) => (
            <div key={name} className="glass rounded-2xl p-4 text-sm text-white/70">{name}</div>
          ))}
        </div>
        <motion.div className="rounded-[1.5rem] border border-electric/30 bg-electric/10 p-6 text-center shadow-glow" whileInView={{ scale: [0.96, 1.02, 1] }} viewport={{ once: true }}>
          <Layers3 className="mx-auto h-10 w-10 text-electric" />
          <h3 className="mt-4 font-display text-2xl font-semibold">ZAi-Fi Intelligence Layer</h3>
          <p className="mt-3 text-sm leading-6 text-white/62">Availability prediction, health scoring, queue estimation, routing, reservation, and unified API.</p>
        </motion.div>
        <div className="grid grid-cols-2 gap-3">
          {outputs.map((name) => (
            <div key={name} className="glass rounded-2xl p-4 text-sm text-white/70">{name}</div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function FutureVision() {
  const steps = [
    [Car, "Vehicle arrives"],
    [Cpu, "AI reserves"],
    [PlugZap, "Charging starts"],
    [CircleDollarSign, "Payment clears"],
    [Navigation, "Vehicle leaves"]
  ];
  return (
    <Section>
      <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.045] p-6 sm:p-10">
        <div className="max-w-3xl">
          <Eyebrow>Future vision</Eyebrow>
          <h2 className="font-display text-4xl font-semibold leading-tight sm:text-6xl">The best charging experience is almost invisible.</h2>
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-5">
          {steps.map(([Icon, text], index) => {
            const StepIcon = Icon as typeof Car;
            return (
              <motion.div key={text as string} className="glass rounded-[1.25rem] p-4" whileHover={{ y: -7 }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}>
                <StepIcon className="h-7 w-7 text-electric" />
                <p className="mt-4 text-sm font-medium text-white/72">{text as string}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

function AnimatedCounter({ value, label }: { value: string; label: string }) {
  return (
    <motion.div
      className="glass rounded-[1.35rem] p-5 sm:p-6"
      whileHover={{ y: -6, borderColor: "rgba(56,189,248,0.38)" }}
      transition={{ type: "spring", stiffness: 240, damping: 20 }}
    >
      <motion.div className="font-display text-3xl font-semibold sm:text-4xl" initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
        {value}
      </motion.div>
      <div className="mt-2 text-sm text-white/58">{label}</div>
    </motion.div>
  );
}

export default function Home() {
  const stats = useMemo(
    () => [
      ["13,500+", "Charging stations"],
      ["5+", "Networks unified"],
      ["98%", "Availability prediction"],
      ["40%", "Reduced waiting"]
    ],
    []
  );

  return (
    <main>
      <TopNav />
      <Hero />
      <ProblemSection />
      <MapDemo />
      <PredictionEngine />
      <FleetAndOperator />
      <Architecture />
      <Section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(([value, label]) => (
            <AnimatedCounter key={label} value={value} label={label} />
          ))}
        </div>
      </Section>
      <FutureVision />
      <Section id="pilot" className="pb-24 sm:pb-32">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.055] p-7 text-center shadow-panel sm:p-12">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-electric to-transparent" />
          <Network className="mx-auto h-11 w-11 text-electric" />
          <h2 className="mx-auto mt-6 max-w-4xl font-display text-4xl font-semibold leading-tight sm:text-6xl">
            The Future Does Not Need More Chargers. It Needs Smarter Ones.
          </h2>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a href="mailto:pilot@zai-fi.example" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-night transition hover:bg-sky-100">
              Book Demo <ArrowRight className="h-4 w-4" />
            </a>
            <a href="mailto:partners@zai-fi.example" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/14 px-6 py-3 text-sm font-semibold text-white transition hover:border-electric/60">
              Partner With Us <Building2 className="h-4 w-4" />
            </a>
          </div>
        </div>
      </Section>
    </main>
  );
}
