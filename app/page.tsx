'use client'

import { Waves } from "@/components/ui/wave-background"

// ── NAV ──────────────────────────────────────────────────────────────────────

function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-5"
      style={{ background: "rgba(5,5,5,0.85)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(139,92,246,0.12)" }}>
      <a href="#" className="no-underline font-semibold text-base tracking-tight logo-gradient">
        Covo
      </a>
      <ul className="hidden md:flex items-center gap-8 list-none">
        {["Features", "How It Works", "Pricing"].map((item) => (
          <li key={item}>
            <a href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-white/50 no-underline text-sm hover:text-white transition-colors duration-200">
              {item}
            </a>
          </li>
        ))}
        <li>
          <a href="#cta"
            className="no-underline text-sm px-4 py-2 rounded-md transition-all duration-200 cta-pill">
            Pre-order
          </a>
        </li>
      </ul>
    </nav>
  )
}

// ── HERO ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-20 overflow-hidden">
      {/* Purple-blue wave background */}
      <Waves
        strokeColor="rgba(139,92,246,0.18)"
        backgroundColor="#050505"
      />

      {/* Ambient glow blobs */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        <div className="hero-blob-purple" />
        <div className="hero-blob-blue" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        <p className="text-violet-400/70 text-xs tracking-[3px] uppercase mb-8 font-medium">
          Personal Home Robotics
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-[-3px] leading-[0.95] max-w-4xl mb-8 text-white">
          Your home,<br />
          <span className="hero-gradient-text">on autopilot.</span>
        </h1>
        <p className="text-white/45 text-base md:text-lg max-w-md mb-12 leading-relaxed font-light">
          Covo follows voice commands, carries things around your home,
          and learns your daily routines over time.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <a href="#pricing"
            className="no-underline px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 btn-purple">
            Pre-order — from $1,299
          </a>
          <a href="#features"
            className="text-white/60 no-underline px-6 py-3 rounded-md text-sm hover:text-white border border-white/10 hover:border-violet-500/30 transition-all duration-200">
            Learn more
          </a>
        </div>
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
    <section id="features" className="py-32 px-6 section-border">
      <div className="max-w-5xl mx-auto">
        <div className="mb-20">
          <p className="section-label">Capabilities</p>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white">
            Built for the way you live.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px feature-grid">
          {features.map((f) => (
            <div key={f.title} className="p-8 feature-card">
              <p className="text-violet-500/50 text-xs font-mono mb-6">{f.label}</p>
              <h3 className="text-white text-base font-medium mb-3">{f.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
            </div>
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
    <section id="how-it-works" className="py-32 px-6 section-border">
      <div className="max-w-5xl mx-auto">
        <div className="mb-20">
          <p className="section-label">Process</p>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white">
            Up in minutes.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {steps.map((s, i) => (
            <div key={s.title}>
              <p className="text-blue-400/60 text-xs font-mono mb-5">0{i + 1}</p>
              <h3 className="text-white font-medium mb-2">{s.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── PRICING ──────────────────────────────────────────────────────────────────

const plans = [
  {
    name: "Starter",
    price: "1,299",
    desc: "Core Covo experience for individuals and couples.",
    features: ["Voice commands", "8 lb carry capacity", "1,500 sq ft mapping", "10-hr battery", "12-month warranty"],
    featured: false,
  },
  {
    name: "Pro",
    price: "1,899",
    desc: "The full experience. Unlimited mapping, advanced learning.",
    features: ["Voice commands", "12 lb carry capacity", "Unlimited mapping", "14-hr battery", "Advanced learning", "Multi-floor", "24-month warranty"],
    featured: true,
  },
  {
    name: "Family",
    price: "2,499",
    desc: "Two Covos, coordinated across your entire home.",
    features: ["Everything in Pro × 2", "Multi-robot sync", "Per-member voice profiles", "White-glove delivery", "36-month warranty"],
    featured: false,
  },
]

function Pricing() {
  return (
    <section id="pricing" className="py-32 px-6 section-border">
      <div className="max-w-5xl mx-auto">
        <div className="mb-20">
          <p className="section-label">Pricing</p>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white">
            One robot. Three configs.
          </h2>
          <p className="text-white/35 text-sm mt-3">Ships Q3 2026. Lock in launch pricing now.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px pricing-grid">
          {plans.map((plan) => (
            <div key={plan.name}
              className={`p-8 flex flex-col ${plan.featured ? "pricing-card-featured" : "pricing-card"}`}>
              <div className="flex items-start justify-between mb-6">
                <p className={`text-xs tracking-widest uppercase ${plan.featured ? "text-violet-400/80" : "text-white/40"}`}>
                  {plan.name}
                </p>
                {plan.featured && (
                  <span className="text-[10px] tracking-widest uppercase px-2 py-0.5 rounded popular-badge">
                    Popular
                  </span>
                )}
              </div>
              <p className="text-4xl font-light tracking-tight text-white mb-1">
                <span className={`text-lg ${plan.featured ? "text-violet-400/60" : "text-white/40"}`}>$</span>
                {plan.price}
              </p>
              <p className="text-white/35 text-xs mb-8 leading-relaxed">{plan.desc}</p>
              <ul className="space-y-2.5 mb-10 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-white/55">
                    <span className={`w-1 h-1 rounded-full shrink-0 ${plan.featured ? "bg-violet-400/60" : "bg-white/25"}`} />
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#cta"
                className={`block text-center py-2.5 rounded-md text-sm no-underline transition-all duration-200 ${
                  plan.featured ? "btn-purple" : "text-white/60 border border-white/10 hover:border-violet-500/25 hover:text-white"
                }`}>
                Pre-order {plan.name}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── TESTIMONIALS ─────────────────────────────────────────────────────────────

const testimonials = [
  {
    quote: "After two weeks Covo started bringing me my meds with my morning coffee without me saying a word.",
    name: "Margaret T.",
    role: "Austin, TX",
  },
  {
    quote: "Genuinely the most useful tech purchase I've ever made. My whole family uses it every day.",
    name: "David K.",
    role: "Seattle, WA",
  },
  {
    quote: "I have mobility limitations and Covo has genuinely changed my independence at home.",
    name: "Rosa M.",
    role: "Chicago, IL",
  },
]

function Testimonials() {
  return (
    <section className="py-32 px-6 section-border">
      <div className="max-w-5xl mx-auto">
        <p className="section-label mb-20">From beta testers</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {testimonials.map((t) => (
            <div key={t.name}>
              <p className="text-violet-400/50 text-lg mb-4">&ldquo;</p>
              <p className="text-white/60 text-sm leading-relaxed mb-6 font-light">
                {t.quote}
              </p>
              <p className="text-white/30 text-xs">{t.name} · {t.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── CTA ──────────────────────────────────────────────────────────────────────

function CTA() {
  return (
    <section id="cta" className="py-32 px-6 section-border">
      <div className="max-w-5xl mx-auto">
        <div className="cta-box rounded-2xl p-12 md:p-16 flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <div>
            <p className="section-label mb-5">Reserve yours</p>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight text-white leading-tight">
              Your home should<br />work for you.
            </h2>
            <p className="text-white/35 text-sm mt-4 max-w-sm leading-relaxed">
              Fully refundable $99 deposit. First in line when Covo ships Q3 2026.
            </p>
          </div>
          <div className="flex flex-col gap-3 md:items-end shrink-0">
            <a href="#pricing"
              className="no-underline px-8 py-3 rounded-md text-sm font-medium transition-all duration-200 text-center btn-purple">
              Pre-order Now
            </a>
            <p className="text-white/25 text-xs text-center">200+ pre-orders placed</p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── FOOTER ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="px-8 md:px-16 py-8 section-border">
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
