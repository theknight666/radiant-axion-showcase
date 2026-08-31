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
import { RoiCalculator } from "@/components/site/RoiCalculator";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Full-Stack Capabilities & ROI Architecture — Axionis Growth Agency" },
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
    headline:
      "Aligning your product offer, pricing power, and distribution around one revenue metric.",
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
    headline:
      "High-speed WebGL showcases and frictionless landing page engines that maximize pipeline.",
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
      <section className="bg-white py-14 sm:py-24 px-5 sm:px-8 lg:px-12">
        <div className="max-w-[1440px] mx-auto space-y-8 sm:space-y-16">
          {CAPABILITIES.map((cap) => (
            <div
              key={cap.title}
              className="grid grid-cols-1 lg:grid-cols-[1.2fr_1.8fr] gap-6 lg:gap-12 p-6 sm:p-12 rounded-[34px] sm:rounded-[40px] bg-[#FAFAFC] border border-black/[0.04] shadow-[0_20px_45px_-15px_rgba(15,18,25,0.06),inset_0_1px_1.5px_rgba(255,255,255,1)] hover:shadow-[0_32px_75px_-15px_rgba(15,18,25,0.12)] hover:-translate-y-1 transition-all duration-500"
            >
              <div>
                <div className="flex items-center gap-3 mb-4 sm:mb-5">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0E1015] text-white shadow-md">
                    <cap.icon size={20} />
                  </span>
                  <span className="text-[12px] font-bold uppercase tracking-wider text-[#F26522] bg-[#F26522]/10 px-3.5 py-1 rounded-full">
                    {cap.badge}
                  </span>
                </div>
                <h2 className="text-[22px] sm:text-[28px] font-bold text-gray-900 tracking-tight">
                  {cap.title}
                </h2>
                <p className="mt-2.5 sm:mt-3 text-[15px] sm:text-[16px] font-semibold text-gray-800 leading-snug">
                  {cap.headline}
                </p>
                <p className="mt-3 sm:mt-4 text-[13.5px] sm:text-[14.5px] text-gray-600 leading-relaxed font-normal">
                  {cap.description}
                </p>
                <div className="mt-6 sm:mt-7">
                  <button
                    onClick={() => setIsBookingOpen(true)}
                    className="inline-flex items-center gap-2 text-[13.5px] font-bold text-[#F26522] hover:text-[#e05a1a] transition-colors"
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                    {cap.deliverables.map((d) => (
                      <div
                        key={d}
                        className="flex items-start gap-2.5 text-[13px] text-gray-700 bg-white p-3.5 rounded-full border border-black/[0.04] shadow-sm"
                      >
                        <Check size={14} className="text-[#F26522] mt-0.5 shrink-0" />
                        <span className="font-semibold">{d}</span>
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
                        className="text-[12px] font-semibold text-gray-700 bg-white px-3.5 py-1 rounded-full border border-black/[0.05] shadow-sm"
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
      <section className="py-14 sm:py-24 px-5 sm:px-8 lg:px-12 max-w-[1440px] mx-auto">
        <RoiCalculator onBookCall={() => setIsBookingOpen(true)} />
      </section>

      {/* Pricing Section */}
      <PricingSection onSelectPlan={() => setIsBookingOpen(true)} />

      {/* Booking Modal */}
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />

      <CtaSection onBookCall={() => setIsBookingOpen(true)} />
      <SiteFooter onStartProject={() => setIsBookingOpen(true)} />
    </main>
  );
}
