import { useState } from "react";
import { Link } from "@tanstack/react-router";
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
import { toast } from "sonner";
import { BadgeRow, DarkButton, EASE, GlassCard, OrangeButton, RollText } from "./ui-bits";
import { AxionisLogo } from "./AxionisLogo";
import { BookingModal } from "./BookingModal";

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
        <div className={`${PAD} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6`}>
          {METRICS.map((m) => (
            <GlassCard key={m.value} className="p-7 sm:p-9 rounded-[32px]">
              <p className="text-[clamp(2.2rem,3.6vw,3rem)] font-bold tracking-[-0.03em] text-gray-900">
                {m.value}
              </p>
              <p className="mt-3 text-[13.5px] sm:text-[14.5px] leading-relaxed text-gray-600 font-medium">
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
          <div>
            <h2 className="text-[clamp(1.6rem,4.4vw,3.4rem)] font-medium leading-[1.1] tracking-[-0.03em] text-gray-900">
              One team for the entire
              <br className="hidden sm:block" /> growth engine.
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="max-w-[420px] text-[15px] sm:text-[16px] leading-relaxed text-gray-600">
              Strategy, creative, media and data under one roof — so nothing gets lost between
              agencies and every decision ladders to revenue.
            </p>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#F26522] hover:text-[#e05a1a] transition-colors whitespace-nowrap"
            >
              <span>Explore all capabilities</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        <div className={`${PAD} grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-7`}>
          {SERVICES.map((s) => (
            <Link
              key={s.title}
              to="/services"
              className={`group relative overflow-hidden rounded-[32px] border border-gray-200/90 bg-[#FAFAFA] p-8 sm:p-9 transition-all duration-500 ${EASE} hover:-translate-y-1.5 shadow-[0_15px_35px_-12px_rgba(15,18,25,0.06),inset_0_1px_1px_rgba(255,255,255,1)] hover:shadow-[0_28px_65px_-15px_rgba(15,18,25,0.12)] block`}
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[#F26522]/0 blur-3xl transition-all duration-700 group-hover:bg-[#F26522]/20" />
              <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 text-white shadow-md">
                <s.icon size={20} />
              </span>
              <h3 className="relative mt-7 text-[20px] font-semibold tracking-[-0.02em] text-gray-900 group-hover:text-[#F26522] transition-colors">
                {s.title}
              </h3>
              <p className="relative mt-3 text-[14px] leading-relaxed text-gray-600">{s.copy}</p>
              <ul className="relative mt-7 space-y-2.5">
                {s.items.map((i) => (
                  <li key={i} className="flex items-center gap-2.5 text-[13px] text-gray-700 font-medium">
                    <span className="h-5 w-5 rounded-full bg-[#F26522]/10 flex items-center justify-center shrink-0">
                      <Check size={12} className="text-[#F26522]" />
                    </span>
                    {i}
                  </li>
                ))}
              </ul>
            </Link>
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
          <span className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-white text-[11px] sm:text-[12px] font-semibold text-gray-900 shadow-sm">
            5
          </span>
          <span className="rounded-full border border-white/20 px-3.5 sm:px-4 py-1 sm:py-1.5 text-[12px] sm:text-[13px] font-medium text-white/80 bg-white/5 backdrop-blur-md">
            How we work
          </span>
        </div>
        <h2
          className={`${PAD} text-[clamp(1.6rem,4.4vw,3.4rem)] font-medium leading-[1.1] tracking-[-0.03em] text-white mb-10 sm:mb-14`}
        >
          A system, not a retainer
          <br className="hidden sm:block" /> full of good intentions.
        </h2>
        <div className={`${PAD} grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-6`}>
          {STEPS.map((s) => (
            <div
              key={s.n}
              className={`liquid-glass rounded-[32px] p-8 sm:p-9 transition-all duration-500 ${EASE} hover:-translate-y-1.5`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-bold tracking-[0.2em] text-[#F26522] bg-[#F26522]/10 px-2.5 py-0.5 rounded-full">
                  {s.n}
                </span>
                <span className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
                  <s.icon size={16} className="text-white/80" />
                </span>
              </div>
              <h3 className="mt-8 text-[20px] font-semibold tracking-[-0.02em] text-white">
                {s.title}
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-white/70">{s.copy}</p>
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
      "Axionis rebuilt our acquisition model in one quarter. We went from unpredictable months to a forecast the board actually trusts.",
    name: "Elena Varga",
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
        <div className={`${PAD} grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-7`}>
          {QUOTES.map((q) => (
            <figure
              key={q.name}
              className={`flex h-full flex-col justify-between rounded-[32px] border border-gray-200/90 bg-white p-8 sm:p-9 transition-all duration-500 ${EASE} hover:-translate-y-1.5 shadow-[0_15px_35px_-12px_rgba(15,18,25,0.06),inset_0_1px_1px_rgba(255,255,255,1)] hover:shadow-[0_28px_65px_-15px_rgba(15,18,25,0.12)]`}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F26522]/10 text-[#F26522]">
                <Sparkles size={18} />
              </span>
              <blockquote className="mt-6 text-[16px] sm:text-[17px] leading-[1.55] font-medium tracking-[-0.01em] text-gray-900">
                “{q.quote}”
              </blockquote>
              <figcaption className="mt-8 border-t border-gray-100 pt-5">
                <p className="text-[14.5px] font-bold text-gray-900">{q.name}</p>
                <p className="text-[13px] text-gray-500 font-medium">{q.role}</p>
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

export function PricingSection({
  onSelectPlan,
}: {
  onSelectPlan?: (planName: string) => void;
}) {
  const [modalPlan, setModalPlan] = useState<string | null>(null);

  const handleAction = (planName: string) => {
    if (onSelectPlan) {
      onSelectPlan(planName);
    } else {
      setModalPlan(planName);
    }
  };

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

        <div className={`${PAD} grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-7 items-start`}>
          {PLANS.map((p) => (
            <div
              key={p.name}
              className={`relative overflow-hidden rounded-[36px] p-8 sm:p-10 transition-all duration-500 ${EASE} hover:-translate-y-1.5 ${
                p.featured
                  ? "bg-[#0E1015] text-white shadow-[0_35px_80px_-25px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.25)] border border-white/10"
                  : "border border-gray-200/90 bg-[#FAFAFA] shadow-[0_15px_35px_-12px_rgba(15,18,25,0.06),inset_0_1px_1px_rgba(255,255,255,1)]"
              }`}
            >
              {p.featured && (
                <>
                  <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#F26522]/35 blur-[90px]" />
                  <span className="relative inline-flex rounded-full bg-[#F26522] px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] shadow-sm">
                    Most chosen
                  </span>
                </>
              )}
              <h3
                className={`relative ${p.featured ? "mt-5" : ""} text-[22px] font-bold tracking-[-0.02em]`}
              >
                {p.name}
              </h3>
              <div className="relative mt-5 flex items-end gap-2">
                <span className="text-[clamp(2.2rem,3.6vw,3rem)] font-bold tracking-[-0.03em]">
                  {p.price}
                </span>
                <span
                  className={`pb-2 text-[13px] font-medium ${p.featured ? "text-white/60" : "text-gray-500"}`}
                >
                  {p.cadence}
                </span>
              </div>
              <p
                className={`relative mt-4 text-[14px] leading-relaxed ${p.featured ? "text-white/70" : "text-gray-600"}`}
              >
                {p.copy}
              </p>
              <ul className="relative mt-8 space-y-3">
                {p.items.map((i) => (
                  <li
                    key={i}
                    className={`flex items-center gap-2.5 text-[13px] font-medium ${p.featured ? "text-white/85" : "text-gray-700"}`}
                  >
                    <span className="h-5 w-5 rounded-full bg-[#F26522]/10 flex items-center justify-center shrink-0">
                      <Check size={12} className="text-[#F26522]" />
                    </span>
                    {i}
                  </li>
                ))}
              </ul>
              <div className="relative mt-10">
                <button
                  onClick={() => handleAction(p.name)}
                  className={`group w-full inline-flex items-center justify-between text-[13px] sm:text-[14px] font-medium rounded-full pl-6 pr-2 py-2.5 transition-all duration-300 ${
                    p.featured
                      ? "bg-[#F26522] hover:bg-[#e05a1a] text-white shadow-[0_12px_24px_-4px_rgba(242,101,34,0.4)]"
                      : "bg-gray-900 hover:bg-black text-white shadow-md"
                  }`}
                >
                  <RollText label={p.featured ? "Book a strategy call" : "Enquire about plan"} />
                  <span
                    className={`w-8 h-8 rounded-full bg-white flex items-center justify-center transition-transform duration-500 ${EASE} group-hover:-rotate-45 shadow-sm`}
                  >
                    <ArrowRight
                      size={14}
                      className={p.featured ? "text-[#F26522]" : "text-gray-900"}
                    />
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modalPlan && (
        <BookingModal
          isOpen={Boolean(modalPlan)}
          initialPlan={modalPlan}
          onClose={() => setModalPlan(null)}
        />
      )}
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
    a: "Brands between ₹30Cr and ₹1,500Cr in revenue with a product that already has proof of demand. We are not the right partner for pre-product-market-fit experiments.",
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
          <div className="space-y-4">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={f.q}
                  className="rounded-[28px] bg-white border border-gray-200/90 shadow-[0_8px_20px_-8px_rgba(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,1)] overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 p-6 sm:p-7 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-[15px] sm:text-[17px] font-semibold tracking-[-0.01em] text-gray-900">
                      {f.q}
                    </span>
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                        isOpen
                          ? "bg-gray-900 text-white shadow-sm"
                          : "bg-gray-100 text-gray-900 hover:bg-gray-200"
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
                      <p className="px-6 sm:px-7 pb-6 sm:pb-7 text-[14px] sm:text-[15px] leading-relaxed text-gray-600">
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

export function CtaSection({
  onBookCall,
}: {
  onBookCall?: () => void;
}) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleCall = () => {
    if (onBookCall) onBookCall();
    else setModalOpen(true);
  };

  return (
    <section id="contact" className="bg-white px-5 sm:px-8 lg:px-12 py-10 sm:py-14 lg:py-20">
      <div
        className={`${SHELL} relative overflow-hidden rounded-[38px] bg-[#0E1015] px-6 sm:px-12 lg:px-16 py-14 sm:py-20 lg:py-28 shadow-[0_35px_90px_-25px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.2)] border border-white/10`}
      >
        <div className="pointer-events-none absolute -left-24 -top-24 h-[380px] w-[380px] rounded-full bg-[#F26522]/40 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-32 -right-20 h-[380px] w-[380px] rounded-full bg-white/10 blur-[120px]" />
        <div className="relative max-w-[760px]">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-1.5 text-[12px] font-medium text-white/80 bg-white/5 backdrop-blur-md">
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
            <button
              onClick={handleCall}
              className={`group inline-flex items-center gap-3 bg-[#F26522] hover:bg-[#e05a1a] text-white text-[13px] sm:text-[14px] rounded-full pl-5 sm:pl-6 pr-2 py-2 shadow-[0_14px_30px_-6px_rgba(242,101,34,0.5),inset_0_1px_1px_rgba(255,255,255,0.4)] hover:shadow-[0_20px_40px_-6px_rgba(242,101,34,0.65)] hover:-translate-y-0.5 transition-all duration-500 ${EASE}`}
            >
              <RollText label="Book a strategy call" />
              <span
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white flex items-center justify-center transition-transform duration-500 ${EASE} group-hover:-rotate-45 shadow-sm`}
              >
                <ArrowRight size={14} className="text-[#F26522]" />
              </span>
            </button>

            <Link
              to="/projects"
              className={`group inline-flex items-center gap-3 rounded-full liquid-glass pl-5 sm:pl-6 pr-2 py-2 text-[13px] sm:text-[14px] text-white transition-all duration-500 hover:-translate-y-0.5 ${EASE}`}
            >
              <span className="h-[20px] leading-[20px]">See our work</span>
              <span
                className={`flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-white transition-transform duration-500 ${EASE} group-hover:-rotate-45 shadow-sm`}
              >
                <ArrowRight size={14} className="text-gray-900" />
              </span>
            </Link>
          </div>
        </div>
      </div>

      {modalOpen && <BookingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />}
    </section>
  );
}

/* ----------------------------------- FOOTER --------------------------------- */

const FOOTER_COLS = [
  {
    title: "Studio",
    links: [
      { label: "About", href: "/agency" },
      { label: "Careers", href: "/careers" },
      { label: "Journal", href: "/journal" },
      { label: "Press", href: "/press" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Growth strategy", href: "/services" },
      { label: "Performance media", href: "/services" },
      { label: "SEO & content", href: "/services" },
      { label: "Lifecycle", href: "/services" },
    ],
  },
  {
    title: "Work",
    links: [
      { label: "Narrativ", href: "/projects" },
      { label: "Luminar", href: "/projects" },
      { label: "Northbeam", href: "/projects" },
      { label: "All case studies", href: "/projects" },
    ],
  },
];

export function SiteFooter({
  onStartProject,
}: {
  onStartProject?: () => void;
}) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleStart = () => {
    if (onStartProject) onStartProject();
    else setModalOpen(true);
  };

  const handleSocial = (network: string) => {
    toast.info(`Opening official Axionis Growth Agency ${network} channel`);
  };

  return (
    <footer className="bg-[#0E1015] pt-16 sm:pt-20 pb-10">
      <div className={`${SHELL} ${PAD}`}>
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 lg:gap-8">
          <div>
            <Link to="/" className="inline-block hover:opacity-90 transition-opacity">
              <AxionisLogo variant="dark" size="md" showTagline={true} />
            </Link>
            <p className="mt-6 max-w-[320px] text-[14px] leading-relaxed text-white/60">
              A growth partner for brands ready to dominate their category — strategy, creative and
              media in one senior team.
            </p>
            <div className="mt-8">
              <button
                onClick={handleStart}
                className={`group inline-flex items-center gap-3 bg-[#F26522] hover:bg-[#e05a1a] text-white text-[13px] sm:text-[14px] rounded-full pl-5 sm:pl-6 pr-2 py-2 shadow-[0_12px_28px_-6px_rgba(242,101,34,0.45),inset_0_1px_1px_rgba(255,255,255,0.4)] hover:-translate-y-0.5 transition-all duration-500 ${EASE}`}
              >
                <RollText label="Start a project" />
                <span
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white flex items-center justify-center transition-transform duration-500 ${EASE} group-hover:-rotate-45 shadow-sm`}
                >
                  <ArrowRight size={14} className="text-[#F26522]" />
                </span>
              </button>
            </div>
          </div>

          {FOOTER_COLS.map((c) => (
            <div key={c.title}>
              <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-white/40">
                {c.title}
              </p>
              <ul className="mt-5 space-y-3">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.href}
                      className="text-[14px] text-white/70 transition-colors duration-300 hover:text-[#F26522]"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/10 pt-6">
          <p className="text-[13px] text-white/45">
            © {new Date().getFullYear()} Axionis Growth Agency. Bengaluru & Mumbai, India.
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/privacy"
              className="text-[13px] text-white/45 transition-colors duration-300 hover:text-white"
            >
              Privacy
            </Link>
            <Link
              to="/terms"
              className="text-[13px] text-white/45 transition-colors duration-300 hover:text-white"
            >
              Terms
            </Link>
            <button
              onClick={() => handleSocial("LinkedIn")}
              className="text-[13px] text-white/45 transition-colors duration-300 hover:text-[#F26522]"
            >
              LinkedIn
            </button>
            <button
              onClick={() => handleSocial("Instagram")}
              className="text-[13px] text-white/45 transition-colors duration-300 hover:text-[#F26522]"
            >
              Instagram
            </button>
          </div>
        </div>
      </div>

      {modalOpen && <BookingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />}
    </footer>
  );
}
