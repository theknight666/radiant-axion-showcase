import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Check, HeartHandshake, Laptop, Sparkles, Trophy, Users, Zap } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter, CtaSection } from "@/components/site/sections";
import { BadgeRow, OrangeButton, RollText } from "@/components/site/ui-bits";
import { JobApplyModal, JobPosition } from "@/components/site/JobApplyModal";
import { BookingModal } from "@/components/site/BookingModal";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers & Culture — Axionis Growth Agency" },
      {
        name: "description",
        content:
          "Join Axionis in Bengaluru, Mumbai, or remotely. We hire senior growth architects, performance media leads, and conversion engineers with transparent profit-sharing.",
      },
    ],
  }),
  component: CareersPage,
});

const PERKS = [
  {
    icon: Trophy,
    title: "Profit Share on Client Outcomes",
    copy: "Every squad member receives direct quarterly performance bonuses tied to the incremental net revenue generated for our partners.",
  },
  {
    icon: Laptop,
    title: "Remote-First Flexibility",
    copy: "Work from our studios in Bengaluru or Mumbai, or anywhere in India with flexible hours and top-tier Apple hardware setups.",
  },
  {
    icon: Users,
    title: "Senior Squads Only",
    copy: "Collaborate exclusively with seasoned operators. No micro-managers, no politics, and no layers of red tape.",
  },
  {
    icon: Zap,
    title: "Continuous Learning Grant",
    copy: "₹2,50,000 annual personal budget for courses, conferences, private masterminds, and experimental tooling.",
  },
];

const JOBS: JobPosition[] = [
  {
    id: "media-lead",
    title: "Senior Performance Media Lead",
    department: "Media Buying",
    location: "Bengaluru / Remote (India)",
    type: "Full-Time",
    salary: "₹35,00,000 - ₹50,00,000 + Profit Share",
    overview:
      "Own high-scale direct response ad spend across Meta, Google Search/YouTube, and TikTok for international and Indian scaleups.",
    requirements: [
      "5+ years scaling direct response paid media accounts past ₹80L/mo spend",
      "Mastery of creative testing methodologies and dynamic asset generation",
      "Deep understanding of server-side CAPI and warehouse attribution",
    ],
  },
  {
    id: "conversion-designer",
    title: "Principal Conversion Designer",
    department: "Design & UX",
    location: "Mumbai / Remote (India)",
    type: "Full-Time",
    salary: "₹30,00,000 - ₹45,00,000 + Profit Share",
    overview:
      "Architect conversion-focused landing page systems, interactive WebGL showcases, and checkout funnels.",
    requirements: [
      "Portfolio of high-converting SaaS or e-commerce web experiences",
      "Fluent in Figma design systems, motion design, and responsive typography",
      "Basic understanding of modern frontend constraints (React / Tailwind)",
    ],
  },
  {
    id: "data-engineer",
    title: "Lead Data & Attribution Engineer",
    department: "Data & Infrastructure",
    location: "Bengaluru / Remote (India)",
    type: "Full-Time",
    salary: "₹32,00,000 - ₹48,00,000 + Profit Share",
    overview:
      "Build automated data pipelines, dbt models, and marketing mix modeling tools for our enterprise client roster.",
    requirements: [
      "Production experience with dbt, Snowflake / BigQuery, and Python",
      "Expertise in multi-touch attribution and econometric modeling",
      "Experience deploying server-side tracking (Segment / RudderStack)",
    ],
  },
  {
    id: "growth-strategist",
    title: "Growth Strategy Director",
    department: "Strategy",
    location: "New Delhi / Remote (India)",
    type: "Full-Time",
    salary: "₹45,00,000 - ₹65,00,000 + Profit Share",
    overview:
      "Lead 4-week diagnostic growth sprints and act as fractional VP Growth for executive teams.",
    requirements: [
      "Ex-founder or former VP Growth / Head of Marketing at a venture-backed scaleup",
      "Exceptional commercial acumen, unit economics mastery, and C-suite presentation skills",
    ],
  },
];

function CareersPage() {
  const [selectedJob, setSelectedJob] = useState<JobPosition | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#EFEFEF] text-gray-900 selection:bg-[#F26522] selection:text-white">
      <SiteHeader onBookCall={() => setIsBookingOpen(true)} />

      {/* Hero */}
      <section className="pt-12 sm:pt-16 pb-12 sm:pb-16 px-5 sm:px-8 lg:px-12 max-w-[1440px] mx-auto">
        <BadgeRow number="1" label="Join Axionis" borderClass="border-gray-300" />
        <div className="max-w-4xl">
          <h1 className="text-[clamp(2.2rem,6vw,4.5rem)] font-medium leading-[1.05] tracking-[-0.03em] text-gray-900">
            Build compounding careers
            <br className="hidden sm:block" /> with
            <span className="text-[#F26522]"> world-class operators.</span>
          </h1>
          <p className="mt-4 text-[16px] sm:text-[18px] text-gray-600 leading-relaxed font-normal">
            We don't do micromanagement, bloated meetings, or vanity deliverables. We do high-speed
            execution, autonomy, and shared financial upside.
          </p>
        </div>
      </section>

      {/* Culture & Perks */}
      <section className="bg-white py-16 sm:py-24 px-5 sm:px-8 lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          <BadgeRow number="2" label="Why Axionis" borderClass="border-gray-200" />
          <h2 className="text-[clamp(1.8rem,4.5vw,3.2rem)] font-medium leading-[1.1] tracking-[-0.02em] text-gray-900 mb-12">
            Built for operators who want to do
            <br className="hidden sm:block" /> the best work of their lives.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
            {PERKS.map((p) => (
              <div
                key={p.title}
                className="p-8 rounded-[32px] bg-[#FAFAFA] border border-gray-200/80 flex flex-col justify-between shadow-[0_15px_35px_-12px_rgba(15,18,25,0.06),inset_0_1px_1px_rgba(255,255,255,1)] hover:shadow-[0_28px_65px_-15px_rgba(15,18,25,0.12)] hover:-translate-y-1.5 transition-all duration-500"
              >
                <div>
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 text-white mb-6 shadow-md">
                    <p.icon size={20} />
                  </span>
                  <h3 className="text-[18px] font-bold text-gray-900">{p.title}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-gray-600 font-normal">{p.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section className="py-16 sm:py-24 px-5 sm:px-8 lg:px-12 max-w-[1440px] mx-auto">
        <BadgeRow number="3" label="Current Openings" borderClass="border-gray-300" />
        <div className="mb-12">
          <h2 className="text-[clamp(1.8rem,4.5vw,3.2rem)] font-medium leading-[1.1] tracking-[-0.02em] text-gray-900">
            Open Squad Positions
          </h2>
          <p className="mt-3 text-[15px] sm:text-[16px] text-gray-600">
            We are hiring across Bengaluru, Mumbai, Delhi NCR, and remotely across India and globally.
          </p>
        </div>

        <div className="space-y-4">
          {JOBS.map((job) => (
            <div
              key={job.id}
              onClick={() => setSelectedJob(job)}
              className="group cursor-pointer p-5 sm:p-8 rounded-[28px] sm:rounded-[36px] bg-white border border-gray-200/90 shadow-[0_18px_40px_-15px_rgba(15,18,25,0.06),inset_0_1px_1px_rgba(255,255,255,1)] hover:shadow-[0_28px_65px_-15px_rgba(15,18,25,0.12)] hover:-translate-y-1 transition-all duration-500 flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-6"
            >
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#F26522] bg-[#F26522]/10 px-3.5 py-1 rounded-full">
                    {job.department}
                  </span>
                  <span className="text-[12px] text-gray-600 bg-gray-100 px-3 py-0.5 rounded-full font-medium">
                    {job.location}
                  </span>
                  <span className="text-[12px] text-gray-600 bg-gray-100 px-3 py-0.5 rounded-full font-medium">
                    {job.type}
                  </span>
                </div>
                <h3 className="text-[20px] sm:text-[22px] font-bold text-gray-900 group-hover:text-[#F26522] transition-colors">
                  {job.title}
                </h3>
                <p className="text-[14px] text-gray-600 max-w-2xl leading-relaxed">{job.overview}</p>
              </div>

              <div className="flex sm:items-center justify-between lg:flex-col lg:items-end gap-3 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-gray-100">
                <p className="text-[14px] font-bold text-gray-900">{job.salary}</p>
                <button
                  type="button"
                  className="group-hover:bg-[#F26522] group-hover:text-white bg-gray-900 text-white text-[13px] font-semibold rounded-full px-5 py-2 transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <span>Apply Now</span>
                  <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Application Modal */}
      <JobApplyModal
        job={selectedJob}
        isOpen={Boolean(selectedJob)}
        onClose={() => setSelectedJob(null)}
      />

      {/* Booking Modal */}
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />

      <CtaSection onBookCall={() => setIsBookingOpen(true)} />
      <SiteFooter onStartProject={() => setIsBookingOpen(true)} />
    </main>
  );
}
