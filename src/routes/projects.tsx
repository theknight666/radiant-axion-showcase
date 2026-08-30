import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter, CtaSection } from "@/components/site/sections";
import { BadgeRow, OrangeButton, RollText } from "@/components/site/ui-bits";
import { CaseStudyModal, CaseStudyData } from "@/components/site/CaseStudyModal";
import { BookingModal } from "@/components/site/BookingModal";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Client Work & Case Studies — Axionis Growth Agency" },
      {
        name: "description",
        content:
          "Explore how Axionis engineers category-defining growth engines, interactive digital experiences, and compounding revenue for leaders worldwide.",
      },
    ],
  }),
  component: ProjectsPage,
});

const CATEGORIES = ["All", "Interactive Web", "Performance Media", "Conversion Architecture", "Brand & Motion"];

const PROJECTS_DATA: CaseStudyData[] = [
  {
    id: "narrativ",
    title: "Narrativ — Site of the Month 2025",
    category: "Interactive Web",
    tagline: "High-conversion WebGL experience lifting enterprise contract velocity by 3.4x",
    summary:
      "A cinematic 3D showcase designed to demonstrate real-time AI capabilities, driving record time-on-site and inbound pipeline.",
    videoUrl:
      "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260516_122702_390f5305-8719-41d5-ae80-d23ab3796c28.mp4",
    metrics: [
      { label: "Pipeline Velocity", value: "+340%", change: "Q1-Q3" },
      { label: "Session Duration", value: "4m 18s", change: "+180%" },
      { label: "Blended CAC", value: "-42%", change: "Sustained" },
    ],
    challenge:
      "Narrativ possessed bleeding-edge generative AI tech but suffered from high bounce rates and legacy enterprise positioning that failed to communicate differentiated speed.",
    solution:
      "We engineered an ultra-fast WebGL interactive story that allows enterprise buyers to test inference pipelines live in their browser before requesting a pilot.",
    outcomes: [
      "Secured Awwwards Site of the Month 2025",
      "Closed 14 Fortune 500 pilots in 90 days",
      "Cut demo-to-close sales cycle from 74 days to 28 days",
      "Zero drop in mobile Core Web Vitals despite rich shaders",
    ],
    testimonial: {
      quote:
        "Axionis delivered the highest ROI web investment we have ever made. It fundamentally altered how enterprise buyers perceive our product maturity.",
      author: "Elena Varga",
      role: "VP Marketing, Narrativ",
    },
  },
  {
    id: "luminar",
    title: "Luminar — Conversion System",
    category: "Conversion Architecture",
    tagline: "Redefining DTC e-commerce architecture from discovery to checkout",
    summary:
      "Transforming a legacy multi-step checkout into a frictionless headless commerce flow generating record conversion rates.",
    videoUrl:
      "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260516_123323_f909c2b8-ff6c-4edf-882b-8ebcdbe389b5.mp4",
    metrics: [
      { label: "Checkout Conversion", value: "6.8%", change: "+3.2%" },
      { label: "Average Order Value", value: "₹14,200", change: "+24%" },
      { label: "Annual Net ARR", value: "+₹38Cr", change: "12 Mos" },
    ],
    challenge:
      "Cart abandonment was hovering near 76% due to convoluted variants, slow mobile load times, and fragmented upsell logic.",
    solution:
      "Deployed a modular headless frontend with predictive variant preloading and dynamic one-click bundle builders based on user intent.",
    outcomes: [
      "Reduced checkout abandonment by 38%",
      "Sub-second load times across 40+ countries",
      "Automated cross-sell uplift on 34% of transactions",
    ],
    testimonial: {
      quote:
        "The level of technical rigor and commercial discipline Axionis brought to our checkout funnel was extraordinary.",
      author: "Marcus Reid",
      role: "Founder & CEO, Luminar",
    },
  },
  {
    id: "northbeam",
    title: "Northbeam Health — Acquisition Engine",
    category: "Performance Media",
    tagline: "Warehouse-native attribution & full-funnel media scaling",
    summary:
      "Taking a clinical wellness brand from ₹1.2Cr/mo to ₹8.5Cr/mo with positive first-order contribution margin.",
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    metrics: [
      { label: "Monthly Revenue", value: "₹8.5Cr", change: "+600%" },
      { label: "ROAS (Blended)", value: "3.85x", change: "+44%" },
      { label: "Payback Period", value: "32 Days", change: "-60%" },
    ],
    challenge:
      "Suffering from post-iOS signal loss, rising Meta CPMs, and attribution discrepancies between Google Ads and Shopify.",
    solution:
      "Rebuilt tracking infrastructure using server-side Conversions API (CAPI) and deployed a rigorous 14-day creative testing matrix.",
    outcomes: [
      "Scaled ad spend 5x while maintaining 3.8x+ ROAS",
      "Produced 80+ high-performing UGC & static creative iterations monthly",
      "Established incrementality testing frameworks to eliminate ad waste",
    ],
    testimonial: {
      quote:
        "They treated our capital like their own. No vanity dashboards, just ruthless focus on cash flow and contribution margin.",
      author: "Dr. Alistair Vance",
      role: "Founder, Northbeam Health",
    },
  },
  {
    id: "apex-motion",
    title: "Apex Labs — 3D Brand & Motion System",
    category: "Brand & Motion",
    tagline: "Dynamic motion identity and digital product showcase",
    summary:
      "Crafting an unforgettable brand universe for a next-generation robotics computing platform.",
    imageUrl:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    metrics: [
      { label: "Waitlist Signups", value: "140K+", change: "30 Days" },
      { label: "Social Reach", value: "4.2M", change: "Organic" },
      { label: "Series A Raised", value: "$28M", change: "Over-sub" },
    ],
    challenge:
      "Standing out in an overcrowded AI and robotics market without relying on generic stock imagery or boring technical whitepapers.",
    solution:
      "Created a bespoke generative 3D visual language, procedural motion loops, and an interactive hardware configurator.",
    outcomes: [
      "Featured across TechCrunch, FastCompany, and Brand New",
      "Achieved 140,000 developer waitlist signups in 4 weeks",
      "Built complete vector design tokens and component libraries",
    ],
  },
];

function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeStudy, setActiveStudy] = useState<CaseStudyData | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const filteredProjects =
    selectedCategory === "All"
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category === selectedCategory);

  return (
    <main className="min-h-screen bg-[#EFEFEF] text-gray-900 selection:bg-[#F26522] selection:text-white">
      <SiteHeader onBookCall={() => setIsBookingOpen(true)} />

      {/* Header */}
      <section className="pt-12 sm:pt-16 pb-12 sm:pb-16 px-5 sm:px-8 lg:px-12 max-w-[1440px] mx-auto">
        <BadgeRow number="1" label="Portfolio & Proof" borderClass="border-gray-300" />
        <div className="max-w-4xl">
          <h1 className="text-[clamp(2.2rem,6vw,4.5rem)] font-medium leading-[1.05] tracking-[-0.03em] text-gray-900">
            Engineered for impact.
            <br className="hidden sm:block" /> Proven in
            <span className="text-[#F26522]"> compounding revenue.</span>
          </h1>
          <p className="mt-4 text-[16px] sm:text-[18px] text-gray-600 leading-relaxed font-normal">
            Every case study below represents a partnership where we took complete ownership of
            growth architecture, creative velocity, and full-funnel unit economics.
          </p>
        </div>

        {/* Filter Pills — Swipeable on mobile, flex-wrap on desktop */}
        <div className="mt-8 sm:mt-10 flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-2 sm:pb-0 -mx-5 px-5 sm:mx-0 sm:px-0 sm:flex-wrap scrollbar-none">
          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 rounded-full px-4 sm:px-5 py-2 text-[12.5px] sm:text-[13px] font-semibold transition-all duration-300 ${
                  active
                    ? "bg-gray-900 text-white shadow-[0_8px_20px_-4px_rgba(15,18,25,0.4),inset_0_1px_1px_rgba(255,255,255,0.3)]"
                    : "bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white border border-gray-200 shadow-sm"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="px-5 sm:px-8 lg:px-12 pb-20 sm:pb-28 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 sm:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setActiveStudy(project)}
              className="group cursor-pointer rounded-[38px] bg-white p-4 shadow-[0_20px_45px_-12px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,1)] hover:shadow-[0_30px_65px_-15px_rgba(0,0,0,0.15)] hover:-translate-y-1.5 transition-all duration-500 border border-black/[0.04] flex flex-col justify-between"
            >
              {/* Media card */}
              <div className="relative aspect-[16/10] rounded-[30px] overflow-hidden bg-gray-950 shadow-inner">
                {project.videoUrl ? (
                  <video
                    src={project.videoUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                )}
                <div className="absolute top-4 left-4">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-white bg-black/60 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/10">
                    {project.category}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 h-10 w-10 group-hover:w-[160px] bg-white rounded-full flex items-center overflow-hidden shadow-lg transition-all duration-300 ease-in-out">
                  <span className="h-10 w-10 shrink-0 flex items-center justify-center">
                    <ArrowRight
                      size={15}
                      className="text-gray-900 -rotate-45 group-hover:rotate-0 transition-transform duration-300"
                    />
                  </span>
                  <span className="text-[13px] font-semibold text-gray-900 whitespace-nowrap pr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Read Case Study
                  </span>
                </div>
              </div>

              {/* Text Info */}
              <div className="p-4 sm:p-5">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-[19px] sm:text-[21px] font-bold text-gray-900 group-hover:text-[#F26522] transition-colors tracking-tight">
                    {project.title}
                  </h3>
                </div>
                <p className="mt-2 text-[14px] text-gray-600 leading-relaxed font-normal">
                  {project.summary}
                </p>

                {/* Primary Metric Pill */}
                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[12.5px] text-gray-500 font-medium">Primary Outcome</span>
                  <span className="flex items-center gap-1 text-[13px] font-bold text-[#F26522] bg-[#F26522]/10 px-3 py-1 rounded-full">
                    <TrendingUp size={13} />
                    {project.metrics[0].label}: {project.metrics[0].value}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Case Study Detail Modal */}
      <CaseStudyModal
        study={activeStudy}
        isOpen={Boolean(activeStudy)}
        onClose={() => setActiveStudy(null)}
        onBookCall={() => {
          setActiveStudy(null);
          setIsBookingOpen(true);
        }}
      />

      {/* Booking Modal */}
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />

      <CtaSection onBookCall={() => setIsBookingOpen(true)} />
      <SiteFooter onStartProject={() => setIsBookingOpen(true)} />
    </main>
  );
}
