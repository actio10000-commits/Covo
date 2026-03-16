'use client'

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Waves } from "@/components/ui/wave-background"

// ── Theme ─────────────────────────────────────────────────────────────────────

type Theme = 'purple' | 'blue'

// ── Shared animation helpers ──────────────────────────────────────────────────

const ease = [0.22, 1, 0.36, 1]
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, delay, ease },
})
const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { duration: 0.5, delay, ease },
})

// ── NAV ──────────────────────────────────────────────────────────────────────

const navLinks = ["Features", "Gallery", "Pricing", "FAQ"]
const navExit    = { opacity: 0, y: -6, transition: { duration: 0.2, ease: [0.4, 0, 1, 1] } }
const navEnter   = { opacity: 0, y: -6 }
const navVisible = { opacity: 1, y: 0 }
const navSpring  = { duration: 0.28, ease: [0.22, 1, 0.36, 1] }

function Hamburger({ open, onClick, dark }: { open: boolean; onClick: () => void; dark?: boolean }) {
  const c = dark ? "bg-gray-700" : "bg-white/70"
  return (
    <button onClick={onClick} className="md:hidden flex flex-col gap-1.5 p-2 focus:outline-none" aria-label="Toggle menu">
      <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 8 : 0 }}   transition={{ duration: 0.22 }} className={`block w-5 h-px ${c}`} />
      <motion.span animate={{ opacity: open ? 0 : 1 }}                     transition={{ duration: 0.18 }} className={`block w-5 h-px ${c}`} />
      <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -8 : 0 }} transition={{ duration: 0.22 }} className={`block w-5 h-px ${c}`} />
    </button>
  )
}

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const fn = () => { setScrolled(window.scrollY > 80); if (window.scrollY <= 80) setOpen(false) }
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        {!scrolled && (
          <motion.nav key="bar" initial={navEnter} animate={navVisible} exit={navExit} transition={navSpring}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-16 py-4"
            style={{ background: "var(--bg-nav)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgb(var(--glow-rgb) / 0.1)" }}>
            <a href="#" className="no-underline font-bold text-base tracking-tight logo-gradient">Covo</a>
            <ul className="hidden md:flex items-center gap-7 list-none">
              {navLinks.map(item => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="nav-link text-white/50 no-underline text-sm hover:text-white transition-colors duration-200">{item}</a>
                </li>
              ))}
              <li><a href="#cta" className="no-underline text-sm px-4 py-2 rounded-full font-medium cta-pill">Pre-order</a></li>
            </ul>
            <Hamburger open={open} onClick={() => setOpen(o => !o)} />
          </motion.nav>
        )}
        {scrolled && (
          <motion.div key="pill-wrap" className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
            <motion.nav initial={{ ...navEnter, scale: 0.96 }} animate={{ ...navVisible, scale: 1 }} exit={{ ...navExit, scale: 0.96 }} transition={navSpring}
              className="pointer-events-auto flex items-center gap-5 px-5 py-2.5 rounded-full"
              style={{ background: "#fff", boxShadow: "0 2px 24px rgba(0,0,0,0.10), 0 0 0 1px rgba(0,0,0,0.05)" }}>
              <a href="#" className="no-underline font-bold text-sm tracking-tight text-gray-900 mr-1">Covo</a>
              <ul className="hidden md:flex items-center gap-5 list-none">
                {navLinks.map(item => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                      className="no-underline text-sm text-gray-500 hover:text-gray-900 transition-colors duration-150">{item}</a>
                  </li>
                ))}
              </ul>
              <a href="#cta" className="no-underline text-xs font-semibold px-4 py-2 rounded-full bg-gray-900 text-white hover:bg-gray-700 transition-colors duration-150">Pre-order</a>
              <Hamburger open={open} onClick={() => setOpen(o => !o)} dark />
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease }}
            className="fixed left-0 right-0 z-40 flex flex-col px-5 py-6 gap-5 md:hidden"
            style={{ top: scrolled ? "72px" : "57px", background: scrolled ? "rgba(255,255,255,0.98)" : "var(--bg-mobile)", borderBottom: "1px solid rgb(var(--glow-rgb) / 0.12)" }}>
            {navLinks.map(item => (
              <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, "-")}`} onClick={() => setOpen(false)}
                className={`no-underline text-base transition-colors ${scrolled ? "text-gray-700 hover:text-gray-900" : "text-white/60 hover:text-white"}`}>{item}</a>
            ))}
            <a href="#cta" onClick={() => setOpen(false)} className="no-underline text-sm px-4 py-3 rounded-md text-center btn-purple mt-2">Pre-order Now</a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ── HERO ─────────────────────────────────────────────────────────────────────

function Hero({ theme }: { theme: Theme }) {
  const strokeColor = theme === 'purple'
    ? 'rgba(168,85,247,0.16)'
    : 'rgba(59,130,246,0.16)'

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 md:px-6 pt-24 pb-20 overflow-hidden">
      <Waves strokeColor={strokeColor} backgroundColor="var(--bg-base)" />
      <div className="absolute inset-0 pointer-events-none z-[1]">
        <div className="hero-blob-purple" />
        <div className="hero-blob-blue" />
      </div>
      <div className="relative z-10 flex flex-col items-center">
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1, ease }}
          className="text-xs tracking-[3px] uppercase mb-6 font-medium"
          style={{ color: "rgb(var(--glow-rgb) / 0.7)" }}>
          Personal Home Robotics
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2, ease }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight md:tracking-[-3px] leading-[1.0] md:leading-[0.95] max-w-4xl mb-6 text-white">
          Your home,<br /><span className="hero-gradient-text">on autopilot.</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35, ease }}
          className="text-white/45 text-sm md:text-lg max-w-sm md:max-w-md mb-10 leading-relaxed">
          Covo follows voice commands, carries things around your home, and learns your daily routines over time.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5, ease }}
          className="flex flex-col sm:flex-row gap-3 justify-center w-full sm:w-auto">
          <motion.a href="#pricing" whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
            className="no-underline px-6 py-3.5 rounded-md text-sm font-medium btn-purple text-center">
            Pre-order — from $1,299
          </motion.a>
          <motion.a href="#gallery" whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
            className="text-white/60 no-underline px-6 py-3.5 rounded-md text-sm hover:text-white border border-white/10 transition-colors text-center"
            style={{ ["--tw-border-opacity" as string]: "1" }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = "rgb(var(--glow-rgb) / 0.3)")}
            onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}>
            See the robot →
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

// ── STATS BAR ─────────────────────────────────────────────────────────────────

const stats = [
  { value: "200+", label: "Pre-orders" },
  { value: "14 hr", label: "Battery life" },
  { value: "12 lbs", label: "Carry capacity" },
  { value: "60 sec", label: "Setup time" },
]

function StatsBar() {
  return (
    <section className="py-12 px-4 md:px-6 section-border">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div key={s.label} {...fadeUp(i * 0.08)}
            className="text-center py-4 px-2" style={{ borderRight: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
            <p className="text-3xl md:text-4xl font-bold text-white tracking-tight hero-gradient-text">{s.value}</p>
            <p className="text-white/35 text-xs mt-2 tracking-widest uppercase">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// ── PRESS BAR ────────────────────────────────────────────────────────────────

const press = ["TechCrunch", "Wired", "The Verge", "MIT Tech Review", "Fast Company"]

function PressBar() {
  return (
    <section className="py-10 px-4 md:px-6 section-border">
      <div className="max-w-5xl mx-auto">
        <motion.p {...fadeIn()} className="text-center text-white/20 text-[10px] tracking-[3px] uppercase mb-7">As seen in</motion.p>
        <motion.div {...fadeIn(0.1)} className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
          {press.map((name, i) => (
            <motion.span key={name} {...fadeIn(i * 0.07)}
              className="text-white/18 font-bold text-sm md:text-base tracking-wide hover:text-white/40 transition-colors duration-300 cursor-default select-none">
              {name}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ── FEATURES ─────────────────────────────────────────────────────────────────

const features = [
  { label: "01", title: "Voice Control",      desc: "Talk naturally. Covo understands context, not just commands. No app needed — just speak." },
  { label: "02", title: "Carry & Deliver",    desc: "Up to 12 lbs. Every room. Ask Covo to bring anything to anyone, anywhere in your home." },
  { label: "03", title: "Routine Learning",   desc: "After a week, Covo starts anticipating. Morning coffee. Evening meds. It just happens." },
  { label: "04", title: "Smart Navigation",   desc: "3D LiDAR maps your home in real time. Covo flows around furniture, pets, and people." },
  { label: "05", title: "Private by Design",  desc: "Everything runs on-device. Your routines and voice data never touch a cloud server." },
  { label: "06", title: "All-Day Battery",    desc: "14-hour runtime. Covo docks itself when low and returns before you need it." },
]

function Features() {
  return (
    <section id="features" className="py-16 md:py-32 px-4 md:px-6 section-border">
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp()} className="mb-12 md:mb-20">
          <p className="section-label">Capabilities</p>
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-white">Built for the way you live.</h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px feature-grid">
          {features.map((f, i) => (
            <motion.div key={f.title} {...fadeUp(i * 0.07)}
              whileHover={{ backgroundColor: "rgb(var(--glow-rgb) / 0.06)", transition: { duration: 0.2 } }}
              className="p-6 md:p-8 feature-card cursor-default">
              <p className="text-xs font-mono mb-5" style={{ color: "rgb(var(--glow-rgb) / 0.5)" }}>{f.label}</p>
              <h3 className="text-white text-base font-medium mb-2">{f.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── ROBOT GALLERY ─────────────────────────────────────────────────────────────

const galleryItems = [
  {
    title: "Covo Pro",
    sub: "Full-home assistant",
    img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=900&q=80&auto=format",
    span: true,
  },
  {
    title: "Voice Interface",
    sub: "On-device AI — no cloud",
    gradientVar: "linear-gradient(135deg, rgb(var(--glow-rgb) / 0.1) 0%, rgb(var(--glow-rgb) / 0.25) 100%)",
    icon: "🎙️",
  },
  {
    title: "Smart Navigation",
    sub: "3D LiDAR mapping",
    gradientVar: "linear-gradient(135deg, rgb(var(--glow-rgb) / 0.07) 0%, rgb(var(--glow-rgb) / 0.18) 100%)",
    icon: "🗺️",
  },
  {
    title: "Carry & Deliver",
    sub: "Up to 12 lbs capacity",
    gradientVar: "linear-gradient(135deg, rgb(var(--glow-rgb) / 0.05) 0%, rgb(var(--glow-rgb) / 0.14) 100%)",
    icon: "📦",
  },
]

function ProductGallery() {
  return (
    <section id="gallery" className="py-16 md:py-32 px-4 md:px-6 section-border">
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp()} className="mb-12 md:mb-16">
          <p className="section-label">The Robot</p>
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-white">Meet Covo.</h2>
          <p className="text-white/40 text-sm mt-3 max-w-md">Engineered for life at home. Designed to disappear into your routine.</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {/* Main image */}
          <motion.div {...fadeUp(0.05)}
            className="col-span-2 md:col-span-2 relative overflow-hidden rounded-2xl group"
            style={{ height: "360px" }}
            whileHover={{ scale: 1.01, transition: { duration: 0.3 } }}>
            <img
              src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=900&q=80&auto=format"
              alt="Covo robot"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
            <div className="absolute bottom-5 left-5">
              <p className="text-white font-bold text-lg">Covo Pro</p>
              <p className="text-white/55 text-sm">Full-home assistant</p>
            </div>
            <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-widest uppercase"
              style={{ background: "rgb(var(--glow-rgb) / 0.28)", border: "1px solid rgb(var(--glow-rgb) / 0.45)", color: "var(--accent-alt)" }}>
              Ships Q3 2026
            </div>
          </motion.div>

          {/* Small cards */}
          {galleryItems.slice(1).map((item, i) => (
            <motion.div key={item.title} {...fadeUp(0.1 + i * 0.08)}
              whileHover={{ scale: 1.02, transition: { duration: 0.25 } }}
              className="relative overflow-hidden rounded-2xl flex flex-col justify-between p-5 cursor-default"
              style={{ background: item.gradientVar, height: "160px", border: "1px solid rgb(var(--glow-rgb) / 0.12)" }}>
              <span className="text-2xl">{item.icon}</span>
              <div>
                <p className="text-white font-semibold text-sm">{item.title}</p>
                <p className="text-white/45 text-xs mt-0.5">{item.sub}</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Second row — detail shots */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mt-3 md:mt-4">
          {[
            { img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=80&auto=format", label: "On-device AI" },
            { img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80&auto=format", label: "Advanced circuitry" },
            { img: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&q=80&auto=format", label: "Precision build" },
          ].map((item, i) => (
            <motion.div key={item.label} {...fadeUp(0.15 + i * 0.08)}
              whileHover={{ scale: 1.02, transition: { duration: 0.25 } }}
              className="relative overflow-hidden rounded-2xl group" style={{ height: "180px" }}>
              <img src={item.img} alt={item.label}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <p className="absolute bottom-4 left-4 text-white text-sm font-medium">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── HOW IT WORKS ─────────────────────────────────────────────────────────────

const steps = [
  { title: "Unbox",     desc: "Boots in 60 seconds. Place it down and it starts mapping." },
  { title: "Introduce", desc: "Walk Covo through your home once, naming each room." },
  { title: "Command",   desc: '"Covo, bring my headphones from the office." Done.' },
  { title: "Relax",     desc: "After a few days, Covo starts predicting before you ask." },
]

function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 md:py-32 px-4 md:px-6 section-border">
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp()} className="mb-12 md:mb-20">
          <p className="section-label">Process</p>
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-white">Up in minutes.</h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {steps.map((s, i) => (
            <motion.div key={s.title} {...fadeUp(i * 0.1)}>
              <p className="text-xs font-mono mb-4" style={{ color: "rgb(var(--glow-rgb) / 0.6)" }}>0{i + 1}</p>
              <h3 className="text-white font-medium mb-2">{s.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── VIDEO DEMO ───────────────────────────────────────────────────────────────

function VideoDemo() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6 section-border">
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp()} className="text-center mb-10">
          <p className="section-label">See it in action</p>
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-white">3 minutes. That&apos;s all it takes.</h2>
        </motion.div>
        <motion.div {...fadeUp(0.1)}
          whileHover={{ scale: 1.01, transition: { duration: 0.3 } }}
          className="relative rounded-2xl overflow-hidden cursor-pointer group"
          style={{ background: "rgb(var(--glow-rgb) / 0.05)", aspectRatio: "16/9", border: "1px solid rgb(var(--glow-rgb) / 0.13)" }}>
          <img
            src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&q=60&auto=format"
            alt="Covo demo"
            className="w-full h-full object-cover opacity-30 transition-opacity duration-300 group-hover:opacity-40"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
            <motion.div
              whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.95 }}
              className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center"
              style={{ background: "rgb(var(--glow-rgb) / 0.3)", border: "2px solid rgb(var(--glow-rgb) / 0.55)", boxShadow: "0 0 40px rgb(var(--glow-rgb) / 0.25)" }}>
              <span className="text-white text-xl ml-1">▶</span>
            </motion.div>
            <p className="text-white/50 text-sm">Product demo · 3:24</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ── PRICING + COUNTDOWN ───────────────────────────────────────────────────────

function useCountdown() {
  const target = new Date("2026-09-01T00:00:00")
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 })
  useEffect(() => {
    const calc = () => {
      const diff = Math.max(0, target.getTime() - Date.now())
      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      })
    }
    calc()
    const id = setInterval(calc, 1000)
    return () => clearInterval(id)
  }, [])
  return t
}

const plans = [
  {
    name: "Starter", price: "1,299",
    desc: "Core Covo experience for individuals and couples.",
    features: ["Voice commands", "8 lb carry capacity", "1,500 sq ft mapping", "10-hr battery", "12-month warranty"],
    featured: false,
  },
  {
    name: "Pro", price: "1,899",
    desc: "The full experience. Unlimited mapping, advanced learning.",
    features: ["Voice commands", "12 lb carry capacity", "Unlimited mapping", "14-hr battery", "Advanced learning", "Multi-floor", "24-month warranty"],
    featured: true,
  },
  {
    name: "Family", price: "2,499",
    desc: "Two Covos, coordinated across your entire home.",
    features: ["Everything in Pro × 2", "Multi-robot sync", "Per-member voice profiles", "White-glove delivery", "36-month warranty"],
    featured: false,
  },
]

function Pricing() {
  const { d, h, m, s } = useCountdown()
  const pad = (n: number) => String(n).padStart(2, "0")

  return (
    <section id="pricing" className="py-16 md:py-32 px-4 md:px-6 section-border">
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp()} className="mb-12 md:mb-16">
          <p className="section-label">Pricing</p>
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-white">One robot. Three configs.</h2>
          <p className="text-white/35 text-sm mt-3">Ships Q3 2026. Lock in launch pricing now.</p>

          {/* Countdown */}
          <div className="mt-6 inline-flex items-center gap-3 px-5 py-3 rounded-xl"
            style={{ background: "rgb(var(--glow-rgb) / 0.08)", border: "1px solid rgb(var(--glow-rgb) / 0.18)" }}>
            <span className="text-xs tracking-widest uppercase" style={{ color: "rgb(var(--glow-rgb) / 0.7)" }}>Early bird ends in</span>
            <div className="flex items-center gap-2">
              {[["d", d], ["h", h], ["m", m], ["s", s]].map(([u, v]) => (
                <span key={u as string} className="flex flex-col items-center">
                  <span className="text-white font-bold text-base font-mono tabular-nums">{pad(v as number)}</span>
                  <span className="text-white/30 text-[9px] uppercase">{u}</span>
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px pricing-grid">
          {plans.map((plan, i) => (
            <motion.div key={plan.name} {...fadeUp(i * 0.1)}
              whileHover={{ y: -4, transition: { duration: 0.25, ease } }}
              className={`p-6 md:p-8 flex flex-col ${plan.featured ? "pricing-card-featured" : "pricing-card"}`}>
              <div className="flex items-start justify-between mb-6">
                <p className="text-xs tracking-widest uppercase"
                  style={{ color: plan.featured ? "rgb(var(--glow-rgb) / 0.8)" : "rgba(255,255,255,0.4)" }}>{plan.name}</p>
                {plan.featured && (
                  <motion.span initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.3 }}
                    className="text-[10px] tracking-widest uppercase px-2 py-0.5 rounded popular-badge">Popular</motion.span>
                )}
              </div>
              <p className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-1">
                <span className="text-base md:text-lg font-normal"
                  style={{ color: plan.featured ? "rgb(var(--glow-rgb) / 0.6)" : "rgba(255,255,255,0.4)" }}>$</span>{plan.price}
              </p>
              <p className="text-white/35 text-xs mb-6 leading-relaxed">{plan.desc}</p>
              <ul className="space-y-2.5 mb-8 flex-1">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-white/55">
                    <span className="w-1 h-1 rounded-full shrink-0"
                      style={{ background: plan.featured ? "rgb(var(--glow-rgb) / 0.6)" : "rgba(255,255,255,0.25)" }} />
                    {f}
                  </li>
                ))}
              </ul>
              <motion.a href="#cta" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className={`block text-center py-2.5 rounded-md text-sm no-underline transition-colors duration-200 ${
                  plan.featured ? "btn-purple" : "text-white/60 border border-white/10 hover:text-white"
                }`}
                onMouseEnter={e => { if (!plan.featured) e.currentTarget.style.borderColor = "rgb(var(--glow-rgb) / 0.28)" }}
                onMouseLeave={e => { if (!plan.featured) e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)" }}>
                Pre-order {plan.name}
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── COMPARISON TABLE ──────────────────────────────────────────────────────────

const compFeatures = ["Voice commands", "Carries items", "Learns routines", "Always available", "Privacy-first", "One-time cost"]
const compCols = [
  { name: "Covo",           values: [true, true, true, true, true, true],             highlight: true },
  { name: "Smart Speaker",  values: [true, false, "partial", true, false, true],      highlight: false },
  { name: "Cleaning Robot", values: [false, false, false, "partial", true, true],     highlight: false },
  { name: "Hired Help",     values: ["partial", true, false, false, "partial", false], highlight: false },
]

function Check({ v }: { v: boolean | string }) {
  if (v === true)  return <span className="font-bold" style={{ color: "var(--accent)" }}>✓</span>
  if (v === false) return <span className="text-white/15">—</span>
  return <span className="text-white/35 text-xs">Partial</span>
}

function Comparison() {
  return (
    <section className="py-16 md:py-32 px-4 md:px-6 section-border">
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp()} className="mb-12">
          <p className="section-label">Why Covo</p>
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-white">Nothing else comes close.</h2>
        </motion.div>
        <motion.div {...fadeUp(0.1)} className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left text-white/30 text-xs font-normal pb-5 pr-8 w-40">Feature</th>
                {compCols.map(c => (
                  <th key={c.name} className="text-center pb-5 px-4 text-sm font-semibold"
                    style={{ color: c.highlight ? "var(--accent)" : "rgba(255,255,255,0.4)" }}>
                    {c.highlight && (
                      <span className="block text-[10px] tracking-widest uppercase mb-1"
                        style={{ color: "rgb(var(--glow-rgb) / 0.6)" }}>⭐ Best</span>
                    )}
                    {c.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {compFeatures.map((feat, fi) => (
                <motion.tr key={feat} {...fadeIn(fi * 0.05)}
                  style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                  <td className="py-3.5 pr-8 text-white/55">{feat}</td>
                  {compCols.map(c => (
                    <td key={c.name} className="text-center py-3.5 px-4"
                      style={{ background: c.highlight ? "rgb(var(--glow-rgb) / 0.07)" : "transparent" }}>
                      <Check v={c.values[fi]} />
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  )
}

// ── TESTIMONIALS ─────────────────────────────────────────────────────────────

const testimonials = [
  { quote: "After two weeks Covo started bringing me my meds with my morning coffee without me saying a word.", name: "Margaret T.", role: "Austin, TX" },
  { quote: "Genuinely the most useful tech purchase I've ever made. My whole family uses it every day.", name: "David K.", role: "Seattle, WA" },
  { quote: "I have mobility limitations and Covo has genuinely changed my independence at home.", name: "Rosa M.", role: "Chicago, IL" },
]

function Testimonials() {
  return (
    <section className="py-16 md:py-32 px-4 md:px-6 section-border">
      <div className="max-w-5xl mx-auto">
        <motion.p {...fadeIn()} className="section-label mb-12 md:mb-20">From beta testers</motion.p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {testimonials.map((t, i) => (
            <motion.div key={t.name} {...fadeUp(i * 0.12)} whileHover={{ y: -4, transition: { duration: 0.2 } }}>
              <motion.p className="text-2xl mb-3"
                style={{ color: "rgb(var(--glow-rgb) / 0.5)" }}
                initial={{ opacity: 0, rotate: -10 }} whileInView={{ opacity: 1, rotate: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.12 }}>&ldquo;</motion.p>
              <p className="text-white/60 text-sm leading-relaxed mb-5">{t.quote}</p>
              <p className="text-white/30 text-xs">{t.name} · {t.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── FAQ ───────────────────────────────────────────────────────────────────────

const faqs = [
  { q: "Does Covo work on carpet and hard floors?",           a: "Yes. Covo's omnidirectional wheels handle hardwood, tile, low-pile carpet, and rugs up to ¾\" thick. High-pile or thick shag rugs may reduce speed but won't stop it." },
  { q: "What happens near stairs?",                           a: "Covo uses downward-facing cliff sensors on all sides. It will stop at least 6 inches from any drop and reroute. It cannot climb or descend stairs." },
  { q: "Is my voice data stored or sent anywhere?",           a: "Never. All voice processing runs entirely on Covo's on-device AI chip. Nothing is sent to the cloud. Your conversations stay in your home." },
  { q: "Can Covo open doors or interact with appliances?",    a: "In the current version, Covo can press buttons and toggle light switches with its arm. Door-opening is on the roadmap for a future firmware update." },
  { q: "What if Covo gets stuck or lost?",                   a: "Covo will attempt to self-recover using its sensor suite. If it can't, it plays an audible tone and sends a notification to your phone. You can also manually drive it from the app." },
  { q: "When does it ship and what's the refund policy?",    a: "Covo ships Q3 2026. Your $99 deposit is fully refundable anytime before your unit ships. Once shipped, standard 30-day returns apply." },
]

function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section id="faq" className="py-16 md:py-32 px-4 md:px-6 section-border">
      <div className="max-w-3xl mx-auto">
        <motion.div {...fadeUp()} className="mb-12">
          <p className="section-label">FAQ</p>
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-white">Good questions.</h2>
        </motion.div>
        <div className="space-y-1">
          {faqs.map((faq, i) => (
            <motion.div key={faq.q} {...fadeUp(i * 0.05)}
              className="rounded-xl overflow-hidden"
              style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left focus:outline-none group"
                style={{ background: open === i ? "rgb(var(--glow-rgb) / 0.07)" : "transparent" }}>
                <span className="text-sm font-medium transition-colors duration-200"
                  style={{ color: open === i ? "var(--accent-alt)" : "rgba(255,255,255,0.75)" }}>
                  {faq.q}
                </span>
                <motion.span animate={{ rotate: open === i ? 45 : 0 }} transition={{ duration: 0.2 }}
                  className="text-lg shrink-0 ml-4 transition-colors"
                  style={{ color: open === i ? "var(--accent)" : "rgba(255,255,255,0.3)" }}>+</motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease }}>
                    <p className="px-5 pb-5 text-sm text-white/45 leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── CTA + EMAIL CAPTURE ───────────────────────────────────────────────────────

function CTA() {
  const [email, setEmail] = useState("")
  const [done, setDone] = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setDone(true)
  }

  return (
    <section id="cta" className="py-16 md:py-32 px-4 md:px-6 section-border">
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp()} whileHover={{ scale: 1.005, transition: { duration: 0.3 } }}
          className="cta-box rounded-2xl p-8 md:p-16 text-center">
          <p className="section-label mb-4">Reserve yours</p>
          <h2 className="text-2xl md:text-5xl font-bold tracking-tight text-white leading-tight mb-4">
            Your home should<br />work for you.
          </h2>
          <p className="text-white/35 text-sm mb-10 max-w-sm mx-auto leading-relaxed">
            Fully refundable $99 deposit. First in line when Covo ships Q3 2026.
          </p>

          <AnimatePresence mode="wait">
            {!done ? (
              <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onSubmit={submit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-3 rounded-md text-sm text-white placeholder-white/25 focus:outline-none"
                  style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 0 0 0 transparent", transition: "box-shadow 0.2s" }}
                  onFocus={e => e.currentTarget.style.boxShadow = "0 0 0 2px rgb(var(--glow-rgb) / 0.35)"}
                  onBlur={e => e.currentTarget.style.boxShadow = "0 0 0 0 transparent"}
                />
                <motion.button type="submit" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="no-underline px-6 py-3 rounded-md text-sm font-medium btn-purple whitespace-nowrap text-white border-0 cursor-pointer">
                  Reserve — $99
                </motion.button>
              </motion.form>
            ) : (
              <motion.div key="done" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                className="text-center py-3">
                <p className="font-medium text-sm" style={{ color: "var(--accent-alt)" }}>
                  🎉 You&apos;re on the list — we&apos;ll email you at <strong>{email}</strong>
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="text-white/20 text-xs mt-5">200+ pre-orders placed · Fully refundable · Ships Q3 2026</p>
        </motion.div>
      </div>
    </section>
  )
}

// ── FOOTER ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="px-5 md:px-16 py-8 section-border">
      <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-4">
        <span className="logo-gradient text-sm font-semibold">Covo</span>
        <ul className="flex gap-6 list-none">
          {["Privacy", "Terms", "Support"].map(l => (
            <li key={l}><a href="#" className="text-white/20 no-underline text-xs hover:text-white/50 transition-colors">{l}</a></li>
          ))}
        </ul>
      </div>
    </footer>
  )
}

// ── STICKY MOBILE BAR ─────────────────────────────────────────────────────────

function StickyBar() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 500)
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])
  return (
    <AnimatePresence>
      {visible && (
        <motion.div initial={{ y: 80 }} animate={{ y: 0 }} exit={{ y: 80 }} transition={{ duration: 0.3, ease }}
          className="fixed bottom-0 left-0 right-0 z-40 md:hidden px-4 py-3"
          style={{ background: "var(--bg-nav)", borderTop: "1px solid rgb(var(--glow-rgb) / 0.12)", backdropFilter: "blur(12px)" }}>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-white text-sm font-semibold">Covo Pro</p>
              <p className="text-xs" style={{ color: "var(--accent)" }}>From $1,299 · Ships Q3 2026</p>
            </div>
            <motion.a href="#cta" whileTap={{ scale: 0.96 }}
              className="no-underline btn-purple px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap">
              Pre-order
            </motion.a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ── TOAST ────────────────────────────────────────────────────────────────────

const cities = ["Seattle, WA", "Austin, TX", "New York, NY", "Chicago, IL", "Los Angeles, CA", "Miami, FL", "Boston, MA", "Denver, CO", "Portland, OR", "Nashville, TN", "San Francisco, CA", "Atlanta, GA"]

function Toast() {
  const [city, setCity] = useState<string | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const show = () => {
      setCity(cities[Math.floor(Math.random() * cities.length)])
      timerRef.current = setTimeout(() => setCity(null), 3800)
    }
    const t1 = setTimeout(show, 6000)
    const id = setInterval(show, 14000)
    return () => { clearTimeout(t1); clearInterval(id); if (timerRef.current) clearTimeout(timerRef.current) }
  }, [])

  return (
    <AnimatePresence>
      {city && (
        <motion.div
          initial={{ opacity: 0, y: 12, x: 0 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.3, ease }}
          className="fixed bottom-20 md:bottom-6 left-4 z-50 flex items-center gap-3 px-4 py-3 rounded-xl text-sm pointer-events-none"
          style={{ background: "var(--bg-nav)", border: "1px solid rgb(var(--glow-rgb) / 0.2)", boxShadow: "0 4px 24px rgba(0,0,0,0.4)" }}>
          <span className="w-2 h-2 rounded-full bg-green-400 shrink-0 animate-pulse" />
          <span className="text-white/70">Someone in <strong className="text-white">{city}</strong> just pre-ordered</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ── THEME TOGGLE ─────────────────────────────────────────────────────────────

function ThemeToggle({ theme, setTheme }: { theme: Theme; setTheme: (t: Theme) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 1.2, ease }}
      className="fixed bottom-24 md:bottom-8 right-4 z-50 flex items-center gap-1 p-1 rounded-full theme-toggle"
    >
      {/* Purple */}
      <button
        onClick={() => setTheme('purple')}
        aria-label="Purple theme"
        className="relative w-7 h-7 rounded-full transition-transform duration-200 focus:outline-none"
        style={{
          background: "linear-gradient(135deg, #a855f7, #c084fc)",
          transform: theme === 'purple' ? "scale(1.15)" : "scale(0.85)",
          opacity: theme === 'purple' ? 1 : 0.45,
          boxShadow: theme === 'purple' ? "0 0 10px rgba(168,85,247,0.6)" : "none",
        }}
      >
        {theme === 'purple' && (
          <span className="absolute inset-0 rounded-full ring-2 ring-white/30" />
        )}
      </button>

      {/* Blue */}
      <button
        onClick={() => setTheme('blue')}
        aria-label="Blue theme"
        className="relative w-7 h-7 rounded-full transition-transform duration-200 focus:outline-none"
        style={{
          background: "linear-gradient(135deg, #3b82f6, #93c5fd)",
          transform: theme === 'blue' ? "scale(1.15)" : "scale(0.85)",
          opacity: theme === 'blue' ? 1 : 0.45,
          boxShadow: theme === 'blue' ? "0 0 10px rgba(59,130,246,0.6)" : "none",
        }}
      >
        {theme === 'blue' && (
          <span className="absolute inset-0 rounded-full ring-2 ring-white/30" />
        )}
      </button>
    </motion.div>
  )
}

// ── PAGE ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [theme, setTheme] = useState<Theme>('purple')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <>
      <Nav />
      <Hero theme={theme} />
      <StatsBar />
      <PressBar />
      <Features />
      <ProductGallery />
      <HowItWorks />
      <VideoDemo />
      <Pricing />
      <Comparison />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
      <StickyBar />
      <Toast />
      <ThemeToggle theme={theme} setTheme={setTheme} />
    </>
  )
}
