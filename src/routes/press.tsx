import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Download, ExternalLink, FileText, Image as ImageIcon, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter, CtaSection } from "@/components/site/sections";
import { BadgeRow, OrangeButton, RollText } from "@/components/site/ui-bits";
import { AxionisLogo } from "@/components/site/AxionisLogo";
import { BookingModal } from "@/components/site/BookingModal";

export const Route = createFileRoute("/press")({
  head: () => ({
    meta: [
      { title: "Press, News & Brand Assets — Axionis Growth Agency" },
      {
        name: "description",
        content:
          "Official press announcements, agency media kit, executive bios, and downloadable brand assets for Axionis Growth Agency.",
      },
    ],
  }),
  component: PressPage,
});

const PRESS_RELEASES = [
  {
    date: "January 15, 2026",
    outlet: "Global Growth Journal",
    title: "Axionis Named Top Independent Growth Agency of the Year",
    summary:
      "Recognized for innovative incrementality-first media buying frameworks and rapid revenue acceleration across 27 international brand scaleups.",
  },
  {
    date: "December 04, 2025",
    outlet: "AdWeek Global",
    title: "Axionis Expands Flagship Studios in Bengaluru and Mumbai to Support Global Demand",
    summary:
      "Following 310% YoY client growth, the India-headquartered agency scales engineering and media operations to support enterprise partners worldwide.",
  },
  {
    date: "October 18, 2025",
    outlet: "TechCrunch Growth",
    title: "The Death of Last-Click: Axionis Releases Open Attribution Framework",
    summary:
      "A mathematical guide to decoupling media spend from platform vanity metrics, downloaded by over 14,000 operators worldwide.",
  },
];

const ASSETS = [
  {
    title: "Axionis Logo Pack (Vector SVG / High-Res PNG)",
    type: "Vector Assets (Dark & Light Variants)",
    size: "4.8 MB",
    filename: "axionis-logo-kit.zip",
  },
  {
    title: "Executive Leadership Headshots & Bios",
    type: "High-Res Photography & Markdown Bios",
    size: "18.2 MB",
    filename: "axionis-leadership-press.zip",
  },
  {
    title: "Axionis Brand Guidelines & Color Tokens",
    type: "PDF Design Tokens & Usage Rules",
    size: "2.1 MB",
    filename: "axionis-brand-spec-2026.pdf",
  },
];

function PressPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleDownload = (filename: string) => {
    toast.success(`Downloading asset package: ${filename}`);
  };

  return (
    <main className="min-h-screen bg-[#EFEFEF] text-gray-900 selection:bg-[#F26522] selection:text-white">
      <SiteHeader onBookCall={() => setIsBookingOpen(true)} />

      {/* Hero */}
      <section className="pt-12 sm:pt-16 pb-12 sm:pb-16 px-5 sm:px-8 lg:px-12 max-w-[1440px] mx-auto">
        <BadgeRow number="1" label="Press & Media Kit" borderClass="border-gray-300" />
        <div className="max-w-4xl">
          <h1 className="text-[clamp(2.2rem,6vw,4.5rem)] font-medium leading-[1.05] tracking-[-0.03em] text-gray-900">
            News, milestones, and
            <br className="hidden sm:block" />
            <span className="text-[#F26522]"> official brand assets.</span>
          </h1>
          <p className="mt-4 text-[16px] sm:text-[18px] text-gray-600 leading-relaxed font-normal">
            For journalist inquiries, media kit requests, or speaking opportunities, contact{" "}
            <a
              href="mailto:press@axionis.agency"
              className="text-[#F26522] font-semibold underline underline-offset-4"
            >
              press@axionis.agency
            </a>
            .
          </p>
        </div>
      </section>

      {/* Press Coverage */}
      <section className="bg-white py-16 sm:py-24 px-5 sm:px-8 lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          <BadgeRow number="2" label="Recent Coverage" borderClass="border-gray-200" />
          <h2 className="text-[clamp(1.8rem,4.5vw,3.2rem)] font-medium leading-[1.1] tracking-[-0.02em] text-gray-900 mb-12">
            Selected Announcements
          </h2>

          <div className="space-y-4">
            {PRESS_RELEASES.map((item) => (
              <div
                key={item.title}
                className="p-6 sm:p-8 rounded-[28px] sm:rounded-[36px] bg-[#FAFAFA] border border-gray-200/90 shadow-[0_15px_35px_-12px_rgba(15,18,25,0.06),inset_0_1px_1px_rgba(255,255,255,1)] hover:shadow-[0_28px_65px_-15px_rgba(15,18,25,0.12)] hover:-translate-y-1 transition-all duration-500 flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6"
              >
                <div className="space-y-2 max-w-3xl">
                  <div className="flex items-center gap-3">
                    <span className="text-[12px] font-bold text-[#F26522]">{item.outlet}</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-[12px] text-gray-500 font-medium">{item.date}</span>
                  </div>
                  <h3 className="text-[19px] sm:text-[22px] font-bold text-gray-900 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-[13.5px] sm:text-[14px] text-gray-600 leading-relaxed font-normal">{item.summary}</p>
                </div>

                <div className="shrink-0 pt-2 md:pt-0">
                  <button
                    onClick={() => toast.info(`Viewing article on ${item.outlet}`)}
                    className="inline-flex items-center gap-2 text-[13px] font-semibold text-gray-900 hover:text-[#F26522] transition-colors"
                  >
                    <span>Read article</span>
                    <ExternalLink size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Assets & Downloads */}
      <section className="py-14 sm:py-24 px-5 sm:px-8 lg:px-12 max-w-[1440px] mx-auto">
        <BadgeRow number="3" label="Brand Media Kit" borderClass="border-gray-300" />
        <div className="mb-10 sm:mb-12">
          <h2 className="text-[clamp(1.8rem,4.5vw,3.2rem)] font-medium leading-[1.1] tracking-[-0.02em] text-gray-900">
            Downloadable Assets
          </h2>
          <p className="mt-3 text-[14.5px] sm:text-[16px] text-gray-600">
            Approved vector logos, executive portraits, and typography tokens for editorial use.
          </p>
        </div>

        {/* Logo Preview showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7 mb-8 sm:mb-10">
          <div className="p-6 sm:p-10 rounded-[30px] sm:rounded-[38px] bg-white border border-gray-200/90 shadow-[0_18px_40px_-15px_rgba(15,18,25,0.06),inset_0_1px_1px_rgba(255,255,255,1)] flex flex-col justify-between items-center text-center space-y-6 sm:space-y-8">
            <div className="py-4 sm:py-6">
              <AxionisLogo variant="light" size="lg" showTagline={true} />
            </div>
            <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2 pt-4 border-t border-gray-100 text-[12.5px] sm:text-[13px] text-gray-500 font-medium">
              <span>Primary Dark Mark (Light Backgrounds)</span>
              <span className="text-[#F26522] font-semibold">SVG / PNG</span>
            </div>
          </div>

          <div className="p-6 sm:p-10 rounded-[30px] sm:rounded-[38px] bg-[#0E1015] text-white shadow-[0_35px_90px_-25px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.2)] border border-white/10 flex flex-col justify-between items-center text-center space-y-6 sm:space-y-8">
            <div className="py-4 sm:py-6">
              <AxionisLogo variant="dark" size="lg" showTagline={true} />
            </div>
            <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2 pt-4 border-t border-white/10 text-[12.5px] sm:text-[13px] text-white/50 font-medium">
              <span>Inverted White Mark (Dark Backgrounds)</span>
              <span className="text-[#F26522] font-semibold">SVG / PNG</span>
            </div>
          </div>
        </div>

        {/* Download links */}
        <div className="space-y-3.5">
          {ASSETS.map((asset) => (
            <div
              key={asset.title}
              className="p-6 sm:p-7 rounded-[32px] bg-white border border-gray-200/90 shadow-[0_15px_35px_-12px_rgba(15,18,25,0.06),inset_0_1px_1px_rgba(255,255,255,1)] hover:shadow-[0_25px_50px_-15px_rgba(15,18,25,0.1)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-900 shadow-inner">
                  <Download size={18} />
                </span>
                <div>
                  <h4 className="text-[15px] sm:text-[16px] font-bold text-gray-900">{asset.title}</h4>
                  <p className="text-[13px] text-gray-500 font-medium">
                    {asset.type} • {asset.size}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleDownload(asset.filename)}
                className="bg-gray-900 hover:bg-[#F26522] text-white text-[13px] font-semibold rounded-full px-5 py-2.5 shadow-sm transition-colors flex items-center justify-center gap-2"
              >
                <span>Download Kit</span>
                <Download size={14} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />

      <CtaSection onBookCall={() => setIsBookingOpen(true)} />
      <SiteFooter onStartProject={() => setIsBookingOpen(true)} />
    </main>
  );
}
