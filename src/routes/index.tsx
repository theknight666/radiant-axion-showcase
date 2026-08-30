import { createFileRoute, Link } from "@tanstack/react-router";
import { ClientOnly } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState } from "react";
import { ArrowRight, Clock, Menu, Sparkles, X } from "lucide-react";
import { toast } from "sonner";
import {
  CtaSection,
  FaqSection,
  MetricsSection,
  PricingSection,
  ProcessSection,
  ServicesSection,
  SiteFooter,
  TestimonialsSection,
} from "@/components/site/sections";
import { AxionisLogo, AxionisLogoIcon } from "@/components/site/AxionisLogo";
import { AxionisPreloader } from "@/components/site/AxionisPreloader";
import { SiteHeader } from "@/components/site/SiteHeader";
import { BookingModal } from "@/components/site/BookingModal";
import { CaseStudyModal, type CaseStudyData } from "@/components/site/CaseStudyModal";
import { RollText } from "@/components/site/ui-bits";

const ShaderStack = lazy(() => import("@/components/ShaderStack"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Axionis Growth Agency — Quantum Strategy & Revenue Scaling" },
      {
        name: "description",
        content:
          "Axionis Growth Agency engineers high-velocity digital experiences and growth systems for category-leading brands.",
      },
      { property: "og:title", content: "Axionis Growth Agency — Quantum Strategy & Revenue Scaling" },
      {
        property: "og:description",
        content:
          "We engineer growth systems and digital experiences for brands ready to dominate online.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const EASE = "ease-[cubic-bezier(0.25,0.1,0.25,1)]";

function PartnerIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className={className}>
      <path d="m19.6 66.5 19.7-11 .3-1-.3-.5h-1l-3.3-.2-11.2-.3L14 53l-9.5-.5-2.4-.5L0 49l.2-1.5 2-1.3 2.9.2 6.3.5 9.5.6 6.9.4L38 49.1h1.6l.2-.7-.5-.4-.4-.4L29 41l-10.6-7-5.6-4.1-3-2-1.5-2-.6-4.2 2.7-3 3.7.3.9.2 3.7 2.9 8 6.1L37 36l1.5 1.2.6-.4.1-.3-.7-1.1L33 25l-6-10.4-2.7-4.3-.7-2.6c-.3-1-.4-2-.4-3l3-4.2L28 0l4.2.6L33.8 2l2.6 6 4.1 9.3L47 29.9l2 3.8 1 3.4.3 1h.7v-.5l.5-7.2 1-8.7 1-11.2.3-3.2 1.6-3.8 3-2L61 2.6l2 2.9-.3 1.8-1.1 7.7L59 27.1l-1.5 8.2h.9l1-1.1 4.1-5.4 6.9-8.6 3-3.5L77 13l2.3-1.8h4.3l3.1 4.7-1.4 4.9-4.4 5.6-3.7 4.7-5.3 7.1-3.2 5.7.3.4h.7l12-2.6 6.4-1.1 7.6-1.3 3.5 1.6.4 1.6-1.4 3.4-8.2 2-9.6 2-14.3 3.3-.2.1.2.3 6.4.6 2.8.2h6.8l12.6 1 3.3 2 1.9 2.7-.3 2-5.1 2.6-6.8-1.6-16-3.8-5.4-1.3h-.8v.4l4.6 4.5 8.3 7.5L89 80.1l.5 2.4-1.3 2-1.4-.2-9.2-7-3.6-3-8-6.8h-.5v.7l1.8 2.7 9.8 14.7.5 4.5-.7 1.4-2.6 1-2.7-.6-5.8-8-6-9-4.7-8.2-.5.4-2.9 30.2-1.3 1.5-3 1.2-2.5-2-1.4-3 1.4-6.2 1.6-8 1.3-6.4 1.2-7.9.7-2.6v-.2H49L43 72l-9 12.3-7.2 7.6-1.7.7-3-1.5.3-2.8L24 86l10-12.8 6-7.9 4-4.6-.1-.5h-.3L17.2 77.4l-4.7.6-2-2 .2-3 1-1 8-5.5Z" />
    </svg>
  );
}

function BadgeRow({
  number,
  label,
  borderClass,
}: {
  number: string;
  label: string;
  borderClass: string;
}) {
  return (
    <div className="px-5 sm:px-8 lg:px-12 flex items-center gap-3 mb-6 sm:mb-8">
      <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-900 text-white text-[11px] sm:text-[12px] font-semibold flex items-center justify-center">
        {number}
      </span>
      <span
        className={`text-[12px] sm:text-[13px] font-medium border ${borderClass} rounded-full px-3 sm:px-4 py-1 sm:py-1.5`}
      >
        {label}
      </span>
    </div>
  );
}

const SMALL_IMG =
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260516_090123_74be96d4-9c1b-40cf-932a-96f4f4babed3.png&w=1280&q=85";
const LARGE_IMG =
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260516_090133_c157d30b-a99a-4477-bec1-a446149ec3f2.png&w=1280&q=85";

const HOME_PROJECTS: Record<string, CaseStudyData> = {
  narrativ: {
    id: "narrativ",
    title: "Narrativ",
    category: "SaaS & Tech",
    tagline: "Winner of Site of the Month 2025 - an interactive 3D showcase driving record pipeline.",
    summary:
      "Narrativ needed a digital experience that matched their category-defining technology. We redesigned their core web system and rebuilt their outbound acquisition funnel.",
    videoUrl:
      "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260516_122702_390f5305-8719-41d5-ae80-d23ab3796c28.mp4",
    metrics: [
      { label: "Pipeline Surge", value: "+340%", change: "+3.4x" },
      { label: "Annual Contract Value", value: "$84k", change: "+42%" },
      { label: "Bounce Rate", value: "24.1%", change: "-31%" },
    ],
    challenge:
      "Narrativ was losing enterprise prospects to inferior competitors because their platform narrative was buried under technical jargon and static pages.",
    solution:
      "We engineered an interactive WebGL narrative that lets prospects experience the product's speed in real-time, paired with a high-intent pricing calculator.",
    outcomes: [
      "Awarded Site of the Month 2025",
      "Enterprise demo conversions jumped 3.4x in 60 days",
      "Shortened enterprise sales cycle from 90 to 38 days",
      "Warehouse-level attribution model deployed",
    ],
    testimonial: {
      quote:
        "They killed half our spend and doubled pipeline. That takes conviction and a very clear read of the data.",
      author: "Priya Nair",
      role: "VP Growth, Narrativ",
    },
  },
  luminar: {
    id: "luminar",
    title: "Luminar",
    category: "E-Commerce",
    tagline: "Transforming a dated platform into a high-converting luxury brand engine.",
    summary:
      "Complete brand re-architecture, conversion redesign, and multi-channel performance media sprint for a high-growth brand.",
    videoUrl:
      "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260516_123323_f909c2b8-ff6c-4edf-882b-8ebcdbe389b5.mp4",
    metrics: [
      { label: "Incremental Revenue", value: "$14.2M", change: "+180%" },
      { label: "Blended CAC", value: "£42", change: "-38%" },
      { label: "Repeat Purchase Rate", value: "39%", change: "+2.1x" },
    ],
    challenge:
      "Rising paid media costs on Meta and Google were eroding margins, and mobile checkout conversion was below 1.4%.",
    solution:
      "We built a bespoke Next.js storefront, overhauled their creative testing system with 40 weekly ad variations, and created high-converting post-purchase flows.",
    outcomes: [
      "Mobile conversion rate increased from 1.38% to 3.22%",
      "Scaled ad spend from £80k/mo to £350k/mo profitably",
      "Klaviyo lifecycle revenue expanded to 34% of total turnover",
    ],
    testimonial: {
      quote:
        "The most senior team we've worked with. No junior hand-offs, no dashboards full of noise — just compounding revenue.",
      author: "Marcus Reid",
      role: "Founder, Luminar",
    },
  },
};

function Index() {
  const [loading, setLoading] = useState(true);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudyData | null>(null);

  const handlePartnerBadgeClick = () => {
    toast.info("Axionis is a Tier-1 Certified Growth Partner across Meta, Google & Snowflake.", {
      description: "Audited every 6 months for data accuracy and media efficiency standards.",
    });
  };

  return (
    <main className="relative selection:bg-[#F26522] selection:text-white">
      {/* PRELOADER */}
      {loading && <AxionisPreloader onComplete={() => setLoading(false)} />}

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col bg-[#EFEFEF] overflow-hidden">
        <div className="absolute inset-0 z-10 pointer-events-none">
          <ClientOnly fallback={null}>
            <Suspense fallback={null}>
              <ShaderStack />
            </Suspense>
          </ClientOnly>
        </div>

        {/* Unified Navbar */}
        <SiteHeader onBookCall={() => setIsBookingOpen(true)} />

        {/* HERO CONTENT */}
        <div className="flex-1" />
        <div className="relative z-20 w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pb-14 sm:pb-16 lg:pb-20">
          <p className="text-[13px] sm:text-[14px] text-[#F26522] font-semibold tracking-wider uppercase mb-5 sm:mb-8 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#F26522]" />
            Axionis Growth Agency
          </p>
          <h1
            className="font-medium leading-[1.08] tracking-[-0.03em] text-gray-900 text-[clamp(1.75rem,7vw,4.2rem)] sm:text-[clamp(2.5rem,5vw,4.2rem)]"
          >
            We craft digital experiences
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            for brands ready to dominate
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            their category online.
          </h1>

          <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-5 max-w-lg sm:max-w-none">
            <button
              onClick={() => setIsBookingOpen(true)}
              className={`group inline-flex items-center justify-between sm:justify-start gap-3 bg-[#F26522] hover:bg-[#e05a1a] text-white text-[14px] font-semibold rounded-full pl-6 pr-2 py-2.5 sm:py-2 shadow-[0_14px_30px_-6px_rgba(242,101,34,0.5),inset_0_1px_1px_rgba(255,255,255,0.4)] hover:shadow-[0_20px_40px_-6px_rgba(242,101,34,0.65)] hover:-translate-y-1 transition-all duration-500 ${EASE}`}
            >
              <RollText label="Start a project" />
              <span
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center transition-transform duration-500 group-hover:-rotate-45 shadow-sm"
              >
                <ArrowRight size={14} className="text-[#F26522]" />
              </span>
            </button>

            <button
              onClick={handlePartnerBadgeClick}
              className="group inline-flex items-center justify-center sm:justify-start gap-2.5 sm:gap-3 bg-white/90 backdrop-blur-md rounded-full px-5 py-2.5 shadow-[0_10px_25px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,1)] hover:shadow-[0_16px_35px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 transition-all duration-500 cursor-pointer border border-black/[0.04]"
            >
              <PartnerIcon className="w-5 h-5 sm:w-6 sm:h-6 fill-current text-[#E8704E]" />
              <span className="text-[13px] sm:text-[14px] font-semibold text-gray-900">
                Certified Growth Partner
              </span>
              <span className="text-[10px] sm:text-[11px] bg-gray-900 text-white px-2.5 py-0.5 rounded-full font-semibold shadow-sm">
                Featured
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="bg-white pt-16 sm:pt-20 lg:pt-32 pb-12 sm:pb-16 lg:pb-24 overflow-hidden">
        <div className="max-w-[1440px] mx-auto">
          <BadgeRow number="1" label="Introducing Axionis" borderClass="border-gray-200" />
          <h2 className="px-5 sm:px-8 lg:px-12 text-[clamp(1.5rem,4vw,3.2rem)] font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 mb-12 sm:mb-16 lg:mb-28">
            Strategy-led creatives, delivering
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            results in digital and beyond.
          </h2>

          {/* mobile / tablet */}
          <div className="lg:hidden px-5 sm:px-8">
            <p className="text-[15px] sm:text-[17px] leading-[1.6] font-medium text-gray-900">
              Through research, creative thinking and iteration we help growing brands realize their
              digital full potential.
            </p>
            <div className="mt-6">
              <Link
                to="/agency"
                className={`group inline-flex items-center gap-3 bg-[#F26522] hover:bg-[#e05a1a] text-white text-[13px] sm:text-[14px] rounded-full pl-5 sm:pl-6 pr-2 py-2 shadow-[0_12px_28px_-6px_rgba(242,101,34,0.45),inset_0_1px_1px_rgba(255,255,255,0.4)] hover:-translate-y-0.5 transition-all duration-500 ${EASE}`}
              >
                <RollText label="About our agency" />
                <span
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white flex items-center justify-center transition-transform duration-500 group-hover:-rotate-45 shadow-sm"
                >
                  <ArrowRight size={14} className="text-[#F26522]" />
                </span>
              </Link>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:gap-5">
              <img
                src={SMALL_IMG}
                alt="Axionis Growth Agency team at work"
                loading="lazy"
                className="sm:w-[45%] w-full aspect-[438/346] object-cover rounded-[32px] shadow-[0_20px_45px_-12px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-transform duration-500"
              />
              <img
                src={LARGE_IMG}
                alt="Axionis Growth Agency creative process"
                loading="lazy"
                className="sm:w-[55%] w-full aspect-[900/600] object-cover rounded-[32px] shadow-[0_20px_45px_-12px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-transform duration-500"
              />
            </div>
          </div>

          {/* desktop */}
          <div className="hidden lg:grid grid-cols-[26%_1fr_48%] items-end gap-6 xl:gap-8 px-5 sm:px-8 lg:px-12">
            <img
              src={SMALL_IMG}
              alt="Axionis Growth Agency team at work"
              loading="lazy"
              className="self-end w-full aspect-[438/346] object-cover rounded-[36px] shadow-[0_25px_50px_-15px_rgba(0,0,0,0.12)] hover:-translate-y-1.5 transition-transform duration-500"
            />
            <div className="self-start flex justify-end">
              <div>
                <p className="text-[16px] xl:text-[18px] leading-[1.65] font-medium text-gray-900 whitespace-nowrap">
                  Through research, creative thinking and
                  <br />
                  iteration we help growing brands realize
                  <br />
                  their digital full potential.
                </p>
                <div className="mt-8">
                  <Link
                    to="/agency"
                    className={`group inline-flex items-center gap-3 bg-[#F26522] hover:bg-[#e05a1a] text-white text-[13px] sm:text-[14px] rounded-full pl-5 sm:pl-6 pr-2 py-2 shadow-[0_12px_28px_-6px_rgba(242,101,34,0.45),inset_0_1px_1px_rgba(255,255,255,0.4)] hover:-translate-y-0.5 transition-all duration-500 ${EASE}`}
                  >
                    <RollText label="About our agency" />
                    <span
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white flex items-center justify-center transition-transform duration-500 group-hover:-rotate-45 shadow-sm"
                    >
                      <ArrowRight size={14} className="text-[#F26522]" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <img
              src={LARGE_IMG}
              alt="Axionis Growth Agency creative process"
              loading="lazy"
              className="self-end w-full aspect-[3/2] object-cover rounded-[36px] shadow-[0_25px_50px_-15px_rgba(0,0,0,0.12)] hover:-translate-y-1.5 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="bg-[#F5F5F5] pt-16 sm:pt-20 lg:pt-28 pb-16 sm:pb-20 lg:pb-28">
        <div className="max-w-[1440px] mx-auto">
          <BadgeRow number="2" label="Featured client work" borderClass="border-gray-300" />
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between px-5 sm:px-8 lg:px-12 mb-10 sm:mb-14 lg:mb-16 gap-4">
            <h2 className="text-[clamp(1.75rem,7vw,4.2rem)] sm:text-[clamp(2.5rem,5vw,4.2rem)] font-medium leading-[1.08] tracking-[-0.03em] text-gray-900">
              Our projects
            </h2>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#F26522] hover:text-[#e05a1a] transition-colors"
            >
              <span>View all case studies</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 px-5 sm:px-8 lg:px-12">
            {/* Narrativ Card */}
            <div
              onClick={() => setSelectedCaseStudy(HOME_PROJECTS.narrativ)}
              className="cursor-pointer group rounded-[36px] bg-white p-3 shadow-[0_20px_45px_-12px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,1)] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.14)] hover:-translate-y-1.5 transition-all duration-500 border border-black/[0.04]"
            >
              <div className="relative aspect-[329/246] rounded-[28px] overflow-hidden bg-[#1a1d2e] group cursor-pointer shadow-inner">
                <video
                  src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260516_122702_390f5305-8719-41d5-ae80-d23ab3796c28.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-4 left-4 h-10 w-10 group-hover:w-[154px] bg-white/95 backdrop-blur-md rounded-full flex items-center overflow-hidden shadow-lg transition-all duration-300 ease-in-out">
                  <span className="h-10 w-10 shrink-0 flex items-center justify-center">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-900 -rotate-45 group-hover:rotate-0 transition-transform duration-300 ease-in-out"
                    >
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                  </span>
                  <span className="text-[13px] font-semibold text-gray-900 whitespace-nowrap pr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    Learn more
                  </span>
                </div>
              </div>
              <div className="p-4 sm:p-5">
                <p className="text-[13px] sm:text-[14px] text-gray-600 leading-relaxed">
                  Winner of Site of the Month 2025 - an interactive 3D showcase driving record
                  engagement
                </p>
                <h3 className="text-[16px] sm:text-[18px] font-bold text-gray-900 mt-2 group-hover:text-[#F26522] transition-colors">
                  Narrativ
                </h3>
              </div>
            </div>

            {/* Luminar Card */}
            <div
              onClick={() => setSelectedCaseStudy(HOME_PROJECTS.luminar)}
              className="cursor-pointer group rounded-[36px] bg-white p-3 shadow-[0_20px_45px_-12px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,1)] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.14)] hover:-translate-y-1.5 transition-all duration-500 border border-black/[0.04]"
            >
              <div className="relative aspect-[329/246] rounded-[28px] overflow-hidden bg-[#6b6b6b] group cursor-pointer shadow-inner">
                <video
                  src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260516_123323_f909c2b8-ff6c-4edf-882b-8ebcdbe389b5.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-4 left-4 h-10 w-10 group-hover:w-[172px] bg-gray-900/95 backdrop-blur-md rounded-full flex items-center overflow-hidden shadow-lg transition-all duration-300 ease-in-out">
                  <span className="h-10 w-10 shrink-0 flex items-center justify-center">
                    <ArrowRight
                      size={15}
                      className="text-white -rotate-45 group-hover:rotate-0 transition-transform duration-300 ease-in-out"
                    />
                  </span>
                  <span className="text-[13px] font-semibold text-white whitespace-nowrap pr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    View case study
                  </span>
                </div>
              </div>
              <div className="p-4 sm:p-5">
                <p className="text-[13px] sm:text-[14px] text-gray-600 leading-relaxed">
                  Transforming a dated platform into a conversion-focused brand experience
                </p>
                <h3 className="text-[16px] sm:text-[18px] font-bold text-gray-900 mt-2 group-hover:text-[#F26522] transition-colors">
                  Luminar
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <MetricsSection />
      <ServicesSection />
      <ProcessSection />
      <TestimonialsSection />
      <PricingSection onSelectPlan={(plan) => setIsBookingOpen(true)} />
      <FaqSection />
      <CtaSection onBookCall={() => setIsBookingOpen(true)} />
      <SiteFooter onStartProject={() => setIsBookingOpen(true)} />

      {/* Interactive Modals */}
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
      <CaseStudyModal
        study={selectedCaseStudy}
        isOpen={Boolean(selectedCaseStudy)}
        onClose={() => setSelectedCaseStudy(null)}
        onBookCall={() => setIsBookingOpen(true)}
      />
    </main>
  );
}
