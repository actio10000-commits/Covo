'use client'

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Waves } from "@/components/ui/wave-background"

// ── Shared animation variants ─────────────────────────────────────────────────

const ease = [0.22, 1, 0.36, 1]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, delay, ease },
})

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { duration: 0.5, delay, ease },
})

// ── NAV ──────────────────────────────────────────────────────────────────────

const navLinks = ["Features", "How It Works", "Pricing"]

const navExit   = { opacity: 0, y: -6, transition: { duration: 0.2, ease: [0.4, 0, 1, 1] } }
const navEnter  = { opacity: 0, y: -6 }
const navVisible = { opacity: 1, y: 0 }
const navSpring = { duration: 0.28, ease: [0.22, 1, 0.36, 1] }

function Hamburger({ open, onClick, dark }: { open: boolean; onClick: () => void; dark?: boolean }) {
  const color = dark ? "bg-gray-700" : "bg-white/70"
  return (
    <button onClick={onClick} className="md:hidden flex flex-col gap-1.5 p-2 focus:outline-none" aria-label="Toggle menu">
      <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 8 : 0 }} transition={{ duration: 0.22 }} className={`block w-5 h-px ${color}`} />
      <motion.span animate={{ opacity: open ? 0 : 1 }}               transition={{ duration: 0.18 }} className={`block w-5 h-px ${color}`} />
      <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -8 : 0 }} transition={{ duration: 0.22 }} className={`block w-5 h-px ${color}`} />
    </button>
  )
}

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const onScroll = () => { setScrolled(window.scrollY > 80); if (window.scrollY <= 80) setOpen(false) }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>

        {/* ── Full-width dark bar ── */}
        {!scrolled && (
          <motion.nav
            key="bar"
            initial={navEnter} animate={navVisible} exit={navExit}
            transition={navSpring}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-16 py-4"
            style={{ background: "rgba(5,5,5,0.88)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(139,92,246,0.12)" }}
          >
            <a href="#" className="no-underline font-bold text-base tracking-tight logo-gradient">Covo</a>
            <ul className="hidden md:flex items-center gap-7 list-none">
              {navLinks.map(item => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="nav-link text-white/50 no-underline text-sm hover:text-white transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
              <li>
                <a href="#cta" className="no-underline text-sm px-4 py-2 rounded-full font-medium cta-pill">Pre-order</a>
              </li>
            </ul>
            <Hamburger open={open} onClick={() => setOpen(o => !o)} />
          </motion.nav>
        )}

        {/* ── Centered white pill ── */}
        {scrolled && (
          <motion.div
            key="pill-wrap"
            className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
          >
            <motion.nav
              initial={{ ...navEnter, scale: 0.96 }}
              animate={{ ...navVisible, scale: 1 }}
              exit={{ ...navExit, scale: 0.96 }}
              transition={navSpring}
              className="pointer-events-auto flex items-center gap-5 px-5 py-2.5 rounded-full"
              style={{ background: "#fff", boxShadow: "0 2px 24px rgba(0,0,0,0.10), 0 0 0 1px rgba(0,0,0,0.05)" }}
            >
              <a href="#" className="no-underline font-bold text-sm tracking-tight text-gray-900 mr-1">Covo</a>
              <ul className="hidden md:flex items-center gap-5 list-none">
                {navLinks.map(item => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                      className="no-underline text-sm text-gray-500 hover:text-gray-900 transition-colors duration-150">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
              <a href="#cta"
                className="no-underline text-xs font-semibold px-4 py-2 rounded-full bg-gray-900 text-white hover:bg-gray-700 transition-colors duration-150">
                Pre-order
              </a>
              <Hamburger open={open} onClick={() => setOpen(o => !o)} dark />
            </motion.nav>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-0 right-0 z-40 flex flex-col px-5 py-6 gap-5 md:hidden"
            style={{
              top: scrolled ? "72px" : "57px",
              background: scrolled ? "rgba(255,255,255,0.98)" : "rgba(5,5,5,0.97)",
              borderBottom: "1px solid rgba(139,92,246,0.12)",
            }}
          >
            {navLinks.map(item => (
              <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={() => setOpen(false)}
                className={`no-underline text-base transition-colors ${scrolled ? "text-gray-700 hover:text-gray-900" : "text-white/60 hover:text-white"}`}>
                {item}
              </a>
            ))}
            <a href="#cta" onClick={() => setOpen(false)}
              className="no-underline text-sm px-4 py-3 rounded-md text-center btn-purple mt-2">
              Pre-order Now
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ── HERO ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 md:px-6 pt-24 pb-20 overflow-hidden">
      <Waves strokeColor="rgba(139,92,246,0.18)" backgroundColor="#050505" />

      <div className="absolute inset-0 pointer-events-none z-[1]">
        <div className="hero-blob-purple" />
        <div className="hero-blob-blue" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease }}
          className="text-violet-400/70 text-xs tracking-[3px] uppercase mb-6 font-medium"
        >
          Personal Home Robotics
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight md:tracking-[-3px] leading-[1.0] md:leading-[0.95] max-w-4xl mb-6 text-white"
        >
          Your home,<br />
          <span className="hero-gradient-text">on autopilot.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease }}
          className="text-white/45 text-sm md:text-lg max-w-sm md:max-w-md mb-10 leading-relaxed font-normal"
        >
          Covo follows voice commands, carries things around your home,
          and learns your daily routines over time.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease }}
          className="flex flex-col sm:flex-row gap-3 justify-center w-full sm:w-auto"
        >
          <motion.a href="#pricing" whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
            className="no-underline px-6 py-3.5 rounded-md text-sm font-medium btn-purple text-center">
            Pre-order — from $1,299
          </motion.a>
          <motion.a href="#features" whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
            className="text-white/60 no-underline px-6 py-3.5 rounded-md text-sm hover:text-white border border-white/10 hover:border-violet-500/30 transition-colors text-center">
            Learn more
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

// ── FEATURES ─────────────────────────────────────────────────────────────────

const features = [
  { label: "01", title: "Voice Control", desc: "Talk naturally. Covo understands context, not just commands. No app needed — just speak." },
  { label: "02", title: "Carry & Deliver", desc: "Up to 12 lbs. Every room. Ask Covo to bring anything to anyone, anywhere in your home." },
  { label: "03", title: "Routine Learning", desc: "After a week, Covo starts anticipating. Morning coffee. Evening meds. It just happens." },
  { label: "04", title: "Smart Navigation", desc: "3D LiDAR maps your home in real time. Covo flows around furniture, pets, and people." },
  { label: "05", title: "Private by Design", desc: "Everything runs on-device. Your routines and voice data never touch a cloud server." },
  { label: "06", title: "All-Day Battery", desc: "14-hour runtime. Covo docks itself when low and returns before you need it." },
]

function Features() {
  return (
    <section id="features" className="py-16 md:py-32 px-4 md:px-6 section-border">
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp()} className="mb-12 md:mb-20">
          <p className="section-label">Capabilities</p>
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-white">
            Built for the way you live.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px feature-grid">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              {...fadeUp(i * 0.07)}
              whileHover={{ backgroundColor: "rgba(124,58,237,0.08)", transition: { duration: 0.2 } }}
              className="p-6 md:p-8 feature-card cursor-default"
            >
              <p className="text-violet-500/50 text-xs font-mono mb-5 md:mb-6">{f.label}</p>
              <h3 className="text-white text-base font-medium mb-2 md:mb-3">{f.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── HOW IT WORKS ─────────────────────────────────────────────────────────────

const steps = [
  { title: "Unbox", desc: "Boots in 60 seconds. Place it down and it starts mapping." },
  { title: "Introduce", desc: "Walk Covo through your home once, naming each room." },
  { title: "Command", desc: '"Covo, bring my headphones from the office." Done.' },
  { title: "Relax", desc: "After a few days, Covo starts predicting before you ask." },
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
              <motion.p
                className="text-blue-400/60 text-xs font-mono mb-4 md:mb-5"
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 + 0.1, ease }}
              >
                0{i + 1}
              </motion.p>
              <h3 className="text-white font-medium mb-2">{s.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── PRICING ──────────────────────────────────────────────────────────────────

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
  return (
    <section id="pricing" className="py-16 md:py-32 px-4 md:px-6 section-border">
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp()} className="mb-12 md:mb-20">
          <p className="section-label">Pricing</p>
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-white">One robot. Three configs.</h2>
          <p className="text-white/35 text-sm mt-3">Ships Q3 2026. Lock in launch pricing now.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px pricing-grid">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              {...fadeUp(i * 0.1)}
              whileHover={{ y: -4, transition: { duration: 0.25, ease } }}
              className={`p-6 md:p-8 flex flex-col ${plan.featured ? "pricing-card-featured" : "pricing-card"}`}
            >
              <div className="flex items-start justify-between mb-6">
                <p className={`text-xs tracking-widest uppercase ${plan.featured ? "text-violet-400/80" : "text-white/40"}`}>
                  {plan.name}
                </p>
                {plan.featured && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="text-[10px] tracking-widest uppercase px-2 py-0.5 rounded popular-badge"
                  >
                    Popular
                  </motion.span>
                )}
              </div>
              <p className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-1">
                <span className={`text-base md:text-lg ${plan.featured ? "text-violet-400/60" : "text-white/40"}`}>$</span>
                {plan.price}
              </p>
              <p className="text-white/35 text-xs mb-6 md:mb-8 leading-relaxed">{plan.desc}</p>
              <ul className="space-y-2.5 mb-8 md:mb-10 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-white/55">
                    <span className={`w-1 h-1 rounded-full shrink-0 ${plan.featured ? "bg-violet-400/60" : "bg-white/25"}`} />
                    {f}
                  </li>
                ))}
              </ul>
              <motion.a href="#cta" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className={`block text-center py-2.5 rounded-md text-sm no-underline transition-colors duration-200 ${
                  plan.featured ? "btn-purple" : "text-white/60 border border-white/10 hover:border-violet-500/25 hover:text-white"
                }`}>
                Pre-order {plan.name}
              </motion.a>
            </motion.div>
          ))}
        </div>
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
              <motion.p
                className="text-violet-400/50 text-2xl mb-3"
                initial={{ opacity: 0, rotate: -10 }}
                whileInView={{ opacity: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.12 }}
              >
                &ldquo;
              </motion.p>
              <p className="text-white/60 text-sm leading-relaxed mb-5">{t.quote}</p>
              <p className="text-white/30 text-xs">{t.name} · {t.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── CTA ──────────────────────────────────────────────────────────────────────

function CTA() {
  return (
    <section id="cta" className="py-16 md:py-32 px-4 md:px-6 section-border">
      <div className="max-w-5xl mx-auto">
        <motion.div
          {...fadeUp()}
          whileHover={{ scale: 1.005, transition: { duration: 0.3 } }}
          className="cta-box rounded-2xl p-8 md:p-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-10"
        >
          <div>
            <p className="section-label mb-4 md:mb-5">Reserve yours</p>
            <h2 className="text-2xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              Your home should<br />work for you.
            </h2>
            <p className="text-white/35 text-sm mt-4 max-w-sm leading-relaxed">
              Fully refundable $99 deposit. First in line when Covo ships Q3 2026.
            </p>
          </div>
          <div className="flex flex-col gap-3 md:items-end shrink-0">
            <motion.a href="#pricing" whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
              className="no-underline px-8 py-3.5 rounded-md text-sm font-medium text-center btn-purple">
              Pre-order Now
            </motion.a>
            <p className="text-white/25 text-xs text-center">200+ pre-orders placed</p>
          </div>
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
          {["Privacy", "Terms", "Support"].map((l) => (
            <li key={l}>
              <a href="#" className="text-white/20 no-underline text-xs hover:text-white/50 transition-colors">{l}</a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}

// ── PAGE ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  )
}
