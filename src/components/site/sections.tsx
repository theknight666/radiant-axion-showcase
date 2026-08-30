import { useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Check,
  ChevronDown,
  Compass,
  Gauge,
  Layers,
  Minus,
  Rocket,
  Search,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import { BadgeRow, DarkButton, EASE, GlassCard, OrangeButton } from "./ui-bits";

const SHELL = "max-w-[1440px] mx-auto";
const PAD = "px-5 sm:px-8 lg:px-12";

/* ---------------------------------- METRICS --------------------------------- */

const METRICS = [
  { value: "+318%", label: "Average pipeline growth in 9 months" },
  { value: "$240M", label: "Client revenue influenced since 2019" },
  { value: "4.1x", label: "Median return on retained spend" },
  { value: "27", label: "Category leaders scaled worldwide" },
];

export function MetricsSection() {
  return (
    <section className="relative bg-[#EFEFEF] overflow-hidden py-16 sm:py-20 lg:py-28">
      <div className="pointer-events-none absolute -top-32 -left-24 h-[420px] w-[420px] rounded-full bg-[#F26522]/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 right-0 h-[420px] w-[420px] rounded-full bg-[#1a1d2e]/15 blur-[130px]" />
      <div className={`relative ${SHELL}`}>
        <BadgeRow number="3" label="Growth in numbers" borderClass="border-gray-300" />
        <h2
          className={`${PAD} text-[clamp(1.6rem,4.4vw,3.4rem)] font-medium leading-[1.1] tracking-[-0.03em] text-gray-900 mb-10 sm:mb-14`}
        >
          Compounding outcomes,
          <br className="hidden sm:block" /> not vanity metrics.
        </h2>
        <div className={`${PAD} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5`}>
          {METRICS.map((m) => (
            <GlassCard key={m.value} className="p-6 sm:p-8">
              <p className="text-[clamp(2rem,3.4vw,2.8rem)] font-medium tracking-[-0.03em] text-gray-900">
                {m.value}
              </p>
              <p className="mt-3 text-[13px] sm:text-[14px] leading-relaxed text-gray-600">
                {m.label}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- SERVICES --------------------------------- */

const SERVICES = [
  {
    icon: Compass,
    title: "Growth strategy",
    copy: "Positioning, ICP research and a 12-month roadmap engineered around one revenue number.",
    items: ["Market & competitor teardown", "Offer architecture", "Channel mix modelling"],
  },
  {
    icon: Target,
    title: "Performance media",
    copy: "Paid search, social and programmatic built on creative testing velocity, not guesswork.",
    items: ["Full-funnel paid", "Creative testing sprints", "Incrementality measurement"],
  },
  {
    icon: Search,
    title: "SEO & content",
    copy: "Topical authority programmes that turn organic search into a predictable pipeline channel.",
    items: ["Technical SEO", "Editorial systems", "Digital PR & links"],
  },
  {
    icon: Layers,
    title: "Conversion design",
    copy: "Landing systems and product surfaces designed to move the metric that pays the bills.",
    items: ["CRO experiments", "Design systems", "Web builds"],
  },
  {
    icon: Zap,
    title: "Lifecycle & CRM",
    copy: "Email, SMS and onboarding flows that lift retention and lifetime value quarter over quarter.",
    items: ["Journey mapping", "Automation build", "Retention analytics"],
  },
  {
    icon: BarChart3,
    title: "Data & attribution",
    copy: "Clean tracking, warehouse-native dashboards and the truth about what actually drives revenue.",
    items: ["Server-side tracking", "Warehouse reporting", "Forecast modelling"],
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="bg-white py-16 sm:py-20 lg:py-28">
      <div className={SHELL}>
        <BadgeRow number="4" label="What we do" />
        <div className={`${PAD} flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 sm:mb-14`}>
          <h2 className="text-[clamp(1.6rem,4.4vw,3.4rem)] font-medium leading-[1.1] tracking-[-0.03em] text-gray-900">
            One team for the entire
            <br className="hidden sm:block" /> growth engine.
          </h2>
          <p className="max-w-[420px] text-[15px] sm:text-[16px] leading-relaxed text-gray-600">
            Strategy, creative, media and data under one roof — so nothing gets lost between
            agencies and every decision ladders to revenue.
          </p>
        </div>

        <div className={`${PAD} grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5`}>
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className={`group relative overflow-hidden rounded-2xl border border-gray-200 bg-[#FAFAFA] p-7 sm:p-8 transition-all duration-500 ${EASE} hover:-translate-y-1 hover:border-gray-300 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.35)]`}
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#F26522]/0 blur-3xl transition-all duration-700 group-hover:bg-[#F26522]/25" />
              <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-gray-900 text-white">
                <s.icon size={18} />
              </span>
              <h3 className="relative mt-6 text-[18px] sm:text-[20px] font-medium tracking-[-0.02em] text-gray-900">
                {s.title}
              </h3>
              <p className="relative mt-3 text-[14px] leading-relaxed text-gray-600">{s.copy}</p>
              <ul className="relative mt-6 space-y-2">
                {s.items.map((i) => (
                  <li key={i} className="flex items-center gap-2 text-[13px] text-gray-700">
                    <Check size={14} className="text-[#F26522]" />
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- PROCESS ---------------------------------- */

const STEPS = [
  {
    n: "01",
    icon: Search,
    title: "Diagnose",
    copy: "Two weeks inside your data, funnel and customer interviews to find the real constraint on growth.",
  },
  {
    n: "02",
    icon: Compass,
    title: "Architect",
    copy: "A prioritised roadmap with forecasted impact, owners and the experiments that matter first.",
  },
  {
    n: "03",
    icon: Rocket,
    title: "Execute",
    copy: "Weekly shipping cadence across media, content and conversion — one squad, one backlog.",
  },
  {
    n: "04",
    icon: Gauge,
    title: "Compound",
    copy: "Winners get scaled, losers get killed, and the system gets sharper every single quarter.",
  },
];

export function ProcessSection() {
  return (
    <section id="process" className="relative overflow-hidden bg-[#0E1015] py-16 sm:py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 opacity-60 [background:radial-gradient(120%_80%_at_50%_-10%,rgba(242,101,34,0.35),transparent_60%)]" />
      <div className={`relative ${SHELL}`}>
        <div className={`${PAD} flex items-center gap-3 mb-6 sm:mb-8`}>
          <span className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-white text-[11px] sm:text-[12px] font-semibold text-gray-900">
            5
          </span>
          <span className="rounded-full border border-white/20 px-3 sm:px-4 py-1 sm:py-1.5 text-[12px] sm:text-[13px] font-medium text-white/80">
            How we work
          </span>
        </div>
        <h2
          className={`${PAD} text-[clamp(1.6rem,4.4vw,3.4rem)] font-medium leading-[1.1] tracking-[-0.03em] text-white mb-10 sm:mb-14`}
        >
          A system, not a retainer
          <br className="hidden sm:block" /> full of good intentions.
        </h2>
        <div className={`${PAD} grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5`}>
          {STEPS.map((s) => (
            <div
              key={s.n}
              className={`liquid-glass rounded-2xl p-7 sm:p-8 transition-transform duration-500 ${EASE} hover:-translate-y-1`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-semibold tracking-[0.2em] text-[#F26522]">
                  {s.n}
                </span>
                <s.icon size={18} className="text-white/70" />
              </div>
              <h3 className="mt-8 text-[19px] font-medium tracking-[-0.02em] text-white">
                {s.title}
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-white/65">{s.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- TESTIMONIALS ------------------------------- */

const QUOTES = [
  {
    quote:
      "Axion rebuilt our acquisition model in one quarter. We went from unpredictable months to a forecast the board actually trusts.",
    name: "ElenaВарга",
    role: "CMO, Northbeam Health",
  },
  {
    quote:
      "The most senior team we've worked with. No junior hand-offs, no dashboards full of noise — just compounding revenue.",
    name: "Marcus Reid",
    role: "Founder, Luminar",
  },
  {
    quote:
      "They killed half our spend and doubled pipeline. That takes conviction and a very clear read of the data.",
    name: "Priya Nair",
    role: "VP Growth, Narrativ",
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-[#F5F5F5] py-16 sm:py-20 lg:py-28">
      <div className={SHELL}>
        <BadgeRow number="6" label="Client voices" borderClass="border-gray-300" />
        <h2
          className={`${PAD} text-[clamp(1.6rem,4.4vw,3.4rem)] font-medium leading-[1.1] tracking-[-0.03em] text-gray-900 mb-10 sm:mb-14`}
        >
          Operators who bet on us,
          <br className="hidden sm:block" /> and won.
        </h2>
        <div className={`${PAD} grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5`}>
          {QUOTES.map((q) => (
            <figure
              key={q.name}
              className={`flex h-full flex-col justify-between rounded-2xl border border-gray-200 bg-white p-7 sm:p-8 transition-all duration-500 ${EASE} hover:-translate-y-1 hover:shadow-[0_24px_60px_-32px_rgba(0,0,0,0.35)]`}
            >
              <Sparkles size={18} className="text-[#F26522]" />
              <blockquote className="mt-6 text-[16px] sm:text-[17px] leading-[1.55] font-medium tracking-[-0.01em] text-gray-900">
                “{q.quote}”
              </blockquote>
              <figcaption className="mt-8 border-t border-gray-200 pt-5">
                <p className="text-[14px] font-semibold text-gray-900">{q.name}</p>
                <p className="text-[13px] text-gray-500">{q.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- PRICING ---------------------------------- */

const PLANS = [
  {
    name: "Sprint",
    price: "£9k",
    cadence: "one-off, 4 weeks",
    copy: "A diagnostic and roadmap for teams who need clarity before they need headcount.",
    items: ["Growth audit", "Channel modelling", "12-month roadmap", "Leadership workshop"],
    featured: false,
  },
  {
    name: "Engine",
    price: "£18k",
    cadence: "per month",
    copy: "Our core retainer: an embedded squad running strategy, media, content and CRO.",
    items: [
      "Dedicated growth squad",
      "Paid, SEO & lifecycle",
      "Weekly experiment cadence",
      "Warehouse reporting",
      "Quarterly board reviews",
    ],
    featured: true,
  },
  {
    name: "Partner",
    price: "Custom",
    cadence: "annual",
    copy: "Full-stack growth ownership for category leaders scaling across markets.",
    items: ["Multi-market programmes", "In-house team enablement", "Exec advisory", "Priority creative studio"],
    featured: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="bg-white py-16 sm:py-20 lg:py-28">
      <div className={SHELL}>
        <BadgeRow number="7" label="Engagements" />
        <div className={`${PAD} flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 sm:mb-14`}>
          <h2 className="text-[clamp(1.6rem,4.4vw,3.4rem)] font-medium leading-[1.1] tracking-[-0.03em] text-gray-900">
            Priced for outcomes,
            <br className="hidden sm:block" /> not hours logged.
          </h2>
          <p className="max-w-[420px] text-[15px] sm:text-[16px] leading-relaxed text-gray-600">
            Every engagement starts with a diagnostic. No lock-ins beyond the first 90 days, no
            surprise media fees.
          </p>
        </div>

        <div className={`${PAD} grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 items-start`}>
          {PLANS.map((p) => (
            <div
              key={p.name}
              className={`relative overflow-hidden rounded-2xl p-7 sm:p-9 transition-all duration-500 ${EASE} hover:-translate-y-1 ${
                p.featured
                  ? "bg-[#0E1015] text-white shadow-[0_40px_90px_-45px_rgba(0,0,0,0.8)]"
                  : "border border-gray-200 bg-[#FAFAFA]"
              }`}
            >
              {p.featured && (
                <>
                  <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#F26522]/35 blur-[90px]" />
                  <span className="relative inline-flex rounded-full bg-[#F26522] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em]">
                    Most chosen
                  </span>
                </>
              )}
              <h3
                className={`relative ${p.featured ? "mt-5" : ""} text-[19px] font-medium tracking-[-0.02em]`}
              >
                {p.name}
              </h3>
              <div className="relative mt-5 flex items-end gap-2">
                <span className="text-[clamp(2rem,3.4vw,2.8rem)] font-medium tracking-[-0.03em]">
                  {p.price}
                </span>
                <span
                  className={`pb-2 text-[13px] ${p.featured ? "text-white/60" : "text-gray-500"}`}
                >
                  {p.cadence}
                </span>
              </div>
              <p
                className={`relative mt-4 text-[14px] leading-relaxed ${p.featured ? "text-white/70" : "text-gray-600"}`}
              >
                {p.copy}
              </p>
              <ul className="relative mt-7 space-y-3">
                {p.items.map((i) => (
                  <li
                    key={i}
                    className={`flex items-center gap-2 text-[13px] ${p.featured ? "text-white/85" : "text-gray-700"}`}
                  >
                    <Check size={14} className="text-[#F26522]" />
                    {i}
                  </li>
                ))}
              </ul>
              <div className="relative mt-9">
                {p.featured ? (
                  <OrangeButton label="Book a strategy call" />
                ) : (
                  <DarkButton label="Enquire" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------ FAQ ----------------------------------- */

const FAQS = [
  {
    q: "How quickly do engagements start showing results?",
    a: "Diagnostics land in week two, first experiments ship in week three, and most clients see measurable channel movement inside 60 days. Compounding gains show from quarter two onwards.",
  },
  {
    q: "Do you work with in-house teams?",
    a: "Almost always. We embed alongside your marketers, run the cadence, and hand over playbooks so capability stays with you rather than walking out with the agency.",
  },
  {
    q: "What size of company do you work best with?",
    a: "Brands between £3M and £150M in revenue with a product that already has proof of demand. We are not the right partner for pre-product-market-fit experiments.",
  },
  {
    q: "Is media spend included in the retainer?",
    a: "No. Retainers cover strategy, creative, execution and reporting. Media budget is paid directly to the platforms so you keep full ownership and transparency.",
  },
  {
    q: "What happens after the first 90 days?",
    a: "We review against the forecast together. Continue, resize, or part ways — contracts roll monthly after the initial quarter with 30 days' notice.",
  },
];

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="bg-[#EFEFEF] py-16 sm:py-20 lg:py-28">
      <div className={SHELL}>
        <BadgeRow number="8" label="Questions" borderClass="border-gray-300" />
        <div className={`${PAD} grid grid-cols-1 lg:grid-cols-[38%_1fr] gap-10 lg:gap-16`}>
          <h2 className="text-[clamp(1.6rem,4.4vw,3.4rem)] font-medium leading-[1.1] tracking-[-0.03em] text-gray-900">
            Things founders
            <br className="hidden sm:block" /> ask us first.
          </h2>
          <div className="divide-y divide-gray-300 border-y border-gray-300">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-[15px] sm:text-[17px] font-medium tracking-[-0.01em] text-gray-900">
                      {f.q}
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-400/60 transition-colors duration-500 ${EASE} ${
                        isOpen ? "bg-gray-900 text-white" : "text-gray-900"
                      }`}
                    >
                      {isOpen ? <Minus size={14} /> : <ChevronDown size={14} />}
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-500 ${EASE} ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-6 pr-12 text-[14px] sm:text-[15px] leading-relaxed text-gray-600">
                        {f.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------ CTA ----------------------------------- */

export function CtaSection() {
  return (
    <section id="contact" className="bg-white px-5 sm:px-8 lg:px-12 py-10 sm:py-14 lg:py-20">
      <div
        className={`${SHELL} relative overflow-hidden rounded-[28px] bg-[#0E1015] px-6 sm:px-12 lg:px-16 py-14 sm:py-20 lg:py-28`}
      >
        <div className="pointer-events-none absolute -left-24 -top-24 h-[380px] w-[380px] rounded-full bg-[#F26522]/40 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-32 -right-20 h-[380px] w-[380px] rounded-full bg-white/10 blur-[120px]" />
        <div className="relative max-w-[760px]">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-1.5 text-[12px] font-medium text-white/80">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F26522]" />
            Two partner slots left for Q1 2026
          </span>
          <h2 className="mt-7 text-[clamp(1.9rem,5vw,4rem)] font-medium leading-[1.05] tracking-[-0.03em] text-white">
            Let's build the growth
            <br className="hidden sm:block" /> engine your category fears.
          </h2>
          <p className="mt-6 max-w-[520px] text-[15px] sm:text-[16px] leading-relaxed text-white/65">
            Book a 30-minute strategy call. You'll leave with a candid read on your biggest
            constraint — whether or not we work together.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <OrangeButton label="Book a strategy call" />
            <button
              className={`group inline-flex items-center gap-3 rounded-full liquid-glass pl-5 sm:pl-6 pr-2 py-2 text-[13px] sm:text-[14px] text-white transition-transform duration-500 ${EASE}`}
            >
              <span className="h-[20px] leading-[20px]">See our work</span>
              <span
                className={`flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-white transition-transform duration-500 ${EASE} group-hover:-rotate-45`}
              >
                <ArrowRight size={14} className="text-gray-900" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------- FOOTER --------------------------------- */

const FOOTER_COLS = [
  { title: "Studio", links: ["About", "Careers", "Journal", "Press"] },
  { title: "Services", links: ["Growth strategy", "Performance media", "SEO & content", "Lifecycle"] },
  { title: "Work", links: ["Narrativ", "Luminar", "Northbeam", "All case studies"] },
];

export function SiteFooter() {
  return (
    <footer className="bg-[#0E1015] pt-16 sm:pt-20 pb-10">
      <div className={`${SHELL} ${PAD}`}>
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 lg:gap-8">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[11px] font-bold tracking-tight text-gray-900">
                AX
              </span>
              <span className="text-[15px] font-medium text-white">Axion Studio</span>
            </div>
            <p className="mt-6 max-w-[320px] text-[14px] leading-relaxed text-white/60">
              A growth partner for brands ready to dominate their category — strategy, creative and
              media in one senior team.
            </p>
            <div className="mt-8">
              <OrangeButton label="Start a project" />
            </div>
          </div>
          {FOOTER_COLS.map((c) => (
            <div key={c.title}>
              <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-white/40">
                {c.title}
              </p>
              <ul className="mt-5 space-y-3">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-[14px] text-white/70 transition-colors duration-300 hover:text-white"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/10 pt-6">
          <p className="text-[13px] text-white/45">
            © {new Date().getFullYear()} Axion Studio. London & New York.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy", "Terms", "LinkedIn", "Instagram"].map((l) => (
              <a
                key={l}
                href="#"
                className="text-[13px] text-white/45 transition-colors duration-300 hover:text-white"
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
