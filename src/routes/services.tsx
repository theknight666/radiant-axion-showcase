import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Check,
  Compass,
  Layers,
  Rocket,
  Search,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter, CtaSection, PricingSection } from "@/components/site/sections";
import { BadgeRow, OrangeButton, RollText } from "@/components/site/ui-bits";
import { BookingModal } from "@/components/site/BookingModal";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Full-Stack Capabilities & ROI Calculator — Axionis Growth Agency" },
      {
        name: "description",
        content:
          "Explore Axionis core capabilities across growth strategy, performance media buying, conversion rate optimization, SEO authority systems, and data attribution.",
      },
    ],
  }),
  component: ServicesPage,
});

const CAPABILITIES = [
  {
    icon: Compass,
    badge: "Strategy",
    title: "Growth Strategy & Commercial Positioning",
    headline: "Aligning your product offer, pricing power, and distribution around one revenue metric.",
    description:
      "We tear down your unit economics, customer lifetime value models, and competitive positioning to engineer an aggressive 12-month growth roadmap with deterministic milestones.",
    deliverables: [
      "Market & competitor unit economics teardown",
      "ICP qualitative customer research & interview synthesis",
      "Channel mix & contribution margin forecasting",
      "Offer & pricing restructuring playbook",
    ],
    tech: ["Excel / Causal", "Notion", "Miro", "Gong"],
  },
  {
    icon: Target,
    badge: "Media Buying",
    title: "Performance Paid Media Scaling",
    headline: "Systematic creative testing velocity and incrementality-driven ad spend allocation.",
    description:
      "We scale accounts past ₹1Cr+/month across Meta, Google Search/YouTube, TikTok, and programmatic networks by focusing on high-converting creative engines rather than automated hacks.",
    deliverables: [
      "Full-funnel creative testing sprint cadence",
      "Server-side Conversions API (CAPI) architecture",
      "Incrementality & geo-lift testing protocols",
      "High-converting static, UGC & motion ad creative",
    ],
    tech: ["Meta Ads", "Google Ads", "TikTok", "Triple Whale", "Northbeam"],
  },
  {
    icon: Layers,
    badge: "Conversion",
    title: "Conversion Architecture & CRO",
    headline: "High-speed WebGL showcases and frictionless landing page engines that maximize pipeline.",
    description:
      "We build conversion-focused web systems, headless e-commerce flows, and interactive product calculators that lower blended CAC and lift lead-to-opportunity ratios.",
    deliverables: [
      "Continuous multivariate landing page testing",
      "Interactive 3D WebGL / Canvas product showcases",
      "Headless checkout optimization & bundle engines",
      "Speed optimization & sub-second Core Web Vitals",
    ],
    tech: ["React / Next.js", "Tailwind CSS", "Figma", "VWO", "PostHog"],
  },
  {
    icon: Search,
    badge: "Organic",
    title: "SEO & Topical Authority Systems",
    headline: "Transforming organic search into a high-intent enterprise pipeline driver.",
    description:
      "We engineer automated content infrastructure and programmatic SEO pages that dominate high-intent commercial queries and build lasting organic moat.",
    deliverables: [
      "Technical architecture & Core Web Vitals audit",
      "High-intent semantic keyword cluster mapping",
      "Programmatic template generation & dynamic content",
      "Digital PR & Tier-1 publication link acquisition",
    ],
    tech: ["Ahrefs", "Semrush", "Screaming Frog", "Sanity CMS"],
  },
  {
    icon: Zap,
    badge: "Retention",
    title: "Lifecycle, CRM & Automation",
    headline: "Lifting customer lifetime value and reducing churn quarter over quarter.",
    description:
      "Automated retention workflows, predictive churn mitigation, and bespoke VIP communication engines across Email, SMS, and WhatsApp.",
    deliverables: [
      "Multi-branch behavioural automation flows",
      "RFM customer tiering & VIP triggers",
      "SMS & WhatsApp conversational commerce",
      "Churn propensity forecasting",
    ],
    tech: ["Klaviyo", "Attentive", "Braze", "HubSpot"],
  },
  {
    icon: BarChart3,
    badge: "Intelligence",
    title: "Data & Attribution Infrastructure",
    headline: "Clean tracking, warehouse-native models, and the truth about your spend.",
    description:
      "We deploy server-side event streaming, data warehouse pipelines, and Media Mix Modelling (MMM) to prove incrementality with statistical precision.",
    deliverables: [
      "Server-side Conversions API (CAPI)",
      "Snowflake / BigQuery data warehouse pipelines",
      "Marketing Mix Modelling (MMM) & Shapley attribution",
      "Executive real-time revenue dashboards",
    ],
    tech: ["Snowflake", "dbt", "Segment", "PostHog", "Metabase"],
  },
];

function ServicesPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // ROI Calculator State (INR based)
  const [monthlyRevenue, setMonthlyRevenue] = useState(5000000);
  const [conversionRate, setConversionRate] = useState(2.2);
  const [monthlyAdSpend, setMonthlyAdSpend] = useState(1200000);

  // Calculated Projections
  const projectedRevUplift = Math.round(monthlyRevenue * 0.42 * 12);
  const estimatedCacDrop = Math.round(monthlyAdSpend * 0.28);
  const projectedRoiMultiplier = (
    (monthlyRevenue * 1.42 * 12) /
    (monthlyRevenue * 12 + monthlyAdSpend * 12)
  ).toFixed(1);

  return (
    <main className="min-h-screen bg-[#EFEFEF] text-gray-900 selection:bg-[#F26522] selection:text-white">
      <SiteHeader onBookCall={() => setIsBookingOpen(true)} />

      {/* Hero */}
      <section className="pt-12 sm:pt-16 pb-14 sm:pb-20 px-5 sm:px-8 lg:px-12 max-w-[1440px] mx-auto">
        <BadgeRow number="1" label="Full-Stack Capabilities" borderClass="border-gray-300" />
        <div className="max-w-4xl">
          <h1 className="text-[clamp(2.2rem,6vw,4.5rem)] font-medium leading-[1.05] tracking-[-0.03em] text-gray-900">
            A cohesive squad for every
            <br className="hidden sm:block" />
            <span className="text-[#F26522]"> stage of the growth engine.</span>
          </h1>
          <p className="mt-6 text-[17px] sm:text-[20px] text-gray-700 leading-relaxed font-normal">
            No fractured communication between separate agencies. We integrate strategy, media,
            design, and engineering under one unified team.
          </p>
        </div>
      </section>

      {/* Services Breakdown Grid */}
      <section className="bg-white py-16 sm:py-24 px-5 sm:px-8 lg:px-12">
        <div className="max-w-[1440px] mx-auto space-y-12 sm:space-y-16">
          {CAPABILITIES.map((cap) => (
            <div
              key={cap.title}
              className="grid grid-cols-1 lg:grid-cols-[1.2fr_1.8fr] gap-8 lg:gap-12 p-8 sm:p-12 rounded-[38px] bg-[#FAFAFA] border border-gray-200/90 shadow-[0_18px_40px_-15px_rgba(15,18,25,0.06),inset_0_1px_1px_rgba(255,255,255,1)] hover:shadow-[0_28px_65px_-15px_rgba(15,18,25,0.12)] hover:-translate-y-1 transition-all duration-500"
            >
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 text-white shadow-md">
                    <cap.icon size={20} />
                  </span>
                  <span className="text-[12px] font-bold uppercase tracking-wider text-[#F26522] bg-[#F26522]/10 px-3.5 py-1 rounded-full">
                    {cap.badge}
                  </span>
                </div>
                <h2 className="text-[24px] sm:text-[28px] font-bold text-gray-900 tracking-tight">
                  {cap.title}
                </h2>
                <p className="mt-3 text-[16px] font-semibold text-gray-800 leading-snug">
                  {cap.headline}
                </p>
                <p className="mt-4 text-[14px] text-gray-600 leading-relaxed font-normal">{cap.description}</p>
                <div className="mt-7">
                  <button
                    onClick={() => setIsBookingOpen(true)}
                    className="inline-flex items-center gap-2 text-[13px] font-bold text-[#F26522] hover:text-[#e05a1a] transition-colors"
                  >
                    <span>Request specific capability brief</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>

              <div className="flex flex-col justify-between space-y-6 pt-4 lg:pt-0 lg:border-l lg:border-gray-200/80 lg:pl-10">
                <div>
                  <h4 className="text-[12px] font-bold uppercase tracking-wider text-gray-400 mb-3.5">
                    Core Deliverables & Outputs
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {cap.deliverables.map((d) => (
                      <div
                        key={d}
                        className="flex items-start gap-2.5 text-[13px] text-gray-700 bg-white p-3.5 rounded-full border border-gray-200/80 shadow-sm"
                      >
                        <Check size={14} className="text-[#F26522] mt-0.5 shrink-0" />
                        <span className="font-medium">{d}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-[12px] font-bold uppercase tracking-wider text-gray-400 mb-2.5">
                    Supported Technologies & Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {cap.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[12px] font-semibold text-gray-700 bg-white px-3.5 py-1 rounded-full border border-gray-200 shadow-sm"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Growth ROI Calculator */}
      <section className="py-16 sm:py-24 px-5 sm:px-8 lg:px-12 max-w-[1440px] mx-auto">
        <BadgeRow number="2" label="Interactive Forecasting" borderClass="border-gray-300" />
        <div className="mb-10">
          <h2 className="text-[clamp(1.8rem,4.5vw,3.2rem)] font-medium leading-[1.1] tracking-[-0.02em] text-gray-900">
            Estimate your compounding
            <br />
            <span className="text-[#F26522]"> 12-month revenue uplift.</span>
          </h2>
          <p className="mt-3 text-[15px] sm:text-[16px] text-gray-600 max-w-xl">
            Adjust your current baseline numbers below to view projected pipeline acceleration
            modeled from our historical client cohort data.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-8 p-8 sm:p-12 rounded-[38px] bg-[#0E1015] text-white shadow-[0_35px_90px_-25px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.2)] border border-white/10 relative overflow-hidden">
          <div className="pointer-events-none absolute -top-32 -right-32 h-80 w-80 rounded-full bg-[#F26522]/20 blur-[100px]" />

          {/* Sliders */}
          <div className="space-y-8 relative z-10">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-[14px] font-medium text-white/90">
                  Current Monthly Revenue
                </label>
                <span className="text-[18px] font-bold text-[#F26522]">
                  ₹{(monthlyRevenue / 100000).toFixed(1)} Lakhs / mo
                </span>
              </div>
              <input
                type="range"
                min="1000000"
                max="50000000"
                step="500000"
                value={monthlyRevenue}
                onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                className="w-full h-2.5 bg-white/20 rounded-full appearance-none cursor-pointer accent-[#F26522]"
              />
              <div className="flex justify-between text-[11px] text-white/40 mt-1.5 font-medium">
                <span>₹10 Lakhs / mo</span>
                <span>₹5 Crores / mo</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-[14px] font-medium text-white/90">
                  Current Web Conversion Rate
                </label>
                <span className="text-[18px] font-bold text-[#F26522]">{conversionRate}%</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="5.0"
                step="0.1"
                value={conversionRate}
                onChange={(e) => setConversionRate(Number(e.target.value))}
                className="w-full h-2.5 bg-white/20 rounded-full appearance-none cursor-pointer accent-[#F26522]"
              />
              <div className="flex justify-between text-[11px] text-white/40 mt-1.5 font-medium">
                <span>0.5%</span>
                <span>5.0%</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-[14px] font-medium text-white/90">
                  Monthly Paid Media Budget
                </label>
                <span className="text-[18px] font-bold text-[#F26522]">
                  ₹{(monthlyAdSpend / 100000).toFixed(1)} Lakhs / mo
                </span>
              </div>
              <input
                type="range"
                min="200000"
                max="10000000"
                step="200000"
                value={monthlyAdSpend}
                onChange={(e) => setMonthlyAdSpend(Number(e.target.value))}
                className="w-full h-2.5 bg-white/20 rounded-full appearance-none cursor-pointer accent-[#F26522]"
              />
              <div className="flex justify-between text-[11px] text-white/40 mt-1.5 font-medium">
                <span>₹2 Lakhs / mo</span>
                <span>₹1 Crore / mo</span>
              </div>
            </div>
          </div>

          {/* Results Box */}
          <div className="flex flex-col justify-between p-7 sm:p-9 rounded-[32px] bg-white/5 border border-white/10 relative z-10 shadow-[0_20px_45px_-12px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)]">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#F26522]">
                Projected 12-Month Trajectory
              </span>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-[12px] text-white/60">Estimated Additional ARR</p>
                  <p className="text-[32px] sm:text-[38px] font-bold text-white tracking-tight">
                    +₹{(projectedRevUplift / 10000000).toFixed(2)} Crores
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10">
                  <div>
                    <p className="text-[11px] text-white/50">Monthly Ad Efficiency Gain</p>
                    <p className="text-[18px] font-bold text-white">
                      ₹{(estimatedCacDrop / 100000).toFixed(1)}L / mo
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] text-white/50">Projected Return Index</p>
                    <p className="text-[18px] font-bold text-[#F26522]">
                      {projectedRoiMultiplier}x Growth
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-white/10">
              <button
                onClick={() => setIsBookingOpen(true)}
                className="w-full group inline-flex items-center justify-center gap-3 bg-[#F26522] hover:bg-[#e05a1a] text-white text-[13px] font-semibold rounded-full py-3 shadow-[0_10px_25px_rgba(242,101,34,0.4)] transition-all"
              >
                <RollText label="Unlock Full Growth Diagnostic" />
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section reuse */}
      <PricingSection />

      {/* Booking Modal */}
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />

      <CtaSection onBookCall={() => setIsBookingOpen(true)} />
      <SiteFooter onStartProject={() => setIsBookingOpen(true)} />
    </main>
  );
}
