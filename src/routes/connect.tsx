import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  Calendar,
  Check,
  Clock,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/sections";
import { BadgeRow, RollText } from "@/components/site/ui-bits";
import { BookingModal } from "@/components/site/BookingModal";

export const Route = createFileRoute("/connect")({
  head: () => ({
    meta: [
      { title: "Connect & Strategy Brief — Axionis Growth Agency" },
      {
        name: "description",
        content:
          "Schedule a 30-minute strategy teardown or submit a confidential RFP directly to the managing partners at Axionis Growth Agency in India.",
      },
    ],
  }),
  component: ConnectPage,
});

function useIndiaTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date()),
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

const BUDGET_OPTIONS = [
  "₹5 Lakhs - ₹15 Lakhs / mo",
  "₹15 Lakhs - ₹40 Lakhs / mo",
  "₹40 Lakhs+ / mo",
  "Sprint Diagnostic (One-Off Audit)",
];

const TIMELINE_OPTIONS = ["Immediate (Within 2 weeks)", "Next Quarter", "Exploratory / RFP"];

function ConnectPage() {
  const [activeTab, setActiveTab] = useState<"book" | "rfp">("book");
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const istTime = useIndiaTime();

  // RFP Form State
  const [rfpName, setRfpName] = useState("");
  const [rfpEmail, setRfpEmail] = useState("");
  const [rfpCompany, setRfpCompany] = useState("");
  const [rfpBudget, setRfpBudget] = useState(BUDGET_OPTIONS[0]);
  const [rfpTimeline, setRfpTimeline] = useState(TIMELINE_OPTIONS[0]);
  const [rfpMessage, setRfpMessage] = useState("");
  const [submittingRfp, setSubmittingRfp] = useState(false);
  const [rfpSuccess, setRfpSuccess] = useState(false);

  const handleRfpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rfpName.trim() || !rfpEmail.trim() || !rfpMessage.trim()) {
      toast.error("Please fill in your name, work email, and brief details.");
      return;
    }

    setSubmittingRfp(true);
    setTimeout(() => {
      setSubmittingRfp(false);
      setRfpSuccess(true);
      toast.success("RFP Received! Managing Partner will reply within 4 hours.");
    }, 900);
  };

  return (
    <main className="min-h-screen bg-[#EFEFEF] text-gray-900 selection:bg-[#F26522] selection:text-white">
      <SiteHeader onBookCall={() => setIsBookingOpen(true)} />

      {/* Hero */}
      <section className="pt-12 sm:pt-16 pb-12 sm:pb-16 px-5 sm:px-8 lg:px-12 max-w-[1440px] mx-auto">
        <BadgeRow number="1" label="Direct Partner Access" borderClass="border-gray-300" />
        <div className="max-w-4xl">
          <h1 className="text-[clamp(2.2rem,6vw,4.5rem)] font-medium leading-[1.05] tracking-[-0.03em] text-gray-900">
            Let's dissect your
            <br className="hidden sm:block" /> biggest
            <span className="text-[#F26522]"> growth constraint.</span>
          </h1>
          <p className="mt-4 text-[16px] sm:text-[18px] text-gray-600 leading-relaxed font-normal">
            No junior pitch reps or scripted presentations. You speak directly with senior growth
            operators who have scaled eight-figure brands across India and global markets.
          </p>
        </div>
      </section>

      {/* Main Grid: Direct Contacts + Interactive Form */}
      <section className="px-5 sm:px-8 lg:px-12 pb-20 sm:pb-28 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-8 lg:gap-10">
          {/* Left Column: Direct Info Cards */}
          <div className="space-y-6">
            {/* Direct Details Card */}
            <div className="p-8 rounded-[38px] bg-white border border-gray-200/90 shadow-[0_18px_40px_-15px_rgba(15,18,25,0.06),inset_0_1px_1px_rgba(255,255,255,1)] space-y-6">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F26522]/10 text-[#F26522] shadow-inner">
                  <Sparkles size={18} />
                </span>
                <div>
                  <h3 className="text-[18px] font-bold text-gray-900">Direct Inquiries</h3>
                  <p className="text-[12px] text-gray-500 font-medium">
                    Guaranteed response within 4 hours
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-[14px]">
                <div className="flex items-center gap-3 text-gray-700">
                  <Mail size={16} className="text-[#F26522]" />
                  <a
                    href="mailto:partners@axionis.agency"
                    className="hover:text-[#F26522] transition-colors font-medium"
                  >
                    partners@axionis.agency
                  </a>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Phone size={16} className="text-[#F26522]" />
                  <a
                    href="tel:+918049202600"
                    className="hover:text-[#F26522] transition-colors font-medium"
                  >
                    +91 (080) 4920-2600
                  </a>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Clock size={16} className="text-[#F26522]" />
                  <span>
                    Current Time: <strong className="text-gray-900">{istTime} IST (India)</strong>
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <p className="text-[12.5px] text-gray-500 leading-relaxed">
                  We are currently accepting <strong>two partner clients</strong> for Q1 2026
                  sprints to maintain our senior squad ratios.
                </p>
              </div>
            </div>

            {/* Hubs Card */}
            <div className="p-8 sm:p-10 rounded-[38px] bg-[#0E1015] text-white shadow-[0_35px_90px_-25px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.2)] border border-white/10 space-y-6">
              <h3 className="text-[20px] font-bold text-white">India Studios & Labs</h3>
              <div className="space-y-5 text-[13.5px]">
                <div className="pb-4 border-b border-white/10">
                  <p className="font-bold text-[#F26522] uppercase tracking-wider text-[11px]">
                    Bengaluru Flagship Studio
                  </p>
                  <p className="font-medium text-white text-[15px] mt-0.5">
                    100 Feet Road, Indiranagar
                  </p>
                  <p className="text-white/60 text-[13px] mt-0.5">
                    Bengaluru, Karnataka 560038, India
                  </p>
                </div>
                <div>
                  <p className="font-bold text-[#F26522] uppercase tracking-wider text-[11px]">
                    Mumbai Studio
                  </p>
                  <p className="font-medium text-white text-[15px] mt-0.5">
                    BKC One, Bandra Kurla Complex
                  </p>
                  <p className="text-white/60 text-[13px] mt-0.5">
                    Mumbai, Maharashtra 400051, India
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="p-6 sm:p-12 rounded-[32px] sm:rounded-[38px] bg-white border border-gray-200/90 shadow-[0_18px_40px_-15px_rgba(15,18,25,0.06),inset_0_1px_1px_rgba(255,255,255,1)]">
            {/* Tabs */}
            <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 rounded-full bg-gray-100 mb-8 w-full sm:max-w-sm border border-gray-200/60 shadow-inner">
              <button
                type="button"
                onClick={() => setActiveTab("book")}
                className={`flex-1 text-[12.5px] sm:text-[13px] font-semibold py-2 rounded-full transition-all duration-300 ${
                  activeTab === "book"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Book Strategy Call
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("rfp")}
                className={`flex-1 text-[12.5px] sm:text-[13px] font-semibold py-2 rounded-full transition-all duration-300 ${
                  activeTab === "rfp"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Submit RFP Brief
              </button>
            </div>

            {activeTab === "book" ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-[22px] font-bold text-gray-900 tracking-tight">
                    Instant 30-Minute Growth Teardown
                  </h3>
                  <p className="mt-2 text-[14px] text-gray-600 leading-relaxed font-normal">
                    Reserve a slot directly on our partner calendar. We review your live funnel, ad
                    creative, and attribution health prior to the call.
                  </p>
                </div>

                <div className="p-6 rounded-[28px] bg-[#FAFAFA] border border-gray-200/80 space-y-3">
                  <div className="flex items-center gap-2 text-[#F26522] font-bold text-[12px] uppercase tracking-wider">
                    <Calendar size={14} />
                    <span>What happens on the call</span>
                  </div>
                  <ul className="space-y-2 text-[13.5px] text-gray-700 font-medium">
                    <li className="flex items-start gap-2">
                      <span className="h-5 w-5 rounded-full bg-[#F26522]/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={12} className="text-[#F26522]" />
                      </span>
                      <span>15-min teardown of your primary bottleneck</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="h-5 w-5 rounded-full bg-[#F26522]/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={12} className="text-[#F26522]" />
                      </span>
                      <span>Review of current CAC payback and blended ROAS</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="h-5 w-5 rounded-full bg-[#F26522]/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={12} className="text-[#F26522]" />
                      </span>
                      <span>Clear actionable recommendation, whether we work together or not</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setIsBookingOpen(true)}
                    className="group inline-flex items-center gap-3 bg-[#F26522] hover:bg-[#e05a1a] text-white text-[14px] font-semibold rounded-full pl-7 pr-2 py-3 shadow-[0_12px_28px_-6px_rgba(242,101,34,0.5)] hover:shadow-[0_18px_36px_-6px_rgba(242,101,34,0.65)] hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <RollText label="Open Calendar Scheduler" />
                    <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center group-hover:-rotate-45 transition-transform shadow-sm">
                      <ArrowRight size={14} className="text-[#F26522]" />
                    </span>
                  </button>
                </div>
              </div>
            ) : rfpSuccess ? (
              <div className="py-10 text-center space-y-4">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F26522]/10 text-[#F26522] shadow-sm">
                  <Check size={32} />
                </div>
                <h3 className="text-[22px] font-bold text-gray-900">RFP Brief Submitted</h3>
                <p className="text-[14px] text-gray-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="font-semibold text-gray-900">{rfpName}</span>. Our
                  managing partners will review your requirements and reply to{" "}
                  <span className="font-semibold text-gray-900">{rfpEmail}</span> within 4 hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setRfpSuccess(false)}
                    className="bg-gray-900 hover:bg-black text-white text-[13px] font-semibold rounded-full px-6 py-2.5 shadow-sm transition-colors"
                  >
                    Send another brief
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleRfpSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] font-semibold text-gray-700 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={rfpName}
                      onChange={(e) => setRfpName(e.target.value)}
                      placeholder="Vikram Mehta"
                      className="w-full rounded-full bg-gray-50 border border-gray-200 px-4 py-2.5 text-[13px] text-gray-900 placeholder:text-gray-400 focus:border-[#F26522] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-gray-700 mb-1">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={rfpEmail}
                      onChange={(e) => setRfpEmail(e.target.value)}
                      placeholder="vikram@scaleup.com"
                      className="w-full rounded-full bg-gray-50 border border-gray-200 px-4 py-2.5 text-[13px] text-gray-900 placeholder:text-gray-400 focus:border-[#F26522] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] font-semibold text-gray-700 mb-1">
                      Company & Website URL
                    </label>
                    <input
                      type="text"
                      value={rfpCompany}
                      onChange={(e) => setRfpCompany(e.target.value)}
                      placeholder="Brand Name (brand.com)"
                      className="w-full rounded-full bg-gray-50 border border-gray-200 px-4 py-2.5 text-[13px] text-gray-900 placeholder:text-gray-400 focus:border-[#F26522] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-gray-700 mb-1">
                      Estimated Monthly Budget
                    </label>
                    <select
                      value={rfpBudget}
                      onChange={(e) => setRfpBudget(e.target.value)}
                      className="w-full rounded-full bg-gray-50 border border-gray-200 px-4 py-2.5 text-[13px] text-gray-900 focus:border-[#F26522] focus:outline-none"
                    >
                      {BUDGET_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-semibold text-gray-700 mb-1">
                    Ideal Engagement Timeline
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {TIMELINE_OPTIONS.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setRfpTimeline(t)}
                        className={`py-2 px-3 rounded-full text-[12px] font-semibold border transition-all ${
                          rfpTimeline === t
                            ? "bg-gray-900 text-white border-gray-900 shadow-sm"
                            : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-semibold text-gray-700 mb-1">
                    Project Goals & Core Problem Statement *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={rfpMessage}
                    onChange={(e) => setRfpMessage(e.target.value)}
                    placeholder="Describe your current revenue stage, primary acquisition channels, and the targets you need to hit..."
                    className="w-full rounded-[24px] bg-gray-50 border border-gray-200 px-4 py-3 text-[13px] text-gray-900 placeholder:text-gray-400 focus:border-[#F26522] focus:outline-none resize-none"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={submittingRfp}
                    className="group inline-flex items-center gap-3 bg-[#F26522] hover:bg-[#e05a1a] disabled:opacity-50 text-white text-[13px] font-semibold rounded-full pl-6 pr-2 py-2.5 shadow-[0_10px_25px_rgba(242,101,34,0.4)] transition-all"
                  >
                    <RollText label={submittingRfp ? "Submitting..." : "Submit Confidential RFP"} />
                    <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center group-hover:-rotate-45 transition-transform shadow-sm">
                      <Send size={13} className="text-[#F26522]" />
                    </span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />

      <SiteFooter onStartProject={() => setIsBookingOpen(true)} />
    </main>
  );
}
